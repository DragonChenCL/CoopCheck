(function(){
  const GATEWAY="https://payment-gateway.chenlongqrr.workers.dev";
  const APP="coopcheck";
  const SKU="permit-report";
  const PRICE="$4.99";
  const $=id=>document.getElementById(id);
  const button=$("print");
  const status=$("paymentStatus");
  if(!button)return;

  const projectKey="coopcheck:project-id";
  let projectId=localStorage.getItem(projectKey);
  if(!projectId){
    projectId="coop_"+crypto.randomUUID().replaceAll("-","");
    localStorage.setItem(projectKey,projectId);
  }

  const entitlementKey="coopcheck:entitlement:"+SKU+":"+projectId;
  let unlocked=false;
  let busy=false;

  function setStatus(message){
    if(status)status.textContent=message;
  }

  function setUnlocked(){
    unlocked=true;
    button.disabled=false;
    button.textContent="Print / Save as PDF";
    setStatus("Full planning report unlocked on this browser.");
  }

  function setLocked(){
    unlocked=false;
    button.disabled=false;
    button.textContent="Unlock Full Report — "+PRICE;
  }

  async function verify(record){
    if(!record?.accessToken)return false;
    try{
      const res=await fetch(GATEWAY+"/entitlement",{
        headers:{Authorization:"Bearer "+record.accessToken}
      });
      if(!res.ok)return false;
      const data=await res.json();
      const valid=data.granted===true&&data.app===APP&&data.sku===SKU&&data.referenceId===projectId;
      if(valid){
        localStorage.setItem(entitlementKey,JSON.stringify(record));
        setUnlocked();
        return true;
      }
    }catch(e){
      console.warn("CoopCheck entitlement verification failed",e);
    }
    return false;
  }

  async function restore(){
    try{
      const saved=JSON.parse(localStorage.getItem(entitlementKey)||"null");
      if(saved){
        setStatus("Checking report access…");
        if(await verify(saved))return;
      }
    }catch(_){}
    setLocked();
    setStatus("Complete the geometry check, then unlock the printable planning report.");
  }

  async function checkout(){
    if(busy)return;
    const hero=$("complianceHero");
    if(hero?.classList.contains("waiting")){
      setStatus("Draw the property, house and coop before purchasing the report.");
      hero.scrollIntoView({behavior:"smooth",block:"center"});
      return;
    }

    busy=true;
    button.disabled=true;
    button.textContent="Opening secure checkout…";
    setStatus("Creating your secure checkout with Waffo…");
    window.coopTrack?.("payment_checkout_start",{app:APP,sku:SKU});

    try{
      const res=await fetch(GATEWAY+"/checkout",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({app:APP,sku:SKU,referenceId:projectId})
      });
      const data=await res.json();
      if(!res.ok||!data.checkoutUrl||!data.gatewayOrderId||!data.accessToken){
        throw new Error(data.error||"checkout_failed");
      }
      const record={
        gatewayOrderId:data.gatewayOrderId,
        accessToken:data.accessToken,
        referenceId:projectId,
        createdAt:new Date().toISOString()
      };
      localStorage.setItem("coopcheck:payment:"+data.gatewayOrderId,JSON.stringify(record));
      window.coopTrack?.("payment_checkout_created",{app:APP,sku:SKU});
      location.href=data.checkoutUrl;
    }catch(e){
      console.error("CoopCheck checkout failed",e);
      setLocked();
      setStatus("Could not open checkout. Please try again.");
      window.coopTrack?.("payment_checkout_error",{app:APP,sku:SKU});
    }finally{
      busy=false;
    }
  }

  button.addEventListener("click",()=>{
    if(unlocked){
      window.coopTrack?.("paid_report_print",{app:APP,sku:SKU});
      window.print();
      return;
    }
    checkout();
  });

  restore();
})();