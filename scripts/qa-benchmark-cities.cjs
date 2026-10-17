const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../site");
const cities={
 "portland-or":["10 sq ft","3 ft","10 ft","portland.gov/code/13/40"],
 "austin-tx":["30 ft","adjacent residences","does not provide one universal","austintexas.gov"],
 "arlington-tx":["50 ft","four birds","exactly ten","arlingtontx.gov"],
 "denver-co":["16 sq ft","rear 50%","$25","denvergov.org"],
 "seattle-wa":["10 ft","8 domestic fowl","urban-farm","seattle.gov"]
};
for(const [slug,needles]of Object.entries(cities)){
 const html=fs.readFileSync(path.join(root,"cities",slug+".html"),"utf8");
 for(const text of needles)assert(html.toLowerCase().includes(text.toLowerCase()),slug+": missing "+text);
 assert(html.includes('id="city-rule-decision-guide"'),slug+": guide missing");
 assert(html.includes('cc-benchmark-examples')&&html.includes('cc-benchmark-caution'),slug+": examples or warning missing");
 assert(html.includes('../planner.html?city='+slug),slug+": planner missing");
 assert(html.includes('rel="canonical" href="https://coopcheck.serunio.com/cities/'+slug+'.html"'),slug+": incorrect canonical");
 assert((html.match(/<h1\b/g)||[]).length===1,slug+": unexpected H1 count");
 assert(!html.includes('name="robots" content="noindex'),slug+": cannot be noindex");
 assert(fs.readFileSync(path.join(root,"sitemap.xml"),"utf8").includes('/cities/'+slug+'.html</loc><lastmod>'+"2026-10-17"+"</lastmod>"),slug+": sitemap lastmod");
}
assert(fs.readFileSync(path.join(root,"assets/style.css"),"utf8").includes(".cc-benchmark-inner"));
assert(fs.readFileSync(path.join(root,"cities/portland-or.html"),"utf8").includes('id="portlandFlockForm"'),"Portland original flock screen is linked");
console.log("PASS: five city benchmark pages and evidence/SEO safeguards");
