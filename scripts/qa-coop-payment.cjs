/* Payment lifecycle tests use a mocked gateway: no live orders or charges. */
const assert=require("node:assert/strict");
const vm=require("node:vm");
const fs=require("node:fs");
const source=fs.readFileSync(require("node:path").join(__dirname,"../site/assets/payment.js"),"utf8");
const flush=()=>new Promise(r=>setTimeout(r,0));
function harness({ready=false,save=false,response=null,token=null}={}){
  const db=new Map();
  const listeners={};
  const button={textContent:"",disabled:false,addEventListener:(name,fn)=>{listeners[name]=fn;}};
  const status={textContent:""};
  const hero={classList:{contains:()=>!ready},scrollIntoView:()=>{}};
  const document={getElementById:id=>({print:button,paymentStatus:status,complianceHero:hero})[id]};
  const events=[],calls=[];
  const localStorage={getItem:key=>db.get(key)||null,setItem:(key,value)=>db.set(key,value)};
  let printed=0;
  const window={CoopPlanner:{isReady:()=>ready,save:()=>save},coopTrack:(name,params)=>events.push(name),print:()=>{printed++;}};
  const location={href:"https://coopcheck.serunio.com/planner.html"};
  const fetch=async(url,options)=>{
    calls.push({url,options});
    if(url.endsWith("/checkout")){
      if(!response)return{ok:false,json:async()=>({error:"unknown_product"})};
      return{ok:true,json:async()=>response};
    }
    return{ok:true,json:async()=>({granted:!!token,app:"coopcheck",sku:"permit-report",referenceId:"coop_mock"})};
  };
  vm.runInNewContext(source,{document,window,localStorage,crypto:{randomUUID:()=> "mock"},fetch,location,console,setTimeout,URL,Date,JSON});
  return{click:()=>listeners.click(),calls,events,db,button,status,location,get printed(){return printed;}};
}
(async()=>{
  const blocked=harness({ready:false,save:false});
  await flush();blocked.click();await flush();
  assert.equal(blocked.calls.length,0,"incomplete drawing must never begin checkout");
  const unsaved=harness({ready:true,save:false});
  await flush();unsaved.click();await flush();
  assert.equal(unsaved.calls.length,0,"sketch not persisted must never begin checkout");
  const rejected=harness({ready:true,save:true});
  await flush();rejected.click();await flush();await flush();
  assert.equal(rejected.calls.filter(c=>c.url.endsWith("/checkout")).length,1,"mock checkout attempted");
  assert(rejected.events.includes("payment_checkout_error"),"mock error event reported");
  const success=harness({ready:true,save:true,response:{checkoutUrl:"https://pay.example/checkout/123",gatewayOrderId:"order_1",accessToken:"token_1"}});
  await flush();success.click();await flush();await flush();
  assert.equal(success.location.href,"https://pay.example/checkout/123");
  assert(success.events.includes("payment_checkout_created"));
  assert(success.db.has("coopcheck:payment:order_1"),"token linked to project in local storage");
  console.log("PASS: mock payment lifecycle, safe checkout blocking, redirect persistence and error tracking");
})().catch(e=>{console.error(e);process.exitCode=1});
