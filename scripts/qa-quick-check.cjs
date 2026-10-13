const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const site=path.join(__dirname,"../site"),r=require("../site/assets/quick-check-data.js");
const cities=["portland-or","austin-tx","arlington-tx","denver-co","seattle-wa"];
const test=(slug,hens,lot,rooster)=>r.evaluate({slug,hens,lotSqFt:lot,rooster});
assert.equal(r.slugs.length,5);
assert.equal(test("portland-or",4,8000,false).kind,"within");
assert.equal(test("portland-or",5,8000,false).kind,"over");
assert.equal(test("portland-or",5,12000,false).kind,"within");
assert.equal(test("portland-or",5,"",false).kind,"review");
assert.equal(test("portland-or",9,22000,false).kind,"review");
assert.equal(test("portland-or",2,8000,true).kind,"over");
assert.equal(test("austin-tx",2,9000,false).kind,"review");
assert.match(test("austin-tx",2,9000,false).details,/30 ft/);
assert.equal(test("arlington-tx",4,1000,false).kind,"within");
assert.equal(test("arlington-tx",6,6000,false).kind,"review");
assert.equal(test("denver-co",8,1000,false).kind,"within");
assert.match(test("denver-co",8,1000,false).details,/128 sq ft/);
assert.equal(test("denver-co",9,1000,false).kind,"over");
assert.equal(test("denver-co",2,1000,true).kind,"over");
assert.equal(test("seattle-wa",8,4000,false).kind,"within");
assert.equal(test("seattle-wa",9,9000,false).kind,"over");
assert.equal(test("seattle-wa",9,12000,false).kind,"review");
assert.equal(test("seattle-wa",9,"",false).kind,"review");
assert.equal(test("seattle-wa",5,12000,true).kind,"over");
assert.equal(test("portland-or",0,1000,false).kind,"invalid");
assert.equal(test("portland-or","NaN",1000,false).kind,"invalid");
for(const city of cities){
  const s=fs.readFileSync(path.join(site,"cities",city+".html"),"utf8");
  assert(s.includes('class="cc-field-matrix"'),city+" city evidence panel");
  assert.equal((s.match(/class="cc-field-card"/g)||[]).length,4);
  assert(s.includes("Needs field-specific verification")||city==="portland-or");
}
for(const file of ["index.html","planner.html"]){
 const h=fs.readFileSync(path.join(site,file),"utf8");
 assert(h.includes('data-quick-check='),file+" entry");
 assert(h.includes('quick-check-data.js')&&h.includes('quick-check.js'),file+" scripts");
}
for(const name of ["quick-check-data.js","quick-check.js"])new vm.Script(fs.readFileSync(path.join(site,"assets",name),"utf8"),{filename:name});
const evidence=JSON.parse(fs.readFileSync(path.join(site,"data/policy-evidence.json"),"utf8"));
assert.equal(Object.values(evidence.cities).flatMap(c=>Object.values(c)).filter(f=>f.status==="primary_clause_checked").length,17);
console.log("PASS: Quick Check field validation, 5-city scenario screening, legal caveats, evidence panels and source metadata");
