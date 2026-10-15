/* Guard indexability and canonical metadata for every URL published in site/sitemap.xml.
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

assert(entries.length >= 100, 'Unexpectedly few indexable URLs in generated sitemap');
assert.equal(entries.length, (sitemap.match(/<url>/g) || []).length, 'Every sitemap entry must include a loc and lastmod');
assert.equal(new Set(entries.map((entry) => entry.loc)).size, entries.length, 'Duplicate URL in sitemap');

const titles = new Map();
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
  assert(robotsTag.every((x) => !/\bnoindex\b/.test(x)), 'noindex page must not be in sitemap: ' + loc);
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch && titleMatch[1].trim(), 'Missing title: ' + loc);
  const title = titleMatch[1].replace(/\s+/g, ' ').trim();
  assert(!titles.has(title), 'Duplicate sitemap page title: ' + title + ' (' + loc + ', ' + titles.get(title) + ')');
  titles.set(title, loc);
  assert(/<h1\b[^>]*>[\s\S]+?<\/h1>/i.test(html), 'Missing H1: ' + loc);
}
assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'XML sitemap namespace');
assert(fs.readFileSync(path.join(SITE, 'robots.txt'), 'utf8').includes('Sitemap: ' + ORIGIN + '/sitemap.xml'), 'robots.txt should reference the canonical sitemap');
console.log('PASS: ' + entries.length + ' canonical, unique, indexable HTML sitemap targets and valid lastmod dates');
