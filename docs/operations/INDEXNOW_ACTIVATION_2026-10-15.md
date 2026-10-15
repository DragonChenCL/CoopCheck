# One-time IndexNow activation — 2026-10-15

This document intentionally acts as the **one-time activation marker** for the newly added IndexNow notification workflow in `.github/workflows/indexnow.yml`.

When this file is **first added to `main`**, the successful post-deployment notifier will submit **only the five priority URLs recently updated for CoopCheck**:

1. `/` — homepage
2. `/cities/portland-or.html` — Portland sourced law page
3. `/guides/chicken-coop-size-calculator.html`
4. `/guides/chicken-run-size-calculator.html`
5. `/guides/free-chicken-coop-floor-plans.html`

The notifier still checks that each of those pages is present in the sitemap, exists as an actual HTML file and does not declare `noindex`.

**Do not add this marker again.** It is a one-time deploy event, not a schedule or an evergreen instruction to re-submit URLs. Future publishing events notify only changed HTML or sitemap lastmod entries.

Success definition: IndexNow API responds HTTP 200 or 202 after verifying the public key's deployed availability. This is **delivery of a request**, NOT search engine crawl, indexing or rankings. Detailed implementation: [INDEXNOW_BING_2026-10-15.md](INDEXNOW_BING_2026-10-15.md).

Historical note: the first IndexNow workflow after PR #53 merge failed on an escaped checkout ref; fixed on main, the next workflow returned 0 changed URLs correctly. This one-time marker ensures the initial five are notified without bulk uploading 115 URLs.
