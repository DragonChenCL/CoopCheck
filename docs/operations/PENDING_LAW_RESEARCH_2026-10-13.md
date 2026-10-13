# CoopCheck 未完成的城市法规核验工作队列

更新：2026-10-13 · 范围：首批 100 城市、每城市 4 核心字段（数量／公鸡／许可／鸡舍位置）

当前 **88 条城市摘要有至少部分来源支持、12 城市仍处于 needs_review；178 / 400 核心字段已映射至明确现行法规条款或市政府发布的具体指南**。其余 **174 项为 source_recorded、48 项为 unverified**。注意 88 ≠ 88 城市全部合规。

本队列用于逐城定位「现行法典/生效日期/冲突来源/必须联系市政府的未决问题」，任何一项缺失都不能宣称整座城市已核实。继续执行必须先比对本表并记录调研时间，**不要把媒体文章或竞争网站摘要记为法律原文**。

| 城市 | 本轮找到的可核实入口 / 信息 | 仍欠缺、风险及下一步 | 状态 |
|---|---|---|---|
| Peoria, AZ | [2026 城市动物法典 §16-8](https://codelibrary.amlegal.com/codes/peoriaaz/latest/peoria_az/0-0-0-54316)、[现行法典入口](https://codelibrary.amlegal.com/codes/peoriaaz/latest/peoria_az/0-0-0-1) | §16-8 主要为骚扰/卫生规定，不是住宅养鸡数量批准；另有商业禽舍条款，须查居住分区和亚利桑那州相关法 | 待核验 |
| Surprise, AZ | [亚利桑那州相关法律](https://www.azleg.gov/ars/9/00462-12.htm)（只适用于满足条件的地块） | 获取 Surprise 本市 2026 生效的动物和用地法典，核实州法优先适用情形，不套用全市统一限制 | 待核验 |
| Queen Creek, AZ | [州法律](https://www.azleg.gov/ars/9/00462-12.htm) | 查该镇当前土地用途分区及鸡舍附属结构限制，区分镇与县地块 | 待核验 |
| Prescott, AZ | [州法律](https://www.azleg.gov/ars/9/00462-12.htm) | 市政家禽/农业土地用途原文和许可证情况，必须核查地块所属区域 | 待核验 |
| Apache Junction, AZ | [州法律](https://www.azleg.gov/ars/9/00462-12.htm) | 需要本市地块/分区的家禽法规和卫生条例，不按邻近城市推断 | 待核验 |
| Irvine, CA | [Irvine 市 Municode 动物法典](https://library.municode.com/ca/irvine/codes/code_of_ordinances?nodeId=TIT4PUSA_DIV5ANRE_CH11HUTRAN_S4-5-1107ANSAPUPLPR) | 已找到的第4-5-1109节是幼禽销售限制，**不是家庭饲养许可**。必须再查土地分区和居住物业养禽规定 | 待核验 |
| Berkeley, CA | [Berkeley 官方市政法规入口](https://berkeleyca.gov/your-government/public-records/berkeley-municipal-code)、[市卫生部门养鸡防鼠建议](https://berkeleyca.gov/sites/default/files/2022-02/Rodent-Vector-Attractant-Prevention-Chicken-Coops.pdf) | 防鼠手册不是数量/公鸡/距离的授权条款。需确定动物条例及 zoning 允许范围和许可是否独立要求 | 待核验 |
| Boulder, CO | [Boulder 市政府网站](https://bouldercolorado.gov/) | 需要本市现行家禽数量限制和建筑/分区审批证据，不以县法规代替市法规 | 待核验 |
| Arvada, CO | [Arvada 市 Municode 法典](https://library.municode.com/co/arvada/codes/code_of_ordinances) | 曾找到较旧修订档，仍未确证 2026 生效版本 §§14-92, 14-123 具体条件；需区分农业分区和一般住宅 | 待核验 |
| Pueblo, CO | [Pueblo 市 Municode 法典](https://library.municode.com/co/pueblo/codes/code_of_ordinances) | 核实第 11-4-32 条当前有效文本及位置/许可要求，不能复用旧论坛数字 | 待核验 |
| Bend, OR | [市政府法典入口](https://bendoregon.gov/resources/city-codes-policies-ordinances-and-resolutions/city-codes/)、[BDC 法典](https://bend.municipal.codes/BDC)、[2026 法规修订清单](https://bendoregon.gov/resources/city-codes-policies-ordinances-and-resolutions/ordinances/) | 网上 2020 版资料写 5,000sqft 以上四只母鸡/兔，但现行 Code Publishing 仅到 2026-08-05，9 月的 Ordinance 2560 涉及 BDC 第 3.6 章；**已对照市政府发布的2026修订，未识别§3.6.300(I)被修改；母鸡/兔合计4只及禁公鸡已限定范围核验；鸡舍位置与许可仍需市政府答复**。市 Planning: planning@bendoregon.gov | **有限范围已核验；许可/退距待办** |
| Renton, WA | [Renton 市政法典查询](https://renton.municipal.codes/RMC/4-4-010) | 必须核实适用住宅分区、地块面积与公鸡和退距规定，查询服务访问不稳定。可问 planningcustomerservice@rentonwa.gov | 待核验 |
| Round Rock, TX | [Municode 2026.09 生效版本](https://library.municode.com/tx/round_rock/codes/code_of_ordinances) | 已找到 §8-31 牲畜一英亩规则，但该定义不含鸡鸭；**不可把畜牧条款误套家禽**。需另查城市养禽和住宅分区规则，关注未编入法典的修订 | 待核验 |

## 优先处理顺序

1. **Bend**：已限定范围核验 §3.6.300(I) 的家禽总数与公鸡规则；下一步向规划部门核实鸡舍位置和建设/养禽许可。该市已不属于 `needs_review`，但不能宣称全面合规。
2. **Peoria、Arvada、Pueblo、Renton、Round Rock**：已有可定位的城市法典和疑似条款，核实完整上下文可获得最大产出。
3. **Irvine、Berkeley、Boulder、Surprise、Queen Creek、Prescott、Apache Junction**：重新定位当地用地规范或向城市部门获取适用法规。
4. **其他已上线城市**：还有大量 source_recorded 字段缺少具体法条；完成 13 城只是减少 pending，不等于 400 字段全部完成。

## 其他高风险、已发布城市的字段级核对（不计入 13 个 needs_review）

- **San Antonio, TX**：现有 city registry 所引用的官方禽类/超额动物许可表格与 [San Antonio ACS 官方许可说明](https://www.sa.gov/Directory/Departments/ACS/Laws-Fees/Permits) 存在条款编号差异，分别提到 §§5-107 和 5-109。**现行 Municode Chapter 5 目录明确 §5-107 为 Animal limits; excess animal permit，§5-109 为 Pet shop license**；市 ACS 页面仍误标 §5-109。本轮按政府 ACS 现行养禽指南确认常规8只、最多1公鸡和超额许可，但 PDF 鸡舍面积/距离字段尚待核对完整现行条文，不能将 §5-109 当家禽授权法条。
- **NYC 和 Minneapolis**：已验证的公鸡/许可事实，不代表 25-ft 活禽市场条款适用于住宅鸡舍，或市许可收费梯度等于无条件禽群上限。参见 [逐字段证据表](../../POLICY_COMPLETENESS_2026-10-13.md)。

## 对无法线上判断的问题统一发问

询问城市动物管理或规划/许可部门时，请明确地块属于城市而不是县（最好提供 zoning 类别，但不披露私人完整地址）；需要：*当前生效的法条编号及链接、住宅可养母鸡/公鸡数量、是否必须办理养禽许可、鸡舍/跑场距哪个对象起算、是否另需建筑/附属结构审批、条例最近修订日期，以及是否有农业例外*。

**未经市政部门确认，不将搜索摘要、草案、其他城市的法规转换成字段级“已确认”。** 不发送无关群发邮件，也不编造各城市已回复的事实。

## 已完成的典型案例

- [Garland, Texas](../../POLICY_COMPLETENESS_2026-10-13.md#2026-10-13-garland-municipal-code-review)：4 母禽/公鸡禁令/双重距离；permit 仍未确认。
- [Olympia, Washington](../../POLICY_COMPLETENESS_2026-10-13.md#2026-10-13-olympia-city-code--ordinance-7457-validation)：2026 新法 5/9/10+ 数量、禁公鸡、10ft 且不得侵入 zoning setbacks；许可及正好一英亩边界需确认。

## October 13 primary-source follow-up

- Queen Creek town zoning text: https://www.queencreekaz.gov/home/showpublisheddocument/40766/639087556691430000 — Article 6 regulates flock tiers and enclosure placement. Confirm current effectiveness and Arizona preemption before publishing.
- Surprise ordinance index: https://library.municode.com/az/surprise/ordinances/municipal_code?nodeId=2024 — Ordinance 2024-42 amended sections 10-113 and 10-114. Read final codified clauses before upgrading.
- State of Arizona 9-462.12: https://www.azleg.gov/ars/9/00462-12.htm — state protection for eligible detached-home lots may preempt inconsistent older local rules; not proof of zoning or permits for every property.
- Round Rock proposed city ordinance (2018): https://www.roundrocktexas.gov/wp-content/uploads/2018/12/120618-Proposed-Animal-Control-Ordinance.pdf — proposed poultry tiers need confirmation in current enacted law. Do not treat this draft as law.

## 2026-10-13 follow-up — Bend operative amendment audit

- The City of Bend [September 2, 2026 adopted Ordinance NS-2560](https://bendoregon.gov/wp-content/uploads/2026/09/NS-2560-Ordinance.pdf) modifies the Development Code (including Chapter 3.6) but leaves the text of **BDC §3.6.300(I), Keeping Farm Animals** unamended in the ordinance exhibits; section 5 preserves unchanged code provisions. Its applicability should still be checked against the fully consolidated code.
- The Bend city-hosted [reproduced chapter text / prior official memo](https://bendoregon.gov/wp-content/uploads/2025/12/Juniper_Ridge_Overlay_Use_Table_20200514-REVISED.pdf) states four rabbits and/or hens combined on residential lots of 5,000+ sq ft and no roosters. The 25-ft neighboring-residence and 15-ft interior/rear lot-line setbacks referenced there apply expressly to structures housing **large farm animals**, not automatically a chicken coop.
- The old 2012 backyard-chickens forum claims of a $104 annual permit and universal 25-ft chicken-coop setback are not proven by the current municipal materials; DO NOT publish those numbers.
- Until the town confirms current permit/building approval and precise chicken-coop siting conditions (contact planning@bendoregon.gov), Bend remains `needs_review`, `noindex` and disabled for automated compliance; its `unverified` entries are intentionally not upgraded.

## 2026-10-13 双 P0 溯源进展

- Bend, OR：经市政府发布的 BDC §3.6.300(I) 原文及 2026 Ordinance NS-2560 修订记录交叉检查，已限定范围升级（5000平方英尺以上住宅地块母鸡和兔合计不超过4，禁止公鸡）；permit 和鸡舍退距仍待市规划部门，禁止用大农畜建筑15/25英尺标准替代家禽鸡舍距离。
- Pueblo, CO：发现 [2021 市政委员会议案附件](https://www.pueblo.us/AgendaCenter/ViewFile/Item/36624?fileID=132466) 引述 §11-4-32(b) 8/15/50 ft 距离，但议案附件不是独立的2026生效法典，现行代码全文尚未独立核对；未升级。
- Round Rock, TX：[官方附属结构许可说明](https://www.roundrocktexas.gov/city-departments/planning-and-development-services/building-inspection/miscellaneous-building-permits/)规定附属建筑申请/地块位置图，小型棚屋仍可能需建设许可；不能当作鸡舍饲养许可证或直接推出禽类可饲养数量；未升级。
- Arizona 5 待核验城市：[A.R.S. §9-462.12](https://www.azleg.gov/ars/9/00462-12.htm) 已确认对符合资格的独立住宅地块的六只家禽保护，但市级公鸡、围栏、HOA 和具体地块条例尚未解决，不凭州法把5座城市直接升级。
- **逐字段待核验 236 项**继续按官方生效版本优先；证据变化和多重限制见 [主表](../../POLICY_COMPLETENESS_2026-10-13.md)。

## 2026-10-13 最新一轮：12 pending 城市司法辖区/原文辨认

- **Pueblo CO**：找到 Pueblo 官方市政法典 [2026 Supplement 109](https://library.municode.com/co/pueblo)，其目录显示截止 2026-02-23 的编纂正文和其后未编入法规清单；2021 市议会议案所引 §11-4-32(b) 距离规定可作为线索，但在排除 2026 修订和获得现行 §11-4-32 正文前，不直接解除 pending。
- **Boulder CO vs Boulder County / Boulder City NV**：同名跨辖区高风险；[Boulder County FAQ](https://bouldercounty.gov/property-and-land/land-use/planning/frequently-asked-questions/) 的农畜单位上限不能当 City of Boulder 规则，[Boulder City NV 官网](https://www.flybouldercity.com/1133/Chicken-Hen-Keeping) 的10只鸡和退距也不是科罗拉多州 Boulder 市的法规。该城保持 noindex。
- **Queen Creek AZ**：已找到镇政府在 [2026 年 1 月](https://www.queencreekaz.gov/home/showpublisheddocument/40766/639087556691430000) 和 [2026 年 5 月](https://www.queencreekaz.gov/home/showpublisheddocument/40938/639147840971500000) 发布的 Article 6 Zoning PDF（住宅地块低于10,000 sq ft 6 只、10,000 至不足35,000 sq ft 10只；仅 ≥1 acre 的用地允许公鸡）。**该 PDF 当前直接访问返回 403，尚不能检查完整页及是否有未编入修订**；州法 [A.R.S. §9-462.12](https://www.azleg.gov/ars/9/00462-12.htm) 对符合资格的住宅六只家禽有优先保护，且对围栏还有约束。不能仅凭搜索摘要断言镇许可和建筑规则，保持 pending，优先人工验证官方 5 月原本及生效时点。
- **Arvada CO、Renton WA、Round Rock TX、Irvine CA、Berkeley CA、Peoria/Surprise/Prescott/Apache Junction AZ**：尚未取得可逐字段对应的完整最新本市执行条文，未升级，也没有使用第三方 SEO 汇总/论坛替代官方法律。

### 已发布条款的交叉核验

- Prescott Valley §6-02-030(B) 本轮补足 4/4 字段，电气/机械/供排水设施会触发单独建筑许可。
- Anaheim §18.38.030 对密度计算、公鸡/孔雀限制、20-ft **地界**和50-ft **第三方居所**双重条件按段核对。
- Beaverton §5.09.015 明确 20-ft 从**邻居住宅**起算，并非地界；至少5000 sq ft，独栋/双拼和居住权条件。
- Folsom 17.40 是农业复合分区特例：>100头使用许可**绝不是**普通住宅允许100只鸡。
- Lake Havasu City §14.03.02 表中的 A(2) 只适用于 **2024-09-13 前已存在的独栋住宅居民**，不可统一展示“任意独栋住宅可养六只”；详细要求见 §14.03.03(E)(9)。
- Portland 官方饲养指南明确鸡禽无需一般 livestock permit，但附属建筑/分区许可仍需另外核实。
