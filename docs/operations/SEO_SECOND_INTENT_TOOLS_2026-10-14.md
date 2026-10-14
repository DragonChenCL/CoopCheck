# CoopCheck — Second SEO Intent Tool Cluster (2026-10-14)

**Objective:** extend the search footprint beyond our original 10 indoor-capacity/sizing answers into distinct tasks a homeowner actually performs. Content is written for US English search intents. These are candidate keywords inferred from SERPs, not a paid-tool report with exact US search volume, CPC or KD. No ranking or revenue is claimed.

## New routes & implemented user value

| URL | Search intent | Real, independently useful feature |
|---|---|---|
| `/guides/chicken-run-size-calculator.html` | chicken run size calculator / how big should a chicken run be | Enter hens + run width & depth; compare area to transparent 10 sq ft/bird **illustrative run target**, show capacity and geometric sketch. |
| `/guides/chicken-run-fencing-calculator.html` | chicken run fencing calculator / how much hardware cloth for chicken run | Enter rectangular dimensions + fence height + roof/apron options; compute wall, optional roof, apron, perimeter and subtotal surface areas. **No roll counts, structure, joints or waste calculated**. |
| `/guides/chicken-nesting-box-calculator.html` | how many nesting boxes per chicken | Live 1 nest / ~4 adult hens calculation, sample table, schematic and placement guidance. |
| `/guides/chicken-roost-length-calculator.html` | chicken roosting bar length calculator | Calculate 9 in/bird combined perch length and rough number of user-specified bars. **Length-only**, no clearance/structure. |
| `/guides/chicken-coop-cost-calculator.html` | chicken coop cost calculator / chicken coop build cost | Worksheet totals **user-supplied local prices** for eight categories; blank inputs stay clearly **unpriced**. No fake national supplier quotation or fabricated material list. |
| `/guides/free-chicken-coop-floor-plans.html` | free chicken coop floor plans / printable chicken coop plans | Curated 4/6/8/12 bird starter layout references with verified plan-generator deep links to download SVG/PNG/print-PDF **concept drawings only**; not misleading construction-ready CAD files. |

## SERP analysis (public competitive references)
Existing direct competition means none of these keywords are assumed easy:
- Nesting: PoultryCalc / CoopPlanner / ChickenCalc already provide nest calculators.
- Cost: CoopBlueprints / CoopPlanner / FlockSavvy provide material breakdowns; value here is **no fictional prices**, local source transparency and law→map→plan linking.
- Run/fence calculators are also available elsewhere; we compete with working examples, original browser-calculated dimensions and local-law planning context.
No claimed absolute query counts. Verify Keyword Planner, Ahrefs or Semrush by region before ranking an expanded content roadmap by demand.

## Existing-site integrations
- Home: six new task-specific tools in a dedicated section.
- All ten first-generation sizing pages: reciprocal links to new tools, generated through `scripts/generate-coop-seo-pages.cjs`.
- Setback guide and `/coop-plan.html`: relevant links to fencing/run sizing, budget and free concept plans.
- Flock handoff accepts trusted `source=run-size|nesting-box|roost` for 2–24 hens. Larger counts remain calculated on standalone guides, but their "open layout" link is hidden because the MVP only accepts 2–24.
- Six new self-canonical HTML pages, unique H1/title/description, BreadcrumbList schema and WebApplication/Article schemas, Extension links, noindex status unchanged for the 12 pending-city profiles.
- New sitemap expected: **115 URLs** (was 109). No city URLs removed.
- New scripts: `site/assets/coop-intent-tools.js` and `scripts/generate-coop-intent-tools.cjs`; no paid API or server runtime.

## Mathematical scope / sources
- Outdoor run sizing: chosen 10 sq ft per hen **planning target**; compare Penn State Extension's chart of 8 sq ft for layers and 10 sq ft for large chickens. Not a legal/welfare guarantee.
- Nest: OSU Extension recommends about one 12-inch-square/12-inch-tall box per four hens. More may be needed with flock conditions.
- Roost: chosen 9 inches per standard bird, inside OSU's 5–10 inch guidance. Distance between bars, perching height and breed-specific limitations are **not** mechanically validated.
- Mesh: perimeter=2×(w+d), walls=perimeter×height, roof (if selected)=w×d, outward apron=perimeter×user-chosen width. This excludes overlaps, cuts, joints and structural review. OSU addresses predator covering and barriers.
- Budget: totals quoted input values; blank is unknown, 0 must be intentional. No automatically priced materials, cut lists or exact current nationwide pricing.
Primary guidance:
- https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design
- https://extension.psu.edu/small-scale-poultry-housing

## Verification & operating measurements
- Build drift: `node scripts/generate-coop-intent-tools.cjs --check`; prior `node scripts/generate-coop-seo-pages.cjs --check`.
- Scope and math: `node scripts/qa-coop-intent-tools.cjs`; prior SEO & policy QA.
- Browser: `node scripts/e2e-coop-plan.cjs` checks live calculator/fence/nest/roost/cost interactions, deep link and 375px mobile.
- Post-deploy public check: 6 HTTP200s, canonicals, noindex absence, sitemap 115, live inputs.
- GSC: track each canonical's index state, actual queries, impressions, CTR, position and clicks at 7 / 14 / 28 days; GA4 `coop_intent_tool_calculate` with **tool name and completion only**, without raw measurements, user budget or address.
- Experiment *success* is organic query impressions and attributable actions, **not sitemap size alone**. If multiple pages show duplicate overlap, consolidate rather than continuing mechanically.
- Avoid inappropriate use of "approved" / "permit-ready" / structural safety in snippets.
