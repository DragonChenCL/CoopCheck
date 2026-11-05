# Evidence-led planning-tool content — 2026-11-05 (third editorial pass)

## Why these six pages

Previous revisions addressed the six flock-count guides, prebuilt-coop buyer evidence, and selected city pages. The remaining six independent intent tools already returned meaningful calculations, but often left users without a comparison between shape, usable dimensions, protection choices, quotes, and real decision constraints. This pass adds six separately authored quantitative decision cases in `scripts/lib/intent-decision-depth.cjs`. It does not claim fresh market prices, municipal legal research or first-hand product testing.

| Page | Distinct original decision case |
|---|---|
| Outdoor-run size | Three equal-area 60-sq-ft configurations; perimeter and six-foot mesh change from 32 ft / 192 sq ft to 46 ft / 276 sq ft. A 2-by-3-ft blocked bay reduces usable area to 54 sq ft. |
| Run fencing | Three 96-sq-ft layouts yield 376 / 404 / 488 sq ft of nominal mesh when six-foot walls, a mesh roof and one-foot apron are included. 4-by-50-ft roll area does not imply purchasable roll count because seams, cuts and panel widths matter. |
| Nest boxes | 12 to 13 laying hens changes ceil(n/4) from three to four boxes; spatial front-opening requirements, access and bed placement are counted separately. |
| Roost length | Two nominal 48-inch bars may have only 64 usable inches after hypothetical blocked ends; the eight-hen, nine-inch comparison is 72 inches. |
| Build cost | Seven separate hypothetical cash inputs sum to $1,000; a 15% *illustrative* reserve gives $1,150, and 20 hours at $25/hour *illustrative* contracted labor gives $1,650. Not price observations. |
| Concept plans | 4-by-4-ft sheltered floor plus separate 5-by-8-ft run gives 56 sq ft of actual example space, but side-by-side bounding rectangle is 72 sq ft versus 60 sq ft end-to-end, before any spacing or permits. |

## Authorities and limits

- Oregon State University Extension, *Living on the Land: Backyard chicken coop design*: https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design
- Penn State Extension, *Small Scale Poultry Housing* (updated June 2026), including barrier, toe, drainage and predator cautions: https://extension.psu.edu/small-scale-poultry-housing
- Utah State University Extension, *Basics for Raising Backyard Chickens* (nest dimensions and perch lengths): https://extension.usu.edu/poultry/research/basics-for-raising-backyard-chickens
- University of Connecticut Extension (buried L/J predator barriers): https://extension.uconn.edu/2018/05/21/basic-management-of-small-poultry-flocks/
- University of New Hampshire Extension (winter roost guidance): https://extension.unh.edu/blog/2024/02/how-should-i-take-care-backyard-chickens-winter
- University of Minnesota Extension (winter ventilation/manure and historic sample mobile-hut budget): https://extension.umn.edu/agriculture/animals-and-livestock/poultry/caring-for-chickens-in-cold-weather and https://extension.umn.edu/agriculture/farm-operations-and-systems/small-farms/farmbytes-diy-mobile-poultry-hut

This is an editorial update. Hypothetical wall heights, source dimensions, purchase prices, blocked spaces and bar clearances are not generalized into official thresholds. The new tables explicitly state their assumptions and do not hide the fact that source recommendations differ.

## Acceptance

- The six pages remain independently indexable, with self-canonical URLs and unchanged functional inputs and outputs.
- `scripts/generate-coop-intent-tools.cjs` remains deterministic; all six files are generated, checked and stamped with `2026-11-05` in the sitemap only for genuinely revised pages.
- The normal `qa-coop-intent-tools` suite includes `qa-intent-decision-depth` to guard links, dated source context, numerical examples and restrictions during both PR verification and production deployment.
- After merge, report GitHub Actions and connected-browser verification separately from new Google indexation, traffic, backlinks or purchase results.
