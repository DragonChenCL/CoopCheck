# CoopCheck — Chicken coop sizing SEO landing-page experiment (2026-10-14)

## Objective
Earn search traffic from **practical chicken-coop space and dimensions questions**, then help the visitor use the free 2D layout generator and city ordinance research. This is a hypothesis, **not confirmed keyword volume, Google rankings or revenue**.

### Organic search intent clusters shipped

| Intent and target search phrase | Canonical URL | Distinct reason to visit |
|---|---|---|
| chicken coop size calculator; chicken run size calculator | `/guides/chicken-coop-size-calculator.html` | Functional calculator for 2–24 hens + chart, separate indoor/run areas, nests/roosts |
| what size chicken coop for 4 chickens | `/guides/coop-size-for-4-chickens.html` | 4 × 4 indoor / 5 × 8 run example, access limitations |
| what size chicken coop for 6 chickens | `/guides/coop-size-for-6-chickens.html` | 4 × 6 indoor / 6 × 10 run example, separate 2 nests |
| what size chicken coop for 8 chickens | `/guides/coop-size-for-8-chickens.html` | 4 × 8 indoor / 8 × 10 run, ventilation, two nests |
| what size chicken coop for 10 chickens | `/guides/coop-size-for-10-chickens.html` | 5 × 8 indoor / 10 × 10 run, layout access and three nests |
| what size chicken coop for 12 chickens | `/guides/coop-size-for-12-chickens.html` | 6 × 8 indoor / 10 × 12 run, maintenance guidance |
| what size chicken coop for 16 chickens | `/guides/coop-size-for-16-chickens.html` | 8 × 8 indoor / 10 × 16 run, flock-management scale |
| how many chickens in a 4x6 coop | `/guides/4x6-chicken-coop-capacity.html` | 24-sq-ft **indoor** capacity with smaller-vs-target flock comparison |
| 4x8 chicken coop capacity / how many hens | `/guides/4x8-chicken-coop-capacity.html` | 32-sq-ft indoor capacity, full separate run comparison |
| how many chickens in a 6x8 coop | `/guides/6x8-chicken-coop-capacity.html` | 48-sq-ft indoor capacity, run-sizing warning |

**These are target query clusters, not volume-verified rankings.** Search results show competing calculators and flock-size guides already exist. In particular, CoopPlanner, CoopCalcs and CoopBlueprints have relevant answers. A novel URL does not automatically imply low keyword difficulty or indexing.

## User-first and SEO boundaries
- Every page contains a **server-rendered concrete answer**, original independent footprint chart/diagram or live calculator and specific trade-offs. Distinct exact-intent headings, meta descriptions, canonical URLs, JSON-LD Article/Breadcrumb, and links to source references.
- No fake lumber cut lists or structural assurances. CoopCheck's **4 sqft indoor + 10 sqft run** are explicit **illustrative planning targets**, NOT universal minima. Oregon State Extension describes >=3 sqft indoor with outdoor access; Penn State Extension has species-dependent published space minima.
- Nest: one 12-inch box per 4 hens; roost: 9 inches per bird as within OSU's 5–10 inch range. Distinguish separate **indoor space** from outdoor wire-enclosed run.
- Google Search Central warns against scaled content abuse and near-duplicate doorways. Limit this batch to **10** useful pages, not 100 near-identical numerical permutations. Consolidate if GSC shows duplication/cannibalization.
- The `?flock=N&source=coop-size` prefill only accepts 2–24 integers and does not override selected municipal context or saved-map project defaults.
- No third-party APIs or new dependency for this collection.

## Internal linking and site status
- The site homepage links to calculator and priority 4/6/8/10/12 guides plus 4×8 capacity.
- Setback guide links to calculator and 6-hen guide; existing coop-plan generator links to calculator.
- New cluster pages crosslink to related flock sizes, other footprints, city rules, and the live plan generator.
- `scripts/generate-coverage-pages.cjs` now includes ten additional canonical URLs in sitemap. **Expected total: 109**, up from 99 (88 reviewed cities + prior entrypoints). The 12 unverified city profiles remain noindex and excluded.
- Tests: `node scripts/generate-coop-seo-pages.cjs --check`; `node scripts/qa-coop-seo.cjs`; `node scripts/e2e-coop-plan.cjs` in real Chromium, plus existing payment/regulatory suites.
- Generator source: `scripts/generate-coop-seo-pages.cjs`; edit source, regenerate and test, rather than manually patching output pages.

## Measurement: 7 / 14 / 28 days post-indexing
- In GSC: check `site:coopcheck.serunio.com/guides/` indexing status per canonical page, actual landing-page impressions, query strings, average position and clicks. Compare with prelaunch baseline (Sept 15–Oct 12: 23 total site impressions, 0 clicks), noting new pages may have different crawl and ranking latency.
- In GA4: `chicken_coop_size_check` event on user-triggered calculation; `chicken_coop_plan_generate`, `chicken_coop_plan_export` and `map_to_coop_plan`. Do not confuse pageviews, test sessions or impressions with qualified organic traffic.
- Action thresholds: prioritize pages with real query matches/early impressions and poor CTR for snippet refinement; consolidate near-duplicates that don't establish independently valuable intent; avoid expanding more numbers before evidence.
- Future clusters only after validating demand: chicken run size, space for heavy breeds, coop/ground clearance, permit-specific guides where the relevant legal clause is primary-verified, and cost/material calculators **only after actually building those functions**.

## Sources
- [OSU Extension — Living on the land: Backyard chicken coop design](https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design)
- [Penn State Extension — Small Scale Poultry Housing](https://extension.psu.edu/small-scale-poultry-housing)
- [Google Search Central — Spam policies, doorway/scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Search Central — Creating helpful, reliable people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

Operational status: generated and coded on a branch. PR/CI/Pages/public browser evidence is recorded separately when completed; **not yet a claimed indexed result**.
