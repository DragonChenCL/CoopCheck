const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../site");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const guidePath="guides/chicken-coop-setback-from-property-line.html";
const guide=read(guidePath),home=read("index.html"),oregon=read("states/oregon.html"),portland=read("cities/portland-or.html");
const sitemap=read("sitemap.xml"),planner=read("planner.html");
const calc=require("../site/assets/setback-worksheet.js");
assert(guide.includes('<link rel="canonical" href="https://coopcheck.serunio.com/'+guidePath+'">'),"guide canonical missing");
assert(guide.includes('name="robots" content="index,follow"'),"guide must be eligible for index");
assert.equal((guide.match(/<h1\b/g)||[]).length,1,"exactly one guide H1");
assert(guide.includes('setback-guide.css')&&guide.includes('setback-worksheet.js'),"worksheet assets missing");
assert(guide.includes('id="setbackWorksheet"')&&guide.includes('id="setbackWorksheetResult"'),"calculator hooks missing");
for(const needle of ["no single nationwide distance","property line","neighboring","surve","geometry only","not a city","not an official survey","not a legal pass/fail","not an approval","not a legal"]){
 assert(guide.toLowerCase().includes(needle.toLowerCase()),"missing source/safety guidance: "+needle);
}
for(const needle of ["www.portland.gov/code/13/40","www.seattle.gov/DPD/publications/CAM/cam244.pdf","www.sandiego.gov/urban-farming/bees-and-livestock/chickens"]){
 assert(guide.includes(needle),"official city case-study source missing: "+needle);
}
for(const link of ["../cities/portland-or.html","../cities/seattle-wa.html","../cities/san-diego-ca.html","../planner.html","../states/oregon.html"]){
 assert(guide.includes(link),"guide outgoing link missing: "+link);
}
for(const [page,html]of [["home",home],["oregon",oregon],["portland",portland]]){
 assert(html.includes("guides/chicken-coop-setback-from-property-line.html"),page+": no inbound internal link");
}
assert(!sitemap.includes("needs_review"),"sitemap should contain only URLs");
const match=sitemap.match(/<loc>https:\/\/coopcheck\.serunio\.com\/guides\/chicken-coop-setback-from-property-line\.html<\/loc><lastmod>2026-10-21<\/lastmod>/g)||[];
assert.equal(match.length,1,"guide must appear once in generated sitemap");
assert(sitemap.includes("/states/oregon.html</loc><lastmod>2026-10-21</lastmod>"),"updated Oregon sitemap lastmod");
assert(planner.includes("assets/map.js"),"map planner must remain available and independent");
const v={lotWidth:40,lotDepth:70,coopWidth:8,coopDepth:10,left:5,right:5,front:10,rear:10};
assert.deepEqual(calc.calculate(v),{valid:true,availableWidth:30,availableDepth:50,buffersOverlap:false,fits:true});
assert.equal(calc.calculate({...v,coopWidth:31}).fits,false);
assert.equal(calc.calculate({...v,coopDepth:51}).fits,false);
assert.deepEqual(calc.calculate({...v,left:35}),{valid:true,availableWidth:0,availableDepth:50,buffersOverlap:false,fits:false});
assert.deepEqual(calc.calculate({...v,left:40}),{valid:true,availableWidth:0,availableDepth:50,buffersOverlap:true,fits:false});
for(const bad of [{...v,lotWidth:0},{...v,front:-1},{...v,coopWidth:NaN},{...v,lotDepth:Infinity}]){
 assert.equal(calc.calculate(bad).valid,false,"bad worksheet dimensions accepted");
}
assert.equal(calc.formatFeet(10.255), "10.26");
console.log("PASS: official-source setback guide, inbound links, sitemap, free worksheet, no implied legal approval");
