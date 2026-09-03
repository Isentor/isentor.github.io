# Homepage Prototype V0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and publish a responsive Astro homepage prototype for Maurycy Pytel at `https://isentor.github.io`.

**Architecture:** A statically generated Astro page composes focused section components through one base layout. Typed data modules hold repeated portfolio content, one global stylesheet owns the visual system and responsive behavior, and a small header script manages only mobile navigation.

**Tech Stack:** Astro 7, TypeScript, plain CSS, npm, Node.js built-in assertions, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-03-homepage-prototype-design.md`

## Global Constraints

- Generate a single static homepage with no case study routes.
- Use Astro, TypeScript where natural, plain CSS, and minimal JavaScript.
- Do not add React, Vue, Svelte, Tailwind, UI libraries, CSS frameworks, a CMS, a backend, analytics, or an animation library.
- Identify the private automation project only as `Content Publishing Automation` in every public and repository-visible context.
- Use only ASCII hyphen `-`; U+2013 and U+2014 counts must both be zero in project text files.
- Use `site: 'https://isentor.github.io'` and do not set `base`.
- Deploy from `main` with `actions/checkout@v7`, `withastro/action@v6`, and `actions/deploy-pages@v5`.
- Preserve semantic HTML, keyboard navigation, visible focus, reduced motion, usable touch targets, and no dead links.
- Keep the implementation within Homepage prototype V0.1.

## File Map

- Create `package.json`: npm scripts and exact project dependencies
- Create `package-lock.json`: reproducible npm dependency graph
- Create `astro.config.mjs`: canonical deployment site
- Create `tsconfig.json`: strict Astro TypeScript configuration
- Create `.gitignore`: generated and local artifacts
- Create `scripts/verify-build.mjs`: deterministic generated HTML checks
- Create `src/data/portfolio.ts`: public project, expertise, experience, and external-link data
- Create `src/layouts/BaseLayout.astro`: HTML shell and metadata
- Create `src/components/Header.astro`: sticky accessible navigation
- Create `src/components/Hero.astro`: hero copy and calls to action
- Create `src/components/HeroShowcase.astro`: layered CSS hero panels
- Create `src/components/ProjectShowcase.astro`: reusable alternating project row
- Create `src/components/Expertise.astro`: capability groups
- Create `src/components/ExperienceTimeline.astro`: four timeline points
- Create `src/components/About.astro`: approved background content
- Create `src/components/Contact.astro`: contact callout and links
- Create `src/components/Footer.astro`: minimal footer
- Create `src/pages/index.astro`: homepage composition and semantic order
- Create `src/styles/global.css`: complete visual system, responsive rules, and motion behavior
- Create `.github/workflows/deploy.yml`: official Astro Pages build and deployment
- Modify `README.md`: concise project and operating documentation
- Keep `docs/superpowers/specs/2026-09-03-homepage-prototype-design.md`: approved design record
- Keep `docs/superpowers/plans/2026-09-03-homepage-prototype.md`: implementation record

---

### Task 1: Scaffold a checkable Astro project

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro`
- Create: `src/styles/global.css`
- Keep: `docs/superpowers/specs/2026-09-03-homepage-prototype-design.md`
- Keep: `docs/superpowers/plans/2026-09-03-homepage-prototype.md`

**Interfaces:**
- Produces: npm scripts `dev`, `check`, `build`, `preview`, and `verify`
- Produces: `BaseLayout` props `{ title: string; description: string; canonical: string }`
- Produces: a valid static Astro document that later tasks can compose

- [ ] **Step 1: Add the package manifest**

Use exact scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro build",
    "preview": "astro preview",
    "verify": "node scripts/verify-build.mjs"
  }
}
```

Add current verified dependencies for Astro, `@astrojs/check`, and TypeScript. Do not add a UI framework or test framework.

- [ ] **Step 2: Add project configuration**

Create `astro.config.mjs` with only:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://isentor.github.io',
});
```

Extend `astro/tsconfigs/strict` in `tsconfig.json`. Ignore `node_modules/`, `dist/`, `.astro/`, and local environment files without ignoring the npm lockfile.

- [ ] **Step 3: Add the minimal layout and page shell**

Create `BaseLayout.astro` with `lang="en"`, title, description, canonical, basic Open Graph text metadata, viewport metadata, and the global stylesheet. Create a minimal `index.astro` with one H1 and no placeholder route.

- [ ] **Step 4: Install and prove the scaffold**

Run:

```bash
npm install
npm run check
npm run build
```

Expected: lockfile created, Astro check reports zero errors, and `dist/index.html` exists.

- [ ] **Step 5: Verify scope and commit**

Run `git diff --check`, inspect the full diff, and scan project text files for U+2013 and U+2014. Stage only Task 1 files and commit:

```bash
git commit -m "chore: scaffold astro portfolio"
```

### Task 2: Define the public content contract and failing build verification

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `externalLinks`, `projects`, `expertiseAreas`, and `experienceItems`
- Produces: project shape `{ name, category, description, details?, technologies, visualType }`
- Produces: verification command `npm run verify` that reads `dist/index.html`

- [ ] **Step 1: Add the generated HTML verifier before the page content**

Use Node.js built-in `readFile` and `assert` to check:

```js
const requiredIds = ['projects', 'expertise', 'experience', 'about', 'contact'];
const requiredText = ['Maurycy Pytel', 'Selected Projects', 'What I Do', 'Experience', "Let's build something useful."];
const requiredLinks = ['https://github.com/Isentor', 'https://www.linkedin.com/in/maurycy-pytel-032b2a107/', 'mailto:maurycy.pytel@gmail.com'];
```

Also assert one H1, the exact title, description, canonical URL, no empty `href`, no `/projects/` links, and no U+2013 or U+2014.

- [ ] **Step 2: Run the verifier and confirm the expected RED**

Run:

```bash
npm run verify
```

Expected: FAIL because the minimal scaffold does not yet contain all required sections and content.

- [ ] **Step 3: Add typed public data**

Create the three approved projects, four expertise groups, four experience items, and shared GitHub and LinkedIn URLs. Use only the approved public name `Content Publishing Automation`. Do not include private aliases, fake metrics, or fake business data.

- [ ] **Step 4: Check the data module**

Run `npm run check` and scan `src/data/portfolio.ts` for U+2013, U+2014, forbidden job titles, and any project name other than the three approved public names.

### Task 3: Build the complete homepage and make verification GREEN

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/HeroShowcase.astro`
- Create: `src/components/ProjectShowcase.astro`
- Create: `src/components/Expertise.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/About.astro`
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `projects`, `expertiseAreas`, `experienceItems`, and `externalLinks` from `src/data/portfolio.ts`
- `ProjectShowcase` consumes `{ project, index }` and derives alternating presentation from `index`
- Produces: one semantic homepage with the five required anchor IDs and no additional routes

- [ ] **Step 1: Build semantic section components**

Implement each component with its approved copy and one clear responsibility. Use a real mobile menu button with `aria-expanded` and `aria-controls`. Render `Case study coming soon` as plain non-focusable text. Keep one H1 in the hero.

- [ ] **Step 2: Compose the homepage**

Order the page as header, hero, projects, expertise, experience, about, contact, and footer. Set `main` as the skip-link target. Iterate project data through `ProjectShowcase` and retain alternating layout semantics without creating project routes.

- [ ] **Step 3: Implement the premium dark and light visual system**

Define the approved graphite, warm off-white, muted, and amber tokens. Build the hero collage and project mockups entirely in CSS with no fake charts or external images. Add responsive breakpoints for wide desktop, laptop, tablet, and 390px mobile; prevent horizontal overflow and set section `scroll-margin-top`.

- [ ] **Step 4: Add restrained motion and accessibility states**

Use CSS entrance transitions and a minimal `IntersectionObserver` only for progressive reveal. Ensure content remains visible without JavaScript. Add visible focus styles and a `prefers-reduced-motion: reduce` block that disables animation, transitions, transforms, and smooth scrolling.

- [ ] **Step 5: Run the GREEN checks**

Run:

```bash
npm run check
npm run build
npm run verify
```

Expected: all commands exit 0; `dist/index.html` contains every required section, URL, email, and metadata entry.

- [ ] **Step 6: Inspect responsive output**

Serve the built site locally and inspect at 1440px, 1024px, 768px, and 390px. Check for horizontal overflow, clipped headings, overlapping sticky navigation, off-screen mockups, touch targets, focus visibility, mobile navigation, and reduced motion.

- [ ] **Step 7: Verify scope and commit**

Run `git status --short`, `git diff --check`, inspect the full diff, and scan all project text files for U+2013 and U+2014. Stage only Task 2 and Task 3 files and commit:

```bash
git commit -m "feat: build portfolio homepage prototype"
```

### Task 4: Document and deploy the prototype

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: npm lockfile and the default `npm run build`
- Produces: GitHub Pages artifact and deployment environment URL

- [ ] **Step 1: Add the official GitHub Pages workflow**

Configure `push` on `main` and `workflow_dispatch`, exact permissions `contents: read`, `pages: write`, and `id-token: write`, a build job using `actions/checkout@v7` and `withastro/action@v6`, and a deploy job using `actions/deploy-pages@v5` with environment `github-pages`.

- [ ] **Step 2: Replace the starter README**

Document the project purpose, Maurycy Pytel portfolio identity, Astro stack, `npm install`, `npm run dev`, `npm run check`, `npm run build`, GitHub Pages deployment, and status `Homepage prototype V0.1`. Do not duplicate homepage content.

- [ ] **Step 3: Run the complete release gate**

Run:

```bash
npm ci
npm run check
npm run build
npm run verify
git diff --check
git status --short
git diff
```

Inspect `dist/index.html`, confirm only `index.html` is an HTML route, validate all internal anchors and external contact links, and confirm U+2013 = 0 and U+2014 = 0.

- [ ] **Step 4: Commit deployment files**

Stage only `.github/workflows/deploy.yml` and `README.md`, then commit:

```bash
git commit -m "ci: deploy portfolio to github pages"
```

- [ ] **Step 5: Push and verify GitHub state**

Confirm the branch is `main`, fetch `origin/main`, require the pre-change remote SHA to be an ancestor of local HEAD, then push:

```bash
git push origin main
```

Verify `git ls-remote origin refs/heads/main` equals local HEAD and `git status --short` is empty.

- [ ] **Step 6: Verify Pages and public output**

Inspect the Actions workflow run until it reaches success or a concrete failure. Verify GitHub Pages Source is GitHub Actions when authorized. Open `https://isentor.github.io`, require HTTP 200, and compare its expected title, sections, links, and current commit deployment. If Pages Source is the only blocker, report exactly the single required repository setting change and do not claim deployment success.
