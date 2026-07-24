// SEO / metadata regression lint for the built site.
//
// Deterministic, judgment-free guard rails — NOT a suggestion engine.
// It only catches metadata that regressed into a broken state (missing title,
// duplicate descriptions, dangling og:image, etc.). Anything that needs an
// editorial or SEO judgement call is deliberately out of scope; that work is
// done by a human, not this check.
//
// Run after `npm run build`:  node scripts/seo-lint.mjs
// Exits 0 if the built site is clean, 1 (with a report) if anything regressed.
//
// The weekly maintenance routine runs this and reports failures in its PR/issue.
// It must stay GREEN on a healthy build — tune thresholds here, never silence a
// real regression.

import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE_ORIGIN = 'https://dranataliaasquino.com.uy';

// Length bounds. These are the widely-used SERP display limits; outside them the
// title/description gets truncated by Google. Kept as soft-ish bounds so normal
// copy passes and only genuinely out-of-range values flag.
const TITLE_MAX = 65;
const DESC_MIN = 50;
const DESC_MAX = 160;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const decode = (s) =>
  s == null
    ? s
    : s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

function parse(html) {
  const meta = (name) =>
    pick(html, new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i')) ??
    pick(html, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, 'i'));
  const prop = (p) =>
    pick(html, new RegExp(`<meta[^>]+property=["']${p}["'][^>]+content=["']([^"']*)["']`, 'i'));
  return {
    title: decode(pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i)),
    description: decode(meta('description')),
    robots: (meta('robots') || '').toLowerCase(),
    canonical: pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    ogImage: prop('og:image'),
    h1Count: (html.match(/<h1[\s>]/gi) || []).length,
  };
}

// Two severities:
//   errors   — structural breakage; fails the run (exit 1). A healthy build has
//              none, so a failure is a genuine regression worth reporting weekly.
//   warnings — quality drift (title/description length). Reported, never fatal;
//              this is an editorial call, not something to nag about every week.
const errors = [];
const warnings = [];
const files = (await htmlFiles(DIST)).sort();

// Uniqueness is only meaningful among indexable pages — noindex placeholders
// (e.g. the casos/articulos index stubs) may legitimately share boilerplate.
const titles = new Map();
const descriptions = new Map();

for (const file of files) {
  const page = relative(DIST, file);
  const html = readFileSync(file, 'utf8');
  const m = parse(html);
  const indexable = !m.robots.includes('noindex');
  const err = (msg) => errors.push(`${page}: ${msg}`);
  const warn = (msg) => warnings.push(`${page}: ${msg}`);

  // --- invariants that hold for every page, indexable or not ---
  if (!m.title) err('missing or empty <title>');
  if (!m.description) err('missing or empty meta description');
  if (!m.canonical) err('missing canonical link');
  else if (!m.canonical.startsWith(SITE_ORIGIN))
    err(`canonical is not absolute to ${SITE_ORIGIN} (got "${m.canonical}")`);
  if (!m.ogImage) err('missing og:image');
  else {
    const path = m.ogImage.replace(SITE_ORIGIN, '').replace(/^\//, '').split('?')[0];
    if (!existsSync(join(DIST, path))) err(`og:image references a file not in dist: ${m.ogImage}`);
  }

  // --- quality bounds, indexable pages only ---
  if (indexable) {
    // Length is a warning: it truncates in the SERP but is an editorial call.
    if (m.title && m.title.length > TITLE_MAX)
      warn(`title too long (${m.title.length} > ${TITLE_MAX}): "${m.title}"`);
    if (m.description && (m.description.length < DESC_MIN || m.description.length > DESC_MAX))
      warn(`description length ${m.description.length} outside ${DESC_MIN}–${DESC_MAX}: "${m.description}"`);
    // A missing or doubled <h1> is a structural defect, not a judgement call.
    if (m.h1Count !== 1) err(`expected exactly one <h1>, found ${m.h1Count}`);

    if (m.title) {
      if (titles.has(m.title)) err(`duplicate title, also on ${titles.get(m.title)}: "${m.title}"`);
      else titles.set(m.title, page);
    }
    if (m.description) {
      if (descriptions.has(m.description))
        err(`duplicate description, also on ${descriptions.get(m.description)}`);
      else descriptions.set(m.description, page);
    }
  }
}

if (warnings.length) {
  console.log(`\nSEO lint: ${warnings.length} warning(s) — editorial, non-blocking:\n`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length) {
  console.error(`\nSEO lint: ${errors.length} structural error(s) across ${files.length} page(s):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error('');
  process.exit(1);
}

console.log(`\nSEO lint: no structural errors — ${files.length} pages checked.`);
