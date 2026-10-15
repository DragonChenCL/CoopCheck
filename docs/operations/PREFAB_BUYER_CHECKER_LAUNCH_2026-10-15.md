# Prefab chicken coop buyer checker — launch record (2026-10-15)

**Scope:** one source-backed, interactive, English-language buyer tool and SEO entry page at `/guides/prefab-chicken-coop-capacity-checker.html`, not a national product database, shopping feed, paid evaluation, engineered plan or animal welfare certification.

## Buyer problem / evidence
- Previous [demand study](PREFAB_COOP_BUYER_INTENT_DEEP_DIVE_2026-10-15.md) finds recent independent first-person questions about coop size and misleading capacity claims. Third-party estimated US monthly keyword opportunities include `chicken coop for 6 hens` (3,600), `for 4 hens` (1,900) and `for 8 chickens` (1,600); these are **not** guaranteed traffic, and tool-based KD 0-2 is not meaningful proof of easy rankings.
- No verified CoopCheck purchases, real conversions or ranking uplift before this launch. Avoid saying "the market is proven".

## Core user flow
1. Landing page shows three **literal** merchant-origin SKU comparisons in crawlable HTML, with SKU-specific primary-source links and date-scope disclaimer.
2. User selects flock of 1-24 standard adult hens, and chooses regular outdoor access YES (OSU >=3 sq ft indoor/bird) vs NO (OSU 8-10 indoor/bird, using low end 8 to compare).
3. User chooses one of three products, or selects "my dimensions" to enter clear indoor floor length/width, separately optional run length/width and feet/inches. Display measured-in-sq-ft, reference minimum, DIFFERENCE, and a progress bar. Check only compares indoor floor-area reference, not approved housing capacity.
4. Missing interior area returns **Unknown** (no invented estimate). Cabana run is seller-reported 75.1 ft²; Guardian run is included but its verified usable AREA is **unknown**; PawHut has **no included run**; buyer-entered run is clearly labeled **unverified**.
5. The page offers a **copy seller-question** template (clear interior vs exterior, outdoor run, actual perch length, meaning of advertised count), print-friendly assessment and deep links to the existing sizing calculator / concept 2D plan / city laws. Nothing is transmitted or persisted from the new controls.
6. No fake five-star ratings, no guessed prices, no affiliate tags, no retailer-site scraping, no paid conversion or compliance certifications.

## Original measurements and assumptions
- [Cabana, Producer's Pride CBCOOP-2025](https://www.tractorsupply.com/tsc/product/producers-pride-cabana-coop): Merchant 14 *roosting* places; official seller-Q&A reported enclosed wooden house **15.54 ft²**, separate run **75.1 ft²**. Roosting claim is NOT a validated full-time-housing capacity.
- [Guardian, Producer's Pride CBCOOP-HB-WP](https://www.tractorsupply.com/tsc/product/producers-pride-guardian-chicken-coop-14-chicken-capacity-1994517): 14 *roosting* places; official Q&A floor rectangle **62.59 × 39.37 inches** -> **17.11 sq ft**. Not a measurement of obstruction-free usable area. Run area is unknown.
- [PawHut D51-547V00GY](https://www.aosom.com/item/pawhut-chicken-coop-wooden-chicken-house-for-4-6-hens-outdoor-hen-house-with-nesting-box-pull-out-tray-and-weatherproof~24SBJPKB4DO01.html): manufacturer claims **4–6 hens**, 8.18 ft² interior, no included run.
- [Oregon State University Extension](https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design): At least 3 ft² indoor/bird with run or outside access; 8-10 ft² indoor without. Other sources and contexts may differ. NO universal legal limit / absolute welfare guarantee.

## Quality gates
- `scripts/qa-prefab-coop-buyer.cjs`: source coverage, exact SKU array, 3 vs 8 baseline, invalid input, custom feet/inches, unknown dimension, 116-URL sitemap, visible controls, noindex guard indirectly via sitewide QA.
- `scripts/qa-coop-seo.cjs`: explicit sitemap count grows 115 -> 116.
- `scripts/generate-coverage-pages.cjs` is the single source for sitemap rebuild, not a one-off hand edit. Homepage content lastmod reflects meaningful Oct 15 change.
- Both PR validation and Pages deploy run new QA plus existing sitewide checks.
- After merging, verify actual page returns 200, canonical and readable HTML, JS interactions in browser (including mobile), homepage navigation, and one-URL IndexNow notification (if public key is accessible).

## What still needs validation
- Real Google/Bing index status and SERP position (IndexNow acknowledgement != indexing).
- Real non-test users, page scrolls, seller-question copying, product choice and actual brand clicks; no user-specific session or purchase tracked by this static MVP; GA4 was expressly deferred.
- Merchants can revise claims without warning; date-specific comparison and periodic manual source verification are needed. No automated scrape or "always current price" promise.
- Actual usable floor, outdoor run size, ventilation, predators, weather, perches, nest box access, zoning and animal welfare must be checked separately. Do not label a model fit/safe just because it meets a single OSU area threshold.

## Next growth experiment
Try one transparent, non-spam post **only** where a reader asks for an actual product sizing method, or send a useful one-page resource to a consenting editor who has previously shown interest. Do not spam old community threads or imply the user personally tape-measured these coops. During the first 14 days compare GSC new-page impressions and independent referrals (if available), not raw self-generated test visits.

## Real production acceptance — 2026-10-15

- [PR #57](https://github.com/DragonChenCL/CoopCheck/pull/57) merged into main after full GitHub CI. Production [Pages deploy](https://github.com/DragonChenCL/CoopCheck/actions/runs/38738175879) succeeded; initial automatic [IndexNow run](https://github.com/DragonChenCL/CoopCheck/actions/runs/38738253180) submitted precisely **2 URLS (homepage and new checker)**, HTTP **200**. This is an acceptance receipt, **not indexing**.
- Real browser QA caught **initial render ReferenceError** despite all pure arithmetic tests passing: the default result remained a static placeholder until the buyer clicked a model. [PR #58](https://github.com/DragonChenCL/CoopCheck/pull/58) fixed browser root-scope URL access, and added a mock-document initial-render regression test. Full CI passed and deployment succeeded.
- CDN/browser cache continued serving old `/assets/prefab-capacity.js?v=20261015-1` despite new source. Direct live testing found `?v=20261015-2` returned the fixed script; [PR #59](https://github.com/DragonChenCL/CoopCheck/pull/59) changed the HTML script URL and its regression check; full CI green, [latest code deploy](https://github.com/DragonChenCL/CoopCheck/actions/runs/38739447036) success.
- **Final verification on canonical public URL (no query)**: `https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html` used `prefab-capacity.js?v=20261015-2` and instantly computed **15.54 vs 18 sq ft for six hens; 2.46 sq ft below**. Browser console reported **0 errors**. Default and optional `?hens=7` are protected by tests.
- Browser-interaction checks: switch Cabana/Guardian/PawHut, 6 hens with/without outdoor access (18 vs 48 sq ft threshold), custom 5×4 indoor and 10×8 separate run (20 and 80 sq ft), invalid 0 hens and recovery, seller-question copy confirmation, and product-source links all behave as designed. Tested responsive viewport widths **320, 390, 768, 1366** with **zero horizontal overflow**.
- Production `/sitemap.xml` returned HTTP 200 and **116 URLs**, includes checker once with 2026-10-15 `lastmod`; homepage source contains real checker link. New page has self-canonical, `index,follow`, and HTML visible to crawler. Final [IndexNow run](https://github.com/DragonChenCL/CoopCheck/actions/runs/38739536407) notified only changed checker and returned HTTP **200**.
- No new checkout, no affiliate IDs, no paid SKU crawler, no new analytics tracker. Existing site-level publishing injects the pre-existing analytics script by design; this project did not modify or consult GA4, per owner deferral.
- **Outcome boundary**: site published and tested successfully, **but no verified new organic clicks, signups, commissions, purchases or real-world bird-welfare approvals**. Observe GSC 7/14/28 days; maintain dated seller specs before adding models.
