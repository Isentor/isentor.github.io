# Maurycy Pytel - Portfolio

Personal portfolio for Maurycy Pytel, focused on web development, software automation, data, e-commerce and practical digital projects.

Live site: [isentor.github.io](https://isentor.github.io)

## Status

Homepage and three project case studies, with deployed features, local implementation and experiments distinguished explicitly. Project progress descriptions reflect the state of the source repositories as of 12 October 2026; the last review of the live sites was in early October 2026.

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

## Production build

```bash
npm run build
```

The generated static site is written to `dist/`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`. The workflow builds the Astro project and deploys the static output to GitHub Pages.
