# CoopCheck — city-law → concept-plan → map handoff
Date: 2026-10-13. **Product integration; not a municipality compliance certificate.**

## User flow
1. Every eligible generated city guide and the five hand-curated city guides link to the same free `/coop-plan.html?city=<slug>&source=rules`.
2. The standalone layout generator shows an optional city selector and a field-by-field municipal evidence card. Numeric default flock is only prefilled for a tiny allowlisted set where the cited rule has been manually reviewed (Portland 4, Arlington 4, Seattle 8, Denver 8, Chandler 6); this is NOT an entitlement without land-use / acreage / permit checks.
3. Five benchmark cities already supported by the existing quick-check engine use that **existing** source-scoped logic for preliminary hen-count/rooster review. Optional lot area and rooster question let Portland 4-versus-6 lot tiers be screened. Other reviewed cities show verified factual text and official evidence but **do not** synthesize numeric eligibility from unstructured notes.
4. Users can navigate from generator to their selected city rules and map planner. Map planner's new link autosaves selected context and passes `?from=map&city=<slug>`.
5. The planner's saved `coop` polygon represents the planned **coop**, *not* a combined coop-and-outdoor-run area. A degree-to-feet axis-aligned bounding rectangle can only be displayed as a **rough coop-only footprint reference**. It NEVER overwrites the generator's rectangular TOTAL coop+run width/depth fields. No false legal-buildable-area or boundary-survey inference.
6. Browser Print/PDF includes a city-context note but explicitly says the drawing is NOT municipal/structural approval.

## Evidence safety
- Generated `site/assets/plan-law-data.js` comes solely from `site/data/cities.json` and `site/data/policy-evidence.json`.
- A field is displayed as a reviewed positive claim **only if** `status=primary_clause_checked`, `verifiedClaim!==false`, and the city is not `needs_review`. Source-only and pending fields are displayed **not independently confirmed**; no guessing from an official code-index URL.
- The lookup is by whitelist slug from the generated data. User query strings cannot fabricate an allowed city, authoritatively verified source or numeric rule.
- Selection of municipality is *not* verification that the user's parcel is in that jurisdiction. If saved map geocoder match is unavailable or mismatched, users are warned. The city URL and approximate map measurements are not transmitted to an API by this feature.

## Analytics and measurement
- Existing `chicken_coop_plan_generate` now records optional `city_slug` in addition to coarse flock bucket, style and planning-area-target outcome; no address, lot size, precise dimensions or map coordinates.
- Map entry click records `map_to_coop_plan` with city slug only and whether sketch saved.
- Measure city → free plan and map → free plan intent in GA4 after deployment; use 7/14/28-day GSC checks, not a promised ranking uplift.
- No new third-party paid service or checkout is required for free generator.

## QA & scope
- `node scripts/qa-plan-law.cjs` enforces 100-city evidence mapping, verified-clause vs source-recorded scope, and conditional Portland/Seattle/Denver/Arlington logic.
- Existing `node scripts/qa-coop-plan.cjs` still checks math, geometry and downloaded-format safety.
- Chromium E2E `node scripts/e2e-coop-plan.cjs` tests real city→plan transitions, official sources, lot-size/rooster scenarios, pending city fail-closed, and map-only-footprint handling.
- This MVP does NOT compute a full legally buildable rectangle or automatically test a construction plan against setbacks, permit structure rules, HOA, engineering, climate or property survey.
