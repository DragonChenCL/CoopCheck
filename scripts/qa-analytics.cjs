/* Offline operator-exclusion checks: no Google requests or live analytics. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const source=fs.readFileSync(path.join(__dirname,"../site/assets/analytics.js"),"utf8");
const KEY="coopcheck:analytics-internal";

function harness({pathname="/",search="",db=new Map(),readDenied=false,writeDenied=false,loading=false}={}){
  const scripts=[],notices=[],listeners={};
  const document={
    readyState:loading?"loading":"complete",
    querySelector:selector=>selector==="[data-coopcheck-internal]"?(notices[0]||null):null,
    createElement:tag=>({tag,dataset:{},style:{},children:[],setAttribute(name,value){this[name]=value;},appendChild(child){this.children.push(child);}}),
    head:{appendChild:el=>scripts.push(el)},
    body:{appendChild:el=>notices.push(el)},
    addEventListener:(type,callback)=>{listeners[type]=callback;}
  };
  const localStorage={
    getItem:key=>{if(readDenied)throw Error("Storage read denied");return db.get(key)||null;},
    setItem:(key,value)=>{if(writeDenied)throw Error("Storage write denied");db.set(key,value);},
    removeItem:key=>{if(writeDenied)throw Error("Storage write denied");db.delete(key);}
  };
  const location={pathname,search,href:"https://coopcheck.serunio.com"+pathname+search,hostname:"coopcheck.serunio.com",origin:"https://coopcheck.serunio.com"};
  const window={};
  vm.runInNewContext(source,{window,document,localStorage,location,URL,URLSearchParams,Date,Set,console});
  return{window,scripts,notices,listeners,db};
}

const first=harness({search:"?utm_source=quality-review&cc_internal=1",loading:true});
assert.equal(first.scripts.length,0,"Internal visits must not load gtag");
assert.equal(first.window.dataLayer,undefined,"Internal visits must not queue a page_view or config");
assert.equal(first.window.coopTrack("chicken_coop_plan_generate",{}),false,"Tool events suppressed before GA init");
assert.equal(first.window["ga-disable-G-FF130M09C3"],true);
assert.equal(first.db.get(KEY),"1","Explicit exclusion persists in this browser");
assert.equal(first.notices.length,0,"Wait for a document body when loading");
first.listeners.DOMContentLoaded();
assert.equal(first.notices.length,1,"Visible internal-mode status");
assert.equal(first.notices[0].role,"status");
assert(first.notices[0].textContent.includes("this browser"));
const resume=new URL(first.notices[0].children[0].href);
assert.equal(resume.searchParams.get("cc_internal"),"0");
assert.equal(resume.searchParams.get("utm_source"),"quality-review","Resume action preserves other query parameters");

const nextPage=harness({pathname:"/planner.html",db:first.db});
assert.equal(nextPage.window.CoopAnalytics.internal,true,"Exclusion survives navigation without query string");
assert.equal(nextPage.scripts.length,0);
assert.equal(nextPage.window.dataLayer,undefined,"planner_open also excluded");

const resumed=harness({pathname:"/planner.html",search:"?cc_internal=0",db:first.db});
assert.equal(resumed.window.CoopAnalytics.internal,false);
assert.equal(resumed.db.has(KEY),false,"Explicit reset removes saved exclusion");
assert.equal(resumed.scripts.length,1,"Normal analytics restored");
assert.equal(resumed.notices.length,0,"Public visitors see no testing notice");
assert(resumed.window.dataLayer.some(args=>args[0]==="config"&&args[1]==="G-FF130M09C3"));
assert(resumed.window.dataLayer.some(args=>args[0]==="event"&&args[1]==="planner_open"),"Existing funnel event remains intact");

for(const access of [{readDenied:true,writeDenied:true},{writeDenied:true}]){
  const denied=harness({search:"?cc_internal=1",...access});
  assert.equal(denied.window.CoopAnalytics.internal,true,"URL exclusion works even with blocked storage");
  assert.equal(denied.window.CoopAnalytics.persistent,false,"Never imply persistence when storage failed");
  assert.equal(denied.scripts.length,0);
  assert(denied.notices[0].textContent.includes("this page only"));
}

const ordinary=harness({pathname:"/cities/portland-or.html",search:"?utm_source=youtube"});
assert.equal(ordinary.window.CoopAnalytics.internal,false);
assert.equal(ordinary.scripts.length,1,"Campaign traffic is collected normally");
assert(ordinary.window.dataLayer.some(args=>args[0]==="event"&&args[1]==="city_page_view"&&args[2].city_slug==="portland-or"));
const unknownFlag=harness({search:"?cc_internal=maybe",db:new Map([[KEY,"1"]])});
assert.equal(unknownFlag.window.CoopAnalytics.internal,true,"Only explicit 0 resets an existing exclusion");
console.log("PASS: internal GA exclusion before load, cross-page persistence, visible mode, explicit reset and blocked-storage fallback");
