# CoopCheck 全站内容质量审计（2026-10-21）

> 数据来源：2026-10-22 UTC 线上 `https://coopcheck.serunio.com/sitemap.xml` 和 122 个实际 HTML 页面；GitHub `site/data/cities.json` 与 `site/data/policy-evidence.json`。**未批量修改线上页面、canonical、sitemap 或 noindex。**

## 结果概览

- **122/122** 页面返回 HTTP 200；**0** canonical 不匹配；**0** Sitemap 内页面被 noindex；**0** 缺 Title/H1；**0** 无静态站内入链。
- 88 个已发布城市页中，**22** 页的主正文不足 400 英文词；相关数字仅作薄内容排查线索，不是 Google 排名标准。
- 19 个指南页中，**9** 页和同类页面 7-word shingle 文本相似度至少 60%，多为按鸡只数量或鸡舍长宽变更的页面。此相似度为内部启发式，**不是 Google 判定重复的结果**。
- 6 个州级页面中，Oregon 内容较完整，其余 5 页较薄。
- 官方证据结构（只验证项目已保存的审计元数据，未重新核实法规当前生效状态）：**5** 个已发布城市至少两个核心字段缺乏逐字段核验记录，属于最高优先级人工复核对象。
- 分类优先级分布：P2=43，P1=70，P3=4，P0=5。

## 分组指标

| 页面类型 | 数量 | 平均主正文英文词数 | 低于 400 词 | 同组相似度 ≥ 60% |
|---|---:|---:|---:|---:|
| guide | 19 | 531 | 3 | 9 |
| other | 9 | 845 | 3 | 0 |
| state | 6 | 322 | 5 | 0 |
| city | 88 | 506 | 22 | 0 |

## P0：必须优先复查的城市法规证据

- **/cities/lakewood-co.html**：1/4 项具有带 URL 的逐字段核验记录；缺口：max|roosters|placement
- **/cities/bend-or.html**：2/4 项具有带 URL 的逐字段核验记录；缺口：permit|placement
- **/cities/corvallis-or.html**：1/4 项具有带 URL 的逐字段核验记录；缺口：max|roosters|placement
- **/cities/bellevue-wa.html**：2/4 项具有带 URL 的逐字段核验记录；缺口：roosters|permit
- **/cities/dallas-tx.html**：0/4 项具有带 URL 的逐字段核验记录；缺口：max|roosters|permit|placement

P0 不等于认定页面法规错误，只表示当前项目证据记录无法充分支撑四个核心字段（饲养数量、雄鸡、许可、鸡舍位置）的可验证性。修复前应逐字段核实官方现行来源和适用条件；确有误导风险时再决定页面临时处理方式。

## 质量风险与建议

1. **不要重建 GSC 或重新提交全部 URL**。技术索引基础未发现批量故障；近期已成功为 5 个核心页面请求收录。
2. **优先修 P0 的法规证据缺口**，同时将 Portland 作为参考标杆，拓展有真实法规差异、具体地块计算和图纸交互的城市案例。
3. **9 个数值型高相似指南应列为合并候选**。先看 GSC 各 URL 的真实搜索词和展现，再决定保留、独立增强或 301 合并，勿直接批量 noindex。
4. **5 个非 Oregon 州目录增强州级价值**：本州共性与城市差异、官方参考、限制条件和用户导航；不是简单重复城市列表。
5. **可索引数量 ≠ 已收录数量**。新站抓取后的“已抓取—未索引”可能与原创价值、外部认可、时间和 Google 尚未重新抓取修改后的正文等多项因素相关。

## 审计方法与局限

对 Sitemap 122 个页面逐一以线上浏览器 HTTP 请求获取 HTML，对 `<main>` 主内容去除 `script/style/svg/nav` 后抽取词数；同一页面类型内部计算归一化数字后的 7-word shingle Jaccard 最近邻相似度；解析 title、H1、canonical、robots、JSON-LD、表单、外部链接和静态内部链接。对城市页额外交叉检查 GitHub 保存的四项证据状态：`primary_clause_checked`、有效 HTTPS 来源和 `verifiedClaim !== false`。

**局限**：无法由此证明 Google 质量算法的具体原因；不代表逐页人工法律审查、移动端交互测试或 Chrome 渲染后所有脚本行为的验证。正文词数统计不覆盖 SVG 绘图内部文本；仅统计 Sitemap 列出的 URL；静态入链不含 JS 动态内链。

## 前 40 个 P0/P1 处理对象

| 等级 | URL | 正文词数 | 相似度 | 一手证据字段 | 初步行动 |
|---|---|---:|---:|---:|---|
| P0 | [/cities/corvallis-or.html](https://coopcheck.serunio.com/cities/corvallis-or.html) | 450 | 37.9% | 1/4 | 优先核验法规字段后再继续扩大索引 |
| P0 | [/cities/bellevue-wa.html](https://coopcheck.serunio.com/cities/bellevue-wa.html) | 473 | 35.3% | 2/4 | 优先核验法规字段后再继续扩大索引 |
| P0 | [/cities/dallas-tx.html](https://coopcheck.serunio.com/cities/dallas-tx.html) | 481 | 32.9% | 0/4 | 优先核验法规字段后再继续扩大索引 |
| P0 | [/cities/bend-or.html](https://coopcheck.serunio.com/cities/bend-or.html) | 471 | 32.7% | 2/4 | 优先核验法规字段后再继续扩大索引 |
| P0 | [/cities/lakewood-co.html](https://coopcheck.serunio.com/cities/lakewood-co.html) | 561 | 29.3% | 1/4 | 优先核验法规字段后再继续扩大索引 |
| P1 | [/guides/4x8-chicken-coop-capacity.html](https://coopcheck.serunio.com/guides/4x8-chicken-coop-capacity.html) | 425 | 78.2% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/6x8-chicken-coop-capacity.html](https://coopcheck.serunio.com/guides/6x8-chicken-coop-capacity.html) | 422 | 78.2% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/4x6-chicken-coop-capacity.html](https://coopcheck.serunio.com/guides/4x6-chicken-coop-capacity.html) | 421 | 76.7% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/coop-size-for-8-chickens.html](https://coopcheck.serunio.com/guides/coop-size-for-8-chickens.html) | 464 | 68.7% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/coop-size-for-16-chickens.html](https://coopcheck.serunio.com/guides/coop-size-for-16-chickens.html) | 454 | 68.7% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/coop-size-for-4-chickens.html](https://coopcheck.serunio.com/guides/coop-size-for-4-chickens.html) | 469 | 68.1% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/coop-size-for-6-chickens.html](https://coopcheck.serunio.com/guides/coop-size-for-6-chickens.html) | 472 | 67.9% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/coop-size-for-10-chickens.html](https://coopcheck.serunio.com/guides/coop-size-for-10-chickens.html) | 460 | 67.9% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/guides/coop-size-for-12-chickens.html](https://coopcheck.serunio.com/guides/coop-size-for-12-chickens.html) | 477 | 67.1% | — | 检验搜索意图，评估并入主计算器 |
| P1 | [/cities/thornton-co.html](https://coopcheck.serunio.com/cities/thornton-co.html) | 310 | 59.1% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/westminster-co.html](https://coopcheck.serunio.com/cities/westminster-co.html) | 338 | 59.1% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/longmont-co.html](https://coopcheck.serunio.com/cities/longmont-co.html) | 312 | 58.9% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/roseville-ca.html](https://coopcheck.serunio.com/cities/roseville-ca.html) | 326 | 56% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/tacoma-wa.html](https://coopcheck.serunio.com/cities/tacoma-wa.html) | 322 | 55.5% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/yakima-wa.html](https://coopcheck.serunio.com/cities/yakima-wa.html) | 301 | 55.5% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/long-beach-ca.html](https://coopcheck.serunio.com/cities/long-beach-ca.html) | 374 | 52% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/madison-wi.html](https://coopcheck.serunio.com/cities/madison-wi.html) | 305 | 46.3% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/kent-wa.html](https://coopcheck.serunio.com/cities/kent-wa.html) | 393 | 46% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/aurora-co.html](https://coopcheck.serunio.com/cities/aurora-co.html) | 331 | 44.1% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/beaverton-or.html](https://coopcheck.serunio.com/cities/beaverton-or.html) | 346 | 43.4% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/prescott-valley-az.html](https://coopcheck.serunio.com/cities/prescott-valley-az.html) | 350 | 42.3% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/garland-tx.html](https://coopcheck.serunio.com/cities/garland-tx.html) | 343 | 42.3% | 3/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/frisco-tx.html](https://coopcheck.serunio.com/cities/frisco-tx.html) | 393 | 40% | 3/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/santa-rosa-ca.html](https://coopcheck.serunio.com/cities/santa-rosa-ca.html) | 431 | 39.2% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/minneapolis-mn.html](https://coopcheck.serunio.com/cities/minneapolis-mn.html) | 396 | 39.2% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/elk-grove-ca.html](https://coopcheck.serunio.com/cities/elk-grove-ca.html) | 465 | 38.4% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/bellingham-wa.html](https://coopcheck.serunio.com/cities/bellingham-wa.html) | 446 | 38.4% | 3/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/stockton-ca.html](https://coopcheck.serunio.com/cities/stockton-ca.html) | 471 | 38.1% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/olympia-wa.html](https://coopcheck.serunio.com/cities/olympia-wa.html) | 398 | 37.4% | 3/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/lake-oswego-or.html](https://coopcheck.serunio.com/cities/lake-oswego-or.html) | 487 | 37.2% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/tucson-az.html](https://coopcheck.serunio.com/cities/tucson-az.html) | 522 | 37.1% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/oakland-ca.html](https://coopcheck.serunio.com/cities/oakland-ca.html) | 449 | 36.5% | 3/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/new-york-city-ny.html](https://coopcheck.serunio.com/cities/new-york-city-ny.html) | 436 | 36.3% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/indianapolis-in.html](https://coopcheck.serunio.com/cities/indianapolis-in.html) | 446 | 36.1% | 4/4 | 补充城市独有案例及逐条核验 |
| P1 | [/cities/scottsdale-az.html](https://coopcheck.serunio.com/cities/scottsdale-az.html) | 475 | 35.5% | 4/4 | 补充城市独有案例及逐条核验 |

## 文件

完整逐页结果见 [CSV](./coopcheck-seo-audit-2026-10-21.csv)，字段包括各页链接、相似度最高的竞争页面、外部引用数、静态入链数、技术状态、证据缺口、风险等级与处理建议。

参考 Google 官方指南：[有帮助的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) / [垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies)。
