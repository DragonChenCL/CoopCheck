# CoopCheck Policy Audit — 2026-10-12

This audit rechecked all 18 currently supported city policy summaries against official city/state sources before scaling the SEO footprint.

## Result

- 16 cities: verified against official sources with the current summarized rule set supported.
- 2 cities: verified for the limited claims CoopCheck makes, but the cited city page does not publish one universal quantity/setback rule.
- 0 unresolved contradictions found after correcting Phoenix in PR #3.
- The Phoenix stale `20 poultry / 80 ft from residence` rule has been removed and guarded by regression tests.

## City-by-city status

| City | Status | Notes |
|---|---|---|
| Chandler, AZ | Verified | 5 chickens, no roosters, rear/side yard, 5-ft property-line coop setback, permit triggers confirmed. |
| Mesa, AZ | Verified | 10 fowl/rabbits total on lots under 1/2 acre; rooster noise rule and code-specific enclosure restrictions confirmed. |
| Phoenix, AZ | Verified | Current G-7300 framework: 6-poultry baseline, 20-ft neighboring-property-line enclosure rule, written-consent/larger-lot provisions. |
| Tempe, AZ | Verified | 6 domestic chickens, rooster restriction, use-permit path, enclosure-height rule confirmed. |
| San Diego, CA | Verified | 5/15/25 chicken tiers, no roosters, and setback-based placement confirmed. |
| Sacramento, CA | Verified | 3 chickens, no roosters, annual licenses/coop permit, rear-yard and 20-ft neighboring-dwelling rule confirmed. |
| Denver, CO | Verified | 8 hens/ducks combined, FPA permit, rear 50% placement and 15-ft dwelling separation confirmed. |
| Colorado Springs, CO | Verified | 10 rabbits/chickens aged 6+ months, no roosters, shelter/accessory-structure requirements confirmed. |
| Portland, OR | Verified | Current 2025-amended Title 13 rules confirmed: 4 on any lot, 6 on >=10,000 sq ft, rooster restrictions and facility standards. |
| Eugene, OR | Verified | 6 adult + 6 young fowl, no roosters, 10-ft enclosure/property-line rule with written-consent exception confirmed. |
| Salem, OR | Verified | 12 poultry, no roosters, no standard permit/license, rear-yard and 25-ft adjacent-residence rule confirmed. |
| Gresham, OR | Verified | Permit, 3 adult hens, no roosters, rear-yard, 10-ft property-line and 25-ft neighboring-dwelling rules confirmed. |
| Seattle, WA | Verified | 8 domestic fowl, no roosters, 10-ft separation from residential structures on adjacent lots confirmed. |
| Spokane, WA | Verified | 1 fowl/small domestic animal per 1,000 sq ft and zoning-based animal standards confirmed. |
| Vancouver, WA | Verified — limited scope | Official source confirms chickens allowed and roosters/peacocks prohibited; no single universal quantity/setback is published on the cited page. |
| Austin, TX | Verified — limited scope | Official source confirms residential chicken keeping and 30-ft enclosure separation for 2+ chickens; quantity remains code/parcel dependent. |
| Arlington, TX | Verified | 4 chickens without distance/lot-size restrictions; larger-flock thresholds and rooster restriction confirmed. |
| Fort Worth, TX | Verified | 12 fowl on <=1/2 acre, up to 2 roosters, larger-lot tiers, >50-ft regulated-structure rule confirmed. |

## Data architecture

`site/data/cities.json` is now the canonical policy registry.

It stores:
- city identity and SEO slug
- flock/rooster/permit/placement summaries
- planner automation mode
- official source list
- verification date
- audit status and audit note

`site/assets/data.js` is generated from the registry by:

```bash
node scripts/generate-policy-data.cjs
```

CI uses:

```bash
node scripts/generate-policy-data.cjs --check
node scripts/qa-coopcheck.cjs
```

The QA suite now fails if:
- the generated browser data drifts from the registry
- a city has no audited HTTPS source
- a city page verification date disagrees with the registry
- a city page contains none of its audited official sources
- the stale Phoenix 80-ft / 20-poultry rule returns

## Next scaling gate

Before adding hundreds of cities, new city records should enter through `site/data/cities.json`, include at least one official source and audit metadata, then pass the generator + QA checks.
