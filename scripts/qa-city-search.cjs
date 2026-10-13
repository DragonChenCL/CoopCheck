const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const {normalize,filterCities,statusLabel}=require("../site/assets/city-search.js");
const registry=JSON.parse(read("site/data/cities.json"));
const index=JSON.parse(read("site/assets/city-search-index.json"));
const rows=index.cities;
assert.equal(index.version,1,"supported search index schema");
assert.equal(rows.length,registry.cities.length,"search index includes all cities, including pending");
assert.equal(new Set(rows.map(c=>c.slug)).size,100,"unique city suggestions");
for(const c of registry.cities){
 const item=rows.find(x=>x.slug===c.slug);
 assert(item,"missing "+c.slug);assert.deepEqual(item,{slug:c.slug,name:c.name,state:c.state,stateName:c.stateName,status:c.audit.status},"search index drift: "+c.slug);
}
assert.equal(normalize("San José"),"san jose");
assert.equal(filterCities(rows,"phoenix")[0].slug,"phoenix-az");
assert.equal(filterCities(rows,"San José")[0].slug,"san-jose-ca");
assert.equal(filterCities(rows,"New York")[0].slug,"new-york-city-ny");
assert.equal(filterCities(rows,"Seattle WA")[0].slug,"seattle-wa");
assert.equal(filterCities(rows,"", "CA").every(c=>c.state==="CA"),true);
assert.equal(filterCities(rows,"","","pending").length,15);
assert.equal(filterCities(rows,"","","reviewed").length,85);
assert.equal(filterCities(rows,"xyz-1234").length,0);
assert.equal(statusLabel({status:"needs_review"}),"Research pending");
assert.equal(statusLabel({status:"verified_limited_scope"}),"Partially reviewed");
assert.equal(statusLabel({status:"verified"}),"Source reviewed");
const home=read("site/index.html"),directory=read("site/coverage.html");
for(const marker of ['data-city-search="hero"','data-search-input','data-search-results','data-search-state','city-search.js']){
 assert(home.includes(marker),"homepage must expose "+marker);
}
for(const marker of ['data-directory-filter','data-directory-query','data-directory-state','data-directory-status','data-city-row','data-city-group','city-search.js']){
 assert(directory.includes(marker),"directory must expose "+marker);
}
assert.equal((directory.match(/data-city-row/g)||[]).length,100,"directory has all 100 static city cards for non-JS fallback");
assert(!home.includes("18 city rule pages"),"old city count removed");
assert(!home.includes("assets/app.js"),"old huge city-card renderer removed");
console.log("PASS: all-city search, state/status filters, pending distinction, SEO HTML hooks");
