# CoopCheck source-depth editorial pass — 2026-11-05

## Scope

Seven existing URLs receive additional source-backed decision analysis. This is not a claim of seven new field studies, nor a blanket rewrite of the site.

| URL | Visible main-text words before | After | Net |
|---|---:|---:|---:|
| guides/prefab-chicken-coop-buying-guide.html | 1,601 | 2,353 | +752 |
| guides/prefab-chicken-coop-capacity-checker.html | 1,155 | 1,421 | +266 |
| guides/coop-size-for-8-chickens.html | 597 | 942 | +345 |
| guides/coop-size-for-6-chickens.html | 612 | 866 | +254 |
| cities/portland-or.html | 2,642 | 2,978 | +336 |
| cities/san-diego-ca.html | 1,343 | 1,666 | +323 |
| cities/sacramento-ca.html | 1,235 | 1,581 | +346 |
| TOTAL | | | +2,622 |

## Distinct value

- Compare publicly published Omlet Eglu Cube (34×33 in / 7.79 sq ft indoor) and Pro (58×33 in / 13.29 sq ft indoor) against CoopCheck's explicitly illustrative four-square-foot planning target. Manufacturer advertised capacity has a different meaning than usable indoor area per bird. Do not claim independent physical testing.
- A Producer's Pride Sentinel listing exposes 41.74×40.35 in for the house excluding run. This is only a 11.70-sq-ft *external-envelope maximum*, never a substantiated net interior.
- Eight-bird guide adds hypothetical 1/2/3/4-inch wall-thickness sensitivity in a 48×96 exterior shell; six-bird guide compares Extension recommendations for differing outdoor access conditions.
- Portland worked cases check lot size 9,600 vs 10,400 sq ft and 4 vs 6 adult birds, plus ten-square-foot shelter-or-pen minimum.
- San Diego worked geometry shows three *distinct legal tier* conditions, emphasizing that area calculations do not grant municipal authorization.
- Sacramento reconciles a **documented unresolved official-source conflict**: $20/hen + $47 coop fee in online FAQ versus $15/hen + $30 in hosted city PDF; illustrative three-hen amounts $107/$75. Contact city for authoritative current rates; do not invent a settled answer.

## Sources and provenance
- Oregon State University Extension: https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design
- Omlet manufacturer comparison: https://www.omlet.us/eglu-chicken-coop-comparison/
- Tractor Supply listing: https://www.tractorsupply.com/tsc/product/producers-pride-mini-defender-coop-mdc001
- Portland city code: https://www.portland.gov/code/13/40
- San Diego city guidance: https://www.sandiego.gov/urban-farming/bees-and-livestock/chickens
- Sacramento city FAQ: https://www.cityofsacramento.gov/community-development/animal-care/contact-us/faqs
- Sacramento city-hosted application PDF: https://www.cityofsacramento.gov/content/dam/portal/cdd/Animal-Care/pdf/Poultry_License_Permit_Application.pdf

All real-world product and legal claims link to traceable sources, all unknowns are stated, and all calculations are labelled hypothetical where appropriate. No legal registry evidence was silently overwritten.

## Verification

Local:
- Existing 24 Node QA suites plus round2 evidence QA PASS
- Four generator check modes PASS; rebuilding twice produces identical checked content
- Playwright 14 page/viewport scenarios (7 URLs × 390px and 1280px) PASS; no JavaScript errors, missing assets or document overflow
- Existing pending city `noindex,follow` preserved

Acceptance pending GitHub CI, production deployment, live browser validation. No claimed new Google index entry, search clicks, traffic or sale.
