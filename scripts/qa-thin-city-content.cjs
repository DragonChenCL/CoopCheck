"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");

const root=path.resolve(__dirname,"..");
const registry=JSON.parse(fs.readFileSync(path.join(root,"scripts/data/thin-city-cases.json"),"utf8"));
const cases=registry.cases;
const sitemap=fs.readFileSync(path.join(root,"site/sitemap.xml"),"utf8");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
assert.equal(Object.keys(cases).length,22,"Expected all 22 city-specific content cases");

for(const [slug,parts] of Object.entries(cases)){
  assert.equal(parts.length,3,slug+": incomplete case notes");
  const html=fs.readFileSync(path.join(root,"site/cities",slug+".html"),"utf8");
  const canonical="https://coopcheck.serunio.com/cities/"+slug+".html";
  assert(html.includes('<link rel="canonical" href="'+canonical+'">'),slug+": canonical mismatch");
  assert(html.includes('<section class="cc-specific-case"'),slug+": missing local-case module");
  const variants=x=>[x,esc(x),esc(x).replaceAll("&#39;","&#39;")];
  assert(variants(parts[0]).some(x=>html.includes("<h2>"+x+"</h2>"))||html.includes("<h2>"+esc(parts[0]).replace(/\x27/g,"&#39;")+"</h2>"),slug+": missing or stale scenario headline");
  assert([parts[1],esc(parts[1]),esc(parts[1]).replace(/\x27/g,"&#39;")].some(x=>html.includes(x))&&[parts[2],esc(parts[2]),esc(parts[2]).replace(/\x27/g,"&#39;")].some(x=>html.includes(x)),slug+": stale scenario paragraphs");
  assert(html.includes("Official source for this local example"),slug+": missing cited source link");
  assert(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html),slug+": unexpectedly noindex");
  assert(sitemap.includes("<loc>"+canonical+"</loc><lastmod>2026-10-22</lastmod>"),slug+": sitemap lastmod mismatch");
  const main=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)||[])[1]||"";
  const plain=main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]*>/g," ").replace(/&[a-z0-9#]+;/gi," ");
  const words=(plain.match(/[a-z0-9]+(?:[-'][a-z0-9]+)*/gi)||[]).length;
  assert(words>=400,slug+": content regression: "+words+" English words");
}
console.log("PASS: 22 city-specific examples, sources, canonical links and sitemap entries");
