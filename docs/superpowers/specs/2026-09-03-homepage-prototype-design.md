# Homepage Prototype V0.1 Design

## Purpose

Build and publish the first working version of Maurycy Pytel's portfolio at `https://isentor.github.io`. The prototype must make the visual direction, section proportions, typography, spacing, information hierarchy, project presentation, responsive behavior, and subtle motion easy to evaluate.

## Scope

V0.1 is a single statically generated Astro homepage. It includes a sticky header, hero, three large alternating project presentations, expertise, experience timeline, about, contact, and footer. It does not include case study routes, CMS, blog, form, analytics, CV download, theme toggle, localization, real project screenshots, external photography, backend, search, filtering, advanced SEO, or a custom domain.

## Technology and deployment

- Astro with static generation
- TypeScript for structured portfolio data
- Plain CSS and minimal browser JavaScript
- npm with a committed lockfile
- GitHub Pages deployment from `main` through GitHub Actions
- `site: 'https://isentor.github.io'` with no `base`
- `actions/checkout@v7`, `withastro/action@v6`, and `actions/deploy-pages@v5`
- Workflow permissions: `contents: read`, `pages: write`, `id-token: write`
- Workflow environment: `github-pages`

## Architecture

`src/pages/index.astro` composes focused section components inside `BaseLayout.astro`. Repeated project, expertise, and experience content lives in `src/data/portfolio.ts`. `src/styles/global.css` owns tokens, layout, responsive behavior, visual mockups, interaction states, and reduced motion handling. A small inline module in the header controls only the accessible mobile navigation state.

Files have one primary responsibility:

- `Header.astro`: sticky desktop and mobile navigation, skip-link destination support, external profile links
- `Hero.astro`: approved hero copy, calls to action, and hero composition
- `HeroShowcase.astro`: three layered CSS interface panels for Web, Automation, and Data
- `ProjectShowcase.astro`: one reusable large alternating project presentation
- `Expertise.astro`: four concise capability groups
- `ExperienceTimeline.astro`: four-point experience timeline
- `About.astro`: approved background copy
- `Contact.astro`: approved contact statement and links
- `Footer.astro`: minimal identity and external links
- `portfolio.ts`: public project data, expertise data, timeline data, and shared external URLs
- `BaseLayout.astro`: document shell, language, SEO metadata, canonical URL, and global stylesheet
- `index.astro`: semantic section order and project iteration

## Visual system

The visual direction is hybrid premium dark and light. Dark graphite sections alternate with warm off-white sections. Warm amber is limited to labels, rules, borders, selected calls to action, focus, and hover details. The layout uses a maximum content width near 1200px, generous vertical rhythm, large project visuals, and few card-like surfaces.

Typography uses a system sans-serif for interface and body copy, Georgia as a restrained editorial accent, and a system monospace stack only for micro-labels. No external font dependency is required.

The hero uses two columns on wide screens and one column on narrow screens. Its visual is a layered CSS collage of three polished interface placeholders. Project entries are large and alternate text and visual placement on desktop. Mobile collapses all sections to a single readable flow without horizontal overflow.

## Content rules

All visible copy, dates, project names, descriptions, technology labels, URLs, and contact details follow the approved prompt. The private automation project is identified only as `Content Publishing Automation` everywhere in source, generated HTML, metadata, comments, variables, and history. Case study status is rendered as non-interactive text, never as a dead link.

Only ASCII hyphen `-` is allowed in project text files. U+2013 and U+2014 must both have zero occurrences before each commit.

## Interaction and accessibility

- Semantic landmarks and a single logical H1
- Skip link to `main`
- Section IDs: `projects`, `expertise`, `experience`, `about`, `contact`
- Visible `:focus-visible` states
- Keyboard-operable mobile navigation with a real button, `aria-expanded`, and `aria-controls`
- Adequate touch targets and color contrast
- Smooth anchor scrolling with `scroll-margin-top`
- No empty links or controls that imitate links
- CSS transitions and restrained entrance motion
- `prefers-reduced-motion: reduce` disables non-essential movement and smooth scrolling

## Responsive behavior

The implementation must be checked at approximately 1440px, 1024px, 768px, and 390px. At every width, headings remain visible, mockups stay inside the viewport, navigation remains usable, touch targets remain comfortable, and the page has no horizontal overflow.

## SEO V0.1

- Title: `Maurycy Pytel | Data, Software & Web Development`
- Description: `Portfolio of Maurycy Pytel - web development, Python automation, data, e-commerce and digital projects.`
- Canonical: `https://isentor.github.io/`
- Basic Open Graph title, description, URL, and website type
- No generated social image

## Repository documentation

`README.md` explains the portfolio purpose, Astro stack, npm install and local development, checks, production build, GitHub Pages deployment, and status `Homepage prototype V0.1`. It does not duplicate page copy.

## Verification and release

Before commits and push:

- Run `npm ci`
- Run `npm run check`
- Run `npm run build`
- Inspect `dist/index.html` for all required sections, IDs, links, email, metadata, and absence of case study routes
- Verify no broken internal links or empty links
- Verify U+2013 = 0 and U+2014 = 0 in project text files
- Check `git status --short`, `git diff --check`, and the full diff
- Inspect responsive layouts at wide desktop, laptop, tablet, and approximately 390px mobile
- Inspect keyboard focus and reduced motion behavior

After local gates pass, commit logical units, push `main` to `origin/main`, verify the remote SHA, inspect the GitHub Actions deployment, and verify the public URL. GitHub Pages Source must be `GitHub Actions`; if it cannot be configured programmatically, report the single required UI action without claiming deployment success.
