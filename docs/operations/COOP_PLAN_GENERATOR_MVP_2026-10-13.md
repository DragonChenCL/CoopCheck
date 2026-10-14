# CoopCheck — Free Chicken Coop Plan Generator MVP

Ship date: 2026-10-13. Purpose: validate demand for dimensioned coop planning **without any paid AI or CAD API** or unverified claims that the plans are structurally buildable.

## URL and audience

- Public URL after deployment: https://coopcheck.serunio.com/coop-plan.html
- Existing home, setback explainer and map-based planner link to it.
- New generator is 100% free: user-input flock count (2–24), rectangular available coop+run space (width 6–50ft, depth 8–80ft), and three concept templates (walk-in, raised, compact). No signup, checkout or cloud project required.
- Responsive preview contains an original locally generated SVG of the coop and separate outdoor-run footprint. Downloads are SVG and PNG; native browser Print / Save PDF option.
- Nest boxes and roost marks are illustrative; spaces and components are NOT dimensioned or validated for actual physical assembly.

## University-grounded planning constants (NOT local law)

- Oregon State University Extension, [Living on the land: Backyard chicken coop design](https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design): approximately 3 sq ft indoors per chicken with access to outdoor run (8–10 sq ft with no outdoor access); one 12in x12in nest box per ~4 birds and 5–10in roost per bird.
- Penn State Extension, [Small-Scale Poultry Housing](https://extension.psu.edu/small-scale-poultry-housing) (updated June 2026): laying hen outdoors ~8 sqft per bird, large chicken run 10sqft; housing requirements vary by breed and management.
- University of Minnesota Extension, [Caring for chickens in cold weather](https://extension.umn.edu/agriculture/animals-and-livestock/poultry/caring-for-chickens-in-cold-weather): approximately 9 inches roost per chicken.
- CoopCheck's fixed **4 sqft indoor + 10 sqft outdoor per adult laying hen** are simplified, somewhat more spacious **illustrative planning targets**, not universal best-practice guarantees or city ordinances. Actual needs depend on breed, confinement, climate, welfare and city requirements.
- The engine never counts under an elevated coop footprint as additional outdoor run. Area warnings appear if either target is missed, but designs may still be drawn to show **why a space fails**.
- No setbacks are auto-applied in generated drawings; they are **independent from the city-law verification system** and existing paid map report.

## Map handoff and privacy

- On the map planner, user can click `coop-plan.html?from=map`. Existing map autosave remains unmodified.
- New page locally reads the project saved under `coopcheck:project-id` with `CoopProject.load` and extracts an **axis-aligned bounding rectangle** of the coop polygon via spherical-degree approximation. It is deliberately labeled as approximate, not a rotated footprint, parcel survey or building approval.
- If absent/outside range, fall back to user-entered dimensions. The map address and coordinates are never sent to an external service by this generator. It makes no new network calls.
- Analytics records only a selected layout/style, a coarse flock bucket, boolean planning-target outcome and rough import source; export events contain file format. The tool does not log precise property dimensions, sketch coordinates or street address.

## Explicit MVP exclusions

No engineering drawings, connection detail, framing / spans / wind or snow loads, secure construction details, material cut list, prices, actual build approval, permit validation, HOA clearance, property survey, authenticated cloud save or AI rendering.

## Traffic experiments

Test these narrow search intents; **do not claim monthly search volume without live keyword-tool verification**:
- chicken coop plan generator
- chicken coop size for 6 chickens
- chicken coop layout with run
- free chicken coop floor plan
- backyard chicken coop planning tool

GSC check at 7/14/28 days for the new canonical page: indexing, impressions, clicks and query intent. GA4: `chicken_coop_plan_generate`, `chicken_coop_plan_export`, and existing `planner_click` links. Exclude self-tests as far as possible; do not infer payments or users from raw event counts.

## Verification and deployment

- `node scripts/qa-coop-plan.cjs`: 3 styles × 4 flock sizes × 6 dimension sets, area conservation, warnings, SVG generation, map bounding box checks, source limits, SEO canonical and links.
- PR and Pages workflow both run the test before accepting/deploying.
- `node scripts/generate-coverage-pages.cjs --check` includes the new canonical URL in the generated sitemap.
- Manual checks recommended: narrow phone viewport, 24 birds in 6×8ft area (warning), map import, SVG/PNG browser download, browser print-to-PDF.
