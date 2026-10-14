# CoopCheck 运营执行日志

## 2026-10-14 — Second SEO intent cluster launched and independently tested

- PR #51 was merged into `main` (commit `eb0984f219ee5c89606dfc3d3ee1e0d3b0f309db`). Successful GitHub Pages workflow: https://github.com/DragonChenCL/CoopCheck/actions/runs/38517239429 .
- Both PR CI workflows succeeded, including the genuine Chromium end-to-end suite and law/SEO/payment regression checks.
- With one reused cfbrower tab, individually verified all **6 new public URLs** return HTTP 200, distinct HTML titles/H1, self-canonical, `index,follow`, and nonempty meaningful content. Existing new sitemap https://coopcheck.serunio.com/sitemap.xml has HTTP 200 with **115 URLs**.
- Live functional checks: 8 hens + 6×10-ft run -> 80-sq-ft target vs 60-sq-ft entered (warning); 8×12-ft run with 6-ft mesh height, covered roof and 1-ft apron -> 40-ft perimeter, 240-sq-ft wall mesh, 96-sq-ft roof, 40-sq-ft apron, total 376-sq-ft before overlaps; 12 hens -> 3 nest boxes; 8 hens -> 6 ft roost across 2 user-specified 4-ft bars.
- Live cost worksheet: $250 framing + $120 siding -> **$370 partial subtotal, 6 unresolved categories**, not a fabricated fully priced project.
- Live 375px checks: all six pages fit with no horizontal overflow. Nesting calculator for 30 hens hides the 2D generator deep link (current generator max24); for 12 hens, click successfully transfers `flock=12` and renders SVG.
- **No claim of Google indexing, rankings, organic sessions, real payments or backlink creation.** Follow GSC query/page metrics 7/14/28 days from publication and consolidate pages that Google interprets as duplicates.
- Search-intent experiment map: `docs/operations/SEO_SECOND_INTENT_TOOLS_2026-10-14.md`.

## 2026-10-14 — Second SEO tool cluster: six independent search intents

- Built 6 new tools/content pages: chicken run size, chicken run fencing area, nest box count, roost bar length, user-input construction budget, and free conceptual chicken coop plan directory.
- All five calculators are functional (local-only JavaScript). Quote worksheet records unknown categories as unpriced rather than fabricating supplier costs; mesh tool is geometry only, no engineering/cut list.
- First 10 SEO sizing pages now link back to six new tools; home, setback guide and SVG concept generator also link to them. Generator accepts flock handoff for 2–24 birds only and new calculator buttons hide beyond the supported scope.
- Canonical sitemap target **115 URLs** (109 old + six intent tools), no changes to city-law statuses or published evidence.
- Independent math checks, drift verification, responsive CSS and real Chromium E2E are part of PR CI and Pages deployment.
- User journey tested/actual publication status tracked separately when CI and public hosting checks complete. **No search volume, indexing, Google rankings or paid orders claimed.**
- Reference and keyword map: `docs/operations/SEO_SECOND_INTENT_TOOLS_2026-10-14.md`.

## 2026-10-14 — SEO launch verification (PR #50)

- PR #50 merged to main (squash `d8b3593f9791ac05c777fa9462ffc5287e908f30`); GitHub Pages deployment **SUCCESS**: https://github.com/DragonChenCL/CoopCheck/actions/runs/38513648249 .
- PR CI completed successfully for both policy/search/SEO generator and real Chromium suite. Search utility test validated 10 distinct pages, source disclaimers, original drawings, 109 canonical sitemap entries, and no change to pending-city indexing or existing paid flow.
- cfbrower publicly opened **all 10 URLs**, each returned HTTP 200, correct distinct H1 and canonical URL, `robots=index,follow` and a real independently readable answer (approx 2.7–3.8K visible characters of primary content).
- Public interactive calculator: 12 hens -> 48 sq ft indoors, 120 sq ft run, 3 nest boxes, 9 ft total roost. Clicking the CTA transferred `flock=12` into the publicly deployed SVG generator correctly.
- Public sitemap at https://coopcheck.serunio.com/sitemap.xml: HTTP 200, **109 URLs**. 375px mobile screenshots/width checks: calculator and six-hen guide fit, with no horizontal overflow. All checks used one cfbrower tab.
- **Google indexing, ranking, CTR, clicks and revenue NOT yet confirmed.** Review GSC at 7, 14 and 28 days; no claim that new pages have been indexed or produce SEO traffic.
- Keyword map and ongoing monitoring plan: `docs/operations/SEO_CHICKEN_COOP_SIZE_CLUSTER_2026-10-14.md`.

## 2026-10-14 — SEO intent-cluster expansion: practical coop size and flock dimensions

- Implemented first **10 high-intent landing pages**: interactive `chicken-coop-size-calculator`, flock count 4/6/8/10/12/16, and measured indoor coop footprints 4×6/4×8/6×8. Generated with original on-page answer, variable-specific constraints, separate coop/run size illustrations, university husbandry source links and working layout-generator CTA. No unverified keyword search-volume claim.
- Upgraded homepage, existing setback explainer and layout generator internal links; new guides crosslink with one another and link to city rules.
- Implemented `?flock=N` controlled plan prefill from SEO guides (2–24 valid hens only; city law context takes priority), and true client-side size calculator without external API.
- Added 10 canonical sitemap URLs, expected site total **109** (99 previous + 10). Pending city profiles remain excluded.
- Added CI checks for generated guide drift, canonical/unique titles/description, capacity math, source boundaries, and actual browser calculator → SVG planning funnel.
- **Status to validate:** PR/CI, public Pages deploy, live browser, then GSC indexing. Content existence is not proof Google indexed it.
- Keyword/measurement details: `docs/operations/SEO_CHICKEN_COOP_SIZE_CLUSTER_2026-10-14.md`.

## 2026-10-13 — Austin enacted-code consistency follow-up

- Compared old `quick-check-data.js` wording against Austin enacted Ordinance 20221013-030 (§3-2-16(D)-(E), effective 2022-10-24) at https://services.austintexas.gov/edims/document.cfm?id=396841 . The 30-ft enclosure-to-adjacent-residence/business structure rule applies to **all fowl enclosures**, not only 2+ chickens; the 50-ft provision applies when fowl or enclosure creates a health hazard. The current city overview still retains older threshold wording.
- Updated Quick Check's Austin source, description, enclosure/permit caveats and result across home, map and coop plan without inventing an unconditional flock allowance, rooster permission or permit waiver.
- Versioned shared quick-check data assets to invalidate browser caches; added 1-fowl and 30/50-ft regression tests in Node and real Chromium.
- PR #49, status tracked separately from deployment. Legal notes are **not parcel approval**.

## 2026-10-13 — City law → free coop plans → map product integration

- Implemented `/coop-plan.html?city=<slug>&source=rules` route from all 88 reviewed city guides (82 generated and 18 hand-maintained), without indexing or endorsing the 12 pending profiles.
- New generated city context bundle derives from `cities.json` **and** `policy-evidence.json`; displays only `primary_clause_checked` positive field claims with `verifiedClaim!==false`. Source-locator-only fields explicitly show not confirmed.
- Existing five-city quick screening reused (including Portland 4/6 tiers with optional lot size, rooster warnings and context links); other cities display relevant verified facts and official sources but get no inferred numeric approval.
- From map planner, selected city is passed to free plan generator with a saved-coop-only bounding-box reference. **Important correction:** coop-only polygon is NOT prefilled as total coop-and-run area. No automatic buildable-area or legal compliance guarantee.
- Printable preview includes source-scoped selected-city caution. Controls preserve independent 2D geometry targets and no new paid API.
- Regression suite: `qa-plan-law.cjs`, `qa-coop-plan.cjs` and real Chromium `e2e-coop-plan.cjs`. A mobile overflow defect in the new long-law card was identified by E2E and fixed before merge.
- Track `chicken_coop_plan_generate` with optional city slug and `map_to_coop_plan` city referral; no street address, survey polygon or precise measurements sent in new tracking fields.
- Full scope: `docs/operations/LAW_TO_COOP_PLAN_HANDOFF_2026-10-13.md`. PR #47. **No claimed organic traffic, paid conversion, legal approval or public deployment until CI and Pages confirm.**

## 2026-10-13 — Free parametric chicken-coop plan generator MVP

- User authorized building a free 2D coop-plan generator rather than expanding city-law page count. Implemented local JavaScript dimension/area engine, 3 conceptual templates, self-contained SVG layout preview, SVG/PNG download, native print/PDF option and responsive UI.
- Added separate **illustrative** 4sqft indoor + 10sqft outdoor run per adult laying hen target with sources from OSU, PSU and UMN extension. This is *not* a verified local chicken ordinance or structural construction drawing. Warning if available space fails either target; roost/nest symbols and spatial access remain schematic.
- Added planner → generator map handoff using locally saved **approximate axis-aligned coop-polygon bounding box** where available. No coordinates, address or measurements sent by the generator.
- Added route from homepage and free setback guide, new canonical sitemap URL, free-without-checkout download UX, privacy-minimal generate/export analytics events and regression tests in PR / Pages CI.
- Technical details, safety scope and planned GSC/GA4 7/14/28-day checks: `docs/operations/COOP_PLAN_GENERATOR_MVP_2026-10-13.md`. No claim of search indexing, organic visits, paying customers or structural approval.

## 2026-10-13 — BYC contact-form failure; stop repeats

- User attempted the BackYard Chickens contact form twice: first a referenced Portland city-ordinance correction request, then a shorter plain-text/no-URL version. Both returned: "Your content can not be submitted. This is likely because your content is spam-like or contains inappropriate elements." **Neither submission succeeded.** Do NOT count either as outreach sent, article correction, backlink or approved post.
- Stop repeated submissions or filter circumvention; no proof which content or account/anti-spam rule caused rejection. Mark BYC public contact form `blocked_by_spam_filter`. Do not advise new accounts, IP rotation, alternate spelling tricks or further variants.
- Editorial target remains a valid documented outdated ordinance lead, but do not retry via the failed form. Community Chickens guest pitch was already sent on 2026-10-13; avoid duplicate.
- Alternate researched publication: https://boskizbackyard.com/write-for-us explicitly permits one genuinely relevant disclosed link and requests short topic pitches; **requires firsthand chicken-keeping/DIY experience**. Do not invent credentials or send an AI-written expert impersonation. Only contact with verified personal experience/accurate research framing that the publisher accepts.
- Next practical focus: monitor actual GSC indexed pages and original guide worksheet-to-planner engagement; consider ethical link opportunities from editorial resource pages based on the original legal geometry explainer, not mass guest-post spam.

## 2026-10-13 — Next acquisition step after GSC manual submissions

- User confirmed GSC manual URL inspection/index request work completed; no verified Google index outcome implied, avoid duplicate submissions.
- Gmail `SENT` confirmed Community Chickens guest feature email was already sent 2026-10-13; no relevant editorial reply confirmed; **do not send duplicate outreach**.
- Public BYC Portland article still carries old pre-2025 3-bird rule (2012 article); compared against official current Portland City Code §§13.40.020, 13.40.040 (amended Ordinance 192002 effective 2025-01-10). BYC Terms ban ads outside specific areas and restrict competing-site promotion absent relevant approval.
- Prepared a *correction-only*, source-first English message and verified contact-form URL in `BYC_PORTLAND_EDITORIAL_CORRECTION_2026-10-13.md`. **No form submission, published backlink, referral or editorial acceptance claimed**. CAPTCHA/manual verification prevents automated submission until user completes it or browser tool is available.
- Await the existing Search Console indexing validation and later measure actual GSC impressions/clicks, GA4 guide worksheet submissions + map-planner transitions. No new generic city pages until there is evidence of demand.

## 2026-10-13 — First source-led SEO acquisition experiment

- Built a dedicated, canonical free [chicken coop setback explainer](https://coopcheck.serunio.com/guides/chicken-coop-setback-from-property-line.html) with original educational property-line vs neighboring-dwelling diagram, official Portland/Seattle/San Diego primary links, and in-browser user-buffer **geometry-only** worksheet (not a municipal compliance check).
- Added internal links from homepage, Portland and Oregon already visible in GSC, and guide links back to city evidence and planner; included sitemap canonical URL. The generator now updates the Oregon hub lastmod to this date. No new city-law claim promoted.
- Added privacy-minimal `setback_worksheet_check` submit event with boolean fit only; existing site analytics captures guide-to-planner `planner_click` with source path.
- Added regression test and included it in PR + Pages CI. Baseline and 7/14/28-day conditions in `SEO_EXPERIMENT_SETBACK_GUIDE_2026-10-13.md`. This entry records implementation, **not indexed status, new traffic, published external links or conversions**.

## 2026-10-13 — Relaxed evidence registration ONLY for 45 unverified entries

- Per owner request, checked city-specific municipal code publishers, approved ordinance listings, municipal animal/zoning/building FAQ and qualifying state law for the **45 formerly `unverified` fields** in 12 paused cities. Each entry now provides an official research URL, strength label, scope caveat and `verifiedClaim:false`. No independently proved new permit, flock maximum, rooster authorization or structure-setback clearance was claimed.
- Count changed **329 primary / 26 source_recorded / 45 unverified → 329 primary / 71 source_recorded / 0 unverified**. The **71 source-only fields are still unconfirmed**; this is source coverage, not a legal verification achievement.
- Original 329 + original 26 were untouched. All 12 candidate cities remain needs_review/noindex, absent from sitemap and verified planner data; regenerated official-source reference links in their pages.
- Provenance ledger: `docs/operations/PENDING_45_EVIDENCE_TIER_2026-10-13.md`. Especially avoid treating generic city code indexes, old Renton code, proposed Round Rock redline, or animal-aviary permit rules as a blanket household chicken law.

## 2026-10-13 — 12-city pending primary-law recheck (Apache Junction)

- Researched all 12 outstanding first-100 pending cities via city-site, ordinance/publication and code searches, but only Apache Junction provided unambiguous CURRENT 2026 city-code section content for three fields: **max / roosters / placement** at municipal LDC §1-6-17(C),(I), Table 5-2 note 4, reconciled with state A.R.S. §9-462.12. No current municipal chicken license or building-permit result obtained, so status stays noindex/manual and `needs_review`.
- 2014 Apache Junction Commission DRAFT explicitly rejected as current law; Queen Creek March 2026 proposal/2026 ordinance changes still need enrolled final effective text; Renton third-party September compilation cannot substitute inaccessible current code text; Pueblo council agenda amendment needs final enacted version. Not promoted.
- Verified 3 additional primary fields, **329/400 primary, 26 source_recorded, 45 unverified**. Search was not 48 independent complete legal confirmations. See policy completeness and city registry. No synthetic municipal replies or indexing claims.

## 2026-10-13 — Updated GSC/GA4 and Dallas ordinance 33485

- Live Windsor.ai GSC + GA4 snapshot for 2026-09-15..2026-10-12: Search Console **23 impressions, 0 clicks** across Oregon 9 (mean position 9.33), Portland 9 (41.67) and homepage 5 (29.6). Only two query rows visible; GA4 **5 active users, 12 sessions, 55 pageviews; all sessions Direct**. Full sourced baseline and next checkpoints: `docs/operations/SEO_GSC_BASELINE_2026-10-13.md`.
- Payment errors are historical Sept 23 cluster from one active user: 8 starts / 7 errors / 1 created. Not enough evidence to label current checkout broken; no confirmed paying customers. Follow-up sandbox payment flow test outstanding.
- Dallas **Ordinance No. 33485** now confirmed in published city-ordinance legal notice dated August 15 after Aug 12 approval. Public page now describes repeal without asserting universal rooster entitlement. Old 20-ft special-exception placement remains unverified; P0 #38 stays open.
- Verified GA4 deployment pipeline covers static pages. Updated injected analytics script to `defer` to avoid parser blocking and added CI guard. No claimed ranking increase or successful new backlinks.

## 2026-10-13 — Last 26 source-recorded legal field triage

- Inspected all 26 remaining source-recorded city×field gaps; 2 positively scope-verified with direct current city government FAQ; 24 unresolved preserved. New totals **328/400 checked, 24 source recorded, 48 unverified**. No new cities, no extra planner clearances or synthetic permits.
- Yakima WA: municipal accessory-construction permit threshold; NYC NY: official FAQ's hen allowance without a universal numeric quantity assertion. Details and citations in `docs/operations/FINAL_26_FIELD_REVIEW_2026-10-13.md`.
- **Critical newly discovered:** Dallas official August 12, 2026 approved item 26-2375A describes repeal of rooster ban, which may supersede current site's cited §7-7.3 exception/setback text. Dedicated P0 follow-up required before publicly relying on the old figures.

## 2026-10-13 — Fifth batch twenty animal and coop structure permissions

- 20 more existing field-specific claims scoped against official permit, building and animal code guidance. **326/400 mapped, 26 source_recorded, 48 pending**, 88 city summaries reviewed and 12 withheld cities unchanged.
- **Gilbert 2024 Ord2911 correction**: previous FAQ 25 combined fowl/rodents not valid as an unconditional chicken quota on <=0.5acre homes: current LDC 5.2.2(A)(5) 6 chickens, 20ft line, 1 mature rooster / 20k sqft. Changed previously checked maximum without claiming extra progress.
- Permit work identifies precise construction thresholds (Phoenix >200, Arlington shed >100, Goodyear <=200 no utilities, Casa Grande <=200 still site approval, Tucson all small sheds still zoning review, Kent >=200 shed permit, Tigard <=200/15ft conditional, Glendale >120 sqft and zoning clearance, Lake Oswego chicken coop explicitly accessory structure). Non-construction animal licences are distinct.
- Corvallis animal registration exception narrow; NYC commercial 25ft must not be copied to home hens; Avondale state fence-height mandate versus optional municipality 20ft distance. All permit and site clearance manual.


## 2026-10-13 — Fourth 20-claim operative code evidence batch

- Resolved **20** pending claim-level sources across Modesto(4), El Paso(4), Bakersfield(4), Oro Valley(4), Austin(3), Folsom(1), **306/400 scoped primary**, **46 source_recorded**, **48 unverified**. 88 source-reviewed, 12 paused/noindex and city count unchanged.
- Recovered town council Sept 2024 **enacted** Oro Valley Ordinance (O)24-08 plus vote record to replace inadequate reliance on 2025 **DRAFT** table. Confirmed Modesto combined 12, El Paso >6 permit & permitted-coop 30ft with 20ft alley+6ft barrier exception; Bakersfield amended R-S animal code, Austin limited Chapter3 legal duties, Folsom 2026 ALL-ZONE roosters banned.
- Sources, sections, dates and nuances in evidence JSON and top completeness report; no site auto-clearance or assumed structural permit exemption.


## 2026-10-13 — Third 20-field poultry source audit

- **20** previously source_recorded claims matched to exact official city code, agency guidance or Arizona statewide preemption section. **286/400 mapped; 66 source_recorded; 48 unverified**, 88 partial-reviewed / 12 pending noindex unchanged.
- Bucket: Buckeye (4), Marana (4), Fort Collins (3), Scottsdale (2), Los Angeles (2), Lake Havasu City (1), Avondale (2), Fort Worth (1), Denton (1).
- Critical limits: Buckeye new 2025 code; Marana zone/count/coop table; Fort Collins separate licensing; Scottsdale small accessory structure still needs Planning Services approval; LA R1 zoning use not generic flock cap; LHC older dwelling cut-off; Avondale statewide municipal preemption vs local land-use; Fort Worth keeping obligations do not waive permits; Denton accessory outbuilding <=200sf and no utilities may qualify for building-permit exemption but no zoning/animal-license exemption.
- All per-field reviewed date, section, original link in site/data/policy-evidence.json, summary and generated pages built from canonical registry.


## 2026-10-13 — 20 more primary-scope chicken law checks

- Exactly twenty current municipal source / official planning-guide claim mappings verified. **266/400 checked, 86 source-recorded, 48 unverified**. 88 partial-reviewed cities and 12 pending/noindex unchanged. No city expansion.
- Riverside 2025 zoning change recognized RE/R-1 poultry up to five and 10-ft neighbor residence rather than previous rural-only summary; Raleigh community-garden scope, Minneapolis permit tiers requiring approval; San Antonio permitted excess flocks vs normal, Oakland no numeric value under city zoning guide.
- Other nine city permit fields narrow use eligibility, private owner authorization or structure code duties; not a universal building permit exemption.


## 2026-10-13 — Batch of 20 official poultry legal claims

- Exactly **20** official code or specific government-guidance field matches on 9 existing cities; progress **246/400**, **106 source_recorded**, **48 unverified**. City statuses 88 partial source-reviewed, 12 pending/noindex unchanged.
- Fremont 4, Escondido 4, Bellevue 2, Vancouver 2, Yuma 4, Phoenix 1, Dallas 1, Gilbert 1, Colorado Springs 1.
- Safeguards: Fremont 6k threshold, Escondido rooster CUP, Bellevue 6930 pending, Vancouver livestock barn rule not poultry, Yuma 2025 code and state preemption, Phoenix 2024 adopted text, Dallas rooster-only distance, Gilbert combined fowl/rodent FAQ, Colorado Springs construction-versus-keeping approval. Details in POLICY_COMPLETENESS_2026-10-13.md and site/data/policy-evidence.json.


## 2026-10-13 — City operative-law correction and two scoped construction checks

- **+2 claim-specific government-source mappings:** **226/400 checked, 126 source recorded, 48 unverified**; 88 source-reviewed profiles remain, 12 paused cities remain noindex. Overall reviewed categories now 44 general and 44 limited-scope.
- [Ashland OR Community Development FAQ](https://ashlandoregon.gov/m/faq?cat=16): AMC §18.2.5.040 accessory-building standards govern coop/run construction; routine poultry-keeping licensing and building permit applicability NOT established.
- [Lake Oswego OR city FAQ](https://www.ci.oswego.or.us/zh-hans/publicaffairs/chickens-and-roosters): says coop construction is regulated and municipal Planning must determine site-dependent setbacks; no universal numerical offset. Map planner remains manual.
- **High-risk correction Lakewood CO**: [official 2026 referendum list](https://www.lakewoodco.gov/Local-Government/Departments/City-Clerks-Office/City-Council-Ordinances-Resolutions/2026-Resolutions) and 2026 election reporting undermine treating the old approved-2025 Article 4 as settled operative law. Suppress specific 2025 flock/rooster/placement numbers, mark limited-scope, keep sole city-verified Small Animal Permit application fact. Do not promote old numbers until post-referendum code is primary-source checked.
- Fort Collins / Hillsboro historical poultry numbers also **not promoted**: official current exact-number ordinance text still not directly verified here. No third-party SEO summaries substituted.


## 2026-10-13 — Tigard / Everett / Medford / Irving scoped city ordinance checks

- Added **four claim-level primary/city-source mappings**: **224/400 clause checked**, **128 source-recorded**, **48 unverified**; 88 reviewed/12 paused/noindex unchanged. Some newly verified claims are only scoped legal duties/negative findings, NOT full permit or zoning clearance.
- Tigard OR: [Article VII §§6.02.610-630](https://ecode360.com/43651072) no universal bird-count limit stated, corroborated by Tigard City Code Compliance; other regulations and building permits still separate.
- Everett WA: [facility licensing](https://www.everettwa.gov/197/Facility-Licenses) specifically requires annual small-livestock license for **any rooster**, $50 listed, while [operative 2026 §6.04.070(C)(9)](https://everett.municipal.codes/EMC/6.04.070) is Reserved, so a draft 2023 categorical ban cannot be represented as current law. Property permission unresolved.
- Medford OR: [§5.555(1)(e)](https://medford.municipal.codes/Code/5.555) demands applicable building/fire-code compliance for coops, sheds etc; city permit guidance says outbuildings may need permit. Separate chicken-keeping permit not proven.
- Irving TX: [§6-62(c)(1)](https://ecode360.com/45683221) requires building/zoning compliance; exhibition permit under (d) cannot stand in for routine poultry-keeping/coop approvals.
- Reviewed Fort Collins CO §4-117 leads and Hillsboro OR §6.20.070 claims; only third-party summaries/draft or an inaccessible current primary ordinance were found for the remaining specific figures. They remain source_recorded and were **not** upgraded.


## 2026-10-13 — Austin effective 2022 fowl enclosure ordinance correction

- No new claims promoted: this correction keeps **220/400** primary-checked, **132** source-recorded and **48** unverified; latest other-city audit from main retained.
- [Austin §3-2-16(A)-(E)](https://library.municode.com/tx/austin/codes/code_of_ordinances?nodeId=TIT3ANRE_CH3-2REAN_ART1GERE), amended effective 2022-10-24: ALL fowl enclosures (not >=2 chickens) must be four-sided and covered, >=30 ft from other persons' dwelling/business buildings (not lot boundaries); >=50 ft where poultry/coop creates a health hazard. Previous 2013 text and 2021 brochure were stale, so correct the canonical placement evidence, legacy HTML/FAQ/state hub and planner dataset. Flock limit, rooster policy and ordinary chicken permit still require independent authoritative findings.

## 2026-10-13 — Flagstaff / Sierra Vista / Tempe direct ordinance pass

- **+6 claim-level fields**, now **220/400 primary checked, 132 source-recorded, 48 unverified**. City review statuses unchanged (88 reviewed, 12 pending); no new cities or planner automation.
- [Flagstaff Chapter 6-03](https://www.codepublishing.com/AZ/Flagstaff/html/Flagstaff06/Flagstaff0603000.html): 6/10/15/20/25 by lot size, >4-month male ban, ER/RR keeping permit vs minor-improvement permit, residential lot-line/dwelling/alley distances. Two fields newly promoted, two upgraded to direct code citations.
- [Sierra Vista 2026 §90.11](https://codelibrary.amlegal.com/codes/sierravista/latest/sierravista_az/0-0-0-17093): up to 6 detached-residence fowl, prohibited roosters, secure rear/side enclosure 20 ft from neighboring property and 200-sq-ft/8-ft/fence height restrictions; permit unresolved.
- [Tempe ZDC §3-404(I)(8)](https://www.tempe.gov/government/community-development/code-compliance-open-m-i-n-d/homeowners/violations/animals-insects/animal-quantities): under-one-acre enclosure fence-line height limit confirmed; no numerical setback inference.


## 2026-10-13 — San Jose / Hillsboro (OR) / Oakland source-to-claim audit

- Source-reviewed **seven** more claim-specific fields; **214/400** primary clause/guidance checked, **138** source recorded, **48** unverified for 12 paused cities (unchanged 88 reviewed cities).
- San José [Code §§7.10.205, 7.60.700, 7.60.710, 7.60.810, 7.60.815, 7.60.820](https://library.municode.com/ca/san_jose/codes/code_of_ordinances/410513?nodeId=TIT7ANCACO_CH7.20ANCAKE): chicken/rabbit/other small animal combined category, two-year permit required for >6 (and possible written enforcement for fewer), rooster restriction OVER 4 months, side setback prohibited for permit-covered animals, and 0/6/10/20 based on distance to OTHER dwelling. Printed 20/40/50-ft exact endpoints are not enumerated, so retained city-planning clarification rather than inventing numerical legality.
- [Hillsboro OREGON City Code Compliance](https://www.hillsboro-oregon.gov/our-city/departments/police/programs-and-services/code-compliance): only HENS in city, valid Animal Permit required. Explicitly NOT using Hillsboro KANSAS/WISCONSIN poultry rules; number/placement still pending operative Hillsboro Oregon ordinance.
- [Oakland Urban Agriculture zoning guide](https://www.oaklandca.gov/Planning-Building/Planning-Zoning/Zoning/Urban-Agriculture-and-Community-Gardens): community garden versus extensive agricultural ANIMAL keeping permits depend on activity and zoning; CUP applies to some site types, not a universal chicken keeping permit. Flock count/rooster/coop location NOT advanced without exact code.

## 2026-10-13 — Bellingham / Frisco / Fort Collins scoped field evidence

- Resolved **three** previously `source_recorded` claims; count **207/400 primary checked, 145 source-recorded, 48 unverified** (12 paused city profiles). No city statuses, indexing or planner modes changed.
- [Bellingham 2026-current §7.12.060(A)](https://bellingham.municipal.codes/BMC/7.12.060): expressly permits confined chickens absent another banning ordinance, but **section does not establish a numeric limit**. Earlier 50-ft separation is measured to buildings habitually occupied/worked in, **NOT lot lines**. Rooster, permit and broader zoning status still unresolved.
- [Frisco §§14-17/18](https://ecode360.com/38315318): gallinaceous fowl need sanitary enclosed conditions; the 100-ft dwelling proximity in §14-16(d) is within **small/large livestock section**, not automatically applicable to poultry. No universal fowl-specific lot-line setback or no-permit exemption established.
- [Fort Collins NOCO Humane](https://www.nocohumane.org/requirements/): city's contracted animal protection agency specifically requires $30 one-time coop license and pre-issuance inspection for chicken/duck housing. Separate construction and zoning permits remain undecided; number/rooster/location still await exact current municipal Chapter 4 text.

## 2026-10-13 — Fresno material law correction

- [Fresno current Code §15-2707](https://library.municode.com/CA/fresno/codes/code_of_ordinances?nodeId=MUCOCHFRCA_CH15CIDECOINRE_PTIIIREAPSOALDI_ART27STSPUSAC) clarifies residential land-size tiers. Poultry prohibited as a household pet on typical <=36,000-sq-ft residential lot but allowed (up to twelve/gross acre) on larger qualifying lots. City roosters prohibited except accredited zoo, and enclosure on eligible residential lot >=40ft from lot lines AND >=50ft from neighbor residential structure. Prior blanket prohibition on ALL residential parcels was wrong; corrected. Permit remains unresolved without an affirmative source.
- Primary law claims now **204/400**, source-recorded **148**; 48 unverified for paused 12 municipalities; 88 reviewed city summaries remain unchanged.

## 2026-10-13 — Santa Ana full four-field city animal ordinance check

- City Chapter 5 [§§5-6, 5-6.5, 5-18](https://library.municode.com/ca/santa_ana/codes/code_of_ordinances?nodeId=PTIITHCO_CH5AN) checked all four city-specific claims: max four combined FOWL/RABBITS without excess-keeping special permit (not four hens plus rabbits), residential no-rooster clause, animal-keeping special permit for >four subject to Planning review, and >=30 ft to other persons' human-occupied building not parcel line. Building/HOA/zoning approvals separate.
- Evidence **201/400** primary checked; **151** source-recorded on already-reviewed cities and **48** paused-city unverified remain. No city status changes.

## 2026-10-13 — Indianapolis four-field current municipal code audit

- Checked Indianapolis-Marion County [§743-306(W)](https://library.municode.com/in/indianapolis_-_marion_county/codes/code_of_ordinances?nodeId=TITIIIPUHEWE_CH743USUECST) and Table 743-306-3: up to 12 adult chickens/quail/pigeons/ducks combined (not each), at most one rooster fully enclosed dusk to dawn, no personal livestock license within qualifying standard allowance; licenses needed to increase animals, no front yard pens/coops and setback set by the actual zone. No blanket parcel compliance guarantee.
- Primary matched fields now **197/400**, source-recorded **155**, unverified in paused 12 cities **48**; 88 source-reviewed city summaries remain unchanged.

## 2026-10-13 — Current Redmond 2025 amendment and Everett official facility rules

- 4 additional field-specific government-code/guidance checks: Redmond WA placement, Everett WA flock number and placement, Lakewood CO small-animal-permit application. Evidence now **193/400** primary, **159** source-recorded, **48** unverified (12 paused cities), still **88 reviewed**. No new cities.
- **Critical 2025 amendment correction:** [Current Redmond RMC §7.04.157](https://redmond.municipal.codes/RMC/7.04.157) was amended by Ordinance 3219 (2025), and the published NR lot-area tables supersede the stale R-1/R-6 city landing page. Its **5,500–5,999 sq-ft NR thresholds OVERLAP** (four vs six hens), so not determined pending Redmond city answer. Updated currently checked max and registration records to current code and documented 15ft generic lot line, conditional 5ft exceptions (not a universal exception), and structures.
- [Everett approved 2024 Animal Control small livestock facility regulations](https://www.everettwa.gov/DocumentCenter/View/37687/Livestock-and-Small-Livestock-Facility-Permit-Regulations---rev-1-23-24) have chicken limit tiers (6/8/10/add one per 5,000) and combined cap, but **10k/15k exact boundaries overlap** in the municipality's own PDF; a separate 5ft lot-boundary enclosure rule coexists with greater Title 19 setbacks. Rooster qualification still pending zoning analysis, NOT promoted.
- [Lakewood current Small Animal Permit portal](https://www.lakewoodco.gov/Local-Government/Departments/Sustainability-and-Community-Development/Zoning-Permits) confirms a permit APPLICATION for hens where lawful, but cannot establish all parcels require it. The 2017 Lakewood handout is stale relative to 2025 city zoning revisions; remaining three fields still source-recorded.
- Preserve separation between government-source-level findings and parcel-specific legal eligibility. All new status fields include exact source URL, section, date and scope.

## 2026-10-13 — Houston / Plano / Stockton official code correction (11 fields)

- Focus solely on field-level verification for existing 88 source-reviewed cities: **189/400** claims now supported by precise code/guidance; **163** still source-recorded, **48** in 12 pending cities unverified. No new cities.
- [Houston City Code Chapter 6](https://library.municode.com/tx/houston/codes/code_of_ordinances/322897?nodeId=COOR_CH6ANFO) §§6-31/35/38/39: 30 fowl species/40 combined on normal-size enclosure subject to a **100-ft NEIGHBOR BUILDING** rule, citywide rooster ban with special institutional exceptions, and an **extraordinary seven-hen medical-necessity permit** (not a routine backyard poultry license).
- [Stockton current development code §16.80.060](https://ecode360.com/43715373) Table 3-14: ordinary residential RL/RM/RH hobby hen/duck keeping restricted by 4/5,000-sq-ft lot tier, roosters prohibited, both 5-ft **LOT LINE** and 20-ft **NEIGHBOR DWELLING** location constraints. General city registration/building status remains pending.
- [Plano City Code §§4-29, 4-81 and 4-185](https://library.municode.com/tx/plano/codes/code_of_ordinances?nodeId=PTIICOOR_CH4AN_ARTXWIANBELI_S4-183BEP): no automatic unlimited hens; general adult-animal rule, only hens (not roosters), obligatory annual permit, 20/50-ft distance to adjacent buildings by hen count, coop/outdoor yard and owner approvals required.
- Evidence matrix and generated city pages corrected. All legal facts remain conditional and must not be represented as zoning/permit approval for a particular address.

## 2026-10-13 — Field-level audit batch: 47 primary source checks across 18 cities

- User requested completing field verification before expanding to new cities. This pass promoted **47** additional field-specific government code/guidance claims: **178/400 checked, 174 source-recorded, 48 unverified**; city statuses remain 88 source-reviewed and 12 pending/noindex.
- Direct primary-code confirmations: Long Beach LBMC 6.20.020-6.20.140, Tacoma TMC 5.30.010, Westminster WMC 6-7-12(I), Tucson UDC 6.6.5(E), Irving 6-62, Elk Grove 23.27 Table residential note 3, Santa Rosa 20-42.040, Dallas 7-7.3 and Frisco 14-17.
- Official city guidance checks: Flagstaff backyard livestock, Tigard urban livestock, Lake Oswego chickens/roosters, McKinney animal-control FAQ, Denton animal FAQ, Yakima planning FAQ, Kent fowl FAQ, Scottsdale farm animals, Everett facility permits.
- Corrected **Tucson**: conditional 20-ft distance to an abutting dwelling and size-specific accessory setbacks, not a blanket 50-ft chicken-coop setback. **Elk Grove**: up to 12 chickens ONLY with a 40-ft property-line buffer in residential RD zoning, beyond ordinary six. **Santa Rosa**: detailed lot-size tiers and distinct neighboring-habitable-structure clearance. **Everett**: separate permit triggers from parcel-level zoning legitimacy.
- Statements about keeping-animal permits do not establish building permit exemptions; unconfirmed fields remain source-recorded and are never upgraded by omission. New dated links and clause-level descriptions are recorded per field in `site/data/policy-evidence.json`.

## 2026-10-13 — P0 继续：15 项法规字段和 Lake Havasu 分区风险修复

- 逐字段校验从 **116/400** 提升至 **131/400**（+15），**221** source-recorded、**48** unverified；88 有部分来源的城市摘要/12 pending 不变。六个城市：Prescott Valley 四项、Anaheim 三项、Folsom 三项、Beaverton 一项、Portland 一项、Lake Havasu City 三项。
- [Prescott Valley §6-02-030(B)](https://codelibrary.amlegal.com/codes/prescottvalleyaz/latest/prescottvalley_az/0-0-0-20920) 直接规定 10 只鸡、公鸡禁令、鸡舍1-ft 边界约束、一般无需许可但有管线/电气设备需要建筑许可。
- [Anaheim §18.38.030](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-68050)：综合物种密度 1/1800sqft（四舍五入范围按章规定）、通常禁公鸡，距第三方居所/地界分别 50/20 ft；特别区的例外保留。
- [Folsom Chapter 17.40](https://www.codepublishing.com/CA/Folsom/html/Folsom17/Folsom1740.html)：农业复合分区特殊规定；需有适用的农业复合分区才能引用 >100头 use permit 及鸡舍50/20/30-ft条件；不是常规住宅可养100只鸡。
- [Beaverton §5.09.015](https://beaverton.municipal.codes/BC/5.09.015)：5,000 sqft，独栋或双拼，拥有者居住或租户书面同意；20-ft 距离到邻居住宅而不是地界，前院不允许鸡舍。
- [Portland city guide](https://www.portland.gov/bps/sustainability/guide-bees-and-livestock/chickens-and-fowl)：标准后院鸡禽无需饲养许可，但附属建筑许可和 Title 13 标准另审。
- [Lake Havasu City §14.03.03(E)(9)](https://codelibrary.amlegal.com/codes/lakehavasucity/latest/lakehavasu_az/0-0-0-32782) 和 [§14.03.02 use table](https://codelibrary.amlegal.com/codes/lakehavasucity/latest/lakehavasu_az/0-0-0-35856)：明确 zoning A(2) 只适用于 2024-09-13 已存在独栋居民，不能把「最多六只」当所有城市住宅都批准；注册来源和页面均增补约束。未确定的具体建筑审批依然待核。
- 对仍 pending 的 12 城复核了官方入口/来源区分；Queen Creek 官方 2026 zoning PDF 当前直开403，未核实生效全文；Pueblo 草案不可当现行法；Boulder CO 城市/县/内华达 Boulder City 必须分开。全部保留 noindex。

## 2026-10-13 — 两项 P0 联合核验：Bend 部分解除 + 高流量城市逐字段

- 新增 **7 项逐字段法条/政府指南证据**：Bend 2；San Antonio 3；Los Angeles 1；Denver 1。总计 **116/400** 条已逐字段核对、**236** source-recorded、**48** unverified；**88/100** 城有至少部分官方来源，**12** 仍 needs_review/noindex。
- Bend：市政府 BDC §3.6.300(I)、已发布历史章节和 2026 Ordinance NS-2560 交叉比对，只发布满足 ≥5,000 sq ft 的合计最多四只兔/母鸡和禁公鸡；鸡舍退距、饲养/建筑许可明确留空，地图仍 manual。受限 scope 审核，不是合法建造判断。
- San Antonio：官方 ACS 现行 FAQ 的 8 只家禽/1 公鸡与超额许可证单独比对，当前 Municode 目录明确 §5-107 规范数量及超额许可，而 ACS 页面误引用已转为宠物店许可的 §5-109。修正文档/registry 注意，24sq ft 和更高饲养规模距离仍需现行全文，不升级 placement。
- Los Angeles：现行 LAMC §53.71 限制一个地块通常最多一公鸡（有窄例外），不是公鸡全部禁止。Denver：Zoning Code §11.8.5.1(A) 核实后50%地块范围、距指定邻居居所15 ft，非房产线退距。
- 其他 12 个 pending 城市保持 noindex、没有新猜测数字；Pueblo 2021 附件、Round Rock 建筑许可、Arizona §9-462.12 都记录为待核证据线索，不冒用作为全市许可证。

## 2026-10-13 — SF / NYC / Minneapolis primary-source evidence follow-up

- Six more individually checked city/field claims (San Francisco 3, NYC 1, Minneapolis 2). Evidence now **109/400** primary-clause/guidance checked, **239** source-recorded requiring claim-level confirmation, **52** unverified across 13 pending cities. No audit status or indexing changed.
- San Francisco [Health Code §37](https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_health/0-0-0-43): four combined animals on residential premises (NOT four chickens plus other cats/dogs); covered enclosures require Director of Public Health approval; an outdoor coop must be 20 ft from habitation **doors or windows**, not parcel boundaries. Rooster rules remain unresolved.
- NYC [Health Code §161.19(a)](https://www.nyc.gov/assets/doh/downloads/pdf/about/healthcode/health-code-article161.pdf): ordinary residential roosters prohibited (specified legal exceptions). Its §161.19(c) **25-ft rule applies to poultry markets**, not a generic backyard-coop setback. Flock count, home setback and property permit remain unverified.
- Minneapolis [official fowl permits and fees](https://www.minneapolismn.gov/resident-services/animals-pets/pet-licenses-animal-permits/): application and city approval before acquiring poultry; neighbor consent, education, zoning and animal-control inspection needed. A separate $110 rooster permit fee category is published, but is **not automatic approval**. Fee tiers 1–6/7–15/16–30 do NOT prove an unconditional 30-bird maximum.
- San Antonio: official permits page and searchable indexed city PDF indicate a baseline eight-fowl/one-rooster rule, but the official PDF and page return access-denied in direct fetch, and sources disagree on ordinance section numbering (§5-107 vs §5-109). No field promoted until current enacted text reconciled.
- These are **claim-scoped evidence checks, never property-specific legal clearance**; separate zoning, HOA, construction permissions and effective-date review remain open.

## 2026-10-13 — Thornton / Colorado Springs / Vancouver partial source review

- 8 additional specific government-source fields checked. Registry now 103/400, 245 source-recorded, 52 pending.
- Thornton: four independent municipal FAQ claims. Colorado Springs: three scoped animal-regulation claims, kennel setback not used for chickens. Vancouver WA: rooster rule only because July 2026 zoning revision requires property-level recheck.
- No new city marked approved for individual property; 13 unresolved cities remain noindex. Separate structure/building permissions still not inferred from animal-keeping permit statement.


## 2026-10-13 — Second official law batch: Aurora / Longmont / Beaverton / Medford / Ashland

- Reviewed official city codes or permit forms for five cities; newly marked 16 field-specific government statements. Total is now **95/400**, remaining 253 source-recorded and 52 unverified.
- Kept Beaverton permit/structure location unresolved, Medford construction permit unresolved, and Ashland exactly-5,000-sq-ft boundary unclear. State zone, property, building approvals are never assumed.
- Detailed primary document references recorded directly per field in `site/data/policy-evidence.json` and completeness report. No pending-city noindex flags changed.


## 2026-10-13 — Gresham / Spokane / Madison / Redmond / Roseville follow-up audit

- Added 19 field-specific government-code/guidance proofs: Gresham 4, Spokane 4, Madison 4, Redmond 3, Roseville 4. Total: **79/400**, with 269 fields source-recorded and 52 unverified in 13 pending cities.
- Corrected conceptual risks: Spokane WSU certification exemption does not waive building permits; Madison requires Wisconsin livestock premises registration; Roseville roosters are not categorically banned, and annual $25 animal special permit in 2022 applies to non-conforming enclosures, not every keeper.
- Redmond zoning tiers checked; still no independently verified 15-ft structure setback. 2022 Roseville fee could be stale; no authoritative blanket 2026 fee promise.
- Pending cities are still noindex and excluded from planner; no city has been declared fully approved for a particular property.


## 2026-10-13 — Three more official-city field reviews

- Official references: San Diego §42.0709 (flock, rooster, placement); Sacramento city poultry licensing page (four fields); Fort Worth fowl ordinance summary (flock, rooster, placement).
- 10 newly documented fields, now **60 / 400** with 288 source-recorded and 52 unverified. Source links and section details attached to each field.
- Detected Sacramento outdated application PDF fees ($15/$30) versus current city web prices ($20 per chicken/$47 coop permit). Added audit caveat and avoided quoting stale PDF as current.
- Fort Worth fowl tier at exactly one acre is ambiguous in the city summary. Kept this explicit; no universal property-line setback or all-clear for construction claimed.
- Bend and the other 13 pending cities remain noindex while material zoning, permit and legal-citation gaps are resolved.


## 2026-10-13 — Salem / Tempe official clause checks and Bend amended code comparison

- Official city pages checked: Salem SRC §50.710, Tempe ZDC §3-404(I); added **seven** field-specific mappings (Salem four, Tempe three).
- Evidence reaches 50/400 with 298 source-recorded and 52 unverified across 13 pending cities.
- Bend NS-2560 (2026-09) compared with prior government-published §3.6.300 text: no identified change to poultry provision, but prior permit and poultry-coop setbacks remain unresolved; Bend stays excluded from sitemap/planner.
- Municipal conditions include Salem RA/EFU exemption, Tempe AG rooster exemption and permit for over-standard flock count. No claim of universal parcel clearance.


## 2026-10-13 — 100-city law reconciliation milestone

- Canonical registry: 100 cities × four claims = 400. Field-specific government clause/guidance evidence rose from 27 to 43 (Mesa, Casa Grande, Eugene, Glendale and Goodyear reviewed, plus preceding existing 27).
- Verified statutes/guides: Arizona §9-462.12, Casa Grande §6.06.010, Eugene §9.5250 and city permit leaflet (2021 scope caveat), Glendale Planning FAQ, Goodyear city FAQ and Mesa current code/FAQ.
- Remaining: 305 source-recorded fields without field-specific operative proof; 52 unverified fields within 13 pending cities. Pending city pages stay noindex.
- Important blockers: Arizona state preemption versus old local law; missing exact parcel zone and structure permit conditions; 2018 proposed Round Rock poultry rule is not itself proof of operative law.
- Updated pending law research queue with government primary source leads. CI audit gate must pass before this round is treated as deployed.


## 2026-10-13 — Mesa original ordinances and state preemption review

- Checked Mesa City §8-6-21(A),(G),(H): combined 10 rodents/fowl per first half acre, 40ft open enclosure / 75ft animal building from others' existing residences; rooster noise condition supported by official city FAQ.
- Significant conflict: Arizona §9-462.12 state preemption for eligible <=0.5-acre detached single-family residences. **Cannot assert Mesa's old distance rules apply universally.** City permit and parcel legality remain unresolved; manual planner retained.
- Added 3 individually supported fields; 27→**30/400** total, 87 reviewed cities / 13 pending unchanged; updated city/state pages, documentation, generated files and regression.


## 2026-10-13 — Critical Chandler enacted-law correction

- Discovered Chandler official **2023** webpage and **2026 homeowner manual** continue to say five chickens; adopted Ordinance **5113** (Dec 9 2024), Exhibit A §14-33(A), changed ceiling to **six**. City Jan 2025 permit chart independently confirms six hens, no roosters, >120sqft or >7ft permit triggers. Older local 5-ft coop property-line guidance retained but independently check accessory zoning.
- Updated original Chandler city HTML and FAQ/schema, Arizona state hub, registry and generated planner data. Four Chandler fields map to precise official enacted law / city chart / still-applicable coop guidance. Evidence 23/400 -> **27/400**. 87 reviewed/13 pending unchanged.
- Add regression to prevent reverting to stale five-bird rule. Critical lesson: currently published city website content may be superseded by adopted amendments.


## 2026-10-13 — Remaining 13-city municipal law research queue / CI safeguard

- Published [13-city unresolved ordinance queue](PENDING_LAW_RESEARCH_2026-10-13.md), marking source leads and reasons *not* to claim full verification. In particular: Bend 2026 September code amendment gap; Round Rock livestock code not interchangeable with poultry rules; Irvine chick-sale code not a keeping permit.
- Added `qa-policy-evidence.cjs` to every production Pages deployment and new regression checks for Garland/Olympia legal distances, rooster restrictions, manual planner and pending noindex.
- This does **not** increase verified fields. Remains 23/400 and 13 pending; specific code source or direct city response needed to progress.


## 2026-10-13 — Olympia code §18.04.060(KK) (2026 Ordinance 7457)

- Verified 5/9/10+ duck-or-female-chicken limits based on parcel acreage, rooster ban, 10-ft minimum setback from every boundary **plus prohibition on encroaching into zoning setback areas** against city-published code. Exact 1-acre tier overlap remains a specific municipal clarification task.
- Updated city source and 3 individually checked fields; **permit not cleared**. Olympia promoted to limited-scope, manual planner. Audit 20→23 clause/guidance checks, 86→87 reviewed cities, 14→13 pending. Regenerated site and index/sitemap. No parcel-specific approvals claimed.


## 2026-10-13 — Garland municipal-law source audit

- Compared city-published Garland §§22.14, 22.17: 4 female fowl older than one month, no roosters, 30 ft to other residence and 5 ft to adjoining residential-zoned property for pens/runs.
- Marked maximum, rooster and placement checked, but **permit not confirmed**. Garland added only as limited-scope, manual geometry; not a compliance approval.
- Regenerated site data, city guide, directory, city search and sitemap. Counts move 17→20 specific field checks, 85→86 source-reviewed city summaries, 15→14 pending.


## 2026-10-13 — P0 product onboarding and evidence review

**Deployment check:** GitHub Pages CI run [38360932364](https://github.com/DragonChenCL/CoopCheck/actions/runs/38360932364) passed all checks and deployment. Real browser confirmed home Quick Check, Denver 8-hen result (128 sq ft + $25), Austin indeterminate response, planner selected city and map entry, five city pages HTTP 200 with four evidence badges each. `cfbrower` used a single tab throughout.


- Added a standalone Quick Check for five benchmark cities on homepage and planner: hens, optional lot size, rooster flag, tailored screening and official-source links; no legal/parcel approval promised.
- Flagged per-field evidence on five city pages (flock, rooster, permit, placement) and updated the canonical evidence audit to 17/400 clause/guidance-checked fields (13 additional checked in this pass, 4 pre-existing). Unverified conditions remain clearly stated.
- Added Node regression coverage of city scenarios, conditional flock tiers, invalid inputs, missing property details, source metadata and page integration.
- User-visible goal: reduce first-action friction before users have to sketch a satellite lot; track quick_check_submit / quick_check_planner_click in GA4.


## 2026-10-13 — Backyard Chicken Pro 官网表单实际提交尝试（送达未确认）

- 用户明确授权使用官网表单提交 CoopCheck 编辑推荐/客座文章合作申请。
- cfbrower 始终复用原有 Tab 0，地址：https://backyardchickenpro.com/contact-us/ 。
- 查到 WordPress WPForms 联系表单 `wpforms-form-57`。必填姓名、邮箱；填写了当前连接 Gmail 资料的姓名与联系邮箱和介绍 CoopCheck 五个来源可追溯城市法规指南及地图规划器的英文合作留言。
- 操作：正常页面按钮 `#wpforms-submit-57` **已点击一次**。页面随后白屏、没有显示 WPForms 成功提示或错误回执。后续检查页面 body 为空且表单消失；无法确认服务端是否收到。连接 Gmail 当天没有找到相应自动确认邮件。
- **准确结果：表单填写并触发提交 1 次，实际送达未知；成功投递 0 次已核实；公开外链仍 0。** 为防重复收件，没有二次提交。
- 后续：如果官网恢复，先确认是否有成功回执或邮件回复；如需要重投，检查已存在的提交记录/回执再决定。不可把这次尝试写成已取得编辑合作或外链。


## 2026-10-13 — Backyard Chicken Pro 合作联络尝试（未送达）

- 目标：向 https://backyardchickenpro.com/contact-us/ 发送 CoopCheck 资源推荐合作邮件，用户已授权发送。
- 验证：官网仅公布联系表单，未找到可验证的公开投递邮箱；未猜测 `info@`、`contact@` 等可能地址。
- 过程：复用 cfbrower 唯一 Tab 打开官网；WordPress/WPForms 页面反复自动重载/浏览器上下文失效。曾识别表单 `wpforms-form-57`，但未能在稳定页面完成填写或取得成功回执。
- **结果：未发送、未提交、0 个新外链**。不得在周报计入已联络商家。
- 后续：取得官方验证的邮件地址后可用 Gmail 发送；或者用户在网页联系表单完成验证及提交，再回填表单成功证据。本地协作邮件文本见上次会话提案。
- 浏览器：未新增标签页，仍使用原有的单 Tab。


## 2026-10-13 — 第二轮引流与外链渠道调查（未公开投稿）

**GSC（2026-09-15 至 2026-10-12）**：连接器返回有搜索展示的 3 个页面（首页 5、Portland 9、Oregon 州页 9），合计 23 展示、0 点击；按日维度 10 月 2–10 日均显示 0，报告尚未全面体现 10 月 12–13 日的新页面。

**渠道候选与当前状态**：
1. **Backyard Chicken Pro** — https://backyardchickenpro.com/contact-us/ 。网站公开表示接受相关产品/网站被推荐、合作和有用的链接申请。与 CoopCheck 受众高度匹配；属于**待申请的编辑推荐**，尚未提交或拿到外链。网站内容偏重实用家禽教程；首选 pitch 是 5 城市法规对照+规划器附加价值。联系人姓名/邮箱不得捏造，提交前由用户提供或授权使用真实业务联系信息。
2. **Community Chickens** — https://www.communitychickens.com/contribute/ 。已知可提交 feature article/guest writing，优先一篇「城市法规距离测量容易搞混」的真材实料教程。先前有 Gmail **未发送草稿**；不能记已投稿。
3. **Reddit r/BackYardChickens、地方城市 subreddit** — 讨论对鸡群限额、房屋 vs 地界测距、城市分区很活跃，但不应贴 AI 生成内容或商业推广；仅合规回复或经允许的来源链接。
4. **Product Hunt** — https://www.producthunt.com/launch 。允许创作者发工具（需本人账户、入门认证/准备发布素材）；相关度偏“开发者/工具爱好者”，不是高意图养鸡用户，列为低于垂直媒体的次优先渠道。
5. **Alternative.me** — https://alternative.me/how-to/submit-software/ 。需注册账号才能提交，偏软件用户、主题不完全匹配；不应为了链接数量硬投。
6. **BackYard Chickens Chicken LORE** — https://www.backyardchickens.com/threads/chicken-lore-project-find-submit-local-chicken-laws-ordinances.310268/ 。长期已有城市法规数据项目；有内容覆盖竞争且可能成为相关性很高的编辑合作机会，但论坛推广需要事先获得允许，不直接贴 CoopCheck 链接。
7. **CoopCodes** — https://www.coopcodes.com/advertise 。同类站公开宣称已覆盖数百个城市，说明城市法规摘要存在直接竞争；其广告页是付费库存，不代表值得买链接。决定暂不付费投放。

**建议第一轮行动**：先将 Portland/Austin/Arlington/Denver/Seattle 的同口径法规比较做成可引用的独立资源（尤其不同「测距参照物」与例外条件）；再向 Backyard Chicken Pro、Community Chickens 做有来源的编辑型投稿。账号登录或真实联系人信息由用户完成。

**效果计量**：此轮 **0 个公开新外链，0 篇成功对外投稿**，已完成浏览器/搜索渠道核验。cfbrower 维持唯一 Tab；高广告加载站有跳转/页面上下文重建，不能认定其表单已成功提交。


按时间倒序追加记录。不要因为操作中断而伪造「成功」；记录执行前后状态、真实来源与下一步。

## 2026-10-13 — 第二轮真实外链与增长渠道调查

- GSC（9/14–10/12）：23 impressions / 0 clicks，唯一有展示的 URL 是首页、Portland 和 Oregon 州页；新版 94 URL sitemap 10/13 已被 Google 下载，错误/警告均为 0。
- 单 Tab cfbrower 核验：BackYard Chickens Portland 2012 旧法规页显示约 21,612 历史浏览，内容仍有过时的 3 只规则；2023 已有读者评论提醒。**没有编辑该站、没有新发回复。**
- BYC 原回复 /post-29302430 在本轮复查时仍提示「awaiting moderator approval」，账号界面仍提示邮箱验证。
- 发现可联系编辑的网站 Backyard Chicken Pro（官方 Contact Us 明确允许网站/工具合作及引用请求），以及此前 Community Chickens 可投稿单篇文章的官方表单。
- Reddit r/SideProject 页面确认仍有社区产品分享入口，但此轮**未提交帖子**。
- 没有任何新公开 CoopCheck 外链；目前所有目标均是潜在机会，详见 [机会清单](OPPORTUNITIES_2026-10-13.md)。
- 浏览器仅复用既有 Tab 0；Backyard Chicken Pro 联系页脚本负担较重，访问一度超时并触发页面导航上下文丢失；不在此阶段重复刷新或开新 Tab。
- 下一步优先：BYC 验证与版主审核、1 篇编辑投稿、1 张可信的可分享法规对照图，再按 GSC/referral 观察效果。

## 2026-10-13 — 建立统一运营目录

**决定：** 从此项目起，各项目优先使用 `docs/operations/` 保存 README + SOP + LOG；CoopCheck 固定四个运营步骤：GSC → Reddit → BackYard Chickens → cfbrower 仅复用一个 tab（实际执行时浏览器资源控制贯穿全过程）。

**已开展的阶段性事实：**
- 近期项目 GSC 网页索引截图（报告更新时间 2026-10-09）：已收录 1、已发现未抓取 22、已抓取未收录 4。**注意不是 10 月 13 日新批次的实时索引结论**。
- 2026-10-13 线上 sitemap 有 94 个可访问 URL；部分新增城市在 10 月 12–13 日才上线，不能用滞后的索引报告判断这些新页的质量。
- 已上线 5 个标杆城市页：Portland、Austin、Arlington、Denver、Seattle；各页含官方参考、独立场景、风险限制、规划器入口。
- 已确认 BackYard Chickens 论坛登录与论坛规则（无普通讨论区广告、竞争网站链接需相关且获允许）。
- 已提交 1 条针对「Coop Ordinances in Your Town」的有用回复：政府法规对照（Portland/Seattle），**没有 CoopCheck 链接**；帖子地址：https://www.backyardchickens.com/threads/coop-ordinances-in-your-town.1663608/post-29302430 。论坛当时显示「awaiting moderator approval, invisible to normal visitors」。**此条不计公开帖子、不计外链**。
- BackYard Chickens 论坛当时出现邮箱验证提示，由用户自行在注册邮箱完成验证。
- Reddit r/SideProject 编辑器曾打开，但未成功公开发布任何贴文；没有计入渠道成果。
- Community Chickens 编辑投稿邮件曾在用户邮箱保存为**未发送草稿**；无实际投稿/编辑采纳证据。

**下一次建议操作（按优先顺序）：**
1. 检查 GSC 最新 7/28 天指标、五个标杆城市的索引进度与实际展示。
2. 确认 BYC 邮箱验证是否完成，并检查上述论坛回复是否已审核通过；若仍待审不重复发。
3. 阅读 Reddit 对应版规，回答与 CoopCheck 已核实城市相关的真实问题；不触犯禁止 AI/广告的规则。
4. 记录实际发表的帖子及明确的 referral/规划器行为数据，区分曝光和真实转化。

**浏览器资源限制：** 后续每次使用 cfbrower 均先确认标签数，默认关闭其他无关标签，仅复用唯一 Tab，不同时打开一堆页面。
