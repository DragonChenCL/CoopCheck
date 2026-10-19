/* Paid-report conversion guard: strictly mocked gateway; never charges a buyer. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.resolve(__dirname,"../site");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const offer=read("report.html"),planner=read("planner.html"),payment=read("assets/payment.js");
const success=read("payment-success/index.html"),analytics=read("assets/analytics.js");
const sitemap=read("sitemap.xml"),generator=fs.readFileSync(path.join(__dirname,"generate-coverage-pages.cjs"),"utf8");
const index=read("index.html"),guide=read("guides/backyard-chicken-permit-site-plan-checklist.html");
assert(offer.includes('href="https://coopcheck.serunio.com/report.html"'),"Canonical report URL");
assert(offer.includes('This is a fictional example') && offer.includes("NOT VALID FOR PERMITS"),"Sample must be visibly fictional");
assert(offer.includes('One-time $4.99 unlock')&&offer.toLowerCase().includes("no payment"),"Transparent pricing and free preview");
assert(offer.includes('href="planner.html?from=report#start-map"'),"Preview-to-map path");
assert(offer.includes("Free chicken coop layout vs. paid site plan report"),"Free vs paid clarified");
assert(planner.includes('id="start-map"')&&planner.includes('href="report.html#sample"'),"Sample before map drawing");
assert(planner.includes('id="print"')&&payment.includes('const SKU="permit-report"'),"Existing paid SKU preserved");
assert(payment.includes('const GATEWAY="https://payment-gateway.chenlongqrr.workers.dev"'),"Existing Waffo gateway unchanged");
assert(payment.includes('if(!planner?.isReady())')&&payment.includes('jurisdictionStatus?.()==="mismatch"')&&payment.includes('if(!planner.save())'),"Pre-payment safety gates preserved");
assert(index.includes('href="report.html"')&&guide.includes('href="../report.html#sample"'),"High-intent entry links");
assert(generator.includes('["/report.html","2026-10-19"]'),"Generator indexes paid report landing");
assert(sitemap.includes('<loc>https://coopcheck.serunio.com/report.html</loc><lastmod>2026-10-19</lastmod>'),"Canonical sitemap entry");
assert(analytics.includes('paid_report_offer_view')&&analytics.includes('paid_report_sample_click'),"Offer funnel instrumentation");
assert(!payment.includes('window.coopTrack?.("purchase"'),"Checkout creation cannot emit a purchase");
assert(success.includes('data.granted===true&&data.app===APP&&data.sku===SKU&&data.referenceId===record.referenceId'),"Strict entitlement verification");
const inline=success.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
assert(inline,"Payment success inline script");
const script=inline[1];
const next=()=>new Promise(resolve=>setTimeout(resolve,15));
function runCase({status="granted",reuseDb=null}={}){
  const db=reuseDb||new Map();
  const record={gatewayOrderId:"order_abc",referenceId:"coop_mock",accessToken:"test_token"};
  if(!db.has("coopcheck:payment:order_abc"))db.set("coopcheck:payment:order_abc",JSON.stringify(record));
  const nodes={paymentTitle:{textContent:""},paymentMessage:{textContent:""},backToPlanner:{hidden:true,href:"/planner.html"}};
  const events=[],fetchCalls=[];
  const body={
    document:{getElementById:id=>nodes[id]},
    window:{coopTrack:(name,payload)=>events.push({name,payload}),addEventListener:()=>{}},
    location:{search:"?payment=order_abc"},
    localStorage:{getItem:key=>db.get(key)||null,setItem:(key,value)=>db.set(key,value)},
    URLSearchParams,Promise,JSON,console,
    setTimeout:callback=>{callback();return 1},
    fetch:async (url,args)=>{
      fetchCalls.push({url,args});
      return {ok:true,json:async()=> status==="granted"?{granted:true,app:"coopcheck",sku:"permit-report",referenceId:"coop_mock"}:status==="refunded"?{status:"refunded",granted:false}:{granted:false}};
    }
  };
  vm.runInNewContext(script,body,{filename:"payment-success"});
  return {db,events,nodes,fetchCalls};
}
(async()=>{
  const yes=runCase();await next();
  const purchases=yes.events.filter(e=>e.name==="purchase");
  assert.equal(purchases.length,1,"Exactly one validated purchase event");
  const p=purchases[0].payload;
  assert.equal(p.transaction_id,"order_abc");assert.equal(p.value,4.99);assert.equal(p.currency,"USD");
  assert.equal(p.items[0].item_id,"permit-report");
  assert.equal(yes.events.filter(e=>e.name==="payment_entitlement_granted").length,1);
  assert.equal(yes.nodes.paymentTitle.textContent,"Payment confirmed");
  assert.equal(yes.nodes.backToPlanner.href,"/planner.html?paid=1");
  assert(yes.db.has("coopcheck:entitlement:permit-report:coop_mock"),"Entitlement saved for planner");
  const repeat=runCase({reuseDb:yes.db});await next();
  assert.equal(repeat.events.filter(e=>e.name==="purchase").length,0,"No duplicate purchase on refresh");
  const refused=runCase({status:"denied"});await next();
  assert.equal(refused.events.filter(e=>e.name==="purchase").length,0,"Pending checkout is not revenue");
  assert.equal(refused.nodes.paymentTitle.textContent,"Payment is still processing");
  const refunded=runCase({status:"refunded"});await next();
  assert.equal(refunded.events.filter(e=>e.name==="purchase").length,0,"Refund cannot be counted as purchase");
  assert.equal(refunded.nodes.paymentTitle.textContent,"Payment was refunded");
  console.log("PASS: sample-before-draw CTA, Waffo contract preserved, source-led marketing, entitlement-only purchase and idempotency");
})().catch(e=>{console.error(e);process.exitCode=1});
