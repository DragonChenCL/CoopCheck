/* Guard sitemap completeness, canonical metadata, and noindex exclusions.
 * This is an offline build check, not a claim of Google/Bing indexing or a live crawl.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SITE = path.resolve(__dirname, '../site');
const ORIGIN = 'https://coopcheck.serunio.com';
const sitemap = fs.readFileSync(path.join(SITE, 'sitemap.xml'), 'utf8');
const entries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)]
  .map((match) => ({loc: match[1], lastmod: match[2]}));

assert(entries.length >= 100, 'Unexpectedly few content URLs in generated sitemap');
assert.equal(entries.length, (sitemap.match(/<url>/g) || []).length, 'Every sitemap entry must include a loc and lastmod');
assert.equal(new Set(entries.map((entry) => entry.loc)).size, entries.length, 'Duplicate URL in sitemap');

const titles = new Map();
const noindexUrls = [];
for (const {loc, lastmod} of entries) {
  const url = new URL(loc);
  assert.equal(url.origin, ORIGIN, 'Cross-domain sitemap URL: ' + loc);
  assert.equal(url.search, '', 'Sitemap URL must not contain a query string: ' + loc);
  assert.equal(url.hash, '', 'Sitemap URL must not contain a fragment: ' + loc);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(lastmod), 'Invalid lastmod format: ' + loc);
  assert.equal(new Date(lastmod + 'T00:00:00Z').toISOString().slice(0, 10), lastmod, 'Invalid lastmod date: ' + loc);
  const rel = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
  const file = path.resolve(SITE, rel);
  assert(file.startsWith(SITE + path.sep), 'Sitemap path outside site root: ' + loc);
  assert(fs.existsSync(file), 'Missing HTML file for sitemap URL: ' + loc);
  assert(file.endsWith('.html'), 'Sitemap target should be an HTML page: ' + loc);
  const html = fs.readFileSync(file, 'utf8');
  const canonicalMatches = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/gi)];
  assert.equal(canonicalMatches.length, 1, 'Exactly one canonical required: ' + loc);
  assert.equal(canonicalMatches[0][1], loc, 'Canonical must equal the sitemap URL: ' + loc);
  const robotsTag = [...html.matchAll(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/gi)]
    .map((match) => match[1].toLowerCase());
  const noindex = robotsTag.some((x) => /\bnoindex\b/.test(x));
  if (noindex) noindexUrls.push(loc);
  assert(!noindex, 'No noindex URL is allowed in the sitemap: ' + loc);
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch && titleMatch[1].trim(), 'Missing title: ' + loc);
  const title = titleMatch[1].replace(/\s+/g, ' ').trim();
  assert(!titles.has(title), 'Duplicate sitemap page title: ' + title + ' (' + loc + ', ' + titles.get(title) + ')');
  titles.set(title, loc);
  assert(/<h1\b[^>]*>[\s\S]+?<\/h1>/i.test(html), 'Missing H1: ' + loc);
}
// Every content HTML page belongs in the sitemap. System and transaction
// routes must remain noindex and are deliberately excluded.
const excluded = new Set(['404.html', 'payment-success/index.html']);
const contentPaths = [];
function collectHtml(dir) {
  for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
    const absolute = path.join(dir, item.name);
    if (item.isDirectory()) collectHtml(absolute);
    else if (item.isFile() && item.name.endsWith('.html')) {
      const relative = path.relative(SITE, absolute).split(path.sep).join('/');
      if (!excluded.has(relative)) {
        const content = fs.readFileSync(absolute, 'utf8');
        if (!/<meta\\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\\bnoindex\\b/i.test(content)) contentPaths.push(relative);
      }
    }
  }
}
collectHtml(SITE);
const expectedUrls = contentPaths.map((p) => ORIGIN + (p === 'index.html' ? '/' : '/' + p)).sort();
assert.deepEqual(entries.map((x) => x.loc).sort(), expectedUrls,
  'Sitemap must contain all indexable HTML pages (excluding noindex, 404 and payment flow)');
assert.equal(noindexUrls.length, 0, 'Sitemap excludes every noindex page');
assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'XML sitemap namespace');
assert(fs.readFileSync(path.join(SITE, 'robots.txt'), 'utf8').includes('Sitemap: ' + ORIGIN + '/sitemap.xml'), 'robots.txt should reference the canonical sitemap');
console.log('PASS: ' + entries.length + ' canonical indexable HTML URLs; no noindex pages; valid lastmod and complete coverage');
