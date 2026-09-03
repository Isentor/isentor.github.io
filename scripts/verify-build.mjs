import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const distDirectory = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', distDirectory), 'utf8');

const expectedTitle = 'Maurycy Pytel | Data, Software & Web Development';
const expectedDescription = 'Portfolio of Maurycy Pytel - web development, Python automation, data, e-commerce and digital projects.';
const requiredIds = ['main-content', 'projects', 'expertise', 'experience', 'about', 'contact'];
const requiredText = [
  'Maurycy Pytel',
  'Selected Projects',
  'Tawerna Gothic',
  'Grytycy.pl',
  'Content Publishing Automation',
  'What I Do',
  'Experience',
  'About',
  "Let's build something useful.",
];
const requiredLinks = [
  'https://github.com/Isentor',
  'https://www.linkedin.com/in/maurycy-pytel-032b2a107/',
  'mailto:maurycy.pytel@gmail.com',
];

assert.match(html, new RegExp(`<title>${expectedTitle.replace('&', '&amp;')}</title>`), 'page title must match the approved title');
assert.ok(html.includes(`content="${expectedDescription}"`), 'meta description must match the approved description');
assert.ok(html.includes('rel="canonical" href="https://isentor.github.io/"'), 'canonical URL must target the public homepage');

for (const id of requiredIds) {
  assert.match(html, new RegExp(`id="${id}"`), `generated homepage must include #${id}`);
}

for (const text of requiredText) {
  assert.ok(html.includes(text), `generated homepage must include: ${text}`);
}

for (const link of requiredLinks) {
  assert.ok(html.includes(`href="${link}"`), `generated homepage must link to: ${link}`);
}

const headingCount = (html.match(/<h1(?:\s|>)/g) ?? []).length;
assert.equal(headingCount, 1, 'generated homepage must contain exactly one h1');
assert.doesNotMatch(html, /href="(?:\s*|#)"/, 'generated homepage must not contain empty links');
assert.doesNotMatch(html, /href="\/projects\//, 'case study routes must not be linked in V0.1');
assert.doesNotMatch(html, /[\u2013\u2014]/, 'generated HTML must use only ASCII hyphens');
assert.match(html, /class="hero-showcase" aria-hidden="true"/, 'decorative hero showcase must be hidden from assistive technology');

const localAnchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const anchor of localAnchors) {
  assert.match(html, new RegExp(`id="${anchor}"`), `local link #${anchor} must have a matching target`);
}

const htmlFiles = (await readdir(distDirectory, { recursive: true }))
  .filter((file) => file.endsWith('.html'))
  .map((file) => file.replaceAll('\\', '/'));
assert.deepEqual(htmlFiles, ['index.html'], 'V0.1 must generate only the homepage HTML route');

const assetDirectory = new URL('_astro/', distDirectory);
const cssFiles = (await readdir(assetDirectory)).filter((file) => file.endsWith('.css'));
assert.ok(cssFiles.length > 0, 'build must emit a stylesheet');
const css = (await Promise.all(cssFiles.map((file) => readFile(new URL(file, assetDirectory), 'utf8')))).join('\n');
assert.ok(css.includes('prefers-reduced-motion'), 'built CSS must include reduced motion handling');

console.log(`Verified ${requiredIds.length} IDs, ${requiredText.length} content markers, ${requiredLinks.length} contact links, ${htmlFiles.length} HTML route, and reduced motion CSS.`);
