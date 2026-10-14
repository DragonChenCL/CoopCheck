const fs=require("node:fs");
const path=require("node:path");
function generateAll(registry,evidence){
  const BASE="https://coopcheck.serunio.com";
  const states={AZ:"Arizona",CA:"California",CO:"Colorado",OR:"Oregon",WA:"Washington",TX:"Texas",NY:"New York",MN:"Minnesota",WI:"Wisconsin",IN:"Indiana",NC:"North Carolina"};
  const existingStates=new Set(["AZ","CA","CO","OR","WA","TX"]);
  const esc=x=>String(x??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const active=x=>x.audit.status!=="needs_review";
  const rollout=x=>x.rollout?.batch==="first-100-2026-10";
  const batches=registry.cities.filter(rollout);
  const verified=registry.cities.filter(active);
  if(registry.cities.length!==100||batches.length!==82||verified.length+registry.cities.filter(c=>c.audit.status==="needs_review").length!==100)throw Error("Unexpected coverage counts "+[registry.cities.length,batches.length,verified.length]);
  const zoneLink=c=>existingStates.has(c.state)?"/states/"+c.stateName.toLowerCase().replaceAll(" ","-")+".html":"/coverage.html#"+c.state.toLowerCase();
  const cityLink=c=>"/cities/"+c.slug+".html";
  function page(c){
    const isActive=active(c),title=isActive?"Backyard Chicken Laws in "+c.name+", "+c.state+" | CoopCheck":"Backyard Chicken Rules in "+c.name+", "+c.state+" — Verification Pending | CoopCheck";
    const desc=isActive?"Official-source summary of chicken keeping, flock size, permits and coop placement in "+c.name+". Verify parcel rules before building.":"Coverage candidate for "+c.name+", "+c.state+". City-specific chicken rules have not been verified; do not rely on this page for permit or coop decisions.";
    const structured=isActive?'<script type="application/ld+json">'+JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"How many backyard chickens can I keep in "+c.name+"?","acceptedAnswer":{"@type":"Answer","text":c.max}},
      {"@type":"Question","name":"Are roosters allowed in "+c.name+"?","acceptedAnswer":{"@type":"Answer","text":c.roosters}},
      {"@type":"Question","name":"Do I need a permit for backyard chickens in "+c.name+"?","acceptedAnswer":{"@type":"Answer","text":c.permit}}
    ]}).replace(/</g,"\\u003c")+"</script>":"";
    const rules=isActive?`<div class="rules">
       <div class="rule"><span class="label">Flock allowance</span><strong>${esc(c.max)}</strong></div>
       <div class="rule"><span class="label">Roosters</span><strong>${esc(c.roosters)}</strong></div>
       <div class="rule"><span class="label">Permit or approval</span><strong>${esc(c.permit)}</strong></div>
       <div class="rule"><span class="label">Coop placement</span><strong>${esc(c.placement)}</strong></div>
      </div>`:`<div class="notice"><strong>City-specific rules are not verified yet.</strong> CoopCheck has not confirmed ${esc(c.name)}'s flock limit, rooster restrictions, permit requirements or legal coop setbacks. Please contact the city’s animal control or zoning office and consult the current municipal code before keeping poultry or placing a coop.</div>`;
    const sources=c.sources.filter(s=>s.type!=="state_statute_only");
    const sourcelinks=sources.length?`<ul>${sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.type.replaceAll("_"," "))} — ${s.type.includes("draft")?"draft, NOT enacted-law proof":"cited document"}</a></li>`).join("")}</ul>`:"<p>The city-specific official code/source has not yet been checked. No city-wide legal conclusion is provided here.</p>";
    const statewide=c.sources.filter(s=>s.type==="state_statute_only").map(s=>`<p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Arizona statewide backyard-fowl statute</a> is relevant to eligible properties, but is <strong>not</strong> a verification of ${esc(c.name)}'s municipal code, permit rules or HOA restrictions.</p>`).join("");
    const status=isActive?(c.audit.status==="verified_limited_scope"?"Limited-scope policy summary · ":"Official-source summary reviewed · ")+esc(c.verified):"Research queue · not verified";
    const intro=isActive?"Below are the limited city-level points supported by the cited government sources. Some permits, zoning, HOA and site-specific conditions remain outside this summary.":"This city is included in CoopCheck's first 100-city coverage queue, but its poultry rules are still undergoing source review. We are withholding unverified numerical and placement claims rather than guessing.";
    const faq=isActive?`<h2>Questions to check before building</h2>
      <div class="faq"><details><summary>How many chickens can I keep here?</summary><p>${esc(c.max)}</p></details>
      <details><summary>Are roosters allowed?</summary><p>${esc(c.roosters)}</p></details>
      <details><summary>Do I need a permit?</summary><p>${esc(c.permit)}</p></details>
      <details><summary>Where can the coop be placed?</summary><p>${esc(c.placement)}</p></details></div>`:"";
    const planner=isActive?`<p>Use the map planner only as a visual sketching tool: rule-specific setback automation is not supported for ${esc(c.name)}. A geometry result is not a legal compliance determination.</p><a class="btn secondary" href="/planner.html?city=${encodeURIComponent(c.slug)}">Open manual map planner</a>`:"<p>This city is not selectable as a verified ruleset in the planner yet. You can still sketch your lot independently, but do not infer permitted coop placement.</p><a class=\"btn secondary\" href=\"/planner.html\">Open general map planner</a>";
    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta name="robots" content="${isActive?"index,follow":"noindex,follow"}">
<link rel="canonical" href="${BASE}${cityLink(c)}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="article"><meta property="og:url" content="${BASE}${cityLink(c)}">${structured}</head>
<body><header class="site-header"><div class="container nav"><a class="brand" href="/"><span class="brand-mark"><img src="/assets/logo-mark.svg" alt="" width="36" height="36"></span>CoopCheck</a><nav class="nav-links"><a href="/coverage.html">100-city coverage</a><a href="/planner.html">Map planner</a></nav></div></header>
<main><section class="city-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / <a href="${zoneLink(c)}">${esc(c.stateName)}</a> / ${esc(c.name)}</div><span class="eyebrow">${status}</span><h1>${isActive?"Backyard chicken laws in":"Backyard chicken rule research for"} ${esc(c.name)}, ${esc(c.state)}</h1><p class="lead">${esc(intro)}</p><div class="hero-actions"><a class="btn" href="/coverage.html">Browse city coverage</a></div></div></section>
<section class="section"><div class="container"><div class="card">${rules}
<div class="notice"><strong>Verification scope:</strong> A source-linked summary does not mean that all four legal rule fields have been cross-checked against their currently effective code sections. <a href="https://github.com/DragonChenCL/CoopCheck/blob/main/POLICY_COMPLETENESS_2026-10-13.md">Read the field-level evidence audit</a>.</div><div class="prose"><h2>Scope and limitations</h2><p>${esc(c.note)}</p>
<h2>Official sources</h2>${sourcelinks}${statewide}
${faq}<h2>Before buying birds or constructing a coop</h2><p>Confirm that your address is inside the correct city jurisdiction; look up your parcel zoning; confirm flock-size and rooster restrictions, any poultry permit, neighboring-dwelling or property-line separation, accessory-structure/building permits, and HOA or deed restrictions. City rules can change.</p><h2>Plan a coop sketch</h2>${isActive?`<div class="notice"><strong>Try a source-aware concept layout.</strong> Bring this municipality's reviewed evidence into the free chicken-coop layout tool; it will warn where a count or setback has NOT been checked, without claiming construction or permit approval. <a class="btn" href="/coop-plan.html?city=${encodeURIComponent(c.slug)}&amp;source=rules">Generate a coop concept for ${esc(c.name)} →</a></div>`:""}${planner}<p class="small">Informational planning aid only. This is not a permit approval, a parcel survey or legal advice.</p></div></div></div></section></main>
<footer class="footer"><div class="container footer-grid"><strong>CoopCheck</strong><a href="/coverage.html">City coverage directory</a></div></footer></body></html>\n`;
  }
  function coveragePage(){
    const groups=Object.entries(states).map(([code,name])=>{
      const cities=registry.cities.filter(c=>c.state===code).sort((a,b)=>a.name.localeCompare(b.name));
      if(!cities.length)return "";
      return `<section class="section cc-directory-section" id="${code.toLowerCase()}" data-city-group><div class="container"><div class="section-head"><div><span class="eyebrow">${esc(code)} · ${cities.length} cities</span><h2>${esc(name)}</h2></div></div><div class="grid">${cities.map(c=>`<article class="card cc-directory-card" data-city-row data-city="${esc(c.slug)}" data-state="${esc(c.state)}" data-status="${esc(c.audit.status)}"><span class="pill">${active(c)?(c.audit.status==="verified_limited_scope"?"Partially reviewed":"Official sources reviewed"):"Pending official-source verification"}</span><h3 style="margin-top:12px"><a href="${cityLink(c)}">${esc(c.name)}, ${esc(c.state)}</a></h3><p>${active(c)?esc(c.max):"City-specific poultry limits and setbacks not yet verified; this profile is excluded from search indexing."}</p><a href="${cityLink(c)}">${active(c)?"Read reviewed rules":"See research status"} →</a></article>`).join("")}</div></div></section>`;
    }).join("");
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Backyard Chicken Laws by City: 100-City Coverage | CoopCheck</title>
<meta name="description" content="Track 100 US cities in CoopCheck's backyard chicken policy directory. Reviewed city rules are separate from profiles awaiting official ordinance verification.">
<meta name="robots" content="index,follow"><link rel="canonical" href="${BASE}/coverage.html"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css?v=20261013-overlay5"><script src="/assets/city-search.js?v=20261013-dropdown3" defer></script>
</head><body><header class="site-header"><div class="container nav"><a class="brand" href="/"><span class="brand-mark"><img src="/assets/logo-mark.svg" alt="" width="36" height="36"></span>CoopCheck</a><nav class="nav-links"><a href="/">Home</a><a href="/planner.html">Map planner</a></nav></div></header>
<main><section class="hero"><div class="container"><span class="eyebrow">City-by-city source coverage</span><h1>Backyard chicken laws: 100-city directory</h1><p class="lead"><strong>${registry.cities.length} cities tracked</strong> · <strong>${verified.length} official-source summaries reviewed</strong> · <strong>${registry.cities.length-verified.length} profiles awaiting verification</strong>.</p><div class="notice"><strong>Accuracy comes first.</strong> Pending cities are not verified chicken-law guides: their individual pages carry <code>noindex</code> and are excluded from our sitemap. Read a reviewed source before making coop, permit or flock decisions.</div>
 <div class="cc-directory-search" data-directory-filter aria-label="Find and filter city profiles">
 <div class="cc-directory-controls">
 <input type="search" data-directory-query aria-label="Search city" placeholder="Search cities by name, state or abbreviation..." autocomplete="off">
 <div class="cc-filter-dropdown" data-directory-state data-dropdown data-value=""><button type="button" class="cc-filter-trigger" data-dropdown-trigger aria-label="Filter by state" aria-haspopup="listbox" aria-expanded="false" aria-controls="directoryStates"><span data-dropdown-label>All states</span><span class="cc-filter-caret" aria-hidden="true">⌄</span></button><div class="cc-dropdown-options" id="directoryStates" data-dropdown-menu role="listbox" aria-label="States" hidden></div></div>
 <div class="cc-filter-dropdown" data-directory-status data-dropdown data-value="all"><button type="button" class="cc-filter-trigger" data-dropdown-trigger aria-label="Filter by verification status" aria-haspopup="listbox" aria-expanded="false" aria-controls="directoryStatuses"><span data-dropdown-label>All verification statuses</span><span class="cc-filter-caret" aria-hidden="true">⌄</span></button><div class="cc-dropdown-options" id="directoryStatuses" data-dropdown-menu role="listbox" aria-label="Verification status" hidden></div></div>
 <button type="button" data-directory-reset>Clear filters</button>
 </div>
 <div class="cc-directory-meta"><span data-directory-count aria-live="polite">${registry.cities.length} cities shown of ${registry.cities.length}</span><span>Use city pages as a starting point, not a permit approval.</span></div>
 </div></div></section><div class="container cc-directory-empty" data-directory-empty hidden>No matching cities. Try another name or reset the filters.</div>${groups}</main>
<footer class="footer"><div class="container footer-grid"><strong>CoopCheck</strong><span>Official sources and transparent verification status</span></div></footer></body></html>\n`;
  }
  const pages={};
  const lawRows={};
  for(const c of registry.cities){
    const pending=c.audit.status==="needs_review";
    const proof=evidence.cities?.[c.slug]||{};
    const fields={};
    for(const k of ["max","roosters","permit","placement"]){
      const e=proof[k];
      const ok=!pending&&e?.status==="primary_clause_checked"&&e.verifiedClaim!==false;
      fields[k]=ok?{verified:true,text:String(c[k]),url:typeof e.url==="string"&&e.url.startsWith("https://")?e.url:null,section:String(e.section||""),checkedAt:String(e.checkedAt||"")}:null;
    }
    lawRows[c.slug]={slug:c.slug,name:c.name,state:c.state,status:c.audit.status,fields,url:null};
  }
  pages["site/assets/plan-law-data.js"]="/* Generated from cities.json and policy-evidence.json. Primary-checked claims only. */\\nwindow.COOP_PLAN_LAW_DATA="+JSON.stringify(lawRows).replace(/</g,"\\\\u003c")+";\\n";

  for(const c of batches)pages["site/cities/"+c.slug+".html"]=page(c);
  pages["site/coverage.html"]=coveragePage();
  pages["site/assets/city-search-index.json"]=JSON.stringify({version:1,cities:registry.cities.map(c=>({slug:c.slug,name:c.name,state:c.state,stateName:c.stateName,status:c.audit.status}))},null,2)+"\n";
  const urls=[["/","2026-10-13"],["/planner.html","2026-10-12"],["/coop-plan.html","2026-10-13"],["/guides/chicken-coop-setback-from-property-line.html","2026-10-13"],...["arizona","california","colorado","oregon","washington","texas"].map(x=>["/states/"+x+".html",x==="oregon"?"2026-10-13":"2026-10-12"]),["/coverage.html","2026-10-13"],...verified.map(x=>[cityLink(x),["portland-or","austin-tx","arlington-tx","denver-co","seattle-wa"].includes(x.slug)?"2026-10-13":x.verified])];
  const lines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',...urls.map(([u,date])=>"<url><loc>"+BASE+u+"</loc><lastmod>"+date+"</lastmod></url>"),"</urlset>",""];
  pages["site/sitemap.xml"]=lines.join("\n");
  return pages;
}
const registry=JSON.parse(fs.readFileSync(path.resolve(__dirname,"../site/data/cities.json"),"utf8"));
const evidence=JSON.parse(fs.readFileSync(path.resolve(__dirname,"../site/data/policy-evidence.json"),"utf8"));
const files=generateAll(registry,evidence);
const check=process.argv.includes("--check");
for(const [file,expected] of Object.entries(files)){
  const dest=path.resolve(__dirname,"..",file);
  if(check){if(!fs.existsSync(dest)||fs.readFileSync(dest,"utf8")!==expected)throw Error("Generated city coverage is out of sync: "+file);}
  else {fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,expected);}
}
console.log((check?"PASS: verified":"Generated")+" "+Object.keys(files).length+" coverage and sitemap files");
