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

The current authoritative completeness report is [POLICY_COMPLETENESS_2026-10-13.md](POLICY_COMPLETENESS_2026-10-13.md): **88** cities have at least some source-reviewed facts (not blanket legal approval), **12** remain pending/noindex, and **326/400** individual city×field claims have primary city code/guidance evidence. Bend's flock/rooster facts are limited-scope; chicken-coop permits and location remain unverified. Earlier counts above are historical batch snapshots. Keep unconfirmed fields clearly scoped and property-specific zoning/permit/setback decisions manual.

## Final 26-field follow-up (2026-10-13)

Of 26 originally source-recorded legal claims, **2** gained explicit city-official, scope-limited evidence (Yakima permit/building threshold; NYC lack of a universal numeric statement in its guidance). **24** must stay unconfirmed; 48 fields remain unverified for the 12 paused/noindex cities. See [26-field disposition and Dallas 2026 critical law change](docs/operations/FINAL_26_FIELD_REVIEW_2026-10-13.md). Research completeness is not parcel permission.

**Dallas August 2026 effective-law caveat:** The final-26 audit initially promoted 2 fields, but Dallas old rooster/placement claims were later downgraded by 2 due to city-council-approved repeal of prior §7-7.3. Current **326/400 checked, 26 source_recorded, 48 unverified**; see [P0 #38](https://github.com/DragonChenCL/CoopCheck/issues/38).

## Acquisition baseline after legal evidence pass

Windsor.ai GSC/GA4 2026-09-15..10-12 reports 23 organic impressions, zero search clicks, 5 GA4 active users and 12 Direct sessions. The checkout errors were all from one active user on 2026-09-23, not evidence of a current production outage. See [timestamped GSC/GA4 baseline and priorities](docs/operations/SEO_GSC_BASELINE_2026-10-13.md). Dallas Ordinance No. 33485's official public notice confirms a repeal of the prior categorical rooster ban, but property-specific zoning and enclosure rules remain manual; see [P0 #38](https://github.com/DragonChenCL/CoopCheck/issues/38).


## Pending-city 2026 primary-source follow-up

Direct current Apache Junction **2026** municipal Land Development Code §1-6-17 and Table 5-2 establishes 3 scoped claims (lot-dependent hen count with Arizona statewide six-bird preemption, non-RS-GR rooster prohibition, livestock-structure setbacks). **Permit not established; Apache Junction remains needs_review/noindex/manual.** New totals: **329/400 primary-checked; 26 source_recorded; 45 unverified**, with 12 paused/noindex city profiles. See [current pending law research](docs/operations/PENDING_LAW_RESEARCH_2026-10-13.md). Historical totals earlier in this README are snapshots.


## Latest owner-approved relaxed source inventory (2026-10-13)

ONLY the 45 remaining `unverified` city-policy entries have been given official-code/government research references and per-field `verifiedClaim:false` caveats. The strict original 329 primary-checked and prior 26 source-recorded fields are NOT changed. New registry tally **329 primary, 71 source-recorded, 0 no-reference**. **Still 71 legally unresolved fields**, not 400 approved/chicken-safe legal answers. All 12 pending city profiles stay noindex/manual and outside automated rules. See [the 45-field evidence-strength ledger](docs/operations/PENDING_45_EVIDENCE_TIER_2026-10-13.md) and [completeness audit](POLICY_COMPLETENESS_2026-10-13.md). Earlier count snapshots are historical.


## First SEO acquisition experiment — free chicken coop setback guide

Launched a source-led [property-line vs neighboring-house setback explainer](site/guides/chicken-coop-setback-from-property-line.html) with a geometric, **user-supplied-distance** fit worksheet. Page links to the free map sketcher and cites specific Portland/Seattle/San Diego city rules; it makes no nationwide numeric permit promise or parcel compliance finding. Home, Oregon and Portland hub link to it; a single canonical guide URL is added to the generated sitemap. Build/QA: `node scripts/qa-setback-guide.cjs`. See [GSC and event-funnel baseline + 7/14/28-day measurement plan](docs/operations/SEO_EXPERIMENT_SETBACK_GUIDE_2026-10-13.md). Traffic and indexing outcomes are not yet established.
