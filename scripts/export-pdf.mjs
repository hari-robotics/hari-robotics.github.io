import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const entryFileUrl = pathToFileURL(path.join(projectRoot, "index.html")).href;
const exportJobs = [
  { locale: "en", outputName: "resume-en-a4.pdf" },
  { locale: "zh", outputName: "resume-zh-a4.pdf" }
];

const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser"
];

const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));

if (!chromePath) {
  throw new Error("No compatible Chromium-based browser was found on this machine.");
}

const profileDir = mkdtempSync(path.join(os.tmpdir(), "resume-pdf-"));
const remoteDebuggingPort = 12000 + Math.floor(Math.random() * 4000);

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-breakpad",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-domain-reliability",
    "--disable-sync",
    "--metrics-recording-only",
    "--no-first-run",
    "--no-default-browser-check",
    "--no-pings",
    "--password-store=basic",
    "--use-mock-keychain",
    "--allow-file-access-from-files",
    `--user-data-dir=${profileDir}`,
    `--remote-debugging-port=${remoteDebuggingPort}`,
    "about:blank"
  ],
  {
    stdio: ["ignore", "ignore", "pipe"]
  }
);

let chromeStderr = "";
chrome.stderr.on("data", (chunk) => {
  chromeStderr += String(chunk);
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ensureOk(response, context) {
  if (!response.ok) {
    throw new Error(`${context} failed with HTTP ${response.status}.`);
  }
  return response;
}

async function waitForChromeReady() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${remoteDebuggingPort}/json/version`);
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Chrome is still starting up.
    }
    await sleep(250);
  }

  throw new Error("Chrome DevTools endpoint did not become ready.");
}

function createDevToolsClient(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  const events = [];
  let nextId = 1;

  ws.onmessage = (event) => {
    const payload = JSON.parse(event.data);

    if (payload.id) {
      const task = pending.get(payload.id);
      if (!task) {
        return;
      }

      pending.delete(payload.id);

      if (payload.error) {
        task.reject(new Error(JSON.stringify(payload.error)));
      } else {
        task.resolve(payload.result);
      }
      return;
    }

    events.push(payload);
  };

  return {
    ws,
    events,
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }
  };
}

async function openPageClient() {
  const targetResponse = await fetch(`http://127.0.0.1:${remoteDebuggingPort}/json/new?about:blank`, {
    method: "PUT"
  });
  const target = await ensureOk(targetResponse, "Create target").json();
  const client = createDevToolsClient(target.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    client.ws.onopen = resolve;
    client.ws.onerror = reject;
  });

  await client.send("Page.enable");
  await client.send("Runtime.enable");

  return { client, targetId: target.id };
}

async function waitForPageLoad(client) {
  const startIndex = client.events.length;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const loadEvent = client.events
      .slice(startIndex)
      .find((event) => event.method === "Page.loadEventFired");

    if (loadEvent) {
      return;
    }

    await sleep(100);
  }

  throw new Error("Timed out while waiting for the page to finish loading.");
}

async function exportPdf(locale, outputName) {
  const outputPath = path.join(projectRoot, outputName);
  const entryUrl = `${entryFileUrl}?lang=${locale}&print=1`;

  mkdirSync(path.dirname(outputPath), { recursive: true });

  const { client, targetId } = await openPageClient();

  try {
    await client.send("Page.navigate", { url: entryUrl });
    await waitForPageLoad(client);

    await client.send("Runtime.evaluate", {
      expression: `
        Promise.all([
          document.fonts ? document.fonts.ready : Promise.resolve(),
          new Promise((resolve) => setTimeout(resolve, 500))
        ]).then(() => "ready")
      `,
      awaitPromise: true,
      returnByValue: true
    });

    const pdfResult = await client.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true
    });

    writeFileSync(outputPath, Buffer.from(pdfResult.data, "base64"));
    console.log(outputPath);
  } finally {
    client.ws.close();
    try {
      await fetch(`http://127.0.0.1:${remoteDebuggingPort}/json/close/${targetId}`);
    } catch {
      // Ignore failures while closing the tab.
    }
  }
}

try {
  await waitForChromeReady();

  for (const job of exportJobs) {
    await exportPdf(job.locale, job.outputName);
  }
} catch (error) {
  const detail = chromeStderr.trim();
  const suffix = detail ? `\nChrome stderr:\n${detail}` : "";
  throw new Error(`${error instanceof Error ? error.message : String(error)}${suffix}`);
} finally {
  chrome.kill("SIGTERM");
  await sleep(500);
  rmSync(profileDir, { recursive: true, force: true });
}
