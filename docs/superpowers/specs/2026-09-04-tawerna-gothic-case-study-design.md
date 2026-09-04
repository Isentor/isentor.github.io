# Tawerna Gothic Case Study Design

## Objective

Publish the first full portfolio case study at `/projects/tawerna-gothic/` as a natural extension of the approved homepage design. The page must present the approved Tawerna Gothic facts, provide real public product screenshots, and establish a focused reference quality bar without creating a generic case study framework.

## Experience

- Keep the current hybrid premium visual language: warm light sections, near-black dark sections, amber accent, editorial typography, restrained monospace details, generous spacing, and subtle motion.
- Preserve the existing homepage visual system. Change only the Tawerna Gothic project CTA and the minimum shared navigation behavior required by a second route.
- Use semantic, responsive HTML and locally scoped CSS. Keep Astro output static and JavaScript minimal.
- Present the 16 approved sections in the exact order and with the approved English copy.
- Use real current Tawerna Gothic screenshots. Store optimized WebP files locally and do not hotlink them.

## Structure

The case study contains, in order: Project Hero, Overview and My Role, Evolution, Migration, Information Architecture, Custom WordPress Platform, Platform Architecture, Key Challenges, Performance by Design, SEO and Migration Validation, AI-Assisted Development Workflow, Validation, Selected Views, A Reusable Foundation, What I Learned, and Final CTA.

The page uses the current `BaseLayout`, shared `Header`, and shared `Footer`. The page has one H1, section H2 headings, meaningful H3 subheadings, and `<main id="main-content">`.

## Components and data

- `src/pages/projects/tawerna-gothic/index.astro` orchestrates the route.
- Dedicated case study components own the hero, timeline, metrics, information architecture diagram, platform architecture diagram, workflow diagram, and gallery.
- `src/data/tawernaGothicCaseStudy.ts` owns long structured content.
- `src/styles/case-study.css` scopes the new presentation to the case study.
- The homepage project model gains optional case study fields. Only Tawerna Gothic receives them.

## Navigation

On the homepage, current local anchor links remain local. On the case study route, brand links to `/` and section links target `/#projects`, `/#expertise`, `/#experience`, `/#about`, and `/#contact`. The skip link always targets the local `#main-content`.

## Assets

Reuse `/projects/tawerna-gothic/homepage-desktop.webp` for the hero and first gallery view. Add optimized public captures for the desktop Gothic Remake hub, mobile Gothic Remake hub, and desktop search results in `public/projects/tawerna-gothic/case-study/`. Images use meaningful alt text, explicit dimensions, asynchronous decoding, and lazy loading below the fold.

## Safety and boundaries

- Publish only the facts and copy approved in the task brief.
- Do not expose internal tool names, secrets, identifiers, endpoints, local paths, audit filenames, private build details, or security implementation details.
- Generated HTML must not contain any listed forbidden string or a typical local Windows path.
- U+2013 and U+2014 are forbidden in source and generated HTML.
- Do not add a projects index, another case study, CV, analytics change, CMS, UI library, runtime framework, or unrelated cleanup.

## Verification

The build must generate exactly `index.html` and `projects/tawerna-gothic/index.html`. Automated verification covers homepage CTAs and unchanged placeholders, required case study content and metadata, routes, image assets, external link safety, privacy guards, and ASCII hyphen guards. Final validation includes dependency install, Astro diagnostics, production build, verifier, diff checks, source and generated scans, responsive visual QA at 1440, 1024, 768, and 390 px, accessibility and keyboard checks, console and asset checks, Git review, publication, Actions, Pages, and public URL verification.
