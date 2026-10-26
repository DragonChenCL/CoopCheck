# CoopCheck Operations Log

## 2026-10-25 PDT（UTC 2026-10-26）— 同轮继续执行与额外验收补记

> 补记不新增新的 10 模块轮次，不在现有 ✅8/10 基础上重复给同一模块计分；Pinterest / YouTube 仍未取得公开发布证明。

- **邮件增量**：针对 Grubbly Farms 此前自动满意度回信，发送独立、礼貌的人工编辑转介跟进，明确可接受拒绝且不继续骚扰；Gmail `SENT` 消息 ID `1a1761e7b05d921a`，线程 `1a16b28a8139df83`。这是同一轮的第三封成功邮件，未核实实际送达、编辑合作或公开反链。
- **GA4 新增一个漏斗事件**：`site/assets/analytics.js` 增加 `buyer_guide_checker_click`，限定发生在购买指南到站内免费尺寸检查器的真实链接点击，路径与漏斗步骤参数完整，不对外部同名路径计数。Commit [0fd609b](https://github.com/DragonChenCL/CoopCheck/commit/0fd609b46bd3cbfab15c0305b3d88bcbc56a5afa)。在线页面加载了已部署新 `analytics.js`；实际浏览器模拟点击见 dataLayer 项增加，未断言 GA4 后台已有非测试用户的真实转化。
- **额外独立 SEO 内容更新**：在原三产品购买指南新增“4 × 8 overall footprint ≠ indoor sleeping floor”的非产品实测示例，明确 32ft² 整体占地与假设 8ft² 室内区别、六只鸡 18ft² OSU 指导参考，保留非法律/非福利认证边界。Commit [9ce4b32](https://github.com/DragonChenCL/CoopCheck/commit/9ce4b32d9e943cb4f3c771a77bfa3f048bc29bec)；浏览器验证正式页 `#footprint-arithmetic` 已存在：https://coopcheck.serunio.com/guides/prefab-chicken-coop-buying-guide.html 。
- **独立代码质量增量**：新建 `scripts/qa-buyer-journey.cjs`，以 VM stub 保护购买指南点击追踪的页面范围/同源限制/参数，以及工作示例的限定语，Commit [dd3890b](https://github.com/DragonChenCL/CoopCheck/commit/dd3890b69e6a3577a4897ba095b52d51c6fe3cae)；在 Pages workflow 增加执行步骤，Commit [7a3fc36](https://github.com/DragonChenCL/CoopCheck/commit/7a3fc36d7c43aaa740e778d9789d3b29fa65e928)。GitHub Actions Run [#373](https://github.com/DragonChenCL/CoopCheck/actions/runs/40263986560) 实查 **completed successfully**。测试和部署属于真实新成果，但仍不能把同一代码修改拿去挤出额外模块数量。
- **新增可用视频资产**：第二套新 Shorts，`/mnt/data/CoopCheck_Shorts_4x8_20261025.mp4`，20.5 秒、1080×1920、H264，经本地 `ffprobe` 核验且文件 4,322,815 字节；对应四个分镜图片在 `/mnt/data/coopcheck_short_20261025/`。这是已成片文件，**并非已上 YouTube**；已有之前另一个 24 秒 4 vs 6 hens 版本，避免重新从头制作素材。
- **真实发布阻塞复查**：YouTube Studio 频道已登录，打开视频上传弹窗后出现“糟糕，出了点问题。重试”，`browser_click` 上传按钮由于页面视图稳定性超时；尝试通过文件选择器上传本机文件时缺少有效文件选择器模态状态，因此没有视频公开 URL。Pinterest 原创 Pin 创作工具 `/pin-creation-tool/` 同样曾空白/本轮连接中断，域名外链限制未得到可核验解除，**没有新 Pin URL**。不得把成片、图片或已登录当成新发布。
- **当前合规验收仍为：✅8 / 10，🟡2 / 10。** 新增公开 CoopCheck 反链仍为 0 已核实，新增真实订单/净收入未知。下一次应优先修复 Pinterest 与 YouTube 的文件桥接或提供合规的可执行上传路径，复用本轮已有成品。

## 2026-10-25 PDT (UTC 2026-10-26) — SOP V1.1 强制实操运营第 1 轮：✅8 / 10，🟡2（社媒发布待补）

本次目标为 **10 模块均有新增可核验交付**，严格依 [RUN_TEMPLATE.md](RUN_TEMPLATE.md) 逐项验收。用户明确要求运营到底而非只做巡检；本轮在邮件、编辑合作、Reddit、BYC、SEO、GSC、GA4 与业务代码完成实操，Pinterest 和 YouTube **形成全套可上传作品，但未取得公开发布凭据**。不能将两个部分完成包装为 10/10。

| # | 模块 | 状态 | **本轮真实新增产出** | 核验、来源和限制 |
|---|---|---|---|---|
| 1 | 邮件 | ✅ | 回应 Homestead How-To 编辑 Tamara，婉拒 **$125 付费 sponsored guest post**，保留免费、来源充分的编辑事实核验可能性 | Gmail 发送 message ID `1a1760277d6f152c`，线程 `1a1401b0c777be4a`；没有购买付费外链。Tigard 市政既有线程的发送尝试报错，**不算成功** |
| 2 | 外链合作 | ✅ | 向 **The Garden Coop** 的公开地址 `info@thegardencoop.com` 发送一封**新的**针对其鸡舍图纸读者的个性化法规选址合作邮件（无付费、无硬要链接） | Gmail **Sent** message ID `1a175f51c90c2ff9`，联系入口 https://www.thegardencoop.com/about-us/；送达/采纳/编辑链接尚未确认，因此**新公开反链 0 已核实** |
| 3 | Reddit | ✅ | 在 r/SideProject 新增一条有技术价值的 SPF 多记录 PermError 与 DKIM-selector 未知状态区分的实际回帖，无推广链接、没有捏造自己测试的经历 | 已在登录帐号 `According_Banana221` 的公开评论中验证： https://old.reddit.com/r/SideProject/comments/1xfkej9/i_made_a_free_email_authentication_checker_that/19rntvplynqp1/ 。不是 CoopCheck 引荐流量 |
| 4 | BYC | ✅ | 在 Joliet (Illinois) 民间推动鸡舍条例修订的线程，以会员 `tom` **新增一条公开且与议题匹配的回复**，提出六个草拟市议会条款框架，提示确认正式生效法令、不能把拟议条例当现行合法性 | 正式回帖 permalink https://www.backyardchickens.com/threads/city-of-joliet-illinois-chicken-ordinance-amendment.1694938/post-29314804 ，浏览器确认 `article#js-post-29314804`。没有 CoopCheck 外链，未宣称已核实 Joliet 新法 |
| 5 | Pinterest | 🟡 | **已创作全新 2:3 原创竖版图**「4 HENS vs 6 HENS」并配套了可发布 Pin 标题/描述/有条件 UTM 落地页；图像和文案在本次聊天生成成品中 | 成品 `CoopCheck_Pinterest_4_vs_6_Hens.png`（1024×1536）与 `CoopCheck_Social_Post_Captions_2026-10-25.txt`；尝试 `/pin-creation-tool/`、`/pin-builder/`、`/coopcheckplans/_pins/`，Pinterest 页面主体持续空白，**无新 Pin URL，不能记发布成功**。历史域名外链拦截尚未证明解除；不能短链绕过，遵守生成内容披露 |
| 6 | YouTube | 🟡 | **已制作不同于原 14-hen Shorts 的新 24s 竖版 MP4**：「4 Hens vs 6 Hens」，5 场图文剪辑，配封面/标题/描述、OSU Extension 来源及合规声明；ffmpeg 和 ffprobe 验证 MP4 确实存在 | 成品 `CoopCheck_Shorts_4_vs_6_Hens_2026-10-25.mp4`（24 秒，540×960）与封面 `CoopCheck_Shorts_4_vs_6_Hens_Cover.jpg`，配文 txt；通过已登录 Studio 尝试上传，但浏览器页面跳转与缺乏可用本地文件桥接，**未取得任何新视频公开 URL**；不能算上传或观看量 |
| 7 | GSC / 收录 | ✅ | 针对最近仅 1 索引/115 未索引基线，**实际为有独特内容的购买研究指南从首页增加独立内链**；更新生成源的 lastmod、正式 Sitemap，部署成功。没有无谓重复 URL 提交 | 首页 `site/index.html` commit `ded3e9e0eb4a071520dc795977f3e6ea14352358`；`scripts/generate-coverage-pages.cjs` commit `47ccc81827f5e7146509d6d8703e1dd0e3d06b6d`；`site/sitemap.xml` commit `60a8ee012b876d9f3b662b5c550e249e6ba591fd`；本轮落实技术改进≠已经获 Google 收录 |
| 8 | GA4 / 转化 | ✅ | **实际增补用户高意图事件**：`buyer_model_selected`、`buyer_seller_question_copied`、`buyer_seller_question_fallback`、`buyer_comparison_print`，避免每次按键虚高事件；并从线上界面点选 `guardian` 检查 dataLayer 确实收到 `buyer_model_selected` 与 `model_id:guardian` | `site/assets/prefab-capacity.js` commit `ae9bf3cbdd92e5b024c294591b00f1cb460321bd`，后续 JS factory 问题已改（`1561b95f...`），GitHub Actions 通过且正式页面浏览器事件核验成功；**事件正常发送不等于 GA4 管理后台已出现历史转化，订单未知** |
| 9 | SEO 内容 | ✅ | **正式发布**《Three prefab coops》指南的原创 4 vs 6 hens 三模型参考对照、各型号差额、出处限制与完整商家规格确认询问模板，更新 `Article.dateModified`；实查线上含 `#worked-scenarios` 与 seller request 文本，schema 2026-10-25 | 正式 URL https://coopcheck.serunio.com/guides/prefab-chicken-coop-buying-guide.html ，commit `b4511a39890a32e28430f48c94e32799b8064d60`；实际线上浏览器验证通过。不宣称 OSU 参考值代表法定/完整福利标准 |
| 10 | 代码/线上 | ✅ | **修复复制备用文案残留问题**（变更型号/输入后自动清空），增加测试模拟用户切换及埋点；修正导出打印回调对模拟 DOM 的支持，并根据真实 CI 日志修复旧 `lastmod` 硬编码回归检查及工厂全局对象引用；**最终 CI 和 Pages 部署成功、线上交互验证通过** | JS 修复 `4c6141b1...`、测试 `7955351f...`、回归修复 `2095da9a...`、最终修复 `2ad251bed000d1e9678bbf5f583667529fef2ddd`。成功 Pages 工作流 https://github.com/DragonChenCL/CoopCheck/actions/runs/40258874569 与成功 IndexNow https://github.com/DragonChenCL/CoopCheck/actions/runs/40258903207 。实际线上修改 `bcCopyFallback` 后点击其他型号显示 `hidden:true` 且已清空 |

### 本轮数量与可核验范围

- **Gmail 新发成功两封（两个独立目的）**：编辑付费条件回复 1，独立目标合作新联系 1；不把回信送达、编辑采纳或外链当已确定。
- **新公开社区回复两条**：Reddit 1（开发者技术互动）+ BYC 1（实际养鸡法规提案帮助）。均**没有自有 URL**；**新增外链 0 个已核实**。
- **Pinterest 新公开 Pin 0**，但实际新制作一张可发布图片；**YouTube 新公开视频 0**，但实际制作 24s 成片 + 封面 + 配文。本轮这两项因发布无凭据分别记 **🟡**，不可写成已完成。
- **SEO/代码/GA4 已实际线上**：Pages 工作流通过，根页导航内链、指南正文、DataLayer 模型选择事件和复制框清空经在线浏览器验证。
- **销售端真实目标用户新增、订单、收入：未知**。之前 GA4 7 日视图有 35 活跃用户、48 sessions，多数 Direct，含测试流量风险；不能将它当本轮新获客，更不能记购买。
- **浏览器标签**：主要复用 cfbrower Tab0；遗留无关 Tab1 指向第三方网页，此前关闭时返回 `Tab 1 not found`。此轮未为绕过异常大量开 tab，不声称清理成功。
- **发布阻塞详情**：Pinterest pin creation route 空白；YouTube Studio 可登录、上传入口存在，但会话中重复跳转且新文件无法确认上传，故未获取平台发布回执。两项需在下一轮优先续接本次已制作的资产。

### 下轮优先级（不能代替本轮成绩）

1. 优先解决 Pinterest 创建页与 YouTube Studio 上传文件桥接（本次成品无需重复制作），成功公开后补 Pin/Shorts URL 并检查外链状态；不要把仅有视频/图片算“已发”。
2. 跟进 The Garden Coop 编辑是否有真人回应并推进具体材料，所有编辑引用须核验公开 URL；有实质结果才算反链。
3. 持续实查 GSC 新改指南的抓取/收录及 GA4 新 `buyer_model_selected` 事件，建立排除本人测试的获客/转化分析，不重复无变化的索引请求。

**最终交付率：✅8/10，🟡2/10，⛔0，❌0；没做到全平台公开，不把 8/10 写成 10/10。**

## 2026-10-25 PDT — 用户纠偏：SOP V1.1 强制每模块实操交付（制度调整，不是新一轮投放）

- 用户明确指出：**“运营一下”就必须每个环节都有实际产出，不能只是看看**；之前以巡检为完成标准不符合要求。
- SOP.md 已升级为 **V1.1 的十模块“最低新增交付物+证据”验收制**，同时新增 [RUN_TEMPLATE.md](RUN_TEMPLATE.md) 逐项记录发送、发帖、发布、变更、公开状态和 ✅N/10 交付率。各模块需完成独立的新发送/投稿/公开互动/Pin/视频/技术 SEO 修复或合理提交/数据驱动埋点转化改进/发布内容/代码变更，不允许复用同一动作填充两个模块。
- 状态严格区分：✅可核验实操完成、🟡有具体成品但未提交或发布、⛔平台/安全/权限阻塞、❌只有浏览/报告/计划/一般 Issue。阻塞或部分完成**不计入✅N/10**；不得以违规刷量、虚构数据、重复申请收录、无意义改代码强行凑齐。
- **上一轮按新标准不完整**：CityHubGo 实际发送一封相关邮件（可计邮件模块新增动作）；其他模块虽有历史复查、GSC/GA4 事实、Issue #68，但没有每模块独立新增的完整交付物，不应标为“已完成十模块”。
- **这条是 SOP 纠偏记录，不是新增外链、帖子、视频、Google 索引或站点功能上线。** 下一次“运营一下”应按新标准执行，并在最终报告里显式给出 10 项交付与未完成原因。

## 2026-10-25 PDT — SOP V1.0 第 1 轮实际运营（GSC/GA4 直读、合作跟进及索引诊断）

**执行时区**：America/Los_Angeles（2026-10-25；连接器检索部分发生在 UTC 2026-10-26）。**目标**：依 SOP 十模块巡检与实际推进。阅读 SOP.md 与本日志，检查上轮 Pinterest 域名限制、邮件合作、已发 Reddit/BYC/YouTube 以及 GSC/GA4。

### 本轮十模块结果（检查不等于新发布）

| 模块 | 状态与可核实动作 | 公开证据 / 阻塞 / 下一步 |
|---|---|---|
| 1 邮件 | **已检查 + 跟进 1 封成功发送**。发现 CityHubGo 回信确认已核对 Sacramento/San Diego 两条市政法规；实查其网页已更新，发送原线程感谢和可选研究引用。Gmail 发送消息 `1a175d1f9cf88a07`。此外 Grubbly Farms、Carolina Coops 主要是自动回执，SaaSHub 申请待审核排队，Raising Chickens 报 $50、Homestead How-To 报 $125 投稿价。 | 当前**没有收到公开引用的证据**，不计有效反链；无任何付费投稿/购买。CityHubGo：https://www.cityhubgo.com/backyard-chicken-laws/california.aspx |
| 2 编辑外链合作 | **已跟进 1 个有回应的渠道，未追加无差别群发**。CityHubGo 已发布更正；已告知 CoopCheck 可选研究方法论页面，编辑是否引用尚未知。 | 研究：https://coopcheck.serunio.com/research/2026-backyard-chicken-laws.html；**本轮新证实公开 CoopCheck 反链 0** |
| 3 Reddit | **已巡检，未新发**。https://www.reddit.com/r/SideProject/comments/1x9n6xj/ CoopCheck 测试招募仍公开；浏览器显示约 **193 views**、页面未加载实质性用户评论；r/alphaandbetausers 已有 **2 天前** 的 CoopCheck Beta 测试帖，因此避免重复同类发帖。 | 帖子浏览≠网站访问。历史内容继续观察反馈，不刷屏、不违反 No AI content 版规 |
| 4 BYC | **已巡检，未新发**。已确认历史法规回复位于 https://www.backyardchickens.com/threads/coop-ordinances-in-your-town.1663608/ （Oct 13 发布）；其中解释 Portland vs Seattle 距离参照物区别，未插入 CoopCheck。 | 历史公开回答存在；**不是自有站外链**，新提问需城市官方原文支持才能答 |
| 5 Pinterest | **已巡检，未新发**。图板 https://www.pinterest.com/coopcheckplans/chicken-coop-plans-layouts/ 显示 **6 Pin**，为已有内容；抽查 https://www.pinterest.com/pin/1125337025678091279/ ，页面未见站点跳转链接。 | 10 月 20 日域名链接受限历史问题尚未确认解除；不使用跳转/短链绕过，不把无外链 Pin 计算为引荐 |
| 6 YouTube | **已巡检，未新上传**。公开视频 https://www.youtube.com/shorts/XZFpD0V3_0w 可访问，题为 14 Hens in This Coop? Check the REAL Size。 | 未确认新增官网点击或订单，避免把可播放等同转化 |
| 7 GSC | **已从真实登录界面读取**。效果：默认三个月范围 2026-09-22 至 2026-10-23，**23 曝光、0 点击、CTR 0%、平均位置 26.4**；报告刚更新。索引报告**上次更新 2026-10-19**：**1 已索引、115 未索引**，其中 **95 已发现未收录、20 已抓取未收录**。Sitemap `/sitemap.xml` **2026-10-22** 读取“成功”、发现 **123** 页面；旧 `/sitemap` 仍提交，旧读 9/30，26 页面。 | **没有重复提交已请求的 URL**。SOP 对应诊断 Issue：https://github.com/DragonChenCL/CoopCheck/issues/68 |
| 8 GA4/转化 | **已从真实登录 UI 读取**（Windsor.ai 因免费计划 4 connected accounts 超额只返回假的占位数据，**全部舍弃**）。最近 7 天首页指标：**35 活跃用户、169 事件、54 网页浏览、0 GA4 关键事件**；**48 会话**：Direct 45、AI Assistant 2、Organic Search 1（来源/媒介为 Bing organic）。未看到 Google organic 会话。 | Direct/活跃用户包含运营者或测试流量可能性，35 不可当成 35 真实顾客；0 key events 不等于核验 0 订单，**真实订单/净收入未知**。 |
| 9 SEO/内容 | **完成基础抽样技术检查与选题归因**。GitHub `site/robots.txt` Allow all 且 Sitemap 指向 /sitemap.xml；仓库当前 Sitemap 为 **127 个互异 loc**（88 城市，20 指南），4 个条目 lastmod 晚于 GSC 的 10/22 读取日期，不能把 123/127 差异直接判定为错误。首页自指 canonical、74 内部链接；Portland 和 prefab checker 源文件有 self-canonical，未见普遍 noindex。 | 不能凭此断言 Google 必然收录；需要在 GSC 实查 95/20 样本、页面差异度、链接/爬取原因，按证据优化。法规定义未核城市继续 noindex |
| 10 代码/线上 | **已检查 + 新增专项 Issue（未改业务代码）**。在线首页可通过浏览器打开；最新站点代码已包含 Dallas 2026 Ordinance No. 33485 的有限范围提示（本轮未全面复核现行条例）。创建 https://github.com/DragonChenCL/CoopCheck/issues/68 ，按证据列诊断任务和验收标准。 | 这轮**没有代码修复、CI 或线上发布**；无可靠证据证明 robots / canonical 错误，未盲改。现有法规 P0 Issue #38、#41 需另行依法核验 |

### 事实、实际动作与结果口径

- **本轮新增发送邮件：1**（CityHubGo 编辑纠错感谢及 CoopCheck 可选研究引用，原线程消息 `1a175d1f9cf88a07`，发送状态为 Gmail SENT；未验证对方收到、采用或新增引荐）。
- **本轮新公布自有外链：0 已核实**；**本轮 Reddit/BYC 新发帖、Pinterest 新发 Pin、YouTube 新上传：均为 0**（本轮做过巡检，未为凑量重复推广）。
- **本轮新索引请求：0**；没有解除 needs_review noindex、没有改政策法条数值、没有购买服务/投放。
- **本轮 GitHub 实际新增**：Issue [#68](https://github.com/DragonChenCL/CoopCheck/issues/68) —— GSC 95 discovered/20 crawled 未索引专项诊断。当前记录的搜索与 GA4 数值不等于站点真实商业成果；**本轮新增真实独立站外访客、付费订单、净收入未知**。
- **浏览器资源**：cfbrower 顺序复用单 tab 查 GSC、官网、Reddit、BYC、Pinterest、YouTube、GA4；曾出现可恢复的连接失败；末次 browser_tabs(list) 只剩 **1 个 GA4 tab**。

### 下一轮 P0/P1 优先级

1. **#68 索引专项**：在 GSC 页面各抽样已发现/已抓取未索引 3–5 个真实 URL，核对 Google 所选 canonical、抓取时间、内容重复性、站内入口与站点渲染；记录后按证据修复，避免批量重复提交。
2. **Pinterest 域名链接限制**：通过正规支持流程确认/申诉；在链接受限情况下不要刷无落地页 Pin；检查六张旧 Pin 的站点链接和来源。
3. **真实流量/转化闭环**：复查 CityHubGo 是否追加编辑引用、Grubbly/Carolina Coops 是否有真人回复；用 GA4 原生报表对照 key events、工具行为、UTM/referral，尽量排除测试流量，按收入优先决定后续社媒投入。

## 2026-10-25 — SOP V1.0 固化（仅文档变更，未执行渠道运营）

- 根据项目负责人确认，将“运营一下鸡舍项目 / 继续运营 / 复盘一下”的固定流程写入 docs/operations/SOP.md 并在 README.md 设置统一入口。
- 新增 10 个常规模块：邮件、外链/编辑合作、Reddit、BackYardChickens、Pinterest、YouTube、GSC/收录、GA4/转化、SEO 内容、代码/线上。
- 规定 P0/P1/P2 优先级、各渠道可执行动作、质量与合规边界、必须记录的执行状态/公开 URL/数据时间窗口/下一轮事项。重点区分提交、公开、反链、引荐和付费收入；不为了配额进行低质操作。
- 延续 cfbrower 默认唯一 tab、法规证据核验、BYC/Reddit 社区规则、Pinterest 受限域名不绕过、YouTube 公共可见性验证等约束。
- **本次只更新运营制度文档；没有新发邮件、社媒内容、外链或索引请求；本次新增访问/订单未知。**
- 下次触发运营：先读取 SOP 与本日志，优先接续待回复邮件、Pinterest 域名申诉、已发布 Shorts 与近期 GSC/GA4 指标。

## 2026-10-20 UTC — Pinterest launch, domain claim and link block

- Logged into new Pinterest account; converted profile display name to `CoopCheck | Chicken Coop Plans`, username to `@coopcheckplans` (`@coopcheck` unavailable), added description and `coopcheck.serunio.com` site reference. Actual avatar image was not verified changed: existing Pinterest avatar URL remained unchanged after attempted upload, so do not assert branding complete.
- Created public board: https://www.pinterest.com/coopcheckplans/chicken-coop-plans-layouts/ .
- Produced three 1000×1500 original instructional graphics (4×8 layout, free coop floor-plan concept, property-line setback concept), saved in ChatGPT Library under `/CoopCheck/Pinterest/`.
- Published first original Pin **4x8 Chicken Coop Layout: Is 32 Sq Ft Enough?** at https://www.pinterest.com/pin/1125337025678021256/ ; confirmed Pin visible in board/profile. Published **without external link** because Pinterest repeatedly flagged `coopcheck.serunio.com` domain (root and specific guide, with or without UTM) as possibly spam. The other 2 graphics are saved, not yet published.
- Claimed domain successfully via Pinterest's meta tag `<meta name="p:domain_verify" content="b1886bac1b41311db1481a2a03161e5f"/>` deployed to `site/index.html`, GitHub commit `d70a4bbfb3111448c3fbd48fd99c110994a962fb`. Verified live homepage HTTP 200 and tag present; Pinterest confirmation dialog stated website connected. This has **not** removed Pinterest's destination URL restriction. Avoid bypassing with URL shorteners; request formal review for suspected false positive before counting outbound traffic.
- Browser kept in single tab. Next: clarify link block with Pinterest support; correct avatar and profile name rendering if needed; create/release remaining 2 Pins after verifying content policies, preferably with landing URLs once allowed.

## 2026-10-20 UTC — YouTube channel profile aligned with CoopCheck brand

- Authenticated YouTube Studio channel `UCY09A42glQ3u4lOxAo2Dbzw` (`https://www.youtube.com/@CoopCheck`) had initial display name `CoopCheck`, handle `@CoopCheck`, and an already-configured site link `https://coopcheck.serunio.com/`.
- Uploaded a 1024×1024 PNG rendition of `site/assets/logo-mark.svg` (dark green coop, hen, checkmark on ivory background) as channel profile image, completed crop, and changed the YouTube display name to **`CoopCheck | Chicken Coop Plans`**. Did not modify the handle or website link.
- Clicked **Publish**, then reloaded the profile settings page. Verified new display name persisted, profile-photo image URL changed from the prior asset to a new YouTube image asset, and Publish became disabled. This confirms the channel customization is saved; public-channel propagation may be cached temporarily.
- This is a channel-branding operation, not a new video upload or evidence of viewers/traffic. TikTok was not modified after the user clarified that YouTube was intended.

## 2026-10-19 PDT — GSC/GA4 review, Shorts publication and community follow-up

### Verified connected analytics (at review)
- Google Search Console property `sc-domain:coopcheck.serunio.com`: 2026-10-06..2026-10-17 daily rows each 0 search impressions, 0 clicks; 2026-09-24..2026-10-01 had 23 impressions/0 clicks; no October 18+ search-performance rows confirmed, not proven zeros.
- GSC sitemap connector: `/sitemap.xml` shows 115 submitted URLs, 0 errors/warnings, last downloaded 2026-10-15T01:06:10Z. This is a *last-seen GSC snapshot*, not a fresh read of the 129-URL sitemap deployed Oct 17; do not confuse submitted URLs with indexed URLs.
- GA4 CoopCheck property `555450721`, queried 2026-10-06..2026-10-19: 35 session_start events / 35 sessions by source, 183 page_view events. Source/medium: Direct 33, Bing organic 1, ChatGPT AI-assistant 1. No Google organic sessions returned. Daily rows only through 2026-10-18, with 7 active users/10 sessions that date. Traffic likely includes owner/tests.
- GA4 tool events in that same requested range: `chicken_coop_plan_generate` 16, `chicken_coop_plan_export` 7, `coop_intent_tool_calculate` 10, `quick_check_submit` 2; event counts are not distinct users or externally verified trials.
- 2026-10-18: `paid_report_offer_view` 1, `paid_report_planner_click` 1, `paid_report_checkout_blocked` 1; zero verified paid order or checkout success in returned events. From `site/assets/payment.js`, `checkout_blocked` can be caused by incomplete geometry, jurisdiction mismatch or save failure, **not** necessarily a payment gateway outage; event reason was not available as report dimension. Investigate with end-to-end no-charge path, do not manufacture a failure cause.

### Actual actions and externally verified state
- YouTube Studio CoopCheck Shorts `CoopCheck_Shorts_V2.mp4`, 31 sec, video ID `XZFpD0V3_0w`, title `14 Hens in This Coop? Check the REAL Size 🐔 | CoopCheck #shorts`: HD completed, uploaded custom thumbnail present. Changed visibility from **Private** to **Public**, clicked completion, then re-read Studio which confirmed `公开`. Public video URL: https://youtube.com/shorts/XZFpD0V3_0w . Publication is verified; views/click-through are not.
- Reddit r/SideProject feedback post https://www.reddit.com/r/SideProject/comments/1x9n6xj/ : browser still shows existing CoopCheck post, score 1, a `commentCount` metadata value of 1 but *zero loaded `shreddit-comment` nodes*. No qualified response/visit verified and no duplicate post.
- BackYardChickens https://www.backyardchickens.com/threads/coop-ordinances-in-your-town.1663608/ : public search/browser-visible thread now shows the prior Oct 13 municipal rules comparison as a comment. It links municipal sources but not CoopCheck, so **0 newly verified product backlinks** in this pass.
- Found active relevant Joliet ordinance conversation https://www.backyardchickens.com/threads/city-of-joliet-illinois-chicken-ordinance-amendment.1694938/ but did not reply absent current local-law verification.
- Browser reused Reddit/BYC tab after YouTube. Studio's `beforeunload` prevented same-tab navigation; briefly opened a second tab, attempted to close Studio via tab action but the tool reported `Tab not found` despite listing it. Do not claim a successful tab cleanup. Subsequent BYC browser evaluation timed out; public thread result was supported by externally indexed text. Later browser cleanup closed the Studio tab, and `browser_tabs(list)` verified exactly one BYC tab remaining (no extra tabs retained).

### Next 3 priorities
1. Track actual views/clicks/referrals from published Shorts and user comments from the SideProject post; only count qualified external users, not owner/test traffic.
2. Distinguish the 2026-10-18 report checkout block reasons using GA4 custom dimension or better UX, and manually test the no-charge journey before modifying payment flow.
3. On/after Oct 21 PDT, recheck whether GSC has downloaded the new 129-URL sitemap and whether the previously accepted 8 + older 5 indexing-request cohort saw a new crawl; avoid repeating accepted indexing requests.

## 2026-10-19 — First-user acquisition, second active outreach wave

### Live data checks
- GSC CoopCheck domain, available Oct 12–16: 0 impressions, 0 clicks; Oct 17–19 have no rows yet, not proven zeros. GA4 Oct 15–19 query: 7 sessions (6 direct, 1 chatgpt.com/ai-assistant), 3 active users. No Reddit or UTM email sessions in returned source/campaign reports. Page views and tool events may include developer tests. Current externally attributable new users: **0 verified**.
- Gmail inbox search for CoopCheck/chicken-related replies and mailer-daemon bounces newer than four days returned zero relevant messages at check time, not proof of delivery.

### Targeted editorial invitation sent
- **The Happy Chicken Coop**: site currently has Sept 2026 updated DIY coop plans and build-design guides, relevant to a free size-checker resource. Public email `contact@thehappychickencoop.com` found in its own historical PDF; verified no earlier sent Gmail to that recipient. Sent subject “Free coop-size cross-check for your DIY coop plans readers”; Gmail ID `1a152588a2568bda`.
- Invited honest evaluation from editors or readers; no request for payment, positive review, or mandatory link. Measurement URL: https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html?utm_source=editor_outreach&utm_medium=email&utm_campaign=first_users_oct26&utm_content=happy_chicken_coop
- **Actual outcome:** Gmail sent confirmation only; delivery, reply, editorial inclusion and referral visits not verified.

### Reddit project feedback post published
- Subreddit: r/SideProject, which describes itself as a place to share projects and receive constructive feedback. Avoided subreddits with explicit AI-generated text restrictions.
- Live post: https://www.reddit.com/r/SideProject/comments/1x9n6xj/coopcheck_free_chickencoop_size_checker_seeking/
- Exact title: “CoopCheck – free chicken-coop size checker; seeking feedback from actual chicken keepers”. Honest product-owner disclosure, no account/payment needed, invites critical 4–8 bird real measurement checks. Separates inside coop and run and notes tool is not engineered plans or permit approval.
- UTM link: https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html?utm_source=reddit&utm_medium=community&utm_campaign=first_users_oct26&utm_content=sideproject
- Submitted using logged-in cfbrower, verified new post ID `1x9n6xj` on subreddit feed and exact post detail page: title, content, link visible; no removal notice at time of check. It may be moderated or taken down later. Single browser tab used throughout; no duplicate submission after transient first click error.
- **Net new this wave:** 1 verified on-page Reddit post with CoopCheck URL, 1 sent editorial invitation, 0 verified resulting external site visitors, 0 confirmed product feedback, 0 orders. r/SideProject's audience is makers, not necessarily chicken keepers; classify feedback visitors separately from high-intent poultry buyers.

### Next measurement
- Watch GA4 `session_source_medium` plus `session_manual_campaign_name` and `session_manual_source` for `first_users_oct26`, page views on `prefab-chicken-coop-capacity-checker.html`, and tool calculation events. Exclude owner/test activity where feasible.
- Check Reddit thread for real comments/questions and continued public visibility before further post submissions. No duplicate posts in r/SideProject.
- Check Gmail for replied editorial feedback and bounces. Avoid immediate repeat emails to previously contacted sites. Consider user feedback before modifying paid report.


## 2026-10-19 — First-user acquisition: targeted feedback invitation

- Connected GSC (2026-10-15..16): 0 impressions and 0 clicks; no available Oct 17–18 rows. GA4 Oct 1–18 reported 27 sessions (26 Direct, 1 AI Assistant), no organic search, and only four active users; existing visits may include developer/testing activity.
- Checked already logged Reddit activity to prevent duplicates. Examined [four-hen build vs. buy discussion](https://www.reddit.com/r/BackYardChickens/comments/1x3iswq/overwhelmed_by_the_amount_of_coop_and_choices/), a genuine question about prefab capacity, plans and budget. Browser comment-composer attempts timed out; **zero new Reddit comments were verified or counted**.
- **One tailored first-contact email sent**, to Backyard Chickens Coop site contact (admin@backyardchickenscoop.com), subject “Free chicken-coop size checker — looking for real-world feedback”, Gmail message ID `1a152503b3be52bc`. Invited an honest no-payment, no-signup trial with real 4–8-hen dimensions, explicitly disclosed product authorship and no expectation of a published link. Send confirmed by Gmail; delivery, opens, reply, visits, and customers **not confirmed**.
- Tagged tool URL: https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html?utm_source=outreach&utm_medium=email&utm_campaign=first_users_oct26&utm_content=backyardchickenscoop
- New verified outcomes this session: 1 email sent, 0 confirmed external visits, 0 verified published Reddit comments, 0 purchases, 0 public backlinks.
- Next: check response/bounce and GA4 UTM acquisition after data lag; only expand to other genuinely relevant audiences based on feedback, avoid repeat outreach and spam.


## 2026-10-19 — Alternative income experiment: plan-publisher PDF workflows

Goal: test direct services revenue *outside* the $4.99 site report and outside chicken-coop retailer widgets. Keep it separate from organic SEO metrics.

### Three first-contact emails actually sent
- **CoopPlansDIY** — `contact@coopplansdiy.com`, Gmail message `1a1521827b3c0bc3`. Their public FAQ explicitly says US-only measurements and that metric plans are being worked on. Proposal: source-approved unit conversion, cut-list reconciliation, discrepancy flags, printable PDF production; technical/construction dimensions checked by the seller, not asserted as engineered.
- **Standish WoodStory** — `info@standishwoodstory.com`, Gmail message `1a152182ae47d68c`. Its catalog contains PDF tutorials with SVG/CNC assets, and some dual-unit cut lists. Proposal: version-control, format/linkage audit, bundle preflight for approved plans. No structural redraw or unsolicited attachment.
- **Rogue Engineer** — `support@rogueengineer.com`, Gmail message `1a15218335a233cd`. Seller offers individual downloadable PDFs plus an Everything Bundle. Proposal: batch plan-release checks, synchronized BOM/cut-list tables, versioned delivery bundles using creator-approved source data.
- Sender: authenticated Gmail account. Each send returned a Gmail message/thread ID. **Sent != delivered/accepted/response.** No pricing acceptance and no revenue recorded. Checked no matching sent recipient for these prior to emailing.

### Freelance job demand and application blocker
- Public Upwork posting, "$900 fixed" Airtable + CSV sequencing + one-page HTML-template PDF automation: https://www.upwork.com/freelance-jobs/apply/Python-Script-for-Airtable-and-PDF_~022107855717124495593/ . Search evidence of a listing does not confirm still open.
- Also found $500 API automation https://www.upwork.com/freelance-jobs/apply/Automate-Website-with-API_~022107450255782019417/ and $500 Google Sheets/Apps Script/Python audit https://www.upwork.com/freelance-jobs/apply/Automation-Engineer-Needed-Audit-Google-Sheets-Apps-Script-Python-Windows-Machine-Controller_~022105471245779183596/ .
- Direct browser navigation to the $900 Upwork listing returned **HTTP 403** (blocked access); no Upwork account access or platform application, proposal or client communication was completed. Do **not** represent listing views as bid submissions, nor bypass platform processes by taking client off platform.
- Prospecting success criterion: one qualified reply or willingness to share a safe sample for a scoped paid pilot. Do not infer responses/purchases until independently verified.


## 2026-10-19 — First direct B2B outreach batch (five sent)

- Gmail account sent **5 targeted first-contact messages**, all returned provider message IDs (sent, not reply or deliverability proof). B2B builder pitch: branded coop-size/quote-intake widget, first offer to review a tailored mockup for free, then an optional fixed-price paid pilot. Creator pitch: free planner evaluation, optional collaboration, no positive-review obligation. No proven conversion claims, no follow-up automation.
- Cocalico Coops — `customcoopsbyjordan@gmail.com` — message `1a152032bed8599a`.
- San Tan Valley Coops — `santanvalleycoops@gmail.com` — message `1a1520330099aa8a`.
- Triano Farms — `office@trianofarms.com` — message `1a15203375c59235`.
- All Purpose Construction — `leslie@allpurposeconstructionok.com` — message `1a152033fa43bd32`.
- Eggsistential Farms (creator) — `eggsistentialfarms@gmail.com` — message `1a152034501e17b4`.
- Previously contacted Waddle & Cluck, Community Chickens and Homestead How-To were excluded. **5 sent, 0 verified replies, 0 revenues as of this action.** Verify response/bounce outcomes before proceeding with a second stage.


## 2026-10-19 — Reddit 第二轮逐帖回复（4 条已确认）

- **新发布 4 条**，都在 r/BackYardChickens，由已登录 Reddit 账号在真实页面逐个提交，并且随后检查到 `shreddit-comment` 节点与 `permalink`。复用浏览器唯一 Tab；未购买曝光、未批量重复灌水。
- **冬季雪荷载与顶梁损坏**：https://www.reddit.com/r/BackYardChickens/comments/1x8mo8l/comment/phljdk0/ 。讨论用户的轻型围栏棚顶梁被雪压弯，胶带/金属片临时固定；说明继续承受积雪的塌陷危险、避免继续信任受损顶梁、考虑可靠替代屋顶与查看当地高度/退距规则。无自站链接。
- **散养鸡冬季雨淋、鸡舍包篷后的湿气和冻伤**：https://www.reddit.com/r/BackYardChickens/comments/1x8nr7p/comment/phljm5y/ 。说明高位通风、防直吹、检查结露/潮湿垫料、室外遮雨区等。无自站链接。
- **明尼苏达保温双层鸡鸭舍冬季湿度**：https://www.reddit.com/r/BackYardChickens/comments/1x9adco/comment/phljz9t/ 。关注鸡鸭混养湿气、湿度计监测、可控换气/补风、冷热结露风险及加热设施防火。无自站链接。
- **加拿大阿尔伯塔新房附带鸡群，养鸡新手入门**：https://www.reddit.com/r/BackYardChickens/comments/1x8kv52/comment/phlkco2/ 。个性化清单：清点品种数量，舍和围栏防捕食者，北方冬天水不结冰、丝羽乌骨鸡保暖与干燥、检查加热器用电安全、核查所在地政策。无自站链接。
- 核查上一轮 CoopCheck 链接 https://www.reddit.com/r/BackYardChickens/comments/1x2etj8/comment/phlc6fh/ 仍在已登录浏览器中可见，指向 `https://coopcheck.serunio.com/guides/chicken-coop-size-calculator.html`，`rel="noopener nofollow ugc"`。这次没有新增可确认反向链接。
- **本轮净增统计**：4 条实际显示的评论、0 条新外链、0 美元支出。平台页面出现的评论不代表第三方可见、搜索引擎抓取或引荐点击均已完成验证。浏览器页面的持续可见性后续仍应按公开链接复核。
- 主题筛查：Reddit 站内检索 r/BackYardChickens 的 `coop`、`run` 和 `city ordinance`，以及 r/homestead `chicken run`；法规检索结果缺乏近期高匹配投稿，不硬推 CoopCheck 链接。筛除重复既有讨论、患病/喂养或纯晒照帖。
 
## 2026-10-19 — Reddit 鸡舍讨论精准回复与实际外链核验

- 范围：复用 cfbrower 唯一 Tab；Reddit 登录账号已有会话。用户表示已电话获得 r/BackYardChickens 和 r/chickens 版主对代发内容的同意（**用户陈述，未见书面确认**）。两版公开规则仍写 No AI，因此仍须谨慎遵守其它反垃圾/商品推广要求。
- **新发布 #1**：https://www.reddit.com/r/BackYardChickens/comments/1x2etj8/comment/phlc6fh/ 。主题：10 只鸡与 7×7 英尺树脂鸡舍；比较约 49 sq ft 室内空间、栖架支撑、通风、捕食者防护，披露自己开发的免费 CoopCheck 鸡舍尺寸计算器。浏览器确认评论节点 `t1_phlc6fh` 和可点击产品链接 `https://coopcheck.serunio.com/guides/chicken-coop-size-calculator.html`，该链接 `rel="noopener nofollow ugc"`。**这是一条实际 Reddit UGC 外链，但不是 dofollow，也不能直接当排名提升或已收录。**
- **新发布 #2**：https://www.reddit.com/r/BackYardChickens/comments/1x943n4/comment/phlcsgh/ 。主题：北卡 10–15 只鸡对比 Producers Pride Defender、Zylina、OverEZ；强调真实室内面积/活动区分开核算、通风、可清洁性、栖架长度，未带站点链接；确认评论节点已显示。
- **新发布 #3**：https://www.reddit.com/r/chickens/comments/1x4vwwo/comment/phld1z8/ 。主题：11 只青年鸡长期在 8×4 英尺鸡舍；计算约 2.9 sq ft/只、提醒年龄差异/活动区与成鸡夜宿安全等，未带站点链接；确认评论节点已显示。
- **避免重复**：r/chickens `/comments/1x5cg76/` 与此前 r/homestead `/comments/1x5cdk6/` 为同一作者重复求助，已在后者回复，前者未发；患病鸡的诊断帖与项目不相关，未参与。
- 当天另发现 https://www.reddit.com/r/BackYardChickens/comments/1x8uk37/comment/phie22t/ 账号已有针对密歇根州鸡舍冬季设计的回复，本轮只核验现存，不计入本轮新增。
- **本轮新增**：成功发出 3 条评论，其中含自站链接 1 条，已验证 Reddit 展示及属性 `nofollow ugc`；付费=0、未复制粘贴批量刷屏。后续应观察公开保留状态、referral、被点击率；不要将社区链接计为编辑推荐型外链。

## 2026-10-18 — CoopCheck 外链自主申请（真实提交与待审核）

**结果统计：成功送审 2；已验证公开新外链 0；付费 0；新注册账号 0。** 复用 cfbrower 的唯一 tab；避免重复联系 10/13–10/15 已联络的 Community Chickens、Backyard Chicken Pro、Waddle & Cluck。

1. **Ignlab Launch — 送审成功**：https://launch.ignlab.net/submit.html。提交 CoopCheck 官网、免费产品定位、100 城市法规来源、2D 概念规划与面积工具；选 Other / Free；邮箱留空。提交后页面明确回执 “Thanks! Your tool is in the queue”。**审核中，不代表公开外链。** 其私人 edit token 不写入公开仓库。
2. **public.tools — 投稿成功**：https://tally.so/r/Gx75Qz （入口 https://public.tools/）。推荐可直接使用的鸡舍尺寸计算器 https://coopcheck.serunio.com/guides/chicken-coop-size-calculator.html，选择 Utilities，说明 2–24 只鸡的室内/户外独立面积计算、巢箱/栖架、免费无账号。提交后 Tally 明确显示 “Form submitted / Thanks for completing this form!”。**待编辑审核，尚无公开列表 URL**。
3. **The Free Tools Directory — 未提交确认**：https://thefreetoolsdirectory.com/submit 。网站提供免费投稿表单、允许 Email optional、分类包括 Home & Household/Construction；浏览器页面上下文持续销毁或连接失败，未收到回执。待浏览器恢复后再试，避免重复未知请求。
4. **The Tool Directory — 未提交**：https://thetooldirectory.com/submit-a-tool/ 浏览器返回 403 / checking browser。免费审核是真实政策，但当前不能自动提交。站内说明免费 listing 不承诺 dofollow，付费推广有单独套餐，**不采购**。
5. **Ultimate Free Tools — 账号门槛**：https://ultimatefreetools.com/submit-a-tool/ 需要 Publisher 登录/注册后提交，未私自开户。
6. **Uneed — 页面校验阻止**：https://www.uneed.best/submit-a-tool 。现存浏览器 tab 原先为 Cloudflare 校验。没有成功投递证据，不能当已入队。
7. **Linkrena — 发现渠道但放弃本轮提交**：https://linkrena.com/ 更偏 AI 工具/代理，CoopCheck 不是 AI-first；避免误报类目。
8. **其他待核验（优先真工具/自然编辑引用）**：https://www.saashub.com/services/submit 、https://alternativeto.net/faq/#add-a-new-application 、https://homesteadhow-to.com/contribute/ 、https://boskizbackyard.com/write-for-us 、https://www.flowpath.cloud/ 、https://www.somuch.com/submit-links/ 。其中要注册或人工原创稿的渠道不能假称免费无门槛。

**后续验收**：检查公开列表 URL、是否确实链回 coopcheck.serunio.com、nofollow/sponsored 标记、被 Google 发现/收录状态、GA4 referral。只有实际公开且可访问的编辑链接才计入成功外链；不要根据搜索结果里的第三方 DR 声称 SEO 收益。优先垂直养鸡/家禽内容引用，软件目录只作为补充。避免论坛刷帖、伪造养鸡经验或购买链接。

# CoopCheck 运营执行日志

## 2026-10-17 — Sitemap expansion and authenticated GSC priority requests

- Owner requested all content pages in sitemap and ten priority indexing requests.
- Verified GitHub tree: 131 HTML files; 129 content HTML and 2 explicitly excluded system/transaction pages (`404.html`, `payment-success/index.html`). Expanded sitemap from 117 to 129 URLs, including 12 pending research-city status pages that **retain noindex,follow**. Did not change unverified municipal claims. Generator and CI guards updated. PR #61 merged: https://github.com/DragonChenCL/CoopCheck/pull/61 . Fixed additional hard-coded sitemap-count and pending-exclusion tests through commit 8c12daa5c84ae7c0229b8c14ad536a57442308b7. GitHub Pages deployment run 38994031977 **success**, IndexNow notification run 38994059463 **success** (acknowledgement only, not Google indexing).
- Inspected authenticated GSC at sc-domain:coopcheck.serunio.com. Homepage URL inspection: crawled successfully Oct 15, crawl and indexing allowed, but crawled/not indexed. Coverage.html: crawled Oct 13, not indexed. These were baseline observations, not signs of indexing approval.
- **GSC indexing request CONFIRMED** by dialog text `已将网址添加到优先抓取队列中` for exactly eight distinct URLs:
  1. https://coopcheck.serunio.com/coverage.html
  2. https://coopcheck.serunio.com/states/arizona.html
  3. https://coopcheck.serunio.com/states/texas.html
  4. https://coopcheck.serunio.com/guides/chicken-coop-cost-calculator.html
  5. https://coopcheck.serunio.com/guides/chicken-roost-length-calculator.html
  6. https://coopcheck.serunio.com/guides/chicken-run-fencing-calculator.html
  7. https://coopcheck.serunio.com/guides/coop-size-for-4-chickens.html
  8. https://coopcheck.serunio.com/coop-plan.html
- **Inspected / attempted, no reliable indexing confirmation**: California state page, 4x6 coop capacity page, nesting-box calculator, 6x8 capacity page, prefab capacity checker. GSC asynchronous UI and transient browser connection failures prevented proof of queue insertion. Do **not** claim ten were submitted or automatically retry already-confirmed eight. Homepage was only inspected, not requested again (avoid duplicate historical request).
- Browser: one reused tab throughout. Google URL inspection sometimes requires live testing for 1–2 minutes; popup confirmation can arrive later than click. Some MCP calls failed with `Connection failed` or 5-second timeout despite subsequent browser availability.
- Follow up: check GSC outcome for the eight confirmed requests after 7–14 days; request remaining two only if owner still wishes and tool/UI offers reliable confirmation. Sitemap submission does not override noindex or ensure indexing.

## 2026-10-17 CST — 129 URL sitemap deployment and GSC request quota

- Owner requested every content page in sitemap and **10 priority GSC indexing requests**.
- Audited repository tree: 131 HTML files; excluded only 404.html and payment-success/index.html; new sitemap **129** unique content URLs (previously 117). Added 12 pending/unverified city research pages to sitemap while preserving their `noindex,follow` and truthful verification warnings. Sitemap completeness guard now checks all content HTML files with those 2 explicit exclusions.
- Changed generator, rendered site/coverage.html and sitemap, and fixed five affected QA files hardcoding 117/pending exclusion. PR #61 merged (5069994c0cf2cb82bec339d8788165960e0a72a9); follow-up CI fixes through commit 8c12daa5c84ae7c0229b8c14ad536a57442308b7. **Successful GitHub Pages deployment** run 38994031977 and **successful IndexNow workflow** 38994059463. Success of IndexNow workflow does not imply the 12 noindex URLs can be indexed.
- Authenticated GSC URL inspection baseline: root URL crawled Oct 15 by Googlebot smartphone, accessible and indexable but "Crawled — currently not indexed". coverage.html crawled Oct 13 and likewise "Crawled — currently not indexed". Texas, several guide pages not yet known to Google.
- **At least 8 priority URL indexing requests had explicit successful GSC confirmation** ("已请求编入索引; 已将网址添加到优先抓取队列中"): https://coopcheck.serunio.com/coverage.html ; /states/arizona.html ; /states/texas.html ; /guides/chicken-coop-cost-calculator.html ; /guides/chicken-roost-length-calculator.html ; /guides/chicken-run-fencing-calculator.html ; /guides/coop-size-for-4-chickens.html ; /coop-plan.html .
- Additional inspected/attempted URLs with **no unambiguously URL-matched success verification**: /states/california.html ; /guides/4x6-chicken-coop-capacity.html . A confirmation dialog appeared asynchronously during navigation; do not claim these were or were not queued. /guides/chicken-nesting-box-calculator.html later showed explicit GSC **daily indexing-request quota exceeded** ("超出了配额"). Attempts toward /guides/6x8-chicken-coop-capacity.html and prefab checker could not be completed reliably after quota; do not count. User wanted 10 submissions, but 8 are strictly verified; STOP further indexing submissions until quota resets.
- GSC sitemap report still showed 115 URLs last read Oct 15 before new deploy; Google has to fetch updated 129 URL sitemap. No duplicate old five-URL cohort resubmissions and no `noindex` page indexing requests.
- Browser: reused one tab throughout. Transient MCP connection failures/timeout were encountered. Do not make success claims for unverified clicks; favor post-action confirmation. Follow-up on the next day: verify quota reset, check already-queued state for California and 4x6 first, then complete remaining priority requests only if still needed; track crawl/index status independently.

## 2026-10-17 CST — 129-page sitemap deployment and GSC priority follow-up

- **Production sitemap completeness:** audited GitHub site tree: 131 `.html` files, excluding utility `404.html` and `payment-success/index.html`, leaving 129 content URLs (100 city pages + 29 other content/guide/state/tool routes). 117 previous sitemap URLs expanded by 12 pending city pages to **129**. These 12 pending municipal status pages **retain `noindex,follow`**, preventing search indexing even when listed in sitemap. No unsupported municipal rules were promoted as verified.
- **Code & CI:** PR [#61](https://github.com/DragonChenCL/CoopCheck/pull/61) squash merged at `5069994c0cf2cb82bec339d8788165960e0a72a9`. Updated deterministic sitemap generator, coverage directory copy, sitemap QA, and historical tests asserting old 117 count or no pending pages. Final production commit `8c12daa5c84ae7c0229b8c14ad536a57442308b7`: [Pages deployment #38994031977](https://github.com/DragonChenCL/CoopCheck/actions/runs/38994031977) **SUCCESS**. Intermediate deployment attempts failed due stale generated coverage copy and tests; those regressions were corrected. Successful [IndexNow workflow #38994059463](https://github.com/DragonChenCL/CoopCheck/actions/runs/38994059463) processed **0 eligible changed indexable URLs**; it does not imply all 129 URLs were pushed to IndexNow or to Google.
- **GSC authenticated:** GSC sitemap screen still showed Google *last read* Oct 15 and **115 discovered URLs** during this session; that is a delayed GSC metric, not the latest deployed XML contents. The existing sitemap previously succeeded; no new canonical sitemap URL needed.
- **Confirmed fresh priority requests:** GSC URL inspection for `https://coopcheck.serunio.com/coverage.html` showed crawled-not-indexed, last Googlebot crawl Oct 13, crawl success and indexing allowed. After clicking request, a visible modal explicitly confirmed **“已请求编入索引 / 已将网址添加到优先抓取队列中”**. `https://coopcheck.serunio.com/states/arizona.html` likewise returned explicit request-accepted modal from the same URL inspection. These are **two verified additions to the queue**, not two indexed pages.
- **Avoid duplicate requests:** The separate previous cohort already accepted Oct 15 includes homepage `/`, Portland `/cities/portland-or.html`, and guides `/guides/chicken-coop-size-calculator.html`, `/guides/chicken-run-size-calculator.html`, `/guides/free-chicken-coop-floor-plans.html` (see `SEO_GSC_PRIORITY_INDEX_REQUESTS_2026-10-15.md`). Do not re-request these without material changes.
- **In-progress GSC batch caution:** The single shared connected browser tab appeared to receive overlapping navigation across unrelated URL inspection pages (California, Texas and sizing/nesting tools) without corresponding commands in this operation, making success dialogs unreliable to attribute to a specific URL after the page changed. Stopped issuing further write clicks to prevent duplicate/misattributed indexing requests. The user requested 10 priority submissions, but **only the two newly accepted URLs listed above are positively verified in this continuation**. Other page checks/requests must be reconciled from stable same-URL GSC confirmations before claiming 10 successes.
- **Success semantics:** GSC indexing-request acceptance means queued for prioritized crawl, not crawled/indexed/ranked; repeated requests provide no queue benefit. Revisit indexing cohort in 7/14 days.

## 2026-10-17 CST — browser recovered, verified GSC, Reddit engagement, BYC timeout

- **Real browser access recovered:** cfbrower reused exactly one existing tab, initially `about:blank`, and successfully navigated authenticated GSC and logged-in Reddit. This verifies actual Chrome/CDP/MCP browser operations, not merely ports or service status.
- **Authenticated GSC performance** (screen observed at ~2026-10-17 09:16–09:18 CST; default view chart Sep 22–Oct 14): 23 total impressions, 0 clicks, average position 26.4. GSC said data updated ~6 hours before visit; avoid representing that as completed-day performance.
- **GSC Indexing** (report last updated Oct 12): 1 indexed URL, 27 not indexed, of which 19 discovered/not indexed and 8 crawled/not indexed. Report is a delayed Google-known URL subset, not a count of all 117 canonical sitemap entries.
- **Sitemaps:** `/sitemap.xml` submitted and successful, last read Oct 15 showing 115 discovered URLs; earlier legacy `/sitemap` succeeded Sep 30 with 26. Live generated canonical sitemap has since advanced to 117 entries, which the dated GSC report does not yet reflect. Did not resubmit sitemap or duplicate URL indexing requests.
- **GSC links:** external links 0; internal links displayed 1. This is what GSC currently reports, not proof no third-party URL can link to the site.
- **Reddit community, actual verified public comment:** reused same Chrome tab, inspected r/BackYardChickens thread about a 40,000 sq-ft zoning threshold (approx. 701 votes and 142 comments): https://www.reddit.com/r/BackYardChickens/comments/1wymt6i/the_end_of_an_era/ . Posted one empathetic, informative, **non-promotional** English comment about obtaining exact written ordinances, zoning checks, grandfathering/variances/appeals and distinguishing lot area from setbacks; **no CoopCheck link**. Verified publicly rendered comment and permalink https://www.reddit.com/r/BackYardChickens/comments/1wymt6i/comment/ph833b1/ . No additional comments or external links; later moderation persistence unverified.
- **Browser stability:** one Reddit navigation tool returned `Connection closed`, but immediately following list-tabs confirmed that same tab had navigated and it continued responding. Subsequent navigation to BackyardChickens.com timed out, and one lightweight list-tabs attempt returned `async initializeServer: Timeout 15000ms exceeded` after the CDP WebSocket was connected. Stopped further browser operations to avoid stressing the small server. **No BYC posting, account operation, or backlink.** Exact hang cause (page load, MCP startup, host memory/CPU) remains unverified.
- **Next:** check `systemctl status`, journal of Chrome/MCP and memory/Swap/CPU before resuming BYC; confirm watchdog is actually enabled and recovers MCP after CDP/browser hang, rather than assuming it is. On Oct 21 and later, recheck priority URLs' GSC index states without duplicate requests. Keep low-tab, respectful community engagement, and log any confirmed public results.

## 2026-10-16 — connected search baseline and primary-source permit worksheet experiment

- GSC (Windsor.ai, account sc-domain:coopcheck.serunio.com, Sep 15–Oct 16): 23 impressions, 0 clicks. Oregon state 9, Portland 9, homepage 5. Daily nonzero last recorded Oct 1; source may lag through Oct 14.
- GA4 555450721 (Oct 1–16): Direct 24 sessions / 3 active users; no Organic Search channel reported. Possible owner/browser QA visits prevent valid demand conclusions.
- Official Grand Rapids, Blaine, and Marietta municipal permit pages read, confirming site-plan/measurement requirements. Blaine source contradicts itself on application fee; no fee amounts in worksheet.
- Prepared one print-friendly, browser-local ten-step permit site plan checklist, city-source examples, distinct coop vs run areas, explicit legal/survey limits. Canonical sitemap updated 116 to 117; homepage editorial link; CI regression guard.
- Community: Reddit/BYC search examples read for real user questions; no comments, promotion, emails or third-party submissions made. Previous pitches not duplicated.
- Browser cfbrower list-tabs call timed out repeatedly; no authenticated GSC/BYC use and no extra tab created. Latest indexing state not independently confirmed.
- Follow-up: 7/14/28 days, see PERMIT_SITE_PLAN_EXPERIMENT_2026-10-16.md. Five previous GSC index requests must not be repeated. Dallas #38 and Lakewood #41 legal P0 remain unresolved.
- **Delivery verified after initial log entry (2026-10-16 LA):** PR #60 https://github.com/DragonChenCL/CoopCheck/pull/60 merged via squash commit 6f0c91f05bd8411af4911f58f19ec07453b9b1d5. Latest PR validation workflow #83 passed all steps, including permit worksheet regression and sitemap checks.
- GitHub Pages deployment https://github.com/DragonChenCL/CoopCheck/actions/runs/38987350292 completed with SUCCESS. This confirms the deployment workflow, but direct public HTTP validation was not possible because browser tab initialization timed out and local curl DNS resolution failed; do not overclaim live HTTP.
- Automatic IndexNow notifier https://github.com/DragonChenCL/CoopCheck/actions/runs/38987377387 successfully submitted exactly two updated canonical URLs (homepage and new permit checklist), receiving HTTP 200. Runner public-key preflight returned 403 but did not prevent IndexNow receipt; 200 is notification acknowledgement only, **not search indexing**.
- Additional content correction in same PR: homepage source-review badge updated from outdated 87 reviewed / 13 pending to 88 reviewed / 12 pending.

## 2026-10-15 — Full production sitemap audit, San Diego freshness and BYC source correction

**Scope:** Organic-search discoverability and transparent reader benefit; Pinterest and GA4 explicitly deferred by site owner.

### Full actual production audit (115 of 115)
- Reused a single browser tab and read https://coopcheck.serunio.com/sitemap.xml (HTTP 200; **115 URLs**).
- Fetched **every one** of the 115 public URLs in batches; **115 returned HTTP 200**.
- All 115 had sitemap-URL-matching canonical tags, nonempty H1 and unique page titles; **0 explicit noindex**, **0 canonical mismatches**, **0 errors**, **0 duplicate titles** among sitemap URLs. This confirms *basic HTTP/indexability markup only*; it does **not** mean Google or Bing crawled/indexed them, nor prove complete usefulness, content uniqueness or legal accuracy.
- GSC connected search analytics as checked this session: 2026-09-15..10-15 still reports **23 impressions / 0 clicks**, three visible pages (Oregon state 9; Portland city 9; home 5). Recently created content needs more time; no new indexing requests were made.
- Bing Webmaster Tools not authenticated in the current browser; Windsor.ai has GSC but no Bing Webmaster account connected. **No Bing index/rank analytics claim**. Bing officially supports importing a verified Google Search Console property.

### Actual fix and CI
- Found **San Diego city page was updated Oct 15** but its sitemap `lastmod` still said **Oct 12**. Preserved the historical source-review field; changed only the content modification timestamp in both `scripts/generate-coverage-pages.cjs` and generated `site/sitemap.xml`.
- Added `scripts/qa-sitemap-indexability.cjs` to PR and GitHub Pages CI: checks all sitemap targets exist as local HTML, matching canonical, no noindex, unique title, nonempty H1, valid `lastmod`, and `robots.txt` sitemap reference. This prevents obvious future regressions but is not a live SEO audit.
- [PR #56](https://github.com/DragonChenCL/CoopCheck/pull/56) merged after validation CI success. [GitHub Pages deploy](https://github.com/DragonChenCL/CoopCheck/actions/runs/38713825376) **success**. [Triggered IndexNow notifier](https://github.com/DragonChenCL/CoopCheck/actions/runs/38713879601) **success**: exactly **1** URL (`https://coopcheck.serunio.com/cities/san-diego-ca.html`), IndexNow **HTTP 200**. IndexNow receipt **is not confirmation of indexing**.

### External editorial-source correction (no backlink)
- BYC 2012 article https://www.backyardchickens.com/articles/portland-oregon-chicken-ordinance.61358/ still states `Three or less without permit` and outdated Title 13 citations, though a 2023 review already hints four birds. Actual Portland City Code §13.40.020(A)(1), amended effective Jan 10, 2025: ordinarily up to **4** small fowl on any lot, **6** on 10,000+ sq-ft lots, with specified additional young-fowl and agricultural exceptions. Original official citations: https://www.portland.gov/code/13/40/020 and https://www.portland.gov/bps/sustainability/guide-bees-and-livestock/chickens-and-fowl .
- Logged-in BYC account used **Report content** dialog once, submitting a polite factual correction (not a marketing link). Dialog closed after submission; **no explicit moderator-acceptance receipt** was displayed, so this is an *attempted/submitted correction, unconfirmed moderation result*. No public comment, link, rating, follow-up or duplicate report submitted. **Do not repeatedly report**.

### Next practical checks
- Review GSC five-URL cohort around Oct 21/28 for actual new crawl and indexing decisions; separate impressions from clicks and do not resend requests prematurely.
- Bing Webmaster Tools can be imported from verified GSC after owner connects an account; IndexNow alone doesn't unlock search performance reports.
- Check editorial replies (Community Chickens, Backyard Chicken Pro, Waddle & Cluck) before further outreach; no replies were found in Gmail in this session. Prior editorial pitches are still pending, not backlinks.
- Organic traffic is not yet verified. Avoid adding low-quality pages, repeated forum posts, or implying any ranking improvement from IndexNow.


## 2026-10-15 — Bing/IndexNow first five URLs successfully acknowledged

- Owner explicitly deferred Pinterest and GA4. We targeted search discoverability instead of further city/page expansion.
- Read repo source: existing GitHub Pages workflow and canonical 115-entry sitemap; found no IndexNow integration. Official protocol: https://www.indexnow.org/documentation and Microsoft Bing guide: https://www.bing.com/indexnow/getstarted .
- Added IndexNow ownership-key file at the **site root** and a successful-Page-deployment notifier with canonical sitemap intersection, noindex exclusion and Git-diff filtering. CI passed, merged [PR #53](https://github.com/DragonChenCL/CoopCheck/pull/53). Added documented one-time activation for the 5 recently updated pages, CI passed, merged [PR #54](https://github.com/DragonChenCL/CoopCheck/pull/54).
- **Real notification receipts via connected browser on 2026-10-15**:
  - `https://coopcheck.serunio.com/` — IndexNow `GET` returned **HTTP 202** (received, validation pending).
  - `https://coopcheck.serunio.com/cities/portland-or.html`, `/guides/chicken-coop-size-calculator.html`, `/guides/chicken-run-size-calculator.html`, `/guides/free-chicken-coop-floor-plans.html` — one IndexNow JSON `POST` containing only those 4 URLs returned **HTTP 200**.
  - First five total **all acknowledged**, **not proven crawled/indexed or ranked**. No claim of Google IndexNow support.
- The automated notifier was triggered normally after Pages deployment and selected exactly 5 canonical URLs, but it **failed before POST** because GitHub Actions runners received HTTP errors while fetching the public key from the site. The same key URL was independently opened in cfbrower and returned the exact expected contents. Initial escaped checkout ref bug was diagnosed from actual Actions logs and fixed; the next workflow run completed successfully with 0 changed pages (correct for a code-only repair).
- Adjusted notifier so public-key preflight from GitHub Actions becomes **diagnostic only**; participating search engines themselves verify ownership, avoiding false blocking from runner-vs-browser network differences. Future **automatic notification from Actions is not yet independently demonstrated by an actual changed-page POST**, so its end-to-end success remains a follow-up. Manual IndexNow GET/POST results above are confirmed.
- No unauthorized forum posting, bulk submission, new account signup, GA4 analysis, rankings or referrals claimed. Do not re-submit those five URLs without changes; inspect actual Bing Webmaster crawl/index and site search activity when available.


## 2026-10-14 LA / 2026-10-15 browser — Source-led distribution (GA4 intentionally deferred)

- GSC priority inspection/indexing actions are recorded separately in [SEO_GSC_PRIORITY_INDEX_REQUESTS_2026-10-15.md](SEO_GSC_PRIORITY_INDEX_REQUESTS_2026-10-15.md): five accepted requests, not five indexed URLs. **Do not resubmit**.
- **BackYard Chickens moderation follow-up:** Revisited https://www.backyardchickens.com/threads/coop-ordinances-in-your-town.1663608/post-29302430 in authenticated cfbrower. Post #4 by the existing forum account (`tom`) is visible in the thread with the Portland-vs-Seattle source comparison and government references, and no pending/moderation banner appeared. It includes **no CoopCheck URL**, so this is a visible community answer **not a website backlink**. No duplicate reply posted. External unauthenticated visibility was not separately tested.
- **Backyard Chicken Pro editorial pitch SUBMITTED:** Read the real 2026-article https://backyardchickenpro.com/predator-proof-chicken-coop-checklist-before-you-buy-or-build/ and official contact rules https://backyardchickenpro.com/contact-us/ . Sent **one** tailored, transparent contact-form suggestion: add a “check your municipality's bird limits and coop placement before buying materials” step to their predator/security checklist. Included current Portland municipal code https://www.portland.gov/code/13/40 and our specific https://coopcheck.serunio.com/cities/portland-or.html#portland-flock-check as an optional editorial reference. Explicitly disclosed project ownership, did not claim backyard chicken field experience or guaranteed legal approval, did not buy/request automated links. Submission form returned **“Thanks for contacting us! We will be in touch with you shortly.”** This means **form accepted, awaiting a human reply**; not an accepted article, public link, or referral. **Do not send a duplicate pitch.** Personal sender details were not saved in this repo.
- **Pinterest access checked:** navigating to https://www.pinterest.com/pin-creation-tool/ redirected to https://www.pinterest.com/ with **Log in / Sign up**. Browser additionally displayed **“Could not connect to the reCAPTCHA service.”** No account sign-in, board creation, Pin publication or outside promotion claimed. Account owner must sign in normally when possible; do not bypass authentication or the reCAPTCHA blocker. Official platform instructions allow saving a Pin from a website URL after authenticating: https://help.pinterest.com/en/article/add-pins-from-the-web .
- GSC links report previously returned **0 reported external links**; neither this BYC answer nor the accepted Backyard Chicken Pro contact form changes that metric without actual editorial publication.
- **Next actions:** (1) await editorial reply rather than repeat contact; (2) once Pinterest is authenticated and stable, publish a single original-sourced legal-geometry image/guide Pin with an accurate disclaimer and destination URL; (3) follow five-URL index cohort Oct 21/28 and later measure external discovery. GA4 excluded at owner's request for now.


## 2026-10-14/15 — Community proof, editorial resource outreach and browser connection failure

- **BYC actual publication confirmed**: single reused connected browser tab opened https://www.backyardchickens.com/threads/coop-ordinances-in-your-town.1663608/post-29302430 . Post #4 by tom dated 2026-10-13 is visible in the regular public thread, with the Portland/Seattle municipality source comparison and no moderator-pending text. This was a real useful participation, **not a CoopCheck backlink** (no site link); do not repost or duplicate.
- **Gmail existing outreach**: verified an earlier Community Chickens email in SENT dated 2026-10-13 with subject “Guest feature proposal: why backyard chicken rules differ so much between U.S. cities.” No duplicate submission was made. No acceptance/positive reply was established.
- **Fresh editorial outreach**: sent one transparent, source-based email to **editor@waddleandcluck.com** (Gmail message ID `1a13d9221cd38611`, label SENT), subject “Source-backed resource for your backyard chicken beginner's guide.” Offered Portland's free city-code lot-size checker as a potential reader resource relevant to local ordinance checks, referenced both Portland City Code government sources, disclosed involvement with CoopCheck, and expressly said no link/coverage expected. **Email sent only**; no delivery confirmation, editorial acceptance, public mention, backlink or referral traffic is established.
- **Browser blocker**: after BYC check, connected cfbrower initialization repeatedly timed out (30 s), even though one-tab reuse was intended. No forum posting, Pinterest publishing or form submission after that. Do not claim the browser actions succeeded.
- **Current focus**: avoid GA4 work as owner requested; wait for meaningful editorial reply, verify public source/acceptance and track directly in GSC at 7/14/28 days rather than promising immediate rank gains. Prior BYC spam-blocked contact form remains off-limits.


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
