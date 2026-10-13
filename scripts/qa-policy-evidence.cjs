const fs=require("node:fs");const p=require("node:path");const assert=require("node:assert/strict");
const root=p.resolve(__dirname,".."),r=JSON.parse(fs.readFileSync(p.join(root,"site/data/cities.json"),"utf8")),e=JSON.parse(fs.readFileSync(p.join(root,"site/data/policy-evidence.json"),"utf8"));
const keys=["max","roosters","permit","placement"];assert.equal(r.cities.length,100);assert.equal(Object.keys(e.cities).length,100);
let confirmed=0;
for(const c of r.cities){const rec=e.cities[c.slug];assert(rec,c.slug+" missing");for(const key of keys){const x=rec[key];assert(x,c.slug+"/"+key+" missing");assert(["unverified","source_recorded","primary_clause_checked"].includes(x.status));if(c.audit.status==="needs_review")assert.equal(x.status,"unverified","unreviewed city cannot claim verified policy");if(x.status==="primary_clause_checked"){assert(x.section&&x.url&&x.checkedAt,"field-specific evidence metadata missing");assert(c.sources.some(s=>s.url===x.url),"field source not in city registry");confirmed++;}}}
const queue=fs.readFileSync(p.join(root,"docs/operations/PENDING_LAW_RESEARCH_2026-10-13.md"),"utf8");
const recorded=Object.values(e.cities).flatMap(fields=>keys.map(key=>fields[key])).filter(x=>x.status==="source_recorded").length;
const unverified=Object.values(e.cities).flatMap(fields=>keys.map(key=>fields[key])).filter(x=>x.status==="unverified").length;
const pending=r.cities.filter(c=>c.audit.status==="needs_review").length;
assert(queue.includes(pending+" 城市仍处于 needs_review；"+confirmed+" / 400 核心字段"),"research queue primary-evidence tally drift");
assert(queue.includes("其余 **"+recorded+" 项为 source_recorded、"+unverified+" 项为 unverified"),"research queue remaining-evidence tally drift");
const bend=r.cities.find(c=>c.slug==="bend-or");
assert.equal(bend.audit.status,"verified_limited_scope","Bend is source-reviewed only for two fields");
assert.equal(bend.planner.mode,"manual","Bend must not be auto-cleared");
for(const k of ["max","roosters"]) assert.equal(e.cities["bend-or"][k].status,"primary_clause_checked","Bend audited field "+k);
for(const k of ["permit","placement"]) assert.notEqual(e.cities["bend-or"][k].status,"primary_clause_checked","Bend permit/setback unproven: "+k);
const sa=r.cities.find(c=>c.slug==="san-antonio-tx");
assert(/§5-107/.test(sa.note)&&/pet shop/i.test(sa.note),"San Antonio code numbering must not regress to §5-109 as animal-limit authority");
// Protect P0 corrections: code-specific source conditions are not general parcel clearance.
const bySlug=Object.fromEntries(r.cities.map(c=>[c.slug,c]));
for(const key of keys) assert.equal(e.cities["prescott-valley-az"][key].status,"primary_clause_checked","Prescott Valley "+key+" must retain code citation");
for(const key of ["max","roosters","placement"])assert.equal(e.cities["anaheim-ca"][key].status,"primary_clause_checked","Anaheim "+key+" missing code citation");
assert(/(?:2024-09-13|September 13, 2024)/.test(bySlug["lake-havasu-city-az"].note),"Lake Havasu grandfathering condition missing");
assert(bySlug["lake-havasu-city-az"].note.includes("A(2)"),"Lake Havasu limited-zone condition missing");
assert.equal(e.cities["beaverton-or"].placement.url,"https://beaverton.municipal.codes/BC/5.09.015","Beaverton dwelling distance not grounded");
assert.equal(e.cities["portland-or"].permit.status,"primary_clause_checked","Portland no livestock permit government source required");
assert(bySlug["folsom-ca"].max.includes("Agricultural Combining District"),"Folsom zone-specific use must not be generalized");
// Guard current official code checks, conditional site rules and no parcel-wide legal assurances.
const eg=bySlug["elk-grove-ca"];
assert(eg.max.includes("12")&&eg.max.includes("40-ft"),"Elk Grove conditional allowance must be explicit");
assert(bySlug["tucson-az"].placement.includes("20 ft"),"Tucson UDC dwelling setback missing");
for(const slug of ["long-beach-ca","tacoma-wa","westminster-co"]){for(const key of keys)assert.equal(e.cities[slug][key].status,"primary_clause_checked",slug+"/"+key+" lost official evidence");}
for(const slug of ["santa-rosa-ca","yakima-wa","kent-wa","elk-grove-ca"]){for(const key of ["max","roosters","placement"])assert.equal(e.cities[slug][key].status,"primary_clause_checked",slug+"/"+key+" lost clause evidence");}
for(const slug of ["houston-tx","plano-tx"]){for(const key of keys)assert.equal(e.cities[slug][key].status,"primary_clause_checked",slug+"/"+key+" official code not verified");}
assert(bySlug["houston-tx"].permit.includes("physician"),"Houston special permit may not be generalized");
assert(bySlug["stockton-ca"].placement.includes("20 ft")&&bySlug["stockton-ca"].placement.includes("5 ft"),"Stockton lot-vs-dwelling distance distinction missing");
assert(bySlug["redmond-wa"].max.includes("5,500")&&bySlug["redmond-wa"].max.includes("overlap"),"Redmond current 2025-amended NR lot limits must not be stale");
assert(e.cities["redmond-wa"].placement.url==="https://redmond.municipal.codes/RMC/7.04.157","Redmond placement requires current operative code");
assert(bySlug["everett-wa"].max.includes("10,000")&&bySlug["everett-wa"].max.includes("overlap"),"Everett tier boundary caveat missing");
assert(e.cities["lakewood-co"].permit.status==="primary_clause_checked","Lakewood permitted-zone application evidence lost");
for(const key of keys)assert.equal(e.cities["indianapolis-in"][key].status,"primary_clause_checked","Indianapolis §743-306 individual primary clause missing "+key);
assert(/ONE rooster/.test(bySlug["indianapolis-in"].roosters),"Indianapolis no categorical rooster ban");
for(const key of keys)assert.equal(e.cities["santa-ana-ca"][key].status,"primary_clause_checked","Santa Ana Animal Code missing field "+key);
assert(bySlug["santa-ana-ca"].max.includes("COMBINATION"),"Santa Ana combined fowl/rabbit cap must not be misrepresented");
assert(bySlug["fresno-ca"].max.includes("36,000")&&bySlug["fresno-ca"].max.includes("GREATER"),"Fresno zoning threshold must not be collapsed into blanket residential ban");
for(const k of ["max","roosters","placement"])assert.equal(e.cities["fresno-ca"][k].status,"primary_clause_checked","Fresno precise official code missing "+k);
// Keep source-specific negative findings narrow: no generic permit/rooster/setback clearance.
assert.equal(e.cities["bellingham-wa"].max.status,"primary_clause_checked");
assert(bySlug["bellingham-wa"].max.includes("DOES NOT"),"Bellingham must not imply unlimited hens");
assert.equal(e.cities["frisco-tx"].placement.status,"primary_clause_checked");
assert(bySlug["frisco-tx"].placement.includes("LIVESTOCK"),"Frisco livestock setbacks must not be copied onto fowl");
assert.equal(e.cities["fort-collins-co"].permit.status,"primary_clause_checked");
assert(bySlug["fort-collins-co"].permit.includes("$30")&&bySlug["fort-collins-co"].permit.includes("inspection"),"Fort Collins coop license/inspection must be stated");
for(const key of keys)assert.equal(e.cities["san-jose-ca"][key].status,"primary_clause_checked","San Jose claim must cite operative 7.60 code: "+key);
assert(bySlug["san-jose-ca"].max.includes("Exactly 20, 40 or 50"),"San Jose literal endpoint ambiguity unresolved");
for(const key of ["roosters","permit"])assert.equal(e.cities["hillsboro-or"][key].status,"primary_clause_checked","Hillsboro OR source proof missing: "+key);
assert(bySlug["hillsboro-or"].note.includes("Hillsboro KS/WI"),"Do not confuse Hillsboro Oregon with Kansas or Wisconsin");
assert(e.cities["oakland-ca"].permit.detail.includes("Conditional Use Permit"),"Oakland zoning permit conditionality missing");
// Protect Flagstaff's lot tiers, male-bird age limit, permit exceptions and distance object.
for(const k of keys)assert.equal(e.cities["flagstaff-az"][k].status,"primary_clause_checked","Flagstaff "+k);
assert(bySlug["flagstaff-az"].max.includes("19,999")&&bySlug["flagstaff-az"].roosters.includes("four months"),"Flagstaff tiers/age threshold lost");
assert(bySlug["flagstaff-az"].permit.includes("ER")&&bySlug["flagstaff-az"].placement.includes("alley"),"Flagstaff exceptions/setbacks lost");
for(const k of ["max","roosters","placement"])assert.equal(e.cities["sierra-vista-az"][k].status,"primary_clause_checked","Sierra Vista "+k);
assert.notEqual(e.cities["sierra-vista-az"].permit.status,"primary_clause_checked","Sierra Vista permit not proven");
assert(bySlug["sierra-vista-az"].placement.includes("neighboring property")&&bySlug["sierra-vista-az"].placement.includes("200"),"Sierra Vista property/setback confused");
assert.equal(e.cities["tempe-az"].placement.status,"primary_clause_checked");
assert(bySlug["tempe-az"].placement.includes("fence/wall"),"Tempe enclosure height limit missing");
const m=fs.readFileSync(p.join(root,"POLICY_COMPLETENESS_2026-10-13.md"),"utf8");assert(m.includes("**"+confirmed+"**"),"report count out of sync");console.log("PASS: policy evidence completeness checks ("+confirmed+"/400 independently section-checked)");
