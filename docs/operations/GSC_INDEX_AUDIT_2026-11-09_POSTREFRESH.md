# CoopCheck GSC index audit — 2026-11-09 post-refresh

## Executive finding

The native Search Console index report has refreshed to **2026-11-06**. It now shows **1 indexed URL and 127 not indexed**: **23 Crawled - currently not indexed** and **104 Discovered - currently not indexed**. The crawled-not-indexed validation started 2026-10-22 and failed 2026-11-07. The discovered-not-indexed validation began 2026-10-13 and remains in progress.

This is a real, severe indexing problem, but the live checks below do **not** identify a blanket technical block, broken sitemap, canonical mismatch, HTTP failure, or orphan-page problem. Do not claim that a code fix has been found. The strongest current evidence is low Google crawl/discovery demand plus a site-wide indexing-selection problem that persists despite the 2026-11-05 content rebuild. Google has not yet re-crawled many URLs since that rebuild.

## Native GSC facts (authenticated browser, 2026-11-09)

Property: `sc-domain:coopcheck.serunio.com`.

- Page-indexing report last updated: **2026-11-06**.
- Indexed: **1**.
- Not indexed: **127**.
- **Crawled - currently not indexed: 23**; validation **failed 2026-11-07**, started **2026-10-22**.
- **Discovered - currently not indexed: 104**; validation **started 2026-10-13**.
- Search performance overview currently displayed **0 web search clicks** in its shown chart. Do not infer zero impressions from this overview; inspect the performance report with a fixed date range before making a trend claim.

### The 23 crawled-not-indexed examples shown by GSC

The table was set to show 23 examples. GSC last-crawl dates:

| URL | Last crawl |
|---|---|
| `/research/2026-backyard-chicken-laws.html` | 2026-11-05 |
| `/` | 2026-11-02 |
| `/guides/prefab-chicken-coop-capacity-checker.html` | 2026-11-02 |
| `/research/grover-beach-poultry-policy-october-2026.html` | 2026-10-29 |
| `/coop-plan.html` | 2026-10-22 |
| `/guides/chicken-coop-setback-from-property-line.html` | 2026-10-22 |
| `/guides/chicken-coop-size-calculator.html` | 2026-10-22 |
| `/cities/portland-or.html` | 2026-10-22 |
| `/guides/coop-size-for-4-chickens.html` | 2026-10-17 |
| `/guides/chicken-roost-length-calculator.html` | 2026-10-17 |
| `/guides/chicken-run-fencing-calculator.html` | 2026-10-17 |
| `/guides/chicken-coop-cost-calculator.html` | 2026-10-17 |
| `/guides/4x6-chicken-coop-capacity.html` | 2026-10-17 |
| `/states/texas.html` | 2026-10-17 |
| `/states/california.html` | 2026-10-17 |
| `/states/arizona.html` | 2026-10-17 |
| `/guides/chicken-run-size-calculator.html` | 2026-10-15 |
| `/coverage.html` | 2026-10-13 |
| `/cities/denver-co.html` | 2026-10-13 |
| `/cities/seattle-wa.html` | 2026-10-13 |
| `/cities/arlington-tx.html` | 2026-10-13 |
| `/sitemap.xml` | 2026-09-23 |
| `/planner.html` | 2026-09-23 |

The 2026-11-05 site-wide content rebuild postdates most of these crawl dates. Except for the research report crawled on Nov 5, many affected pages have not been shown by this report to have been re-evaluated after the rebuild. A failed validation is not proof that the rebuilt content was re-crawled and rejected.

### Discovered-not-indexed sample

GSC shows **104** URLs with no crawl date. The first visible examples include `/about.html` and city pages such as Anaheim, Ashland, Aurora, Austin, Avondale, Bakersfield, Beaverton, Bellevue and Bellingham. These are known/discovered URLs, not evidence that Google fetched and evaluated their current HTML. The full 104-row export was not captured in this pass; do not claim a complete URL inventory from the first visible page.

## Live production checks (2026-11-09)

A browser HTTP crawl fetched every URL in the published `sitemap.xml`:

- Sitemap contains **127 distinct URLs**.
- All **127/127** returned HTTP **200**.
- All 127 had one self-referencing canonical matching the sitemap URL.
- No sitemap URL returned a `noindex` meta directive.
- No sitemap URL was an orphan: every URL had at least one inbound internal link from another sitemap page.
- Static HTML link graph: **2,836 internal link occurrences** across the 127 sitemap pages. This is a raw occurrence count, not 2,836 unique source-target pairs.
- Lowest inbound-link counts included Grover Beach research (2), several sizing/capacity guides (3), and the embed calculator (3). Most city pages had roughly 23–36 inbound links.
- Live `/sitemap.xml` and legacy `/sitemap` both returned the same 127-URL XML body (13,780 bytes). Both GSC sitemap entries have existed historically; this duplicate endpoint is untidy but is not demonstrated to cause the indexing failure.
- Live homepage, Portland city page and chicken-coop-size calculator all returned HTTP 200 with self canonicals. Sampled pending city page Apache Junction returned HTTP 200, self canonical and `noindex,follow`; it is deliberately not in the sitemap.
- Live Cloudflare-managed `robots.txt` contains `User-agent: * / Content-Signal: search=yes / Allow: /` and the canonical sitemap directive. It separately blocks `Google-Extended` and other model/training crawlers; that is not a Googlebot Search block. The repo's 74-byte robots source differs from the 2,750-byte live response because Cloudflare injects its managed content. Do not overwrite the live robots policy based on the repo copy.

## Interpretation

1. **No proven blanket technical indexing blocker.** HTTP, canonical, robots search permission and sitemap coverage passed the live sample/crawl.
2. **Discovery is not the same as crawling.** 104 URLs remain discovered but have no crawl date in GSC. Repeated sitemap submission will not make Google crawl them.
3. **Crawling is not the same as indexing.** 23 URLs have been fetched, but Google has not selected them for indexing. The list includes homepage, useful calculators, research and state/city pages, so this cannot be explained solely by the 12 deliberately pending/noindex city profiles.
4. **The content rebuild is too recent for most affected pages to have been re-crawled.** The Nov 5 changes cannot be assumed to have been assessed on pages last crawled Oct 13–Nov 2.
5. **Internal discovery paths exist.** No sitemap URL is orphaned, and state/city internal links are present. Do not indiscriminately add every city URL to the homepage or generate more keyword-swapped pages.
6. **Independent endorsement remains weak.** Previous authenticated GSC link report was 0 external links; this audit did not establish any new earned backlinks. This is a plausible contributing weakness, not a proven sole cause.

## Actions taken this pass

- Re-opened the authenticated native GSC property and refreshed the index-report evidence.
- Opened both issue drilldowns and captured the 23 crawled examples and the visible first page of 104 discovered examples.
- Fetched all 127 live sitemap URLs and checked HTTP status, canonical, robots meta and internal inbound links.
- Compared live Cloudflare robots behavior with the repository source and confirmed search permission is explicitly allowed.
- Checked GitHub Actions: Pages deployment run **#492** for main commit `268d716ab80794d42052ae1096452117bbb4952e` completed successfully. Production already serves the same 127-URL sitemap.
- **No code change or repeat GSC submission was made**, because no code-level defect was demonstrated and five priority URL requests were already accepted on 2026-11-08 (homepage, size calculator, Austin, Portland and coop-plan generator; see `GSC_REINDEX_SUBMISSIONS_2026-11-05.md` and the Nov 8 section of `LOG.md`).

## Next actions — evidence-gated

1. Use GSC URL Inspection on the five Nov 8 requested URLs after Google has fetched their post-Nov-5 versions. Record last crawl, fetch result, declared canonical, Google-selected canonical and indexing decision. Do not repeat requests until the crawl/inspection state changes.
2. Capture/export the full 104 discovered URL table and classify each URL by page family, sitemap membership, internal inlink count, indexability and whether it is intentionally pending/noindex.
3. Recheck GSC after the index report refreshes again; compare against this Nov 6 snapshot. Track indexed count and impressions/clicks separately.
4. Prioritize a small set of pages with demonstrably unique search demand and utility (homepage, strongest calculators, strongest source-backed city examples). Keep 12 pending city pages noindex and out of the sitemap.
5. Pursue earned editorial citations and relevant community referrals, recording live published URLs and referral evidence. Do not buy links or count outreach emails as backlinks.
6. Only change production code when URL Inspection, crawl evidence or source comparison demonstrates a concrete defect. No promise of indexing is appropriate: Google makes the final selection.

## Outcome

**Diagnosis advanced; indexing outcome unchanged.** The audit confirms 127 live sitemap URLs are technically fetchable, canonical and internally discoverable, while GSC still reports 1 indexed / 127 not indexed. No new indexed URLs, clicks, backlinks or attributable users are claimed.
