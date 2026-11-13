# Maurycy Pytel - Portfolio

Personal portfolio for Maurycy Pytel, focused on web development, software automation, data, e-commerce and practical digital projects.

Live site: [isentor.github.io](https://isentor.github.io)

## Status

Homepage and three project case studies, with project progress reviewed in November 2026. Case studies identify deployed features, local work and controlled experiments.

Routes:

- `/`
- `/projects/content-publishing-automation/`
- `/projects/grytycy/`
- `/projects/tawerna-gothic/`

## Stack

- Astro
- TypeScript
- Plain CSS
- GitHub Actions
- GitHub Pages

## Local development

Requirements:

- Node.js 24 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run check
npm run build
npm run verify
```

The verification script checks all four generated routes, working case-study links, metadata, heading and skip-link structure, privacy guards and reduced motion support. It also preserves the previously approved Tawerna Gothic platform narrative independently of the added progress sections.

### Browser regression

After building, run `node scripts/verify-site-browser.mjs` with Playwright available. The runner serves `dist` on loopback, follows internal links, checks the shared visual system and saves desktop and mobile screenshots. Set `PORTFOLIO_PLAYWRIGHT` to the absolute Playwright module path when it is installed outside this repo, `PORTFOLIO_BROWSER` for a system Chromium or Edge executable, and `PORTFOLIO_AXE` for an optional local axe-core script. Set `PORTFOLIO_QA_OUTPUT` to a directory outside the repo for the screenshot and JSON output. With no output path the runner uses a temporary directory.

## Production build

```bash
npm run build
```

The generated static site is written to `dist/`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`. The workflow builds the Astro project and deploys the static output to GitHub Pages.
