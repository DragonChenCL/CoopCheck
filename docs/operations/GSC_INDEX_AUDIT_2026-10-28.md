# CoopCheck 原生 GSC 收录诊断 — 2026-10-28

> **来源**：已登录的 Google Search Console 资源 `sc-domain:coopcheck.serunio.com`，2026-10-28 读取。**不是**第三方数据连接器的占位数据。GSC 数据存在滞后：性能数据最新至 2026-10-26，索引报告最后更新 2026-10-23。不得将“未收录”解释为人工处罚或永久不收录。

## 1. 关键基线

| 项目 | 原生 GSC 实测 | 窗口/时点 |
| --- | ---: | --- |
| 搜索点击 | 0 | 最近 7 天（10/20–10/26） |
| 搜索曝光 | 0 | 最近 7 天（10/20–10/26） |
| 搜索点击 | 0 | 最近 28 天（9/29–10/26） |
| 搜索曝光 | 5 | 最近 28 天（9/29–10/26） |
| 搜索点击 | 0 | 最近 3 个月（界面预设窗口） |
| 搜索曝光 | 23 | 最近 3 个月（界面预设窗口） |
| 平均排名 | 26.4 | 最近 3 个月、样本 23 曝光，统计上极稀疏 |
| 已编入索引 | 1 | 索引报告 10/23 |
| 未编入索引 | 115 | 索引报告 10/23 |
| 已发现、未抓取 | 95 | 索引报告 10/23 |
| 已抓取、未收录 | 20 | 索引报告 10/23 |
| 外部链接 | GSC 报告 0 | 10/28 浏览器查询；工具报告不是互联网所有反链的完整清单 |

### 已抓取、未收录示例

原生“已抓取 - 尚未编入索引”明细显示 20 个受影响 URL；**Google 已抓取日期**和页面示例如下：

| URL 路径 | GSC 最近抓取日 |
| --- | --- |
| `/`（首页） | 2026-10-22 |
| `/coop-plan.html` | 2026-10-22 |
| `/cities/portland-or.html` | 2026-10-22 |
| `/guides/chicken-coop-setback-from-property-line.html` | 2026-10-22 |
| `/guides/chicken-coop-size-calculator.html` | 2026-10-22 |
| `/guides/coop-size-for-4-chickens.html` | 2026-10-17 |
| `/guides/chicken-roost-length-calculator.html` | 2026-10-17 |
| `/guides/chicken-run-fencing-calculator.html` | 2026-10-17 |
| `/guides/chicken-coop-cost-calculator.html` | 2026-10-17 |
| `/guides/4x6-chicken-coop-capacity.html` | 2026-10-17 |

注意：首页、Portland 和实用工具页都位于已抓取未收录示例中；现阶段不能仅归咎于 12 个刻意 `noindex` 的待核法规城市，也不能断言具体内容质量是唯一成因。**2026-10-22 已启动该原因的 GSC 验证**；先观察验证结果和独立 URL Inspection 的 Google-selected canonical、robots、抓取 HTML，避免重复点验证。

## 2. Sitemap

| 站点地图 | 已提交 | GSC 上次读取 | 状态 | 发现 URL |
| --- | --- | --- | --- | ---: |
| `https://coopcheck.serunio.com/sitemap.xml` | 2026-10-22 | 2026-10-22 | 成功 | 123 |
| `https://coopcheck.serunio.com/sitemap` | 2026-09-23 | 2026-10-25 | 成功 | 127 |

两个 URL 均报告“成功”，**提交/发现数量并不等于收录**。差 4 个 URL 可能与生成时间、内容或响应端点有关，尚未核对两份当期响应 XML，**不能把差异当作根因**。排查后可决定是否仅保留规范的 `sitemap.xml`，但不得未经对比删除历史条目。

## 3. 可执行优先级

1. **P0：** 对首页、Portland、退距指南和 `coop-plan.html` 分别做原生 URL Inspection，记录是否被 Google 选取不同 canonical、上一抓取 HTML、抓取/索引状态；只对内容真实更新且可索引的重点 URL 适当请求，避免重复无意义提交。
2. **P0：** 通过外部访客网络检查这些页面及 `robots.txt`、两个 sitemap 的状态码、跳转、canonical 和 HTTP/TLS；过去 Github Actions audit 记录首页/robots/sitemap 均 HTTP 200，但本轮没有重复进行外部线上验证。
3. **P1：** 核对两个 sitemap 当期内容和 `lastmod`，确保只有可索引规范 URL，特别防止 `needs_review` 城市页被误宣传为已验证，继续保留必要的 `noindex`。
4. **P1：** 用真实相关媒体引用与社区信息服务尝试吸引合适访客；本轮新发 1 封个性化非付费编辑提案（发送 ID `1a181c09014c68c3`），没有验证到新的自然反链。
5. **指标门槛：** 7/28 天比较须对齐成熟窗口；连续跟踪「新收录页数 → 真实曝光/点击 → GA4 自然访客 → 使用工具 → 支付成功」，不要以邮件发出、Sitemap 成功或 IndexNow 成功替代转化。

## 4. 数据获取限制

Windsor.ai 显示 4 个源账户但免费套餐仅支持 1 个，本轮 GA4/GSC API 返回明确的 *not your real numbers* 占位告警。这些 `0` **不是**有效统计；本报告仅采原生 GSC 页面值。真实 GA4 访客、漏斗、支付订单和收入本轮仍 UNKNOWN。

站点：<https://coopcheck.serunio.com/> · GSC：<https://search.google.com/search-console?resource_id=sc-domain%3Acoopcheck.serunio.com>
