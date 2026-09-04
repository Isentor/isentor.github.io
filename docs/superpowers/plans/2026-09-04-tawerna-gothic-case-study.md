# Tawerna Gothic Case Study Implementation Plan

> Execute on the explicitly approved `main` branch. Preserve one final commit: `feat: add Tawerna Gothic case study`.

**Goal:** Build, verify, publish, and publicly validate the Tawerna Gothic case study without changing unrelated portfolio behavior.

**Architecture:** Add one static Astro route orchestrating focused case study components and structured data. Extend the existing project card model and shared header minimally. Keep new styling locally scoped and use local optimized WebP screenshots.

**Tech Stack:** Astro, TypeScript, HTML, CSS, Node verification script, Playwright-based visual checks.

---

### Task 1: Establish the failing acceptance gate

**Files:**
- Modify: `scripts/verify-build.mjs`

1. Add assertions for exactly two routes, homepage CTA behavior, case study content and metadata, public link safety, screenshots, forbidden strings, and U+2013/U+2014 guards.
2. Run `npm run verify` against the existing build.
3. Confirm RED because the case study route does not yet exist.

### Task 2: Add optimized public screenshot assets

**Files:**
- Create: `public/projects/tawerna-gothic/case-study/gothic-remake-hub-desktop.webp`
- Create: `public/projects/tawerna-gothic/case-study/gothic-remake-hub-mobile.webp`
- Create: `public/projects/tawerna-gothic/case-study/search-desktop.webp`

1. Convert the already reviewed public captures to WebP with no crop or private UI.
2. Preserve their native dimensions and keep each file near or below 300 KB without obvious visual degradation.
3. Verify dimensions, file sizes, and source URLs.

### Task 3: Implement the case study route

**Files:**
- Create: `src/pages/projects/tawerna-gothic/index.astro`
- Create: `src/data/tawernaGothicCaseStudy.ts`
- Create: `src/styles/case-study.css`
- Create: `src/components/case-study/CaseStudyHero.astro`
- Create: `src/components/case-study/CaseStudyTimeline.astro`
- Create: `src/components/case-study/CaseStudyMetrics.astro`
- Create: `src/components/case-study/InformationArchitecture.astro`
- Create: `src/components/case-study/PlatformArchitecture.astro`
- Create: `src/components/case-study/DevelopmentWorkflow.astro`
- Create: `src/components/case-study/CaseStudyGallery.astro`

1. Add the approved structured content and all 16 sections in order.
2. Build semantic HTML/CSS diagrams with screen-reader-readable structures.
3. Add responsive, scoped styling matching the current portfolio language.
4. Use the exact SEO title, description, canonical URL, approved CTAs, and image behavior.

### Task 4: Integrate homepage and shared navigation

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/components/ProjectShowcase.astro`
- Modify: `src/components/Header.astro`

1. Add optional case study URL and label fields to the project model.
2. Give only Tawerna Gothic the `View case study` link while preserving its live link.
3. Leave Grytycy.pl and Content Publishing Automation copy and placeholder state unchanged.
4. Make shared header destinations pathname-aware without changing its appearance or local skip link.

### Task 5: Update concise repository documentation

**Files:**
- Modify: `README.md`

1. State that the portfolio contains the homepage and first full project case study.
2. List the Tawerna Gothic route without copying marketing content.

### Task 6: Reach local GREEN and inspect output

**Files:**
- Verify all changed and generated files.

1. Run `npm run check`, `npm run build`, and `npm run verify`.
2. Inspect both generated HTML files for metadata, headings, links, image paths, external link attributes, privacy boundaries, and ASCII hyphen compliance.
3. Run `git diff --check`, full source/generated Unicode scans, privacy scans, and route enumeration.
4. Review the full diff and verify scope.

### Task 7: Perform visual and accessibility QA

**Files:**
- Modify only in-scope files if review finds a defect.

1. Serve the production build locally.
2. Test homepage and case study at 1440, 1024, 768, and 390 px.
3. Capture the required desktop/mobile evidence and check overflow, clipping, diagrams, metrics, gallery, header, mobile menu, skip link, focus, keyboard behavior, reduced motion, touch targets, console, and asset responses.
4. Fix all Critical and Important findings, then rerun affected checks.

### Task 8: Independent review and final verification

**Files:**
- Review the complete working-tree diff.

1. Request an independent code and specification compliance review.
2. Resolve every Critical or Important in-scope finding.
3. Run fresh `npm ci`, `npm run check`, `npm run build`, `npm run verify`, `git diff --check`, scans, and `git status --short`.

### Task 9: Commit, publish, and verify production

**Files:**
- Commit the reviewed in-scope changes only.

1. Create the single commit `feat: add Tawerna Gothic case study`.
2. Push `main` to `origin/main` and confirm the remote SHA.
3. Monitor the Astro GitHub Pages workflow to `completed / success`, including build and deploy jobs.
4. Open the public homepage and case study, verify HTTP 200, assets, console, navigation, CTAs, and final responsive presentation.
5. Confirm a clean working tree and stop without starting another stage.
