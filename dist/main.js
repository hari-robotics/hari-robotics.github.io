"use strict";
const avatarPlaceholder = "./asserts/image.jpeg";
const localeStorageKey = "resume-locale";
function getLocaleFromUrl() {
    const locale = new URLSearchParams(window.location.search).get("lang");
    return locale && isLocale(locale) ? locale : null;
}
function isPrintMode() {
    return new URLSearchParams(window.location.search).get("print") === "1";
}
const bundles = {
    en: {
        resume: {
            name: "Zihao Zheng",
            role: "MSc in Automation and Control Engineering @ PoliMI",
            summary: "Focused on motion control, with solid familiarity with control algorithms and observer design methods. Also capable of full-stack development and end-to-end delivery from structural design to algorithm implementation. Strong project experience, hands-on engineering ability, and problem-solving skills, with a strong interest in robotics research and applications.",
            contacts: [
                { kind: "email", value: "zzh_robotic@163.com", href: "mailto:zzh_robotic@163.com" },
                { kind: "location", value: "Milan, Italy" },
                { kind: "github", value: "https://github.com/hari-robotics", href: "https://github.com/hari-robotics" }
            ],
            skills: [
                {
                    category: "Robotics Programming & Tools",
                    core: true,
                    items: [
                        { name: "C/C++", level: "Proficient" },
                        { name: "ROS / ROS 2", level: "Proficient" },
                        { name: "Python", level: "Competent" },
                        { name: "Gazebo", level: "Competent" },
                        { name: "MuJoCo", level: "Competent" }
                    ]
                },
                {
                    category: "Control & Simulation",
                    core: true,
                    items: [
                        { name: "Linear Control Algorithms", level: "Proficient" },
                        { name: "Observer Design", level: "Proficient" },
                        { name: "Linearization of Nonlinear Systems", level: "Proficient" },
                        { name: "System Parameter Identification", level: "Proficient" }
                    ]
                },
                {
                    category: "Embedded Software & Hardware",
                    items: [
                        { name: "Embedded C/C++", level: "Proficient" },
                        { name: "Communication Protocols", level: "Proficient" },
                        { name: "EDA Tools such as AD/KiCad", level: "Competent" },
                        { name: "Multithreaded Programming", level: "Familiar" }
                    ]
                },
                {
                    category: "Mechanical Design",
                    items: [
                        { name: "CAD Tools such as SolidWorks", level: "Competent" }
                    ]
                }
            ],
            experiences: [
                {
                    title: "Research Assistant",
                    company: "Nanjing University",
                    period: "Jul 2025 - Sep 2025",
                    highlights: [
                        "Designed two unconventional UAV structures, derived their dynamic models, and modified the NMPC algorithm to achieve autonomous takeoff, landing, and fixed-point hovering.",
                        "Assisted with experimental data analysis, paper video production, and paper review.",
                        "Related results were published at the IEEE International Conference on Robotics and Automation (ICRA 2026)."
                    ]
                },
                {
                    title: "Robot Control Engineer Intern",
                    company: "Wuji Technology Co., Ltd.",
                    period: "Jun 2024 - Aug 2024",
                    highlights: [
                        "Designed bidirectional synchronized control for a teleoperation system, enabling low-latency remote control of robots.",
                        "Developed kinematic and dynamic models for a parallel robot structure to achieve precise motion control.",
                        "Designed motor control algorithms based on sliding mode control to mitigate cogging effects and improve motion accuracy."
                    ]
                },
                {
                    title: "Embedded Engineer Intern",
                    company: "Geshi Intelligent Co., Ltd.",
                    period: "Jun 2021 - Aug 2021",
                    highlights: [
                        "Developed a remote control system based on NXP32 microcontroller for wireless vehicle control and status monitoring.",
                        "Developed upper-computer software in C# for system configuration and data visualization."
                    ]
                }
            ],
            projects: [
                {
                    name: "Design and Control of a Omnidirectional UAV",
                    highlights: [
                        "Designed and built a omnidirectional UAV prototype, and derived its dynamic model.",
                        "Designed an optimal control allocation algorithm and validated the feasibility of the control algorithm in simulation."
                    ],
                    stack: "Robotics Programming & Tools, Control & Simulation"
                },
                {
                    name: "Challenge Cup National Undergraduate Extracurricular Academic and Science Competition",
                    highlights: [
                        "Designed and implemented a ROS-based distributed control solution capable of real-time control on physical systems from MATLAB.",
                        "Verified algorithms in MATLAB and then exported them as ROS packages for higher runtime efficiency and rapid deployment.",
                        "Won Provincial Second Prize in the competition."
                    ],
                    stack: "Robotics Programming & Tools, Control & Simulation"
                },
                {
                    name: "RoboMaster Robotics Competition",
                    highlights: [
                        "Participated in multiple RMUC and RMUL events, responsible for control and embedded-related modules.",
                        "Developed STM32 microcontroller firmware based on FreeRTOS and the HAL library to implement low-level motion control.",
                        "Implemented communication interface between lower-level controllers and PC through ROS messages without introducing entire ROS into embedded systems, improved the developing efficiency."
                    ],
                    stack: "Robotics Programming & Tools, Embedded Software & Hardware"
                },
            ],
            education: [
                {
                    school: "University of Nottingham Ningbo China",
                    degree: "BEng in Electrical Engineering and Automation",
                    period: "2019 - 2023"
                },
                {
                    school: "Politecnico di Milano",
                    degree: "MSc in Automation and Control Engineering",
                    period: "2025 - 2027"
                }
            ],
            publications: [
                {
                    title: "A Self-Rotating Tri-Rotor UAV for Field-of-View Expansion and Autonomous Flight",
                    publisher: "ICRA (Accepted)",
                    period: "2026",
                },
                {
                    title: "Design and Validation of Flexible Aerial Robotics for Safe Human-Robot Interaction",
                    publisher: "IROS",
                    period: "2024",
                    link: "https://doi.org/10.1109/IROS58592.2024.10801991"
                }
            ]
        },
        headings: {
            experience: "Experience",
            projects: "Projects",
            skills: "Tech Stack",
            education: "Education",
            publication: "Publications"
        },
        contactNames: {
            email: "Email",
            phone: "Phone",
            location: "Location",
            website: "Website",
            github: "GitHub"
        },
        coreSkillLabel: "Core",
        downloadPdfLabel: "Download PDF",
        downloadPdfHref: "./resume-en-a4.pdf",
        downloadPdfName: "Zihao_Zheng_Resume_EN.pdf",
        switcherAria: "Switch language"
    },
    zh: {
        resume: {
            name: "郑子豪",
            role: "米兰理工大学自动化与控制工程硕士",
            summary: "以运动控制为主要方向，各种控制算法与观测器设计，同时具有从结构设计到具体算法实现的全栈开发与端到端交付能力。项目经验丰富，动手能力强，善于解决问题，对机器人相关的研究与应用有浓厚兴趣。",
            contacts: [
                { kind: "email", value: "zzh_robotic@163.com", href: "mailto:zzh_robotic@163.com" },
                { kind: "location", value: "意大利，米兰" },
                { kind: "github", value: "https://github.com/hari-robotics", href: "https://github.com/hari-robotics" }
            ],
            skills: [
                {
                    category: "机器人编程与工具",
                    core: true,
                    items: [
                        { name: "C/C++", level: "熟练" },
                        { name: "ROS / ROS 2", level: "熟练" },
                        { name: "Python", level: "常用" },
                        { name: "Gazebo", level: "常用" },
                        { name: "MuJoCo", level: "常用" }
                    ]
                },
                {
                    category: "控制与仿真",
                    core: true,
                    items: [
                        { name: "线性控制算法", level: "熟练" },
                        { name: "观测器设计", level: "熟练" },
                        { name: "非线性系统线性化", level: "熟练" },
                        { name: "系统参数辨识", level: "熟练" },
                    ]
                },
                {
                    category: "嵌入式软硬件",
                    core: false,
                    items: [
                        { name: "嵌入式C/C++", level: "熟练" },
                        { name: "通讯协议", level: "熟练" },
                        { name: "AD/KiCad等EDA工具", level: "常用" },
                        { name: "多线程编程", level: "了解" },
                    ]
                },
                {
                    category: "机械设计",
                    items: [
                        { name: "SolidWorks等CAD软件", level: "常用" }
                    ]
                }
            ],
            experiences: [
                {
                    title: "研究助理",
                    company: "南京大学",
                    period: "2025.7 - 2025.9",
                    highlights: [
                        "设计两款异形无人机结构，并推导其动力学模型修改NMPC算法，成功实现自主起降与定点悬停。",
                        "辅助实验数据的分析与论文视频的制作，并参与论文的review",
                        "相关成果发表于 2026 年国际机器人与自动化会议（ICRA 2026）。"
                    ]
                },
                {
                    title: "机器人控制工程师实习生",
                    company: "舞肌科技有限公司",
                    period: "2024.6 - 2024.8",
                    highlights: [
                        "为公司设计遥操作系统的双向同步控制，实现远程对机器人的低延迟控制。",
                        "设计并联结构机器人的运动学与动力学模型，实现对机器人运动的精确控制。",
                        "使用滑模控制设计电机控制算法，减轻了电机的齿槽效应问题，提高了机器人运行的精确度。"
                    ]
                },
                {
                    title: "嵌入式工程师实习生",
                    company: "格仕智能有限公司",
                    period: "2021.6 - 2021.8",
                    highlights: [
                        "开发基于NXP32微控制器的远程控制系统，实现对车辆的无线控制与状态监测。",
                        "使用C#开发上位机软件，实现对车辆系统的配置与数据可视化。"
                    ]
                }
            ],
            projects: [
                {
                    name: "全自由度无人机的设计与控制",
                    highlights: [
                        "设计并制作了一款全自由度无人机原型，并推导其动力学模型",
                        "设计了最优控制分配算法并在仿真中验证了控制算法的可行性。"
                    ],
                    stack: "机器人编程与工具, 控制与仿真"
                },
                {
                    name: "挑战杯全国大学生课外学术科技作品竞赛",
                    highlights: [
                        "设计并实现基于 ROS 的分布式控制方案，可在MATLAB中实现实时实机控制。",
                        "可在MATLAB中验证实机算法后导出ROS包，提高运行效率并进行快速部署。",
                        "项目获得省级二等奖。"
                    ],
                    stack: "机器人编程与工具, 控制与仿真"
                },
                {
                    name: "RoboMaster机甲大师赛",
                    highlights: [
                        "参与多个单项赛与对抗赛任务，负责控制与嵌入式相关模块。",
                        "基于FreeRTOS与HAL库开发STM32微控制器固件，实现机器人运动的底层控制。",
                        "基于ROS消息机制实现下位机无需集成ROS系统便可与ROS上位机通信的功能，以便接收上位机控制指令。"
                    ],
                    stack: "机器人编程与工具, 嵌入式软硬件"
                }
            ],
            education: [
                {
                    school: "宁波诺丁汉大学",
                    degree: "电气工程与自动化 学士",
                    period: "2019 - 2023"
                },
                {
                    school: "米兰理工大学",
                    degree: "自动化与控制工程 硕士",
                    period: "2025 - 2027"
                }
            ],
            publications: [
                {
                    title: "A Self-Rotating Tri-Rotor UAV for Field-of-View Expansion and Autonomous Flight",
                    publisher: "ICRA (Accepted)",
                    period: "2026",
                },
                {
                    title: "Design and Validation of Flexible Aerial Robotics for Safe Human-Robot Interaction",
                    publisher: "IROS",
                    period: "2024",
                    link: "https://doi.org/10.1109/IROS58592.2024.10801991"
                }
            ]
        },
        headings: {
            experience: "工作经历",
            projects: "项目经历",
            skills: "技术栈",
            education: "教育背景",
            publication: "成果"
        },
        contactNames: {
            email: "邮箱",
            phone: "电话",
            location: "地点",
            website: "网站",
            github: "GitHub"
        },
        coreSkillLabel: "核心",
        downloadPdfLabel: "下载 PDF",
        downloadPdfHref: "./resume-zh-a4.pdf",
        downloadPdfName: "Zihao_Zheng_Resume_ZH.pdf",
        switcherAria: "切换语言"
    }
};
function isLocale(value) {
    return value === "en" || value === "zh";
}
function getInitialLocale() {
    const localeFromUrl = getLocaleFromUrl();
    if (localeFromUrl) {
        return localeFromUrl;
    }
    try {
        const stored = localStorage.getItem(localeStorageKey);
        if (stored && isLocale(stored)) {
            return stored;
        }
    }
    catch {
        // Ignore localStorage failures in restricted environments.
    }
    return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}
function persistLocale(locale) {
    try {
        localStorage.setItem(localeStorageKey, locale);
    }
    catch {
        // Ignore localStorage failures in restricted environments.
    }
}
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    if (options.className) {
        element.className = options.className;
    }
    if (options.text) {
        element.textContent = options.text;
    }
    if (tag === "a") {
        const anchor = element;
        if (options.href) {
            anchor.href = options.href;
        }
        if (options.target) {
            anchor.target = options.target;
        }
        if (options.rel) {
            anchor.rel = options.rel;
        }
    }
    return element;
}
function resolveSiteRelativeHref(relativePath) {
    const normalizedPath = relativePath.replace(/^\.?\//, "");
    const currentUrl = new URL(window.location.href);
    currentUrl.search = "";
    currentUrl.hash = "";
    const pathname = currentUrl.pathname;
    const pointsToFile = /\/[^/]+\.[^/]+$/.test(pathname);
    if (pointsToFile) {
        currentUrl.pathname = pathname.slice(0, pathname.lastIndexOf("/") + 1);
    }
    else if (!pathname.endsWith("/")) {
        currentUrl.pathname = `${pathname}/`;
    }
    return new URL(normalizedPath, currentUrl.href).href;
}
async function triggerFileDownload(fileUrl, downloadName) {
    const response = await fetch(fileUrl, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Download request failed with HTTP ${response.status}.`);
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = downloadName;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
    }, 0);
}
function getContactIconClass(kind) {
    switch (kind) {
        case "email":
            return "fa-solid fa-envelope";
        case "phone":
            return "fa-solid fa-phone";
        case "location":
            return "fa-solid fa-location-dot";
        case "website":
            return "fa-solid fa-globe";
        case "github":
            return "fa-brands fa-github";
        default:
            return "fa-solid fa-circle-info";
    }
}
function renderResume(bundle) {
    const { resume, headings, contactNames, coreSkillLabel, downloadPdfLabel, downloadPdfHref, downloadPdfName } = bundle;
    const shell = createElement("main", { className: "resume-shell" });
    const actions = createElement("div", { className: "resume-actions" });
    const resolvedDownloadHref = resolveSiteRelativeHref(downloadPdfHref);
    const downloadLink = createElement("a", {
        className: "download-link",
        href: resolvedDownloadHref
    });
    downloadLink.setAttribute("download", downloadPdfName);
    downloadLink.setAttribute("aria-label", downloadPdfLabel);
    downloadLink.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            await triggerFileDownload(resolvedDownloadHref, downloadPdfName);
        }
        catch (error) {
            console.error("PDF download failed, navigating to the PDF file instead.", error);
            window.location.assign(resolvedDownloadHref);
        }
    });
    const downloadIcon = createElement("i", { className: "fa-solid fa-file-arrow-down" });
    downloadIcon.setAttribute("aria-hidden", "true");
    downloadLink.append(downloadIcon, createElement("span", { text: downloadPdfLabel }));
    actions.append(downloadLink);
    const hero = createElement("section", { className: "hero" });
    const heroMain = createElement("div", { className: "hero-main" });
    const heroAside = createElement("div", { className: "hero-aside" });
    heroMain.append(createElement("h1", { className: "name", text: resume.name }), createElement("p", { className: "role", text: resume.role }), createElement("p", { className: "summary", text: resume.summary }));
    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = avatarPlaceholder;
    avatar.alt = "Avatar";
    avatar.width = 110;
    avatar.height = 154;
    const contactList = createElement("ul", { className: "contact" });
    for (const contact of resume.contacts) {
        const item = createElement("li");
        const content = contact.href
            ? createElement("a", {
                href: contact.href,
                target: contact.href.startsWith("http") ? "_blank" : undefined,
                rel: contact.href.startsWith("http") ? "noopener noreferrer" : undefined
            })
            : createElement("span");
        content.classList.add("contact-entry");
        content.setAttribute("aria-label", `${contactNames[contact.kind]}: ${contact.value}`);
        const icon = createElement("i", { className: `contact-icon ${getContactIconClass(contact.kind)}` });
        icon.setAttribute("aria-hidden", "true");
        const text = createElement("span", { text: contact.value });
        content.append(icon, text);
        item.append(content);
        contactList.append(item);
    }
    heroMain.append(contactList);
    heroAside.append(avatar);
    hero.append(heroMain, heroAside);
    const grid = createElement("section", { className: "grid" });
    const experienceSection = createElement("section", { className: "section" });
    experienceSection.append(createElement("h2", { text: headings.experience }));
    const timeline = createElement("div", { className: "timeline" });
    for (const exp of resume.experiences) {
        const item = createElement("article", { className: "item" });
        item.append(createElement("h3", { text: `${exp.title} · ${exp.company}` }), createElement("p", { className: "meta", text: exp.period }));
        const list = createElement("ul");
        for (const highlight of exp.highlights) {
            list.append(createElement("li", { text: highlight }));
        }
        item.append(list);
        timeline.append(item);
    }
    experienceSection.append(timeline);
    const projectsSection = createElement("section", { className: "section" });
    projectsSection.append(createElement("h2", { text: headings.projects }));
    const projects = createElement("div", { className: "projects" });
    for (const project of resume.projects) {
        const item = createElement("article", { className: "project" });
        const title = project.link
            ? createElement("a", {
                className: "link",
                text: project.name,
                href: project.link,
                target: "_blank",
                rel: "noopener noreferrer"
            })
            : createElement("strong", { text: project.name });
        const highlights = createElement("ul", { className: "project-highlights" });
        for (const highlight of project.highlights) {
            highlights.append(createElement("li", { text: highlight }));
        }
        item.append(title, highlights, createElement("p", { className: "meta", text: project.stack }));
        projects.append(item);
    }
    projectsSection.append(projects);
    const skillsSection = createElement("section", { className: "section" });
    skillsSection.append(createElement("h2", { text: headings.skills }));
    const stackGroups = createElement("div", { className: "stack-groups" });
    for (const group of resume.skills) {
        const groupBlock = createElement("article", { className: "stack-group" });
        const groupHead = createElement("div", { className: "stack-group-head" });
        groupHead.append(createElement("h3", { className: "stack-group-title", text: group.category }));
        if (group.core) {
            groupHead.append(createElement("span", { className: "stack-group-core", text: coreSkillLabel }));
        }
        groupBlock.append(groupHead);
        const tags = createElement("div", { className: "stack-tags" });
        for (const skill of group.items) {
            const tag = createElement("div", { className: "stack-tag" });
            tag.append(createElement("span", { className: "stack-tag-name", text: skill.name }));
            tag.append(createElement("span", { className: "stack-tag-level", text: skill.level }));
            tags.append(tag);
        }
        groupBlock.append(tags);
        stackGroups.append(groupBlock);
    }
    skillsSection.append(stackGroups);
    const eduSection = createElement("section", { className: "section" });
    eduSection.append(createElement("h2", { text: headings.education }));
    for (const edu of resume.education) {
        const line = createElement("article", { className: "item" });
        line.append(createElement("h3", { text: edu.degree }), createElement("p", { className: "meta", text: `${edu.school} · ${edu.period}` }));
        eduSection.append(line);
    }
    const publicationSection = createElement("section", { className: "section" });
    publicationSection.append(createElement("h2", { text: headings.publication }));
    const publicationList = createElement("div", { className: "timeline" });
    for (const publication of resume.publications) {
        const line = createElement("article", { className: "item" });
        const title = publication.link
            ? createElement("a", {
                className: "link",
                text: publication.title,
                href: publication.link,
                target: "_blank",
                rel: "noopener noreferrer"
            })
            : createElement("strong", { text: publication.title });
        line.append(title, createElement("p", { className: "meta", text: `${publication.publisher} · ${publication.period}` }));
        publicationList.append(line);
    }
    publicationSection.append(publicationList);
    grid.append(hero, skillsSection, experienceSection, projectsSection, eduSection, publicationSection);
    shell.append(actions, grid);
    return shell;
}
function createLanguageSwitcher(getLocale, onLocaleChange) {
    const switcher = createElement("div", { className: "lang-switcher" });
    const menu = createElement("ul", { className: "lang-menu" });
    const button = createElement("button", { className: "lang-fab" });
    button.type = "button";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    const icon = createElement("i", { className: "fa-solid fa-language" });
    icon.setAttribute("aria-hidden", "true");
    button.append(icon);
    const options = [
        { locale: "en", text: "English" },
        { locale: "zh", text: "中文" }
    ];
    function closeMenu() {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    }
    function rebuildMenu() {
        menu.textContent = "";
        const activeLocale = getLocale();
        for (const option of options) {
            const li = createElement("li");
            const optionButton = createElement("button", { className: "lang-option", text: option.text });
            optionButton.type = "button";
            optionButton.setAttribute("role", "menuitem");
            if (option.locale === activeLocale) {
                optionButton.classList.add("active");
            }
            optionButton.addEventListener("click", () => {
                onLocaleChange(option.locale);
                rebuildMenu();
                closeMenu();
            });
            li.append(optionButton);
            menu.append(li);
        }
    }
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        const open = !menu.classList.contains("open");
        if (open) {
            menu.classList.add("open");
        }
        else {
            closeMenu();
        }
        button.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!switcher.contains(target)) {
            closeMenu();
        }
    });
    switcher.append(menu, button);
    rebuildMenu();
    return switcher;
}
const app = document.querySelector("#app");
if (app) {
    let currentLocale = getInitialLocale();
    const printMode = isPrintMode();
    document.body.classList.toggle("print-mode", printMode);
    const renderApp = () => {
        const activeBundle = bundles[currentLocale];
        app.replaceChildren(renderResume(activeBundle));
        document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
        const switchButton = document.querySelector(".lang-fab");
        if (switchButton) {
            switchButton.setAttribute("aria-label", activeBundle.switcherAria);
        }
    };
    const existingSwitcher = document.querySelector(".lang-switcher");
    if (existingSwitcher) {
        existingSwitcher.remove();
    }
    if (!printMode) {
        const switcher = createLanguageSwitcher(() => currentLocale, (nextLocale) => {
            if (nextLocale === currentLocale) {
                return;
            }
            currentLocale = nextLocale;
            persistLocale(nextLocale);
            renderApp();
        });
        document.body.append(switcher);
    }
    renderApp();
}
