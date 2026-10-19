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
  // Show a scannable excerpt without changing the source-reviewed legal claim.
  // Longer exceptions always remain available in the adjacent native disclosure.
  function lawCard(c,key,label){
    const full=String(c[key]||"").trim();
    const long=full.length>150;
    const first=full.split(/;\s*|(?<=[.!?])\s+/)[0].trim();
    const excerpt=!long?full:first.length>=24&&first.length<=145?first:"This field has conditions that need a closer look.";
    return `<article class="cc-law-card"><span class="cc-law-label">${esc(label)}</span><p class="cc-law-answer">${esc(excerpt)}</p>${long?`<details class="cc-law-detail"><summary>Read the full rule and exceptions</summary><p>${esc(full)}</p></details>`:""}</article>`;
  }
  function page(c){
    const isActive=active(c),title=isActive?"Backyard Chicken Laws in "+c.name+", "+c.state+" | CoopCheck":"Backyard Chicken Rules in "+c.name+", "+c.state+" — Verification Pending | CoopCheck";
    const desc=isActive?"Official-source summary of chicken keeping, flock size, permits and coop placement in "+c.name+". Verify parcel rules before building.":"Coverage candidate for "+c.name+", "+c.state+". City-specific chicken rules have not been verified; do not rely on this page for permit or coop decisions.";
    const structured="";
    const rules=isActive?`<div class="cc-law-grid" aria-label="City poultry rules">
      ${lawCard(c,"max","Flock size")}${lawCard(c,"roosters","Roosters")}
      ${lawCard(c,"permit","Permits and approvals")}${lawCard(c,"placement","Coop placement")}
      </div>`:`<div class="notice"><strong>Not verified yet.</strong> We have not confirmed this city’s chicken limits, rooster rules, permits or setbacks. Ask local zoning or animal control before making plans.</div>`;
    const sources=c.sources.filter(s=>s.type!=="state_statute_only");
    const sourcelinks=sources.length?`<ul>${sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.type.replaceAll("_"," "))} — ${s.type.includes("draft")?"draft, NOT enacted-law proof":"cited document"}</a></li>`).join("")}</ul>`:"<p>The city-specific official code/source has not yet been checked. No city-wide legal conclusion is provided here.</p>";
    const statewide=c.sources.filter(s=>s.type==="state_statute_only").map(s=>`<p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Arizona statewide backyard-fowl statute</a> is relevant to eligible properties, but is <strong>not</strong> a verification of ${esc(c.name)}'s municipal code, permit rules or HOA restrictions.</p>`).join("");
    const status=isActive?(c.audit.status==="verified_limited_scope"?"Limited-scope policy summary · ":"Official-source summary reviewed · ")+esc(c.verified):"Research queue · not verified";
    const intro=isActive?"Start with the four essentials below: flock size, roosters, permits and coop location. Open any long rule to read its full conditions and check the linked official sources before acting.":"This profile is still being reviewed. We do not publish unverified local limits or setbacks as settled facts.";
    // Do not duplicate long ordinance statements in FAQ accordions or structured data.
    const faq="";
    const planner=isActive?`<p>Use the map planner only as a visual sketching tool: rule-specific setback automation is not supported for ${esc(c.name)}. A geometry result is not a legal compliance determination.</p><a class="btn secondary" href="/planner.html?city=${encodeURIComponent(c.slug)}">Open manual map planner</a>`:"<p>This city is not selectable as a verified ruleset in the planner yet. You can still sketch your lot independently, but do not infer permitted coop placement.</p><a class=\"btn secondary\" href=\"/planner.html\">Open general map planner</a>";
    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta name="robots" content="${isActive?"index,follow":"noindex,follow"}">
<link rel="canonical" href="${BASE}${cityLink(c)}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css?v=20261018-mobileqa1">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="article"><meta property="og:url" content="${BASE}${cityLink(c)}">${structured}</head>
<body><header class="site-header"><div class="container nav"><a class="brand" href="/"><span class="brand-mark"><img src="/assets/logo-mark.svg" alt="" width="36" height="36"></span>CoopCheck</a><nav class="nav-links"><a href="/coverage.html">100-city coverage</a><a href="/planner.html">Map planner</a></nav></div></header>
<main><section class="city-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / <a href="${zoneLink(c)}">${esc(c.stateName)}</a> / ${esc(c.name)}</div><span class="eyebrow">${status}</span><h1>${isActive?"Backyard chicken laws in":"Backyard chicken rule research for"} ${esc(c.name)}, ${esc(c.state)}</h1><p class="lead">${esc(intro)}</p><div class="hero-actions">${isActive?`<a class="btn" href="#city-rules">See city rules ↓</a><a class="btn secondary" href="/coop-plan.html?city=${encodeURIComponent(c.slug)}&amp;source=rules">Try a coop layout →</a>`:`<a class="btn" href="/coverage.html">Browse verified cities</a>`}</div></div></section>
<section class="section" id="city-rules"><div class="container"><div class="card"><div class="cc-law-section-head"><div><span class="eyebrow">Quick guide · ${esc(c.name)}, ${esc(c.state)}</span><h2>Chicken rules at a glance</h2><p>Short reading summaries only. Expand longer statements for the complete reviewed wording.</p></div><a href="#city-sources">Official sources ↘</a></div>${rules}
<details class="cc-law-audit"><summary>What was reviewed — and what is not confirmed?</summary><p>These field notes reflect the linked sources, but not every rule or exception has been confirmed against the currently effective code. <a href="https://github.com/DragonChenCL/CoopCheck/blob/main/POLICY_COMPLETENESS_2026-10-13.md">See the evidence audit</a>.</p><p>${esc(c.note)}</p></details><div class="prose">
<h2 id="city-sources">Check the original sources</h2><p>Use the city or government documents below when checking your own property.</p>${sourcelinks}${statewide}
${faq}<h2>Before you buy birds or build</h2><ul class="cc-law-checklist"><li>Confirm your address is inside the city limits and find its zoning.</li><li>Check the current chicken and rooster rules, plus any permit requirements.</li><li>Measure setbacks to the correct boundaries or neighboring buildings.</li><li>Check building rules, easements and private HOA restrictions.</li></ul><h2>Sketch a layout for your flock</h2>${isActive?`<p>Our free plan generator carries the reviewed city context alongside an editable 2D layout. It does not certify a permit or setback.</p><a class="btn" href="/coop-plan.html?city=${encodeURIComponent(c.slug)}&amp;source=rules">Plan a coop for ${esc(c.name)} →</a>`:""}${planner}<p class="small">Informational planning aid only. This is not a permit approval, a parcel survey or legal advice.</p></div></div></div></section></main>
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
<main><section class="hero"><div class="container"><span class="eyebrow">City-by-city source coverage</span><h1>Backyard chicken laws: 100-city directory</h1><p class="lead"><strong>${registry.cities.length} cities tracked</strong> · <strong>${verified.length} official-source summaries reviewed</strong> · <strong>${registry.cities.length-verified.length} profiles awaiting verification</strong>.</p><div class="notice"><strong>Accuracy comes first.</strong> Pending cities are not verified chicken-law guides: their individual pages retain <code>noindex</code> even when listed in the sitemap for completeness; the sitemap does not make those pages eligible for indexing. Read a reviewed source before making coop, permit or flock decisions.</div>
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
  pages["site/assets/plan-law-data.js"]="/* Generated from cities.json and policy-evidence.json. Primary-checked claims only. */\nwindow.COOP_PLAN_LAW_DATA="+JSON.stringify(lawRows).replace(/</g,"\\u003c")+";\n";

  for(const c of batches)pages["site/cities/"+c.slug+".html"]=page(c);
  pages["site/coverage.html"]=coveragePage();
  pages["site/assets/city-search-index.json"]=JSON.stringify({version:1,cities:registry.cities.map(c=>({slug:c.slug,name:c.name,state:c.state,stateName:c.stateName,status:c.audit.status}))},null,2)+"\n";
  const seoGuides=["chicken-coop-size-calculator","coop-size-for-4-chickens","coop-size-for-6-chickens","coop-size-for-8-chickens","coop-size-for-10-chickens","coop-size-for-12-chickens","coop-size-for-16-chickens","4x6-chicken-coop-capacity","4x8-chicken-coop-capacity","6x8-chicken-coop-capacity"].map(slug=>["/guides/"+slug+".html","2026-10-17"]);
  const seoIntentTools=["chicken-run-size-calculator","chicken-run-fencing-calculator","chicken-nesting-box-calculator","chicken-roost-length-calculator","chicken-coop-cost-calculator","free-chicken-coop-floor-plans"].map(slug=>["/guides/"+slug+".html","2026-10-14"]);
  const urls=[...seoGuides,...seoIntentTools,["/guides/prefab-chicken-coop-capacity-checker.html","2026-10-15"],["/guides/backyard-chicken-permit-site-plan-checklist.html","2026-10-16"],["/report.html","2026-10-19"],["/","2026-10-16"],["/planner.html","2026-10-12"],["/coop-plan.html","2026-10-13"],["/guides/chicken-coop-setback-from-property-line.html","2026-10-13"],...["arizona","california","colorado","oregon","washington","texas"].map(x=>["/states/"+x+".html",x==="oregon"?"2026-10-13":"2026-10-12"]),["/coverage.html","2026-10-13"],...verified.map(x=>[cityLink(x),"2026-10-17"]),...registry.cities.filter(x=>!active(x)).map(x=>[cityLink(x),"2026-10-12"])];
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
