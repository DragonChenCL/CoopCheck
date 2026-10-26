/* P0 growth launch regression: measurable, source-linked and privacy-preserving. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const model=require("../site/assets/prefab-capacity.js");
const base="https://coopcheck.serunio.com";
const routes=[
 "/guides/prefab-chicken-coop-buying-guide.html",
 "/partners/embed-coop-calculator.html",
 "/research/grover-beach-poultry-policy-october-2026.html"
];
const sitemap=read("site/sitemap.xml");
const generator=read("scripts/generate-coverage-pages.cjs");
const titles=new Set();
for(const route of routes){
  const html=read("site"+route);
  assert(html.includes('<link rel="canonical" href="'+base+route+'">'),"Canonical for "+route);
  assert(/<meta name="robots" content="index,follow">/.test(html),"Indexable page: "+route);
  assert(/<h1\b[^>]*>[\s\S]*?<\/h1>/.test(html),"H1 for "+route);
  assert(sitemap.includes("<loc>"+base+route+"</loc>"),"Sitemap inclusion: "+route);
  const stampPattern=new RegExp("<loc>"+base.replace(/[.*+?^\x24{}()|[\]\\]/g,"\\  assert(generator.includes('["'+route+'","2026-10-24"]'),"Generated sitemap source: "+route);")+route.replace(/[.*+?^\x24{}()|[\]\\]/g,"\\  assert(generator.includes('["'+route+'","2026-10-24"]'),"Generated sitemap source: "+route);")+"</loc><lastmod>(\\d{4}-\\d{2}-\\d{2})</lastmod>");
  const stamp=sitemap.match(stampPattern)?.[1];
  assert(stamp,"Dated sitemap entry: "+route);
  assert(generator.includes('["'+route+'","'+stamp+'"]'),"Generated sitemap source: "+route);
  const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  assert(title&&!titles.has(title),"Unique nonempty title: "+route);
  titles.add(title);
}
const buying=read("site/guides/prefab-chicken-coop-buying-guide.html");
assert.equal(model.PRODUCTS.length,3,"Retain exact three independently sourced products");
for(const product of model.PRODUCTS){
  assert(buying.includes(product.source),"Every model links original seller specifications: "+product.name);
  assert(product.indoor>0,"Documented indoor area present: "+product.name);
}
assert.equal(model.benchmark(6,true).minimum,18);
assert.equal(model.benchmark(6,false).minimum,48);
assert.equal(model.calculateArea(72,48,"in"),24);
assert.equal(model.analyze(model.PRODUCTS[0],6,true).status,"below");
assert.equal(model.analyze(model.PRODUCTS[2],6,true).status,"below");
assert(/not affiliate or sponsored links|not affiliate or sponsored/i.test(buying),"Buyer disclosure");
assert(!/\?affid=|[?&]utm_affiliate=/.test(buying),"No fabricated affiliate links");
const partner=read("site/partners/embed-coop-calculator.html");
const embed=read("site/embed/coop-size-checker.html");
assert(partner.includes('src="https://coopcheck.serunio.com/embed/coop-size-checker.html"'),"Third-party iframe snippet");
assert(/<iframe\b/.test(partner),"Live publisher preview");
assert(embed.includes('<meta name="robots" content="noindex,follow">'),"No thin embed URL in sitemap");
assert(!sitemap.includes("<loc>"+base+"/embed/coop-size-checker.html</loc>"),"Embed excluded from sitemap");
assert(embed.includes('src="/assets/prefab-capacity.js"'),"Use existing audited math");
assert(embed.includes('api.calculateArea(')&&embed.includes('api.benchmark('),"Use the same calculation functions");
assert(!/\/assets\/analytics\.js|googletagmanager|google-analytics|fetch\s*\(|XMLHttpRequest|sendBeacon/.test(embed),"No tracking or network upload in embed");
const inline=embed.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert(inline,"Embed bootstrap script exists");
assert.doesNotThrow(()=>new Function(inline),"Valid JavaScript widget bootstrap");
const deploy=read(".github/workflows/pages.yml");
assert(deploy.includes("!p.startsWith(path.join(root, 'embed') + path.sep)"),"Deployment must not inject GA into embedded frame");
const article=read("site/research/grover-beach-poultry-policy-october-2026.html");
assert(article.includes("https://grover.org/Archive.aspx?ADID=2661"),"Primary agenda link");
assert(article.includes("Regular Business Item 5")&&article.includes("October 26"),"Accurate date and item");
assert(/not an enacted ordinance|no new allowance has been confirmed/i.test(article),"Clear pending status");
assert(read("site/guides/prefab-chicken-coop-capacity-checker.html").includes("/partners/embed-coop-calculator.html"),"Existing checker surfaces embed collaboration");
console.log("PASS: 3 indexable P0 pages, one noindex privacy-preserving embed, source-backed products, grounded pending law, CI injection guard, and canonical sitemap");
