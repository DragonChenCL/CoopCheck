const fs=require("node:fs");
const path=require("node:path");

const root=path.resolve(__dirname,"..");
const registryPath=path.join(root,"site","data","cities.json");
const outputPath=path.join(root,"site","assets","data.js");
const STATUS=new Set(["verified","verified_with_source_gap","verified_limited_scope","needs_review"]);

function loadRegistry(){
  const registry=JSON.parse(fs.readFileSync(registryPath,"utf8"));
  if(registry.schemaVersion!==1)throw Error("Unsupported schemaVersion");
  if(!Array.isArray(registry.cities)||registry.cities.length!==100)throw Error("Expected 100 city records in first batch");
  const seen=new Set();
  for(const city of registry.cities){
    for(const key of ["slug","name","state","stateName","max","roosters","permit","placement","planner","audit","sources"]){
      if(city[key]===null||city[key]===undefined)throw Error("Missing "+key+" for "+(city.slug||city.name));
    }
    if(seen.has(city.slug))throw Error("Duplicate city slug: "+city.slug);
    seen.add(city.slug);
    if(!STATUS.has(city.audit.status))throw Error("Invalid audit status for "+city.slug);
    if(!Array.isArray(city.sources)||!city.sources.every(s=>s&&/^https:\/\//.test(String(s.url||""))))throw Error("Invalid source URL for "+city.slug);
    if(city.audit.status==="needs_review"){
      if(city.verified!==null)throw Error("Pending city must not have a verified date: "+city.slug);
      if(city.planner.mode!=="manual")throw Error("Pending city cannot claim automated planner support: "+city.slug);
    }else{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(String(city.verified||"")))throw Error("Invalid verified date for "+city.slug);
      if(!city.sources.some(s=>s.type!=="state_statute_only"))throw Error("Reviewed city lacks city-level government source: "+city.slug);
    }
  }
  return registry;
}

function browserCities(registry){
  return registry.cities.filter(c=>c.audit.status!=="needs_review").map(city=>{
    const {sources,audit,rollout,...legacy}=city;
    return {...legacy,source:sources[0].url};
  });
}
function render(registry){
  return "/* GENERATED from site/data/cities.json. Do not edit by hand. */\n"+
    "window.COOP_CITIES="+JSON.stringify(browserCities(registry),null,2)+";\n";
}
const registry=loadRegistry(),rendered=render(registry);
if(process.argv.includes("--check")){
  const current=fs.existsSync(outputPath)?fs.readFileSync(outputPath,"utf8"):"";
  if(current!==rendered)throw Error("site/assets/data.js does not match reviewed policies in registry");
  console.log("PASS: 100 city records; "+browserCities(registry).length+" reviewed cities available to planner");
}else{
  fs.writeFileSync(outputPath,rendered);
  console.log("Generated browser data for "+browserCities(registry).length+" reviewed cities");
}
