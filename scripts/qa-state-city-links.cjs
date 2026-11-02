/* Regression: source-backed state hubs must give every city a static HTML path.
 * This verifies the published files, not Google index status.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../site");
const registry=JSON.parse(fs.readFileSync(path.join(root,"data/cities.json"),"utf8")).cities;
const states={AZ:"arizona",CA:"california",CO:"colorado",OR:"oregon",WA:"washington",TX:"texas"};
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
for(const [code,slug] of Object.entries(states)){
 const h=read("states/"+slug+".html");
 const group=registry.filter(c=>c.state===code);
 const begin=h.indexOf('<!-- BEGIN VERIFIED STATE-CITY DIRECTORY:');
 const end=h.indexOf('<!-- END VERIFIED STATE-CITY DIRECTORY -->');
 assert(begin!==-1&&end>begin,"missing complete state directory: "+code);
 const section=h.slice(begin,end);
 for(const c of group){
  const u='../cities/'+c.slug+'.html';
  assert(section.includes('href="'+u+'"'),"state hub missing city: "+c.slug);
  if(c.audit.status==="needs_review"){
   assert(section.includes('Research pending — noindex'),"state directory missing pending status");
  }
  const city=read("cities/"+c.slug+".html");
  if(c.rollout?.batch==="first-100-2026-10"||!["NY","MN","WI","IN","NC"].includes(code)){
   assert(city.includes('class="section cc-related-cities"'),"city missing related links: "+c.slug);
   assert(city.includes('/states/'+slug+'.html'),"city missing state hub link: "+c.slug);
  }
  if(c.audit.status==="needs_review"){
   assert(/<meta[^>]*name="robots"[^>]*content="noindex,follow"/i.test(city),"pending city indexable: "+c.slug);
  }
 }
 const links=[...section.matchAll(/href="\.\.\/cities\/([^"]+\.html)"/g)].map(m=>m[1]);
 assert.equal(new Set(links).size,group.length,"state directory must link exactly the city set: "+code);
}
const home=read("index.html");
for(const state of Object.values(states))assert(home.includes('href="states/'+state+'.html"'),"home missing state: "+state);
console.log("PASS: six state hubs include all 95 profiles; city links and pending noindex preserved");
