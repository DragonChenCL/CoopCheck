/* Protect original high-intent search landing pages, source scope, sitemap, and functioning calculator */
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=x=>fs.readFileSync(path.join(root,x),"utf8");
const {specsPages,FL,PRINTS,specs,flUrl,fpUrl}=require("./generate-coop-seo-pages.cjs");
const calc=require("../site/assets/coop-size-calculator.js");
assert.equal(specsPages.length,10,"10 deliberately curated distinct landing pages");
assert.equal(new Set(specsPages.map(x=>x.slug)).size,10);
assert.equal(specsPages.filter(x=>x.group==="flock").length,6);
assert.equal(specsPages.filter(x=>x.group==="footprint").length,3);
assert.equal(specsPages.filter(x=>x.group==="calculator").length,1);
const sitemap=read("site/sitemap.xml");
assert.equal((sitemap.match(/<loc>/g)||[]).length,116,"99 originals + 10 sizing pages + 6 tool intent pages + 1 buyer checker");
assert.equal(new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1] )).size,116);
const titleSet=new Set(),descSet=new Set(),h1Set=new Set();
const blogBase="https://coopcheck.serunio.com";
for(const p of specsPages){
 const h=read("site/guides/"+p.slug+".html");
 assert.equal(h,p.html,"rendered SEO file must stay in sync with deterministic generator: "+p.slug);
 const match=(re)=>h.match(re)?.[1];
 const ttl=match(/<title>(.*?)<\/title>/),desc=match(/<meta name="description" content="([^"]+)"/),h1=match(/<h1>(.*?)<\/h1>/);
 assert(ttl&&desc&&h1,"unique title, description, heading");
 assert(ttl.length<=90&&desc.length<=170,"SERP snippet reasonable length");
 titleSet.add(ttl);descSet.add(desc);h1Set.add(h1);
 const canonical=blogBase+"/guides/"+p.slug+".html";
 assert(h.includes('<link rel="canonical" href="'+canonical+'">'),"canonical "+p.slug);
 assert.equal((sitemap.match(new RegExp('<loc>'+canonical.replace(/\./g,'\\.')+'<\\/loc>','g'))||[]).length,1,"exact URL in sitemap "+p.slug);
 assert(h.includes("Oregon State University Extension")&&h.includes("Penn State Extension"),"primary husbandry links "+p.slug);
 assert(h.includes("not")&&h.includes("municipal"),"must distinguish husbandry target from local laws "+p.slug);
 assert(h.includes("coop-plan.html"),"usable diagram conversion "+p.slug);
 assert(h.includes("<h1>")&&h.includes("application/ld+json"),"indexable rendered HTML with schema "+p.slug);
 assert(!/cut list|engineered construction plans for sale|guaranteed compliant/i.test(h),"no unjustified product promises "+p.slug);
}
assert.equal(titleSet.size,10);assert.equal(descSet.size,10);assert.equal(h1Set.size,10);
for(const n of [2,4,6,8,10,12,16,24]){
 const x=calc.calculate(n);
 assert.equal(x.indoor,4*n);
 assert.equal(x.run,10*n);
 assert.equal(x.nests,Math.ceil(n/4));
 assert.equal(x.roost,Number((n*.75).toFixed(2)));
}
for(const v of [1,25,0,NaN,Infinity,3.5,100,"6",null])assert.equal(calc.calculate(v),null);
for(const n of FL){
 const p=read("site/guides/coop-size-for-"+n+"-chickens.html"),v=specs(n);
 assert(p.includes("flock="+n+"&amp;source=coop-size"),"each guide deep links working generator "+n);
 assert(p.includes(v.inside+" sq ft")&&p.includes(v.outside+" sq ft"),"dimension facts "+n);
 assert(p.includes('role="img"'),"original accessible separate-space diagram "+n);
}
for(const {w,d} of PRINTS){
 const h=read("site/guides/"+w+"x"+d+"-chicken-coop-capacity.html");
 assert(h.includes(w*d+" sq ft"),"interior floor arithmetic");
 assert(h.includes("interior")||h.includes("indoor"),"do not count run as indoor");
}
const home=read("site/index.html"),planner=read("site/coop-plan.html");
const setback=read("site/guides/chicken-coop-setback-from-property-line.html"),engine=read("site/assets/coop-plan.js");
assert(home.includes('href="guides/chicken-coop-size-calculator.html"'),"homepage internal hub");
assert(setback.includes('href="chicken-coop-size-calculator.html"'),"setback contextual connection");
assert(planner.includes('href="guides/chicken-coop-size-calculator.html"'),"free 2D plan can send users to sizing utility");
assert(engine.includes('params.get("flock")')&&["size-guide","size-calculator","coop-size","coop-footprint","run-size","nesting-box","roost"].every(x=>engine.includes('"'+x+'"')),"deep linked flock should prefill ONLY from known sizing sources");
console.log("PASS: 10 original SEO landing pages, 116 canonical sitemap URLs, credible sources and functioning size calculator");
