const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../site");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const engine=require("../site/assets/coop-plan.js");
const html=read("coop-plan.html"),css=read("assets/coop-plan.css");
const home=read("index.html"),mapPlanner=read("planner.html"),setback=read("guides/chicken-coop-setback-from-property-line.html");
const sitemap=read("sitemap.xml");
assert.equal((html.match(/<h1\b/g)||[]).length,1,"one descriptive H1 only");
assert(html.includes('<link rel="canonical" href="https://coopcheck.serunio.com/coop-plan.html">'),"generator canonical");
assert(html.includes("coop-plan.css")&&html.includes("coop-plan.js")&&html.includes("project.js"),"all local app dependencies");
assert(!/mapbox|unpkg\.com|cdn\.|stripe|checkout\.html/i.test(html),"new free generator requires no external API or checkout");
for(const field of ["flock","width","depth","style"]){
 assert(html.includes('name="'+field+'"'),"missing input "+field);
}
for(const hook of ["coopPlanForm","planGenerate","planSvgPreview","planResult","planStats","planNotes","planDownloadSvg","planDownloadPng","planPrint","importHint"]){
 assert(html.includes('id="'+hook+'"'),"missing active control "+hook);
}
for(const kw of ["not construction engineering","not municipal legal minima","does not produce a measured site survey","not a build-ready","PDF","No account","Oregon State","Penn State","University of Minnesota"]){
 assert((html+" "+home).toLowerCase().includes(kw.toLowerCase()),"missing safety copy "+kw);
}
assert(home.includes('href="coop-plan.html"'),"homepage discoverability");
assert(mapPlanner.includes('href="coop-plan.html?from=map"'),"map workflow entrypoint");
assert(setback.includes('href="../coop-plan.html"'),"setback-to-generator funnel");
assert.equal((sitemap.match(/<loc>https:\/\/coopcheck\.serunio\.com\/coop-plan\.html<\/loc>/g)||[]).length,1,"exactly one indexed canonical");
assert(css.includes("@media print")&&css.includes("@media(max-width:650px)"),"print and responsive styles");
const basic={flock:6,width:12,depth:18,style:"walkin"};
assert.equal(engine.design({...basic,flock:1}),null);
assert.equal(engine.design({...basic,flock:24.5}),null);
assert.equal(engine.design({...basic,width:0}),null);
assert.equal(engine.design({...basic,width:Infinity}),null);
assert.equal(engine.design({...basic,depth:NaN}),null);
assert.equal(engine.design({...basic,style:"anything"}),null);
assert.equal(engine.design({...basic,width:"12"}),null,"do not silently coerce invalid values");
assert.equal(engine.design({...basic,flock:24,width:6,depth:8}).meetsTargets,false);
for(const style of ["walkin","raised","compact"]){
 for(const flock of [2,6,12,24]){
  for(const [width,depth] of [[6,8],[10,12],[12,18],[16,24],[30,40],[50,80]]){
   const d=engine.design({flock,width,depth,style});
   assert(d,"valid design "+style);
   assert.equal(d.nestBoxes,Math.ceil(flock/4));
   assert.equal(d.targetIndoor,4*flock);
   assert.equal(d.targetRun,10*flock);
   assert.equal(d.roostFeet,flock*.75);
   assert(d.coop.width>0&&d.coop.depth>0,"positive coop geometry");
   assert(d.coop.x>=0&&d.coop.y>=0,"inside lot origin");
   assert(d.coop.x+d.coop.width<=d.width+1e-7,"coop within lot width");
   assert(d.coop.y+d.coop.depth<=d.depth+1e-7,"coop within lot depth");
   assert(Math.abs(d.indoorArea+d.runArea-width*depth)<1e-7,"coop + run area conservation, with no raised-coop double counting");
   assert.equal(d.meetsTargets,d.indoorArea>=d.targetIndoor-1e-7&&d.runArea>=d.targetRun-1e-7,"area warning is honest");
   assert(d.warnings.length>=1,"style limitations are always explicit");
   const svg=engine.renderSvg(d);
   assert(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'),"self-contained SVG");
   assert(svg.includes("INDOOR COOP")&&svg.includes("OUTDOOR RUN"),"explain inner and outer area");
   assert(svg.includes("NOT PERMIT")&&svg.includes("No construction details"),"plan is never represented as build-ready");
   assert(!svg.includes("<script")&&!svg.replace('xmlns="http://www.w3.org/2000/svg"','').includes("http://")&&!svg.includes("https://"),"no active or external content in drawing");
  }
 }
}
const scenario=engine.design(basic);
assert.equal(scenario.coop.width,8);
assert.equal(scenario.coop.depth,4);
assert.equal(scenario.indoorArea,32);
assert.equal(scenario.runArea,184);
assert.equal(scenario.meetsTargets,true);
const ring=[[-122.68000,45.50000],[-122.67998,45.50000],[-122.67998,45.50003],[-122.68000,45.50003],[-122.68000,45.50000]];
const bbox=engine.dimensionsFromPolygon({type:"Feature",properties:{role:"coop"},geometry:{type:"Polygon",coordinates:[ring]}});
assert(bbox&&bbox.width>0&&bbox.depth>0,"locally calculated nonzero map bbox");
assert(bbox.method.includes("bounding"),"map size must be marked as approximation");
assert.equal(engine.dimensionsFromPolygon({geometry:{type:"Polygon",coordinates:[[[-181,0],[1,0],[1,1],[-181,0]]]} }),null,"reject bad coordinates");
assert.equal(engine.dimensionsFromPolygon({geometry:{type:"Polygon",coordinates:[[[0,0],[1,0],[1,1],[0,1]]]}}),null,"reject unclosed rings");
assert.equal(engine.format(4.04),"4");
assert.equal(engine.format(4.16),"4.2");
for(const control of ["planAutoFit","planMeters","planIndoorMeter","planRunMeter","planExportFeedback"]){
 assert(html.includes('id="'+control+'"'),"missing new plan usability control "+control);
}
assert(html.includes("data-plan-flock"),"quick flock presets should be directly usable");
for(const style of ["walkin","raised","compact"]){
 for(const flock of [2,4,6,12,24]){
  const suggested=engine.suggestFootprint(flock,style);
  assert(suggested,"auto-fit must find a rectangle");
  const plan=engine.design({flock,width:suggested.width,depth:suggested.depth,style});
  assert(plan.meetsTargets,"auto-fit meets both illustrative targets");
  assert.equal(plan.width*plan.depth,suggested.area,"suggestion reports correct total area");
 }
}
assert.equal(engine.suggestFootprint(25,"walkin"),null);
assert.equal(engine.suggestFootprint(6,"unknown"),null);
console.log("PASS: self-hosted 2D coop generator, 3 styles × 4 flocks × 6 sizes, exports, geometry, privacy, caveats and sitemap");
