# CoopCheck — IndexNow search-discovery integration (2026-10-15)

## Why

GSC URL Inspection was used to request priority Google indexing on five canonical URLs. The site had no corresponding IndexNow notification setup for engines that support the protocol (including Microsoft Bing). This is an **additional discovery channel**, not a ranking trick, Google indexing API or a traffic guarantee.

Official protocol: https://www.indexnow.org/documentation  
Official Bing guide: https://www.bing.com/indexnow/getstarted

## Implementation

- A **public domain-ownership key file** is installed at the root of the deployed site; the hosted key is intentionally public to crawlers and does not grant access to any site admin, analytics or cloud account.
- `.github/workflows/indexnow.yml` runs after the **Deploy CoopCheck to GitHub Pages** workflow completes successfully on main.
- It checks out the exact deployed Git commit with its parent, detects only added/modified canonical `site/*.html` pages and new/changed sitemap `lastmod` entries, intersects all of them with `site/sitemap.xml`, checks files exist and screens explicit `noindex` meta tags, then batches only the affected URLs to IndexNow.
- On its *first activation only*, when the root key file is added, it also notifies the **five recently updated core URLs** (home, Portland, chicken-coop sizing calculator, chicken-run size calculator, free chicken-coop concept plans). It does **not** bulk submit all 115 pages.
- A successful public key URL read and HTTP 200 or 202 from the IndexNow endpoint indicate delivery/acceptance **only**. HTTP 202 means validation may still be pending. It does not mean the URL was crawled, indexed or ranked.
- No Search Console/GSC status or city ordinance facts are changed. No Google IndexNow claim is made. Unlike a one-time bulk submission, future site changes get targeted notifications after deploy.

## Checks

1. Review GitHub Pages workflow result, then the separate IndexNow workflow run. Inspect the logged list of **only changed canonical URLs**, response status, and any errors.
2. Verify the key is actually accessible at the domain-root `https://coopcheck.serunio.com/<key>.txt` (do not confuse GitHub repository file existence with deployed availability).
3. Revisit Bing Webmaster Tools if already connected or later import the GSC property through the official import process. Check actual Bing crawl/index/performance in that console. **No Bing Webmaster account connection is required solely for the IndexNow protocol.**
4. At 7/14/28 days compare search discovery rather than treating notification delivery as organic traffic.

Avoid frequent automatic notification of unchanged pages and avoid treating Pages publish workflow success as proof IndexNow succeeded. No GA4 work in this batch per owner instruction.
