# CoopCheck — 最后 26 条 source_recorded 字段逐条调查结论
审查日期：2026-10-13；基线：main 的 326/400、26 source_recorded、48 unverified；首批固定 100 城市。

## 结论

- **26 条全部被重新分类/记录下一个查证动作；只有 2 条有足以映射到具体政府发布内容的窄范围依据**，本轮在 `site/data/policy-evidence.json` 将 `yakima-wa/permit` 和 `new-york-city-ny/max` 更新为 `primary_clause_checked`。
- 其余 **24 条仍保留 `source_recorded`**，不伪造官方回复或填上自造数量/许可证豁免；12座 pending/noindex 城市的48条 `unverified` 保持原样。
- 当前 **328/400 对应原始法条/官方指南**；这只是字段级证据状态，不是每一个地块的养禽/建造合法性判断。
- 下表的“有限范围已核”不是“该项法律问题全面解决”：Yakima只查一般附属构筑物施工许可门槛，NYC只查官方 FAQ 是否给出统一数量限制。
- 证据冲突的现实风险优先于数字好看：Dallas 2026年8月法规修订对项目**已核**公鸡与 20-ft 特例围栏结论的现行效力有冲突，须立即单独纠偏。

## 原 26 项逐条调查台账

| 城市 | 字段 | 结论 | 已核依据／仍需查证的问题 |
|---|---|---|---|
| 1. Mesa AZ | `permit` | 待核 | [Mesa Animal Control](https://www.mesaaz.gov/Resident-Resources/Animal-Control/Fowl-Rodents-Livestock)说明数量和饲养，但不能确定普通饲养许可与鸡舍建筑审批；向 Development Services 核问 |
| 2. Avondale AZ | `permit` | 待核 | [§28-33](https://library.municode.com/az/avondale/codes/code_of_ordinances?nodeId=CD_ORD_CH28ZOOR_ART2REDI)仅为有条件的土地用途；须补 Chapter 3 Animal Control 现行许可条文 |
| 3. Sierra Vista AZ | `permit` | 待核 | [§90.11](https://codelibrary.amlegal.com/codes/sierravista/latest/sierravista_az/0-0-0-17093)有鸟舍要求，但未提供普通饲养许可证或建筑许可结论 |
| 4. Los Angeles CA | `placement` | 待核 | [L.A. Zoning](https://codelibrary.amlegal.com/codes/los_angeles/latest/lapz/0-0-0-2052) 的住宅非商业饲养用地授权不是统一鸡舍退距；需对应地块分区和附属建筑条文 |
| 5. San Francisco CA | `roosters` | 待核 | [Health Code §37](https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_health/0-0-0-43)规定混合动物上限与围栏，不能推导全市公鸡禁令或许可 |
| 6. Oakland CA | `roosters` | 待核 | [City Urban Agriculture](https://www.oaklandca.gov/Planning-Building/Planning-Zoning/Zoning/Urban-Agriculture-and-Community-Gardens) 规定土地用途/CUP，不含清晰的公鸡准入结论；需查动物/噪声章 |
| 7. Fresno CA | `permit` | 待核 | [Fresno Single Family Homes](https://www.fresno.gov/planning/single-family-homes/)明确适用的一层≤120 sq ft、≤12 ft 高且≥3 ft 地界的附属结构建设许可豁免（须满足全部条件）；**不等于鸡舍必定豁免，更不等于免禽类饲养许可**。核对结构分类及具体地块后方可映射 |
| 8. Lakewood CO | `max` | 待核/版本冲突 | 2026-04-07 [市政公投决议](https://www.lakewoodco.gov/Local-Government/Departments/City-Clerks-Office/City-Council-Ordinances-Resolutions/2026-Resolutions) 后 2025 版 Article 4 不能作为生效数量依据；须取得公投后实际法典 |
| 9. Lakewood CO | `roosters` | 待核/版本冲突 | 不能沿用被公投影响的 2025 Article 4 公鸡地块数字，必须重新取得现行正式条例 |
| 10. Lakewood CO | `placement` | 待核/版本冲突 | 旧 Article 4 附属建筑退距不能作为 2026 现行鸡舍退距；该城保持 manual |
| 11. Hillsboro OR | `max` | 待核 | [2024市政 Animal Permit 清单](https://www.hillsboro-oregon.gov/home/showpublisheddocument/30543/638467249898800000)引用 §6.20.070(C)(1)-(2) 数量例外，但未直接列出当前分档数字；第三方站称 3/6/9 **不能替代 2026 正文** |
| 12. Bend OR | `permit` | 待核 | [BDC §3.6.300](https://bend.municipal.codes/BDC/3.6.300)的养禽用途和2026修订不证明建筑/一般饲养许可；规划部门确认前维持未证实 |
| 13. Bend OR | `placement` | 待核 | §3.6.300 对大型农畜建筑的 15/25-ft 距离不可移植到普通鸡舍；须取得针对鸡舍的正式条款或 Planning 回函 |
| 14. Corvallis OR | `max` | 待核 | [City Municode](https://library.municode.com/or/corvallis/codes/code_of_ordinances) §5.03.050.020.06 免的是笼养家禽**畜牧登记**，并非数量上限；需查现行 Land Development Code |
| 15. Corvallis OR | `roosters` | 待核 | 畜牧登记豁免不决定是否准许公鸡；查现行动物噪音条例/住宅 zoning |
| 16. Corvallis OR | `placement` | 待核 | 畜牧登记条文没有鸡舍退距；需 zoning/附属构筑物规定及地块条件 |
| 17. Bellevue WA | `roosters` | 待核 | [LUC §20.20.130](https://bellevue.municipal.codes/LUC/20.20.130) 规定禽类用途/数量和结构距离，不可从旧2013会议记录推导现行公鸡政策；Ord 6930编纂状态待确认 |
| 18. Bellevue WA | `permit` | 待核 | 现行 LUC 普通家庭禽类/小型家畜分类与建设/用地许可须分别确认；[Development Services](https://bellevuewa.gov/city-government/departments/development/permits) 是咨询渠道，不能证明所有鸡舍一定需或不需批准 |
| 19. Olympia WA | `permit` | 待核 | [OMC §18.04.060(KK)](https://www.codepublishing.com/WA/Olympia/html/Olympia18/Olympia1804.html) 2026新法规定数量和位置，不是统一的鸡舍建造许可豁免 |
| 20. Bellingham WA | `roosters` | 待核 | [BMC §7.12.060](https://bellingham.municipal.codes/BMC/7.12.060) 规定禽类圈养与卫生/建筑距离，未确认是否单独允许/禁止公鸡 |
| 21. Yakima WA | `permit` | 有限范围已核 | [市 Planning FAQ](https://www.yakimawa.gov/services/planning/faq/)：住宅一层独立附属结构≤200 sq ft 的一般建设许可豁免，仅在符合该分类/条件时适用；大于200需建设许可审查；鸡舍距住宅及地界 10 ft、距其他结构 5 ft 另行生效；饲养许可仍需确认 |
| 22. Dallas TX | `max` | 待核/急 | [Dallas Animal Code §7-7.3历史文本](https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-136613)不能直接确认统一母鸡数量；[2026-08-12批准修法](https://cityofdallas.legistar.com/LegislationDetail.aspx?GUID=9ED973CF-9968-4580-ABA5-E5F996136AA2&ID=8154790&Options=&Search=)又影响公鸡条件，需查最终生效法条 |
| 23. Dallas TX | `permit` | 待核/急 | 一般动物饲养、分区和鸟舍建造许可没有完整正面/豁免条款证据；与8月修法合并向本市查证 |
| 24. Frisco TX | `permit` | 待核 | [Frisco §§14-17—18](https://ecode360.com/38315318) 限制公母禽、数量及清洁圈养，不证明日常住宅鸡只饲养或建造许可证的全面豁免 |
| 25. Garland TX | `permit` | 待核 | [City Ch.22](https://ecode360.com/40070090) §22.14/§22.17禽类数量、公鸡与距离已核，仍没有普通养禽许可证及建筑许可的肯定判定 |
| 26. New York City NY | `max` | 有限范围已核 | [NYC Urban Agriculture官方FAQ](https://www.nyc.gov/site/agriculture/faqs/frequently-asked-questions.page) 仅明确准许母鸡、禁止公鸡等其他禽类，并未在引用指南给出通用母鸡数量上限；**缺少数字不等于可无限饲养** |

## P0：Dallas 2026 生效法风险

原项目 `dallas-tx/roosters` 与 `dallas-tx/placement` 标记为 `primary_clause_checked`，引用旧版 §7-7.3 的公鸡例外和该例外的 20-ft 邻近地界间隔。但 Dallas 市议会官方议程 **26-2375A 于 2026-08-12 状态 Approved**，官方标题说明修改 §7-7.3 且**废止公鸡饲养禁令**：
https://cityofdallas.legistar.com/LegislationDetail.aspx?GUID=9ED973CF-9968-4580-ABA5-E5F996136AA2&ID=8154790&Options=&Search=

**重要未决**：尽管官方状态为 Approved，附件 `Ordinance` 链接抓取返回 410，不能证明最终生效日期、整段取代文字、是否保留专门的 20-ft 例外或其他一般扰民规定。任何网站显示不应继续用旧 §7-7.3 断言现行通用公鸡禁令。需要拿到正式 ordinance PDF 或市法典 2026-08-12 后的编纂，并同步更新 canonical registry、`site/assets/data.js`、相关 city/state HTML、planner guard 和旧引用回归测试；旧数字必须保留手工查证警示直到解决。

## 继续查证的最小有效行动

1. **优先高风险**：Dallas 正式已生效的 8月修法；Lakewood 公投后 Title 17 Article 4 生效正文。
2. **许可归类**：Mesa、Avondale、Sierra Vista、Fresno、Bend、Bellevue、Olympia、Frisco、Garland、Dallas 等向本市规划/建筑部门区别确认 **keeping permit / land use review / accessory structure building permit**；不因为查不到条例直接标“无需许可”。
3. **数量与位置**：Hillsboro §6.20.070 当前生效文字，Corvallis 现行 LDC，LA site-dependent setbacks；SF/Oakland/Bellevue/Bellingham 精确公鸡政策。
4. **禁止二次错误**：不得照搬第三方“hens 3/6/9”、大型牲畜退距、同名其他城市，或把城市 FAQ 没写数量等同于“无限制”；任何条例未能找到则保留待核验状态。
5. 每条升级前保存官方链接、条款、复核日期、适用类别、尚未核实的其他许可。只有具备这些字段才更新证据状态。

*本文件是复核结论与追查清单，不代表 24 个证据不足问题已获政府部门确认；公开使用时继续要求按地块检查 zoning、HOA、建筑及卫生规范。*
