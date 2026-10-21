# Pinterest domain block — manual review request (not yet submitted)

Date: 2026-10-20 (local), 2026-10-21 UTC
Pinterest profile: https://www.pinterest.com/coopcheckplans/
Claimed website: https://coopcheck.serunio.com/
Public support mailbox (verified rendered on website): support@serunio.com

## Confirmed behavior
- Website claim exists in Pinterest's own "Claim" settings.
- HTTPS homepage, robots.txt, sitemap.xml, planner and free plan tool returned HTTP 200 with no homepage redirect (checked in a normal browser).
- 2026-10-21: newly added trust pages all HTTP 200:
  - https://coopcheck.serunio.com/about.html
  - https://coopcheck.serunio.com/contact.html
  - https://coopcheck.serunio.com/privacy.html
  - https://coopcheck.serunio.com/terms.html
- The homepage and several entry tools now link to About/Contact/Privacy/Terms; sitemap includes all four.
- GitHub Pages deploy succeeded: https://github.com/DragonChenCL/CoopCheck/actions/runs/39535820990
- Pinterest refused https://coopcheck.serunio.com/coop-plan.html in Edit Pin for https://www.pinterest.com/pin/1125337025678091203/ with Chinese error: "抱歉！我们阻止了此链接，因为它可能转至垃圾信息。" This was a post-deployment confirmation. The existing Pin was not updated with the blocked URL.
- Pinterest help contact UI https://help.pinterest.com/en/contact/ for this logged-in account currently displayed only **Report a policy violation** and **Privacy rights**; not an "Appeals / Pinterest blocked my site" submission form. Neither unrelated option was used.
- Status: **NO SUCCESSFUL OFFICIAL APPEAL SUBMISSION; no ticket ID; no support response**.
- No redirects, link shorteners or other bypasses used.

## Prepared complaint
Subject: Request for Manual Review — CoopCheck Website Incorrectly Blocked as Spam

Hello Pinterest Support,

I manage the Pinterest account @coopcheckplans and the verified website https://coopcheck.serunio.com/.

Whenever I try to add our direct website URL to a Pin, Pinterest displays: "Sorry! We blocked this link because it may lead to spam." This was reproduced again after updating the website at https://www.pinterest.com/pin/1125337025678091203/ when adding https://coopcheck.serunio.com/coop-plan.html.

CoopCheck provides original backyard chicken rule research with official source links, free coop sizing and layout planning tools, and an optional $4.99 printable planning report. The report is clearly described as a planning aid, not a legal permit or construction approval.

We have confirmed:
1. The domain is claimed in our Pinterest account.
2. The website is accessible via HTTPS with HTTP 200 and without unrelated homepage redirects.
3. Its robots.txt permits crawling and its sitemap is available.
4. We added publicly accessible About, Contact, Privacy Policy and Terms pages, plus support@serunio.com.
5. Our Pin descriptions reflect the actual free features and limitations of the corresponding site.

Would you please manually review and reconsider this block? If there is a specific link-safety issue or policy concern, please identify the affected URL and reason so we can correct it.

Website: https://coopcheck.serunio.com/
Pinterest: https://www.pinterest.com/coopcheckplans/
Contact: support@serunio.com

Thank you,
CoopCheck Team

## Next actions
1. Submit the text using Pinterest's legitimate blocked-site appeal form if it becomes available in the claimed account; do not use the spam-abuse reporting form against the site.
2. Use support@serunio.com as the contact email if the form offers an email field.
3. Preserve the submission confirmation, request ID, and any follow-up; avoid duplicate appeals without new evidence.
4. After approval, edit Pins to link directly to relevant tool/guide URLs.
