const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const registry=JSON.parse(fs.readFileSync(path.join(root,"site/data/cities.json"),"utf8"));
const evidence=JSON.parse(fs.readFileSync(path.join(root,"site/data/policy-evidence.json"),"utf8"));
const body=fs.readFileSync(path.join(root,"site/assets/plan-law-data.js"),"utf8");
const sandbox={};sandbox.window=sandbox;
vm.runInNewContext(body,sandbox,{timeout:5000});
const rows=sandbox.COOP_PLAN_LAW_DATA;
const law=require("../site/assets/plan-law.js");
const quick=require("../site/assets/quick-check-data.js");
assert.equal(Object.keys(rows).length,100);
for(const c of registry.cities){
 const row=law.resolve(rows,c.slug);assert(row,"city record "+c.slug);
 assert.equal(row.status,c.audit.status);
 for(const key of ["max","roosters","placement","permit"]){
   const record=evidence.cities[c.slug]?.[key],claim=law.field(row,key);
   const expected=c.audit.status!=="needs_review"&&record?.status==="primary_clause_checked"&&record.verifiedClaim!==false;
   assert.equal(!!claim,!!expected,"no unverified law promoted for "+c.slug+" "+key);
   if(claim){assert.equal(claim.text,c[key]);assert.equal(claim.url,record.url);}
 }
}
const portland=rows["portland-or"];
assert.equal(law.suggestedFlock(portland),4);
assert.equal(law.review(rows,"portland-or",4,"",false,quick).kind,"within");
assert.equal(law.review(rows,"portland-or",5,"",false,quick).kind,"review","five birds needs lot-size evidence");
assert.equal(law.review(rows,"portland-or",5,"10000",false,quick).kind,"within");
assert.equal(law.review(rows,"portland-or",7,"10000",false,quick).kind,"warning");
assert.equal(law.review(rows,"portland-or",4,"",true,quick).kind,"warning","rooster triggers warning");
assert.equal(law.review(rows,"seattle-wa",9,"5000",false,quick).kind,"warning");
assert.equal(law.review(rows,"denver-co",9,"",false,quick).kind,"warning");
assert.equal(law.review(rows,"austin-tx",6,"",false,quick).kind,"review","Austin is not universal numeric clearance");
const chandler=law.review(rows,"chandler-az",8,"",false,quick);
assert.equal(chandler.kind,"review","other city claims may be source-backed without a universal machine-verifiable ceiling");
assert(chandler.facts.max?.verified===true);
const pending=law.review(rows,"peoria-az",4,"",false,quick);
assert(pending.pending&&pending.kind==="review");
assert(!Object.values(pending.facts).some(Boolean),"no pending fields may become allowed");
assert.equal(law.suggestedFlock(rows["peoria-az"]),null);
assert.equal(law.resolve(rows,"not-a-real-city"),null);
assert.equal(law.review(rows,"not-a-real-city",4,"",false,quick),null);
assert.equal(law.resolve(rows,"__proto__"),null);
const generator=fs.readFileSync(path.join(root,"site/coop-plan.html"),"utf8");
for(const id of ["planCity","planCityFacts","planLot","planRooster","planRuleLink","planSourceLink","planMapLink","planLawResult","planPrintLaw"]){
 assert(generator.includes('id="'+id+'"'),"missing city form control "+id);
}
const app=fs.readFileSync(path.join(root,"site/assets/coop-plan.js"),"utf8");
assert(app.includes("saved map")||app.includes("Saved map"),"explain saved dimensions");
assert(!app.includes('form.elements.namedItem("width").value=api.format(dimensions.width)'),"coop-only outline MUST NOT overwrite combined coop+run width");
assert(!app.includes('form.elements.namedItem("depth").value=api.format(dimensions.depth)'),"coop-only outline MUST NOT overwrite combined coop+run depth");
assert(app.includes("plan-law")===false||app.includes("COOP_PLAN_LAW_DATA"));
const planner=fs.readFileSync(path.join(root,"site/planner.html"),"utf8");
const map=fs.readFileSync(path.join(root,"site/assets/map.js"),"utf8");
assert(planner.includes('id="mapPlanLink"'),"map contextual link");
assert(map.includes('"mapPlanLink"')&&map.includes("saveSnapshot()"),"map click saves and passes city");
for(const slug of ["portland-or","austin-tx","arlington-tx","denver-co","seattle-wa"]){
 const city=fs.readFileSync(path.join(root,"site/cities",slug+".html"),"utf8");
 assert(city.includes("coop-plan.html?city="+slug+"&amp;source=rules"),"benchmark city entrypoint "+slug);
}
const generated=registry.cities.filter(x=>x.rollout?.batch==="first-100-2026-10");
for(const c of generated){
 const page=fs.readFileSync(path.join(root,"site/cities",c.slug+".html"),"utf8");
 if(c.audit.status==="needs_review")assert(!page.includes("Generate a coop concept for"),"pending city must not promote screened plan");
 else assert(page.includes("coop-plan.html?city="+c.slug+"&amp;source=rules"),"reviewed city entrypoint "+c.slug);
}
console.log("PASS: 100-source city context, all per-field primary evidence gates, conditional hen limits, city links and safe map dimensions");
