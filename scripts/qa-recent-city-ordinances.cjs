const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),registry=JSON.parse(fs.readFileSync(path.join(root,"site/data/cities.json"),"utf8"));
const ev=JSON.parse(fs.readFileSync(path.join(root,"site/data/policy-evidence.json"),"utf8")).cities;
const sitemap=fs.readFileSync(path.join(root,"site/sitemap.xml"),"utf8");
const city=(slug)=>{const x=registry.cities.find(c=>c.slug===slug);assert(x,"city missing: "+slug);return x;};
for(const slug of ["garland-tx","olympia-wa"]){
 const c=city(slug),e=ev[slug];
 assert.equal(c.audit.status,"verified_limited_scope",slug+" must retain honest limited-scope status");
 assert.equal(c.planner.mode,"manual",slug+" must not claim automatic parcel approval");
 assert.equal(e.max.status,"primary_clause_checked");
 assert.equal(e.roosters.status,"primary_clause_checked");
 assert.equal(e.placement.status,"primary_clause_checked");
 assert.notEqual(e.permit.status,"primary_clause_checked",slug+" permits are not verified");
 for(const key of ["max","roosters","placement"]){
  assert(c.sources.some(s=>s.url===e[key].url),slug+"/"+key+" source must be registered");
  assert(e[key].section&&e[key].checkedAt,slug+"/"+key+" needs specific official provision");
 }
 const html=fs.readFileSync(path.join(root,"site/cities",slug+".html"),"utf8");
 assert(html.includes('content="index,follow"'),slug+" page should be indexable");
 assert(sitemap.includes("/cities/"+slug+".html"),slug+" included in sitemap");
 assert(html.includes(c.sources[0].url),slug+" official source in page");
}
// Chandler's old 2023 government page says five but adopted Ordinance 5113 increased the limit to six.
const ch=city("chandler-az");
assert.match(ch.max,/6 hens/i,"Chandler must use Ordinance 5113 six-hen limit");
assert(!/up to 5 chickens/i.test(ch.max));
assert(ev["chandler-az"].max.status==="primary_clause_checked");
assert(/5113/.test(ev["chandler-az"].max.section));
assert.match(ch.permit,/7 ft/,"Chandler coop height must remain in permit guidance");
assert.match(fs.readFileSync(path.join(root,"site/cities/chandler-az.html"),"utf8"),/2024 law update/);
// Mesa's city distances need an explicit state preemption caveat.
assert.equal(city("mesa-az").planner.mode,"manual");
assert.equal(city("mesa-az").audit.status,"verified_limited_scope");
assert.match(city("mesa-az").placement,/40 ft/);
assert.match(city("mesa-az").placement,/75 ft/);
assert.match(city("mesa-az").placement,/preempted/i);
assert.notEqual(ev["mesa-az"].permit.status,"primary_clause_checked");
assert.match(fs.readFileSync(path.join(root,"site/cities/mesa-az.html"),"utf8"),/Arizona preemption conflict/);
assert.match(city("garland-tx").max,/4 female/i);
assert.match(city("garland-tx").placement,/30 ft/);
assert.match(city("garland-tx").placement,/5 ft/);
assert.match(city("olympia-wa").max,/5.*9.*10/);
assert.match(city("olympia-wa").placement,/10 ft/);
assert.match(city("olympia-wa").placement,/setback areas/i);
assert.match(city("olympia-wa").note,/one-acre/);
for(const c of registry.cities.filter(c=>c.audit.status==="needs_review")){
 assert.equal(c.planner.mode,"manual");
 assert(!sitemap.includes("/cities/"+c.slug+".html"),"pending noindex city excluded from sitemap: "+c.slug);
 const html=fs.readFileSync(path.join(root,"site/cities",c.slug+".html"),"utf8");
 assert(html.includes('content="noindex,follow"'));
}
console.log("PASS: recent primary-code evidence, limited scope, zoning caveats and pending-city noindex");
