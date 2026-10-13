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
const premiumAssets=[
 "site/assets/logo-mark.svg","site/assets/favicon.svg",
 "site/assets/hero-aerial.svg","site/assets/hero-mini-coop.svg",
 "site/assets/homepage-motion.js"
];
for(const file of premiumAssets){assert(read(file).length>100,"missing design asset: "+file);}
for(const hook of ['data-search-submit','cc-app-window','cc-map-preview','cc-float-proof','cc-float-lot','cc-float-coop','cc-hero-trust']){
 assert(home.includes(hook),"premium homepage hook missing: "+hook);
}
assert(home.includes("prefers")===false,"reduced-motion support belongs in styles and motion script");
assert(read("site/assets/style.css").includes("@media(prefers-reduced-motion:reduce)"),"motion must respect reduced-motion");
assert(read("site/assets/homepage-motion.js").includes("prefers-reduced-motion"),"script must respect reduced-motion");
assert(read("site/assets/city-search.js").includes('data-search-submit'),"search CTA needs actual event handler");
assert(home.includes('href="planner.html"')&&home.includes('href="coverage.html"'),"keep real planner and coverage routes");
assert(home.includes('Illustrative map · Not a survey'),"demo geometry must be labeled illustrative");
assert(!home.includes("6 hens")&&!home.includes("Permit required</span><strong>No"),"hero must not fabricate city-specific laws");
assert(read("site/assets/favicon.svg").includes("<svg"),"new favicon is an SVG");

assert(!home.includes('<select data-search-state'),"homepage must not use a native state select");
assert(!directory.includes('<select data-directory-state')&&!directory.includes('<select data-directory-status'),"directory filters must be custom controls");
assert(home.includes('data-dropdown-trigger')&&home.includes('id="homeStateOptions"'),"custom state trigger and menu required");
assert(directory.includes('id="directoryStates"')&&directory.includes('id="directoryStatuses"'),"custom directory dropdowns required");
const searchScript=read("site/assets/city-search.js");
assert(searchScript.includes('rootEl.addEventListener("focusout"'),"suggestions must close on focus leaving search");
assert(searchScript.includes('if(!input.value.trim()&&!selectedValue(state))'),"blank focused search must stay collapsed");
assert(searchScript.includes('doc.addEventListener("pointerdown"'),"outside clicks must dismiss menus");
assert(searchScript.includes('event.key==="Escape"'),"keyboard Escape must dismiss menu");
const styles=read("site/assets/style.css");
assert(styles.includes('.cc-home .cc-search-controls > .cc-search-results'),"city results must be anchored to the search controls");
assert(styles.includes('.cc-home .cc-state-control > .cc-dropdown-options'),"state popover must be anchored to its trigger");
assert(styles.includes('.cc-filter-dropdown > .cc-dropdown-options'),"directory filters must be floating menus");
assert(styles.lastIndexOf('position:absolute!important')>styles.lastIndexOf('position:static!important'),"new floating popover rules must override legacy in-flow styles");
assert(home.includes('id="homeStateOptions"')&&home.includes('id="homeCityResults"'),"both hero popovers exist");
assert(home.indexOf('id="homeCityResults"')<home.indexOf('<div class="cc-search-meta">'),"city suggestions must stay inside search-control container");
assert(styles.includes('.cc-select-trigger')&&styles.includes('.cc-filter-trigger'),"custom dropdown visual styles required");
console.log("PASS: all-city search, state/status filters, pending distinction, SEO HTML hooks");
