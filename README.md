# TypeScript Static Resume Template

This project is a static resume webpage template rendered from TypeScript data.

## Files

- `index.html`: entry page
- `styles.css`: layout and theme styles
- `src/main.ts`: TypeScript source (resume data + DOM rendering)
- `dist/main.js`: prebuilt output, ready for direct static hosting

## Use immediately

Open `index.html` directly in your browser.

## Rebuild from TypeScript

```bash
npm install
npm run build
```

Then refresh `index.html`.

## Customize your resume

Edit `resume` object in `src/main.ts`:

- `name`, `role`, `summary`
- `contacts`
- `skills`
- `experiences`
- `projects`
- `education`
