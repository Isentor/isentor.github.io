import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';

const distDirectory = new URL('../dist/', import.meta.url);
const projectDirectory = new URL('../', import.meta.url);
const expectedRoutes = ['index.html', 'projects/tawerna-gothic/index.html'];
const htmlFiles = (await readdir(distDirectory, { recursive: true }))
  .filter((file) => file.endsWith('.html'))
  .map((file) => file.replaceAll('\\', '/'))
  .sort();

assert.deepEqual(htmlFiles, expectedRoutes, 'build must generate exactly the homepage and Tawerna Gothic case study routes');

const homepage = await readFile(new URL('index.html', distDirectory), 'utf8');
const caseStudy = await readFile(new URL('projects/tawerna-gothic/index.html', distDirectory), 'utf8');
const generatedHtml = `${homepage}\n${caseStudy}`;

const ignoredSourceDirectories = new Set(['.git', '.superpowers', 'dist', 'node_modules']);
const sourceExtension = /\.(?:astro|css|js|json|md|mjs|ts|tsx|ya?ml)$/;
const readAuthoredSource = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = [];
  for (const entry of entries) {
    if (entry.isDirectory() && !ignoredSourceDirectories.has(entry.name)) {
      contents.push(...(await readAuthoredSource(new URL(`${entry.name}/`, directory))));
    } else if (entry.isFile() && sourceExtension.test(entry.name)) {
      contents.push(await readFile(new URL(entry.name, directory), 'utf8'));
    }
  }
  return contents;
};
const authoredSource = (await readAuthoredSource(projectDirectory)).join('\n');
assert.doesNotMatch(authoredSource, /[\u2013\u2014]/, 'authored source must use only ASCII hyphens');

const homepageTitle = 'Maurycy Pytel | Data, Software & Web Development';
const homepageDescription = 'Portfolio of Maurycy Pytel - web development, Python automation, data, e-commerce and digital projects.';
const homepageIds = ['main-content', 'projects', 'expertise', 'experience', 'about', 'contact'];
const homepageText = [
  'Maurycy Pytel',
  'Selected Projects',
  'Tawerna Gothic',
  'Grytycy.pl',
  'Content Publishing Automation',
  'What I Do',
  'Experience',
  'About',
  "Let's build something useful.",
  'A long-running Polish gaming platform focused on the Gothic series, combining an extensive content archive with current news, guides and editorial coverage.',
  'I develop and maintain the WordPress-based platform, working across its technical implementation, content architecture, publishing workflows and integration with the broader Tawerna Gothic ecosystem.',
  'A gaming website undergoing a broader technical and information architecture rebuild, with a focus on scalable content structure and long-term maintainability.',
  'A Python-based system designed to automate the preparation, selection and scheduling of content for social media platforms.',
];
const contactLinks = [
  'https://github.com/Isentor',
  'https://www.linkedin.com/in/maurycy-pytel-032b2a107/',
  'mailto:maurycy.pytel@gmail.com',
];

assert.match(homepage, new RegExp(`<title>${homepageTitle.replace('&', '&amp;')}</title>`), 'homepage title must match');
assert.ok(homepage.includes(`content="${homepageDescription}"`), 'homepage description must match');
assert.ok(homepage.includes('rel="canonical" href="https://isentor.github.io/"'), 'homepage canonical must match');

for (const id of homepageIds) {
  assert.match(homepage, new RegExp(`id="${id}"`), `homepage must include #${id}`);
}

for (const text of homepageText) {
  assert.ok(homepage.includes(text), `homepage must include: ${text}`);
}

for (const link of contactLinks) {
  assert.ok(homepage.includes(`href="${link}"`), `homepage must link to: ${link}`);
}

assert.equal((homepage.match(/<h1(?:\s|>)/g) ?? []).length, 1, 'homepage must contain exactly one h1');
assert.equal((homepage.match(/Case study coming soon/g) ?? []).length, 2, 'only two homepage projects must remain coming soon');
assert.equal((homepage.match(/href="\/projects\/tawerna-gothic\/"/g) ?? []).length, 1, 'homepage must link once to the Tawerna Gothic case study');
assert.match(homepage, /<a\b[^>]*href="\/projects\/tawerna-gothic\/"[^>]*>\s*View case study\s*<\/a>/, 'Tawerna Gothic must expose the View case study CTA');
assert.doesNotMatch(homepage, /href="\/projects\/(?:grytycy|content-publishing-automation)\/?"/, 'placeholder projects must not link to case studies');
assert.match(homepage, /class="hero-showcase" aria-hidden="true"/, 'decorative homepage hero must be hidden from assistive technology');

const tawernaHomepageLink = (homepage.match(/<a\b[^>]*href="https:\/\/tawerna-gothic\.pl"[^>]*>[\s\S]*?<\/a>/) ?? [])[0] ?? '';
assert.ok(tawernaHomepageLink.includes('Visit live site'), 'Tawerna Gothic homepage card must retain its live CTA');
assert.ok(tawernaHomepageLink.includes('target="_blank"'), 'Tawerna Gothic homepage live CTA must open in a new tab');
assert.ok(tawernaHomepageLink.includes('rel="noopener noreferrer"'), 'Tawerna Gothic homepage live CTA must protect opener context');

const homepageImages = homepage.match(/<img\b[^>]*>/g) ?? [];
const homepageProjectImage = homepageImages.find((tag) => tag.includes('/projects/tawerna-gothic/homepage-desktop.webp')) ?? '';
assert.ok(homepageProjectImage.includes('alt="Screenshot of the Tawerna Gothic homepage"'), 'homepage project screenshot must have meaningful alt text');
assert.ok(homepageProjectImage.includes('loading="lazy"'), 'homepage project screenshot must be lazy loaded');
assert.ok(homepageProjectImage.includes('decoding="async"'), 'homepage project screenshot must decode asynchronously');
assert.match(homepageProjectImage, /\bwidth="1440"/, 'homepage project screenshot must declare width');
assert.match(homepageProjectImage, /\bheight="900"/, 'homepage project screenshot must declare height');

const homepageHeroImage = homepageImages.find((tag) => tag.includes('/projects/tawerna-gothic/hero-crop.webp')) ?? '';
assert.ok(homepageHeroImage.includes('alt=""'), 'decorative homepage hero screenshot must have empty alt text');
assert.ok(homepageHeroImage.includes('fetchpriority="high"'), 'homepage hero screenshot must receive high fetch priority');
assert.ok(!homepageHeroImage.includes('loading="lazy"'), 'homepage hero screenshot must not be lazy loaded');

for (const anchor of [...homepage.matchAll(/href="#([^"]+)"/g)].map((match) => match[1])) {
  assert.match(homepage, new RegExp(`id="${anchor}"`), `homepage local link #${anchor} must have a target`);
}

const caseStudyTitle = 'Tawerna Gothic Case Study | Maurycy Pytel';
const caseStudyDescription = 'Case study of Tawerna Gothic, a long-running gaming platform rebuilt on WordPress with custom information architecture, migration validation and an AI-assisted development workflow.';
const caseStudyText = [
  'WEB PLATFORM / CASE STUDY',
  'Tawerna Gothic',
  'From a hand-coded fan site to a modern content platform.',
  'Creator, Technical Owner &amp; Product Lead',
  'Overview',
  'My Role',
  'Evolution',
  'Migration Without Losing the Archive',
  '1,017',
  '428',
  '9,299',
  'Missing posts or detected content differences',
  'Information Architecture',
  'Custom WordPress Platform',
  'Platform Architecture',
  'Key Challenges',
  'Performance by Design',
  'LABORATORY SNAPSHOT / AUGUST 2026',
  'These values are a point-in-time laboratory snapshot from August 2026 and should not be interpreted as current field Core Web Vitals.',
  'SEO and Migration Validation',
  'AI-Assisted Development Workflow',
  'Implementation with Codex',
  'Validation',
  'Selected Views',
  'A Reusable Foundation',
  'What I Learned',
  'Explore the live platform.',
  'Visit Tawerna Gothic',
];

assert.match(caseStudy, new RegExp(`<title>${caseStudyTitle.replace('&', '&amp;')}</title>`), 'case study title must match');
assert.ok(caseStudy.includes(`content="${caseStudyDescription}"`), 'case study description must match');
assert.ok(caseStudy.includes('rel="canonical" href="https://isentor.github.io/projects/tawerna-gothic/"'), 'case study canonical must match');
assert.equal((caseStudy.match(/<h1(?:\s|>)/g) ?? []).length, 1, 'case study must contain exactly one h1');
assert.match(caseStudy, /<h1(?:\s[^>]*)?>Tawerna Gothic<\/h1>/, 'case study H1 must match');
assert.match(caseStudy, /<main\b[^>]*id="main-content"/, 'case study must expose the skip-link target');

for (const text of caseStudyText) {
  assert.ok(caseStudy.includes(text), `case study must include: ${text}`);
}

const stripMarkup = (value) => value
  .replace(/<[^>]+>/g, ' ')
  .replaceAll('&amp;', '&')
  .replaceAll('&gt;', '>')
  .replaceAll('&lt;', '<')
  .replaceAll('&#39;', "'")
  .replaceAll('&quot;', '"')
  .replace(/\s+/g, ' ')
  .trim();
const caseStudyHeadings = [...caseStudy.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((match) => stripMarkup(match[1]));
assert.deepEqual(
  caseStudyHeadings,
  [
    'Overview',
    'My Role',
    'Evolution',
    'Migration Without Losing the Archive',
    'Information Architecture',
    'Custom WordPress Platform',
    'Platform Architecture',
    'Key Challenges',
    'Performance by Design',
    'SEO and Migration Validation',
    'AI-Assisted Development Workflow',
    'Validation',
    'Selected Views',
    'A Reusable Foundation',
    'What I Learned',
    'Explore the live platform.',
  ],
  'case study sections must follow the approved order',
);

const approvedCopy = [
  'Tawerna Gothic is a long-running Polish gaming platform focused on the Gothic series. I originally created the website in 2005 as a hand-coded HTML fan project. Over the years it evolved through several generations of content management systems before being rebuilt as a modern WordPress platform around the release of Gothic Remake.',
  'The goal of the latest rebuild was not simply to give an old website a new visual design.',
  'Tawerna Gothic contains years of editorial content spanning multiple games, topics and content formats. The new platform needed to preserve that archive while making the website faster, easier to navigate and significantly easier to develop further.',
  'The result is a customized WordPress platform with a dedicated child theme, purpose-built content views, a redesigned information architecture, custom SEO functionality and integrations supporting publishing, analytics and the broader Tawerna Gothic ecosystem.',
  'I created Tawerna Gothic from scratch in 2005 and have remained responsible for the project throughout its evolution.',
  'For the current generation of the platform, I define the product direction, information architecture, functional and visual requirements, development priorities and acceptance criteria.',
  'I also manage the hosting environment, WordPress configuration, deployments, maintenance and part of the direct implementation work.',
  'For more complex development I use Codex as an implementation tool inside a structured AI-assisted development workflow. I define the problem and desired behavior, prepare specifications and development plans, review implementation and testing, and make the final product decisions.',
  'This allows me to focus more heavily on architecture, product decisions and parallel project development while using AI to accelerate implementation and verification.',
  'The migration process treated the archive as a data integrity problem rather than a simple import operation.',
  'The process used snapshots, staged validation and post-migration comparison to verify the resulting state.',
  'The final integrity audit found no missing migrated posts and no detected differences in the compared content.',
  'One of the most important changes was separating two different concepts that are difficult to represent with a conventional category tree.',
  'A custom hierarchical WordPress taxonomy supports the second dimension.',
  'This allows a single article to remain associated with its game or topic while also appearing inside the appropriate functional section, without duplicating the content itself.',
  'The current implementation uses WordPress with ColorMag as a parent theme and a dedicated Tawerna Gothic child theme.',
  'The homepage is deliberately structured as an editorial composition rather than a simple chronological WordPress feed.',
  'This provides stronger control over hierarchy and helps direct users toward the most useful or relevant content.',
  'A major principle of the rebuild was keeping the platform lightweight.',
  'Preserving discoverability was an important part of moving a long-running content platform.',
  'The migration included an audit of 9,299 URLs to identify broken links, redirects and references to obsolete environments.',
  'The objective was to make discoverability part of the platform architecture rather than an afterthought applied after migration.',
  'The current project uses a structured human-led, AI-assisted development workflow.',
  'AI accelerates implementation and analysis, but product decisions, architecture, requirements and final acceptance remain human-owned.',
  'The rebuild was verified beyond individual templates and local implementation checks.',
  'Tawerna Gothic also functions as a practical development environment for patterns that can later be adapted to other content-driven WordPress projects.',
  'The goal is not to clone Tawerna Gothic into other projects.',
  'Instead, proven technical patterns can be extracted, parameterized and adapted while each new project receives its own information architecture and visual identity.',
  'Tawerna Gothic has evolved alongside my own technical experience.',
  'What started as a simple HTML fan site became a long-running environment for learning web development, content architecture, WordPress, hosting, analytics, automation and increasingly structured software development.',
  'The platform remains actively maintained and continues to evolve as both a public gaming website and a practical technical project.',
];
for (const copy of approvedCopy) {
  assert.ok(caseStudy.includes(copy), `case study must preserve approved copy: ${copy}`);
}
assert.match(caseStudy, /<dt>0<\/dt><dd>Missing posts or detected content differences<\/dd>/, 'migration zero metric must remain paired with its approved label');
const caseStudyMain = (caseStudy.match(/<main\b[^>]*>([\s\S]*?)<\/main>/) ?? [])[1] ?? '';
const caseStudyCopyDigest = createHash('sha256').update(stripMarkup(caseStudyMain)).digest('hex');
assert.equal(
  caseStudyCopyDigest,
  'acd3c83bd2d5565b661925d07585f54ad535163e0023e67b4f93f3e6c93ea3ee',
  'case study visible copy and ordering must match the approved version',
);

for (const href of ['/#projects', '/#expertise', '/#experience', '/#about', '/#contact']) {
  assert.ok(caseStudy.includes(`href="${href}"`), `case study header must link to ${href}`);
}
assert.ok(caseStudy.includes('class="brand" href="/"'), 'case study brand must link to the homepage');
assert.ok(caseStudy.includes('class="skip-link" href="#main-content"'), 'case study skip link must remain local');
assert.ok(caseStudy.includes('href="https://tawerna-gothic.pl"'), 'case study must link to the live project');
assert.ok(caseStudy.includes('href="/#projects"'), 'case study must link back to projects');
assert.match(caseStudy, /aria-label="Platform architecture"/, 'platform diagram must expose semantic labeling');
assert.match(caseStudy, /aria-label="AI-assisted development workflow"/, 'workflow diagram must expose semantic labeling');

const caseStudyImages = caseStudy.match(/<img\b[^>]*>/g) ?? [];
const expectedCaseStudyImages = [
  ['/projects/tawerna-gothic/homepage-desktop.webp', '1440', '900', false],
  ['/projects/tawerna-gothic/case-study/gothic-remake-hub-desktop.webp', '1440', '900', true],
  ['/projects/tawerna-gothic/case-study/gothic-remake-hub-mobile.webp', '390', '844', true],
  ['/projects/tawerna-gothic/case-study/search-desktop.webp', '1440', '900', true],
];

for (const [src, width, height, shouldLazyLoad] of expectedCaseStudyImages) {
  const image = caseStudyImages.find((tag) => tag.includes(src)) ?? '';
  assert.ok(image, `case study must include image ${src}`);
  assert.match(image, /alt="[^"]+"/, `${src} must have meaningful alt text`);
  assert.ok(image.includes(`width="${width}"`), `${src} must declare width ${width}`);
  assert.ok(image.includes(`height="${height}"`), `${src} must declare height ${height}`);
  assert.ok(image.includes('decoding="async"'), `${src} must decode asynchronously`);
  assert.equal(image.includes('loading="lazy"'), shouldLazyLoad, `${src} lazy-loading behavior must match its position`);
}

for (const link of generatedHtml.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []) {
  assert.ok(link.includes('rel="noopener noreferrer"'), 'every external new-tab link must include noopener noreferrer');
}

assert.doesNotMatch(generatedHtml, /href="(?:\s*|#)"/, 'generated HTML must not contain empty links');
assert.doesNotMatch(generatedHtml, /[\u2013\u2014]/, 'generated HTML must use only ASCII hyphens');

const publicPrivacyPatterns = [
  /\bbridge\b/i,
  /\bAUTHORSHIP\b/,
  /\bSENSITIVE INFORMATION\b/,
  /\b\d+\.\d+\.\d+\b/,
  /[A-Za-z]:\\/,
];
for (const forbidden of publicPrivacyPatterns) {
  assert.doesNotMatch(generatedHtml, forbidden, `generated HTML must not expose forbidden text matching ${forbidden}`);
}
assert.doesNotMatch(generatedHtml, /[A-Za-z]:\\(?:Users|Projects|Projekty|www|sites)\\/i, 'generated HTML must not expose a local Windows path');

for (const assetPath of [
  'projects/tawerna-gothic/homepage-desktop.webp',
  'projects/tawerna-gothic/hero-crop.webp',
  'projects/tawerna-gothic/case-study/gothic-remake-hub-desktop.webp',
  'projects/tawerna-gothic/case-study/gothic-remake-hub-mobile.webp',
  'projects/tawerna-gothic/case-study/search-desktop.webp',
]) {
  const asset = await readFile(new URL(assetPath, distDirectory));
  assert.ok(asset.byteLength > 10_000, `${assetPath} must be a non-empty optimized screenshot`);
}

const assetDirectory = new URL('_astro/', distDirectory);
const cssFiles = (await readdir(assetDirectory)).filter((file) => file.endsWith('.css'));
assert.ok(cssFiles.length > 0, 'build must emit a stylesheet');
const css = (await Promise.all(cssFiles.map((file) => readFile(new URL(file, assetDirectory), 'utf8')))).join('\n');
assert.ok(css.includes('prefers-reduced-motion'), 'built CSS must include reduced motion handling');

console.log(`Verified ${homepageIds.length} homepage IDs, ${caseStudyText.length} case study markers, ${htmlFiles.length} HTML routes, screenshot assets, privacy guards, and reduced motion CSS.`);
