# CoopCheck 运营执行日志

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
