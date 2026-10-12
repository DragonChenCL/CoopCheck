const fs=require("node:fs");
const path=require("node:path");

const root=path.resolve(__dirname,"..");
const registryPath=path.join(root,"site","data","cities.json");
const outputPath=path.join(root,"site","assets","data.js");

function loadRegistry(){
  const registry=JSON.parse(fs.readFileSync(registryPath,"utf8"));
  if(registry.schemaVersion!==1)throw new Error("Unsupported city policy registry schemaVersion");
  if(!Array.isArray(registry.cities)||!registry.cities.length)throw new Error("City policy registry is empty");
  const seen=new Set();
  for(const city of registry.cities){
    for(const key of ["slug","name","state","stateName","max","roosters","permit","placement","verified","planner","audit","sources"]){
      if(city[key]===undefined||city[key]===null)throw new Error(`Missing ${key} for ${city.slug||city.name||"unknown city"}`);
    }
    if(seen.has(city.slug))throw new Error("Duplicate city slug: "+city.slug);
    seen.add(city.slug);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(city.verified))throw new Error("Invalid verified date for "+city.slug);
    if(!Array.isArray(city.sources)||!city.sources.length)throw new Error("Missing sources for "+city.slug);
    if(!city.sources.every(s=>/^https:\/\//.test(String(s.url||""))))throw new Error("Invalid source URL for "+city.slug);
    if(!["verified","verified_with_source_gap","verified_limited_scope","needs_review"].includes(city.audit.status)){
      throw new Error("Invalid audit status for "+city.slug+": "+city.audit.status);
    }
  }
  return registry;
}

function browserCities(registry){
  return registry.cities.map(city=>{
    const {sources,audit,...legacy}=city;
    return {...legacy,source:sources[0].url};
  });
}

function render(registry){
  return "/* GENERATED from site/data/cities.json by scripts/generate-policy-data.cjs. Do not edit by hand. */\n"+
    "window.COOP_CITIES="+JSON.stringify(browserCities(registry),null,2)+";\n";
}

const registry=loadRegistry();
const rendered=render(registry);
if(process.argv.includes("--check")){
  const current=fs.existsSync(outputPath)?fs.readFileSync(outputPath,"utf8"):"";
  if(current!==rendered){
    console.error("site/assets/data.js is out of sync with site/data/cities.json");
    process.exit(1);
  }
  console.log(`PASS: policy registry validates and data.js matches ${registry.cities.length} cities`);
}else{
  fs.writeFileSync(outputPath,rendered);
  console.log(`Generated site/assets/data.js for ${registry.cities.length} cities`);
}
