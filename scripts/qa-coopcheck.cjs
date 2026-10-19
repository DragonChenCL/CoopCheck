const assert=require("node:assert/strict");
const rules=require("../site/assets/rules.js"),store=require("../site/assets/project.js");
const cities=[{slug:"portland-or",name:"Portland",state:"OR"},{slug:"portland-me",name:"Portland",state:"ME"},{slug:"salem-or",name:"Salem",state:"OR"}];
const feature=(city,state)=>({properties:{context:{place:{name:city},region:{region_code:"US-"+state}}}});
assert.equal(rules.cityFromGeocode(feature("Portland","OR"),cities)?.slug,"portland-or");
assert.equal(rules.cityFromGeocode(feature("Portland","ME"),cities)?.slug,"portland-me");
assert.equal(rules.cityFromGeocode(feature("Portland","WA"),cities),null);
assert.equal(rules.cityFromGeocode({properties:{name:"Portland, OR"}},cities),null);
assert.equal(rules.cityFromGeocode(feature("Salem","OR"),cities)?.slug,"salem-or");
const ring=[[-122.68,45.52],[-122.67,45.52],[-122.67,45.53],[-122.68,45.52]];
const data={version:1,city:"portland-or",center:[-122.67,45.52],zoom:19,setbacks:{side:3,front:10,rear:3},features:[{type:"Feature",properties:{role:"property"},geometry:{type:"Polygon",coordinates:[ring]}}],address:"Portland, Oregon",addressMatched:true,addressCity:"portland-or"};
const storage=new Map(),api={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
assert.equal(store.save(api,"coop_123",data),true);
assert.deepEqual(store.load(api,"coop_123").features[0].geometry.coordinates[0],ring);
assert.equal(store.load(api,"coop_other"),null);
assert.equal(store.parse(store.serialize(data)).city,"portland-or");
assert.equal(store.parse('{"version":1,"features":[{"type":"Feature","properties":{"role":"bad"}}]}'),null);
assert.equal(store.save(api,"coop_bad",{...data,features:[{type:"Feature",properties:{role:"coop"},geometry:{type:"Polygon",coordinates:[[[999,0],[0,0],[0,1],[999,0]]]}}]}),false);
assert.equal(store.clear(api,"coop_123"),true);
assert.equal(store.load(api,"coop_123"),null);
console.log("PASS: city/state matching and saved polygon restoration");

const fs=require("node:fs"),path=require("node:path");
const base=path.resolve(__dirname,"../site");
const read=p=>fs.readFileSync(path.join(base,p),"utf8");
const planner=read("planner.html");
assert(planner.includes('src="assets/project.js') && planner.includes('src="assets/rules.js'),"planner includes persistence and city match scripts");
assert(planner.includes('id="addressRuleMatch"') && planner.includes('id="saveProject"') && planner.includes('id="exportProject"'),"planner UX controls");
const map=read("assets/map.js");
assert(map.includes("cityFromGeocode(f,window.COOP_CITIES"),"structured city+state match");
assert(!map.includes('lower.includes(c.name.toLowerCase())'),"no substring matching");
assert(map.includes("restoreSnapshot()") && map.includes("saveSnapshot()"),"sketch restores and saves");
assert(!map.includes('result_label:label.slice'),"no identifiable street address to analytics");
assert(!map.includes('window.coopTrack?.(role+"_draw_complete"'),"no duplicate draw complete events");
const payment=read("assets/payment.js");
assert(payment.includes("planner.save()") && payment.includes("planner?.isReady()"),"payment requires saving a complete sketch");
assert(payment.includes("window.CoopPlanner?.isReady()"),"print requires sketch restoration");
const cityDataSource=read("assets/data.js");
const policyRegistry=JSON.parse(read("data/cities.json"));
assert.equal(policyRegistry.schemaVersion,1,"supported policy registry schema");
assert.equal(policyRegistry.cities.length,100,"100 cities tracked in registry");
assert.equal(new Set(policyRegistry.cities.map(c=>c.slug)).size,100,"city slugs are unique");
const reviewedCities=policyRegistry.cities.filter(c=>c.audit?.status!=="needs_review");
assert(reviewedCities.length>=85,"at least the original 85 reviewed cities");
assert.equal(policyRegistry.cities.filter(c=>c.audit.status==="needs_review").length,100-reviewedCities.length,"pending profile count reconciles");
assert(reviewedCities.length>=24,"at least the initial 24 reviewed cities are preserved");
assert.equal(policyRegistry.cities.filter(c=>c.audit?.status==="needs_review").length,100-reviewedCities.length,"all city records have a review status");
assert.equal((cityDataSource.match(/"slug":/g)||[]).length,reviewedCities.length,"browser rules include reviewed cities only");
for(const city of policyRegistry.cities){
  assert(["verified","verified_with_source_gap","verified_limited_scope","needs_review"].includes(city.audit?.status),"audit status: "+city.slug);
  assert(Array.isArray(city.sources)&&city.sources.every(s=>/^https:\/\//.test(s.url)),"sources are HTTPS: "+city.slug);
  if(city.audit.status==="needs_review"){
    assert.equal(city.verified,null,"pending city must not claim verification: "+city.slug);
    assert.equal(city.planner.mode,"manual","pending city planner must be manual: "+city.slug);
  }else{
    assert(/^\d{4}-\d{2}-\d{2}$/.test(city.verified),"valid verification date: "+city.slug);
    assert(city.sources.length>0,"reviewed city has official source: "+city.slug);
  }
}

function longDate(iso){
  const [y,m,d]=iso.split("-").map(Number);
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  return months[m-1]+" "+d+", "+y;
}
for(const city of policyRegistry.cities){
  const html=read("cities/"+city.slug+".html");
  if(city.audit.status==="needs_review"){
    assert(html.includes('content="noindex,follow"'),"pending page must be noindex: "+city.slug);
    assert(read("sitemap.xml").includes("/cities/"+city.slug+".html"),"pending research page listed in sitemap but kept noindex: "+city.slug);
  }else{
    assert(html.includes(city.verified)||html.includes(longDate(city.verified)),"city page date matches registry: "+city.slug);
    assert(city.sources.some(s=>html.includes(s.url)),"city page includes official source: "+city.slug);
    assert(read("sitemap.xml").includes("/cities/"+city.slug+".html"),"reviewed city in sitemap: "+city.slug);
  }
}
assert(read("coverage.html").includes("100 cities tracked"),"coverage directory generated");
assert.equal((read("sitemap.xml").match(/<url>/g)||[]).length,30+policyRegistry.cities.length,"sitemap includes all 100 city pages, existing entrypoints and 17 coop SEO/buyer pages");

const phoenixPolicy=policyRegistry.cities.find(c=>c.slug==="phoenix-az");
assert(phoenixPolicy.max.startsWith("Up to 6 poultry"),"Phoenix uses current six-poultry baseline");
assert(phoenixPolicy.placement.includes("20 ft from a neighboring property line"),"Phoenix uses current 20-ft neighboring-property-line rule");
assert(!cityDataSource.includes("enclosure must be 80 ft from the residence"),"stale Phoenix 80-ft residence rule removed");
const phoenixPage=read("cities/phoenix-az.html");
assert(phoenixPage.includes("Ordinance G-7300") && phoenixPage.includes("A.R.S. § 9-462.12"),"Phoenix page cites current city amendment and state preemption source");
assert(!phoenixPage.includes("Up to 20 backyard chickens per half-acre"),"stale Phoenix 20-poultry summary removed");
console.log("PASS: CoopCheck planner, payment and analytics integration static checks");

for (const state of ["oregon","arizona","california"]){
  const html=read("states/"+state+".html");
  assert(html.includes('class="city-comparison"'),"state rule table exists: "+state);
  assert(html.includes("Manual")||html.includes("manual"),"manual verification called out in "+state);
}
for(const page of ["index.html","planner.html"])assert(read(page).includes("planner-preview.svg"),"preview exists on "+page);
assert(read("assets/planner-preview.svg").includes("Schematic only"),"preview explicitly illustrative");
for(const slug of ["chandler-az","denver-co","mesa-az","portland-or","san-diego-ca","seattle-wa"])
  assert(!read("cities/"+slug+".html").includes("rectangular lot and manually entered house"),"stale planner copy removed: "+slug);
assert(read("planner.html").includes('id="importProject"')&&read("planner.html").includes('id="exportGeoJSON"'),"backup tools present");
for(const js of ["map.js","project.js","rules.js","planner.js","payment.js","analytics.js"])
  new Function(read("assets/"+js)); // Syntax-only QA, no network, no billing calls.
console.log("PASS: JS syntax, six city pages and SEO state comparisons");

assert(read("planner.html").includes('id="checkHouseWithin"'),"house containment check shown");
assert(read("assets/map.js").includes('houseInsideProperty=turf.booleanWithin(house,property)'),"house containment evaluated");
assert(read("assets/map.js").includes("invalidPolygon"),"invalid drawn geometry rejected");
console.log("PASS: malformed-geometry and parcel-boundary safeguards wired");

// Portland's original city-code quick screen: arithmetic and legal-boundary guardrails.
const {screenPortlandFlock}=require("../site/assets/portland-flock-check.js");
const portland=(lotSqFt,adultFowl,youngFowl=0,multipleUnits=false)=>screenPortlandFlock({lotSqFt,adultFowl,youngFowl,multipleUnits});
assert.equal(portland(9999,4).standardMax,4,"sub-10000 lots have 4-fowl standard tier");
assert.equal(portland(10000,6).standardMax,6,"10,000 exactly moves to the 6-fowl tier");
assert.equal(portland(9999,5).withinStandardCount,false,"five older birds exceed the ordinary small-lot tier");
assert.equal(portland(10000,6,4).withinStandardCount,true,"up to four young fowl may be in addition");
assert.equal(portland(10000,6,5).withinStandardCount,false,"five young fowl are outside the ordinary exception");
assert.equal(portland(12000,6).shelterOrPenSqFt,60,"10 sq ft per older bird");
assert.equal(portland(20000,7).agriculturalExceptionRequiresReview,true,"large lot is not automatic agricultural approval");
assert.equal(portland(12000,6,0,true).multipleUnits,true,"multi-unit additional separation warning must be preserved");
assert.throws(()=>portland(-1,1),/lot size/,"bad lot area rejected");
assert.throws(()=>portland(8000,1.5),/older birds/,"fractional bird count rejected");
const portlandHtml=read("cities/portland-or.html");
assert(portlandHtml.includes('id="portlandFlockForm"')&&portlandHtml.includes('src="../assets/portland-flock-check.js"'),"Portland form and evaluator linked");
assert(portlandHtml.includes('§13.40.040')&&portlandHtml.includes("official"),"Portland legal source and limits visible in static HTML");
assert(read("index.html").includes('cities/portland-or.html#portland-flock-check'),"homepage links to source-backed Portland checker");
assert(read("sitemap.xml").includes('/cities/portland-or.html</loc><lastmod>2026-10-17</lastmod>'),"Portland updated lastmod");
console.log("PASS: Portland lot-size screen threshold boundaries and source-backed SEO entry");

// Pages build must inject nonblocking analytics for every city, state and directory page.
const pagesWorkflow=fs.readFileSync(path.resolve(__dirname,"../.github/workflows/pages.yml"),"utf8");
assert(pagesWorkflow.includes('const tag = \'<script defer src="/assets/analytics.js"></script>\';'),"GA4 injection must not block HTML parsing");
assert(pagesWorkflow.includes("walk(root)")&&pagesWorkflow.includes("html.includes('/assets/analytics.js')"),"GA4 injection must recurse and not duplicate");

// Keep San Diego's three distinct chicken setback tiers sourced and explicit.
const sdCity=read("cities/san-diego-ca.html");
assert(sdCity.includes("§42.0709(e)(2)"),"San Diego enacted ordinance reference");
assert(sdCity.includes("Up to 5 hens:")&&sdCity.includes("Up to 15 hens:")&&sdCity.includes("Up to 25 hens:"),"San Diego three-tier explanation");
assert(sdCity.includes("whichever is greater")&&sdCity.includes("any structure used for residential purposes"),"San Diego property-line versus residential-structure distinction");
assert(sdCity.includes("not a blanket 50-ft property-line setback"),"San Diego 50-ft separation is not a property-line setback");
assert(sdCity.includes("../coop-plan.html?city=san-diego-ca&amp;source=rules"),"Keep San Diego city-to-plan handoff");
console.log("PASS: source-backed San Diego setbacks and existing plan handoff");
