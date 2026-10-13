# CoopCheck

CoopCheck is a zero-cost GitHub Pages MVP for checking backyard chicken rules and planning a coop setback layout.

## V1 scope
- City-by-city official backyard chicken rules
- Manual rectangular lot + house layout
- Visual setback planner
- Printable site-plan style report
- SEO city pages, sitemap, robots.txt, structured data
- GitHub Actions deployment to GitHub Pages

> Informational only. Always verify current city/county code, zoning, permits, and HOA/CC&R restrictions before building or keeping poultry.

## Mapbox runtime configuration
The GitHub Pages workflow injects the repository secret `MAPBOX_TOKEN` into `site/assets/runtime-config.js` during deployment. The token is not stored in source control.

## Policy data workflow

City policy facts are maintained in `site/data/cities.json` as the canonical audited registry. Do not hand-edit `site/assets/data.js`; regenerate it with:

```bash
node scripts/generate-policy-data.cjs
```

Before deployment, CI verifies the registry, generated browser data, official-source coverage, city-page verification dates, and policy regression guards. See `POLICY_AUDIT.md` for the latest 18-city audit.

## First 100-city coverage batch

The registry now tracks **100 cities**. The first 82 additions are separated into reviewed government-source profiles and research-pending profiles. Pending city pages display an explicit warning, are marked `noindex,follow`, and are **not** included in `sitemap.xml` or the planner's rule selector. Do not imply that 100 city rules have all been verified.

To regenerate the browser data, city pages, directory and sitemap after changing `site/data/cities.json`:

```bash
node scripts/generate-policy-data.cjs
node scripts/generate-coverage-pages.cjs
node scripts/qa-coopcheck.cjs
```

CI checks both generators with `--check` and runs the QA suite before deployment. Start with `site/coverage.html` for the rollout status.

## 2026-10-13 all-city official-source audit

An official-source search and review was carried out for all 100 city profiles. As recorded in [POLICY_AUDIT_2026-10-13.md](POLICY_AUDIT_2026-10-13.md), **40** summaries are verified, **30** are verified only for specific supported claims, and **30** still require current city-specific authority or a municipal planning response. Pending rows remain `noindex` and out of the sitemap and planner; none are fabricated to meet SEO page-count targets.

## Second-pass 30-city source verification (2026-10-13)

Official-source research for the remaining 30 city candidates is documented in `POLICY_AUDIT_SECOND_PASS_2026-10-13.md`. Coverage now includes **83** source-backed city profiles, **38** of them limited-scope; **17** unresolved records remain excluded from sitemap and planner. Do not equate a limited-scope source check with a full local-code compliance ruling.

## Four-field completeness checks

Source-reviewed city summaries are not the same as fully checked city laws. Every city×field pair (flock, rooster, permit, placement) now has an evidence state in `site/data/policy-evidence.json`, reviewed in `POLICY_COMPLETENESS_2026-10-13.md`. After this pass, 85 cities have a source-backed summary, 15 are still pending and excluded from indexing, and four independently reviewed primary field clauses have been recorded. Run `node scripts/qa-policy-evidence.cjs` with the existing QA before deployment.

## Homepage city search and responsive redesign

The homepage and 100-city directory now share a lightweight generated search index (`site/assets/city-search-index.json`) produced from the canonical registry by `node scripts/generate-coverage-pages.cjs`. City results distinguish fully source-reviewed, limited-scope, and research-pending status. The directory supports city/state-text search plus state and verification-status filters; pending pages remain noindex. `node scripts/qa-city-search.cjs` checks search matching, diacritics, filtering, all 100 city records, and progressive-enhancement markup.

## Marketing and community operations

For the GSC → Reddit → BackYard Chickens workflow, browser single-tab rules, compliant outreach and a record of actual publication status, see [Operations playbook](docs/operations/README.md).

## Garland 2026-10-13 city-code update

The previously noted **85/15** audit was a dated historical snapshot. Registry is now **86** source-reviewed summaries, **14** pending, **20/400** clause/guidance-checked fields. Garland, TX moved to limited-scope only; permit and parcel-specific review still needed.

## Olympia 2026 Ordinance 7457 validation

The live registry now includes **87 source-reviewed summaries, 13 pending**, with **23/400** individual field checks. Olympia, WA moves only to limited-scope thanks to OMC §18.04.060(KK); exactly one acre, permit/zoning and setback exceptions require human review. Older review counts above are historical.

## Latest evidence progress (2026-10-13)

The current authoritative completeness report is [POLICY_COMPLETENESS_2026-10-13.md](POLICY_COMPLETENESS_2026-10-13.md): **88** cities have at least some source-reviewed facts (not blanket legal approval), **12** remain pending/noindex, and **204/400** individual city×field claims have primary city code/guidance evidence. Bend's flock/rooster facts are limited-scope; chicken-coop permits and location remain unverified. Earlier counts above are historical batch snapshots. Keep unconfirmed fields clearly scoped and property-specific zoning/permit/setback decisions manual.
