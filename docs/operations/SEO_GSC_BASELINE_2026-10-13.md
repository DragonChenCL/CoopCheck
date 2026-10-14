# CoopCheck | GSC / GA4 acquisition baseline — 2026-10-13

Source: connected Windsor.ai Search Console account `sc-domain:coopcheck.serunio.com` and GA4 `555450721` (CoopCheck). Requested reporting interval **2026-09-15 through 2026-10-12**, daily GSC rows returned through **2026-10-11**. GSC figures can lag.

## Search Console — actual query and page rows

| Landing page | Impressions | Clicks | Average position |
|---|---:|---:|---:|
| /states/oregon.html | 9 | 0 | 9.3333 |
| /cities/portland-or.html | 9 | 0 | 41.6667 |
| / (homepage) | 5 | 0 | 29.6 |
| **Total** | **23** | **0** | N/A |

Visible query rows were `chickens in the city limits` (1 impression, position 59) and `how many chickens can you have in the city limits` (1 impression, position 9). Query rows do not necessarily sum to page impressions because GSC suppresses some searches for privacy. Daily impression rows: Sept 24=3, Sept 25=2, Sept 26=9, Sept 27=2, Sept 28=2, Sept 29=3, Sept 30=1, Oct 1=1. The connector returned zero for Oct 2–11. This is **NOT** verified zero indexed pages: URL Inspection / Pages indexing coverage were not available in this retrieval. Earlier sitemap audit recorded **94 submitted URLs**; submitted is not indexed.

## GA4 — traffic and conversion

- Active users **5**, sessions **12**, `page_view` **55**. All reported sessions were grouped under Direct, so no measured Organic Search sessions in this interval.
- Session landing pages: root `/` 9 sessions; Portland city 2; coverage 1.
- Events: `city_page_view` 13, `planner_open` 4 (2 distinct active users), `planner_click` 3, `coop_draw_complete` 2, `geometry_check_complete` 1.
- Checkout: `payment_checkout_start` **8**, `payment_checkout_error` **7**, `payment_checkout_created` **1**. **All 16 checkout-related events occurred on September 23, 2026, from one active user**. These may represent repeated development tests, not separate real buyers; the current production payment failure rate is **unknown**. Checkout creation is NOT successful payment; no `paid_report_print` was returned.
- A prior code review of `site/assets/payment.js` found no successful order/entitlement claim in the GA4 series. Do a fresh sandbox end-to-end checkout/return/entitlement/print test before aggressively promoting the paid report.

## Technical SEO / tracking checks performed

- Homepage meta title, FAQ and canonical exist; Oregon hub explicitly targets the search intent `how many chickens ... city limits`.
- `site/robots.txt` allows crawling and points to the sitemap. The 12 paused/unverified city pages remain noindex / excluded from sitemap; do not expand solely to increase URL counts.
- Deployed pages **already** receive GA4 via the `pages.yml` recursive static-HTML injection step. No duplicate snippets should be added to source HTML. Changed the injected analytics script to `defer` and added a regression guard (minor non-blocking performance hygiene, not proof of SEO improvement).
- External attempt to inspect public live HTML failed in the browser/web tools, so **the live URL inspection and real indexing state remain outstanding**; checked code and deployment only.

## Next decision points

1. Pull the Google Search Console Pages index / URL Inspection information for **Oregon state hub, Portland city and homepage**, and record **indexed**, **crawled not indexed**, **discovered not indexed**, and explicit reasons separately. Recheck newly generated Oct 12–13 pages after 7/14/28 days, rather than assuming failure today.
2. Keep Oregon city-limits content accurate and prominent; it showed only 9 impressions, so avoid endless title changes or creating near-duplicate content. Editorial links and clear navigation to cited city guides are safer next tests.
3. Verify BackYard Chickens account/email + existing moderation queue before contacting editors with the outdated 2012 Portland legal summary. No published referral backlink can be claimed yet.
4. Track acquisition → `city_to_planner_click` → `coop_draw_complete` → checkout created → **entitlement granted** → paid print, distinguishing sessions/users and tests. Do not infer conversion from `payment_checkout_created`.
5. Treat a 7d/28d comparison as valid only when both windows have mature GSC data. If there are no organic sessions, outreach and discovery matter more than adding another 20 city pages.

## Legal-data caveat

Currently **326/400 scoped primary-checked fields, 26 source-recorded, 48 unverified in 12 paused/noindex city profiles**. Dallas's enacted **Ordinance 33485** was identified via Aug 12 city-council approval and an Aug 15 published legal notice; complete post-amendment §7-7.3 and parcel-specific conditions remain to be confirmed under [P0 Issue #38](https://github.com/DragonChenCL/CoopCheck/issues/38). Keep public warnings and manual planner.
