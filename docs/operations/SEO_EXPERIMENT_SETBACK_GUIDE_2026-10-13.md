# SEO experiment: free chicken coop setback worksheet — 2026-10-13

## Why this experiment

Initial GSC report (2026-09-15 through 2026-10-12): 23 total impressions, 0 search clicks. Oregon city-limits hub 9 impressions at reported average position 9.33; Portland city guide 9 impressions at 41.67; homepage 5 at 29.6. GA4 showed 5 active users and 12 Direct sessions for that interval, no measured Organic Search visits. These tiny samples cannot establish stable ranking or conversion rates.

Rather than generating 50 template pages, publish **one original cross-city setback education and free geometry tool**, then link it to the two pages already visible in GSC.

## Exact shipped scope

- Guide URL: https://coopcheck.serunio.com/guides/chicken-coop-setback-from-property-line.html
- Original explanation of lot line vs fence line vs neighboring residence, with schematic illustration and cited official rules for Portland, Seattle, and San Diego.
- Free lightweight browser worksheet: user enters lot/coop sizes and **their own example buffers**, tests *geometric rectangular fit only*. Built-in values are illustrative, not law; no claims about surveyed boundaries, zoning, city permits or poultry use. This is a feeder to the existing free map sketcher, not a second legal decision engine.
- Contextual links from the homepage FAQ/navigation, Oregon state hub and Portland deep-dive to the guide, and reciprocal links from guide to city pages + map planner. No doorway pages or misleading structured FAQ results.
- Sitemap includes one new canonical URL; Oregon lastmod updated. Existing 12 withheld city pages remain noindex.
- `setback_worksheet_check` fires on an actual worksheet submit with a **boolean fit only** (no lot dimensions or addresses). Existing `planner_click` in `assets/analytics.js` records guide → map planner link clicks with `source_page` = guide path.

## Why these examples (sources checked 2026-10-13)

- **Portland** Code §13.40.040(D): 3 ft side/rear and 10 ft front lot lines for livestock facility structures; extra 15 ft in multi-unit lots. https://www.portland.gov/code/13/40
- **Seattle** SDCI Tip 244: 10 ft between fowl housing and a neighboring lot's residential structure; other yard restrictions apply. https://www.seattle.gov/DPD/publications/CAM/cam244.pdf
- **San Diego** official chickens page: location-dependent 5/15/25-bird tiers, and different property-line vs dwelling-distance measures. https://www.sandiego.gov/urban-farming/bees-and-livestock/chickens

The article explains that these rules **cannot be copied to another city** or taken as parcel approval. Guides and source examples should be re-reviewed if municipal law changes.

## Measurement and stop / go

Do **not** assert that deploying or sitemap registration = indexing.

- **Day 0**: record PR, Pages successful deployment and canonical URL; test guide/worksheet/mobile layout; if GSC URL inspection is available, inspect `guides/chicken-coop-setback-from-property-line.html` plus Oregon, Portland and homepage.
- **Day 7 / 14 / 28**: in GSC compare impressions, clicks, query and page dimensions for Oregon hub, Portland, new guide, and homepage. Interpret indexing state and delayed GSC processing separately. Do not attribute unrelated GSC page growth to the guide.
- **GA4**: count unique actual `setback_worksheet_check` events and `planner_click` events where `source_page` is the guide path; segment by Direct vs Organic Search and exclude probable creator/self-testing. Track subsequent geometry checks, not merely clicks.
- **Editorial outreach**: one relevant BYC Portland old-law correction to moderators/editors only after verifying email and existing moderated post status. No guaranteed links or automated comment spam.
- **Stop condition**: if after a reasonable 28-day discovery period the guide has neither meaningful impressions nor authentic engaged visits, review indexing, query intent and distribution before writing more pages.

## Release QA

`node scripts/qa-setback-guide.cjs` checks canonical, contextual links, government sources, disclaimer content, sitemap and worksheet geometry. It runs on PRs and Pages release.
