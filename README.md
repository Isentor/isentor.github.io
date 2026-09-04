# Maurycy Pytel - Portfolio

Personal portfolio for Maurycy Pytel, focused on web development, software automation, data, e-commerce and practical digital projects.

Live site: [isentor.github.io](https://isentor.github.io)

## Status

Homepage and first full project case study.

Routes:

- `/`
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

The verification script checks the generated homepage and Tawerna Gothic case study structure, required content and links, metadata, route scope, and reduced motion support.

## Production build

```bash
npm run build
```

The generated static site is written to `dist/`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`. The workflow builds the Astro project and deploys the static output to GitHub Pages.
