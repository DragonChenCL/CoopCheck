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
const m=fs.readFileSync(p.join(root,"POLICY_COMPLETENESS_2026-10-13.md"),"utf8");assert(m.includes("**"+confirmed+"**"),"report count out of sync");console.log("PASS: policy evidence completeness checks ("+confirmed+"/400 independently section-checked)");
