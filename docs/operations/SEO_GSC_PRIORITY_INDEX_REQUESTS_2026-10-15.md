# CoopCheck — GSC priority URL inspection and index-request execution log

**Execution:** 2026-10-14 America/Los_Angeles (Search Console browser displayed 2026-10-15).  
**Property:** `sc-domain:coopcheck.serunio.com`.  
**Operator:** ChatGPT via user-authorized connected GSC browser; reused the existing GSC tab.  
**Scope:** Exactly five high-priority canonical URLs; **not** a bulk indexing submission.

## Result — five of five requests accepted

For each URL, the browser performed a Google Search Console **URL Inspection → Test live URL → Request indexing**. Every live test returned `网址可编入 Google 索引` (URL can be indexed). Every request returned the explicit success dialog `已请求编入索引` and `已将网址添加到优先抓取队列中` (URL added to priority crawl queue).

| Priority | URL | Google indexed-version status **before** request | Live test | Request |
| --- | --- | --- | --- | --- |
| P0 | https://coopcheck.serunio.com/ | Crawled — currently not indexed; last GSC crawl 2026-09-23 14:25 (GSC screen) | Can be indexed | Accepted |
| P0 | https://coopcheck.serunio.com/cities/portland-or.html | Crawled — currently not indexed; last GSC crawl 2026-10-13 10:47:16 (GSC screen) | Can be indexed | Accepted |
| P0 | https://coopcheck.serunio.com/guides/chicken-coop-size-calculator.html | URL is unknown to Google; no recorded crawl | Can be indexed; one valid breadcrumb | Accepted |
| P1 | https://coopcheck.serunio.com/guides/chicken-run-size-calculator.html | URL is unknown to Google; no recorded crawl | Can be indexed; one valid breadcrumb | Accepted |
| P1 | https://coopcheck.serunio.com/guides/free-chicken-coop-floor-plans.html | URL is unknown to Google; no recorded crawl | Can be indexed; one valid breadcrumb | Accepted |

**Crucial distinction:** an accepted indexing request is **not** a Google indexing guarantee or a search ranking. Do not claim that these five URLs are now indexed. Do not resubmit them repeatedly.

## Starting baseline, deliberately separated by reporting date

- GSC **Pages indexing report as of 2026-10-09:** 1 indexed URL (Oregon state page), 26 not indexed (22 discovered / not crawled; 4 crawled / not indexed, including sitemap.xml). This report is **lagged** and does not include all recent URLs.
- GSC **Sitemaps as of 2026-10-15 browser screen:** `/sitemap.xml` successfully processed, **115 discovered URLs**, zero errors, zero warnings. Google last downloaded sitemap on 2026-10-15 01:06 UTC. Submitted URLs are not indexed URLs. An older `/sitemap` entry showing 26 URLs also remains listed.
- GSC **Search performance 2026-09-15..2026-10-14:** 23 impressions, 0 clicks; visible page impressions: Oregon 9, Portland 9, home 5. The connector reports no subsequent impressions after 2026-10-01 through the requested date; GSC data may lag.
- GA4 property **555450721**, **2026-09-20..2026-10-14:** 22 Direct sessions, 0 identified Organic Search sessions, 5 active users, 107 pageviews. A large share may be development or automated test visits; do not interpret these as external demand or a conversion funnel.
- GSC **Links** report showed 0 reported external links. This is a GSC reporting count, **not** proof no links exist anywhere.
- The newly improved Portland law page was deployed under PR #52 before this five-URL inspection. Its content changed on October 14, **after** Google's indexed-version crawl on October 13.

## Next checks and decision criteria

1. **~7 days (2026-10-21 LA):** Reinspect the five URLs and confirm any new Google crawl timestamps, indexed/not-indexed classifications, 7-day query impressions, and whether the September/October GSC lag has cleared. Do not submit indexing again just because indexing is pending.
2. **~14 days (2026-10-28 LA):** Compare `discovered → crawled → indexed` for this five-URL cohort. If tools were successfully crawled but remain not indexed, examine unique search utility, depth of original content, internal links and Google's chosen canonical for each page. Consider one targeted revision, not 100-page mass rewrites.
3. **~28 days (2026-11-11 LA):** Measure actual US-relevant traffic, Organic Search sessions, engaged tool use and export actions, after excluding owner/test traffic. Decide whether to invest in city-law intent, calculators, diagrams, or distribution. Avoid drawing inferences from tiny samples.
4. Validate GA4 production/test tagging and a genuine end-to-end checkout path separately; historical Sep23 checkout errors were likely test activity and do not establish a real-user failure rate.
5. Seek sourced editorial/community mentions and genuine referral visits; no fake comments, link purchases or backlink success claims.

**No additional indexing requests, outreach postings, or paid checkout operations were performed in this batch.**
