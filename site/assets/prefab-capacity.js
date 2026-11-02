/* CoopCheck — independent buyer-side coop area reference. Calculations stay local.
 * Merchant-reported specifications are snapshots, not measurements by CoopCheck.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.CoopBuyerCheck=api;
  if(root.document)root.document.addEventListener("DOMContentLoaded",()=>api.mount(root.document));
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const SOURCE="https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design";
  const SPEC_SNAPSHOT_DATE="2026-10-15";
  const PAGE_URL="https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html";
  const PRODUCTS=Object.freeze([
    Object.freeze({
      id:"cabana",name:"Producer's Pride Cabana",model:"CBCOOP-2025 · TSC #2432296",
      claim:"14 chicken roosting capacity",claimed:14,
      indoor:15.54,indoorEvidence:"Seller Q&A: reported interior wooden-coop area",
      run:75.1,runEvidence:"Seller Q&A: reported separate run area",runIncluded:true,
      nests:4,roostBars:3,
      source:"https://www.tractorsupply.com/tsc/product/producers-pride-cabana-coop",
      sourceName:"Tractor Supply: specifications and Q&A",
      note:"Roosting capacity is not a verified year-round housing recommendation. Run access, usable floor, perches and bird size still matter."
    }),
    Object.freeze({
      id:"guardian",name:"Producer's Pride Guardian",model:"CBCOOP-HB-WP · TSC #1994517",
      claim:"14 chicken roosting capacity",claimed:14,
      indoor:62.59*39.37/144,indoorEvidence:"Seller Q&A: 62.59 × 39.37 in floor rectangle; fixtures not deducted",
      run:null,runEvidence:"A run is included; verified usable run AREA is not available for this assessment",runIncluded:true,
      nests:3,roostBars:3,
      source:"https://www.tractorsupply.com/tsc/product/producers-pride-guardian-chicken-coop-14-chicken-capacity-1994517",
      sourceName:"Tractor Supply: specifications and Q&A",
      note:"The calculated rectangle is not independently measured clear floor space. Ask for actual usable floor and separate run dimensions."
    }),
    Object.freeze({
      id:"pawhut",name:"PawHut Wooden Chicken House",model:"D51-547V00GY · Aosom",
      claim:"Advertised for 4–6 hens",claimed:6,
      indoor:8.18,indoorEvidence:"Manufacturer: 8.18 sq ft interior house area",
      run:0,runEvidence:"No outdoor run included; a compatible separate run can be added",runIncluded:false,
      nests:3,roostBars:null,
      source:"https://www.aosom.com/item/pawhut-chicken-coop-wooden-chicken-house-for-4-6-hens-outdoor-hen-house-with-nesting-box-pull-out-tray-and-weatherproof~24SBJPKB4DO01.html",
      sourceName:"Aosom: exact-model specifications",
      note:"Manufacturer lists medium-breed suitability. A separate outdoor run is not part of the package; do not mistake a house-only footprint for enclosed outdoor space."
    })
  ]);
  function round(v,d=1){return Number(v.toFixed(d));}
  function validFlock(n){return Number.isInteger(n)&&n>=1&&n<=24;}
  function benchmark(n,access){
    if(!validFlock(n)||typeof access!=="boolean")return null;
    return {hens:n,access,minimum:round(n*(access?3:8),1),perHen:access?3:8,
      context:access?"OSU: at least 3 sq ft of indoor space per bird WITH outdoor/run access.":"OSU: 8–10 sq ft indoor per bird WITHOUT outdoor access (this check uses the low end, 8)."};
  }
  function calculateArea(length,width,unit){
    const l=Number(length),w=Number(width);
    if(!Number.isFinite(l)||!Number.isFinite(w)||l<=0||w<=0||l>10000||w>10000||!["ft","in"].includes(unit))return null;
    const sq=l*w/(unit==="in"?144:1);
    return Number.isFinite(sq)&&sq>=0.1&&sq<=100000?round(sq,2):null;
  }
  function analyze(product,n,access){
    const ref=benchmark(n,access);
    if(!ref||!product)return null;
    const indoor=product.indoor;
    const known=Number.isFinite(indoor)&&indoor>=0;
    const gap=known?round(indoor-ref.minimum,2):null;
    return {reference:ref,indoor:known?round(indoor,2):null,
      gap,ratio:known?round(indoor/ref.minimum,3):null,
      status:!known?"unknown":gap<0?"below":"reference-met",
      run:typeof product.run==="number"?round(product.run,2):null,
      runIncluded:product.runIncluded,
      sourceType:product.indoorEvidence||"No independently checked indoor measurement"};
  }
  function sellerQuestion(product,n,access){
    const label=product&&product.name?product.name+" ("+(product.model||"listing")+")":"this chicken coop";
    const scenario=validFlock(n)&&typeof access==="boolean"?" My planned flock is "+n+" adult hen"+(n===1?"":"s")+(access?" with reliable daily outdoor/run access.":" without regular outdoor/run access."):"";
    return "Hi, I am considering "+label+"."+scenario+" Could you confirm: (1) the clear usable INTERIOR sleeping-floor length and width, excluding nest-box and fixture footprints; (2) the SEPARATE outdoor run's usable length and width, and whether a run is included; (3) total usable roost-bar length and suitable bird size; and (4) whether the listed chicken count is roosting capacity or a housing recommendation, including the assumed outdoor access? Please share the current dimensioned drawing or specification sheet for this exact model and say what each measurement includes. Thank you.";
  }
  function referenceDifference(n,access){
    if(!validFlock(n)||typeof access!=="boolean")return "Enter a valid flock size to compare the planning assumptions.";
    let text=access?
      "Why does the next calculator show a different number? This buyer check uses OSU's 3 sq ft per hen reference ("+n+" × 3 = "+(n*3)+" sq ft). The full sizing calculator and 2D planner use CoopCheck's separate 4 sq ft indoor + 10 sq ft run planning targets ("+(n*4)+" sq ft indoors + "+(n*10)+" sq ft outdoors). Both assume reliable daily outdoor access; neither number is a legal limit or a suitability guarantee.":
      "Your no-outdoor-access scenario uses the low end of OSU's 8–10 sq ft indoor range ("+n+" × 8 = "+(n*8)+" sq ft). The full sizing calculator and 2D planner assume daily outdoor access, so their 4 sq ft indoor + 10 sq ft run targets do not apply to this scenario. Those links are unavailable until you choose reliable daily outdoor access.";
    if(n===1)text+=" The full sizing calculator and 2D planner support 2–24 hens; your one-hen comparison stays here.";
    return text;
  }
  function comparisonText(product,n,access){
    const calc=analyze(product,n,access);
    if(!calc)return "Enter a whole number from 1 to 24 hens to create a buyer check.";
    const area=v=>Number(v).toFixed(2).replace(/\.00$/,"")+" sq ft";
    const verdict=calc.status==="unknown"?"Unknown — usable indoor measurements are missing.":
      calc.status==="below"?area(Math.abs(calc.gap))+" below this indoor-area reference.":
      (calc.gap===0?"Matches this indoor-area reference":area(calc.gap)+" above this indoor-area reference")+"; this is not a suitability approval.";
    return [
      "COOPCHECK — BUYER MEASUREMENT RECORD",
      "Product: "+(product.name||"Your listing"),
      "Model / evidence: "+(product.model||"User-supplied measurements, unverified"),
      "Flock: "+n+" adult hen"+(n===1?"":"s"),
      "Outdoor/run access: "+(access?"Reliable daily access selected":"No regular outdoor access selected"),
      "",
      "INDOOR COMPARISON",
      "Reported indoor area: "+(calc.indoor===null?"Unknown":area(calc.indoor)),
      "Measurement basis: "+(product.indoorEvidence||"No confirmed usable indoor measurement"),
      "Reference: "+n+" × "+calc.reference.perHen+" sq ft = "+area(calc.reference.minimum),
      calc.reference.context,
      "Result: "+verdict,
      "",
      "SEPARATE RUN — NOT AN INDOOR AREA CREDIT",
      "Reported run area: "+(calc.run===null?"Unknown / not verified":calc.run===0?"No run included":area(calc.run)),
      "Run evidence: "+(product.runEvidence||"Not independently verified"),
      "This check does not compare or certify run suitability.",
      "",
      "SOURCES AND DATES",
      product.source?"Seller specification snapshot originally reviewed: "+SPEC_SNAPSHOT_DATE+". Not remeasured or reverified by this calculation.":"Measurement review date: unknown. User-supplied inputs have not been independently checked.",
      "Seller source: "+(product.source||"Not supplied — attach the exact model's current technical drawing or written reply."),
      "Indoor reference: "+SOURCE,
      "Check tool: "+PAGE_URL,
      "",
      "ASSUMPTIONS AND OPEN CHECKS",
      "Indoor and run areas are separate. Clear, usable floor is required; external dimensions, roof overhangs and inaccessible fixture footprints do not establish it.",
      product.note||"Confirm the input measurements with the seller.",
      "Standard adult hens are assumed. Breed, confinement, climate, ventilation, perches, cleaning access, predator protection and local rules need separate review. This is a planning comparison, not a permit, legal bird limit, construction specification or welfare guarantee.",
      referenceDifference(n,access),
      "",
      "QUESTIONS FOR THE SELLER",
      sellerQuestion(product,n,access)
    ].join("\n");
  }
  function mount(doc){
    const $=id=>doc.getElementById(id);
    if(!$("bcFlock")||!$("bcResults"))return;
    let selected="cabana";
    const flock=$("bcFlock"),access=$("bcOutdoor"),customName=$("bcCustomName"),
      customL=$("bcCustomLength"),customW=$("bcCustomWidth"),customUnit=$("bcUnit");
    const num=(value,d=1)=>Number(value).toFixed(d).replace(/\.0$/,"");
    function showFeedback(message){
      $("bcCopyStatus").textContent=message;
    }
    function setNextLinks(n,outdoor){
      const supported=validFlock(n)&&n>=2&&outdoor;
      for(const [id,href] of [["bcCalcLink","/guides/chicken-coop-size-calculator.html?flock="+n+"&source=buyer-checker"],["bcPlanLink","/coop-plan.html?flock="+n+"&source=size-guide"]]){
        const link=$(id);
        if(supported){link.href=href;link.removeAttribute("aria-disabled");}
        else {link.removeAttribute("href");link.setAttribute("aria-disabled","true");}
      }
    }
    // Measure deliberate buyer actions, not every input keystroke.
    function trackBuyerAction(name,detail){
      if(typeof globalThis.coopTrack==="function")globalThis.coopTrack(name,Object.assign({tool:"prefab_buyer_checker"},detail||{}));
    }
    function choose(id){
      selected=id;
      $("bcCustomFields").hidden=id!=="custom";
      const buttons=doc.querySelectorAll("[data-bc-pick]");
      buttons.forEach(b=>{
        const picked=b.dataset.bcPick===id;
        b.setAttribute("aria-pressed",picked?"true":"false");
        b.classList.toggle("is-active",picked);
      });
      render();
    }
    function dataForSelection(){
      if(selected!=="custom")return PRODUCTS.find(x=>x.id===selected);
      const area=customL.value.trim()!==""&&customW.value.trim()!==""?
        calculateArea(customL.value,customW.value,customUnit.value):null;
      const runL=$("bcCustomRunLength"),runW=$("bcCustomRunWidth");
      const runArea=runL.value.trim()!==""&&runW.value.trim()!==""?
        calculateArea(runL.value,runW.value,customUnit.value):null;
      return {id:"custom",name:customName.value.trim().slice(0,70)||"Your listing",model:"Measurements supplied by you (unverified)",
        claim:"Seller's stated capacity: not entered",indoor:area,run:runArea,runIncluded:runArea===null?null:true,
        indoorEvidence:area===null?"Usable indoor length and width required":"Your dimensions: "+customL.value+" × "+customW.value+" "+customUnit.value+"; clear inside dimensions assumed",
        runEvidence:runArea===null?"Separate run area has not been verified":"Your entered run dimensions: "+runL.value+" × "+runW.value+" "+customUnit.value+"; not independently checked",nests:null,roostBars:null,source:null,sourceName:null,
        note:"Your measurements are not independently verified or stored. Subtract obstacles/fixtures and confirm all other housing conditions."};
    }
    function render(){
      const value=flock.value.trim(),n=Number(value);
      const r=$("bcResults"),bar=$("bcBar");
      // Never leave an old copyable record visible after any scenario edit.
      const copyFallback=$("bcCopyFallback");
      if(copyFallback){copyFallback.hidden=true;copyFallback.value="";}
      showFeedback("");
      if(!validFlock(n)||value===""){
        r.dataset.state="unknown";
        $("bcResultTitle").textContent="Check your flock number";
        $("bcResultText").textContent="Enter a whole number from 1 to 24 hens to see a comparison.";
        $("bcBarLabel").textContent="Waiting for valid flock size";
        bar.style.width="0%";
        $("bcBenchmark").textContent="—";
        $("bcAvailable").textContent="—";
        $("bcRun").textContent="—";
        $("bcScenario").textContent="A valid flock size is needed for this check.";
        $("bcReferenceDifference").textContent=referenceDifference(n,access.value==="yes");
        $("bcPrintRecord").textContent=comparisonText(null,n,access.value==="yes");
        $("bcPrint").disabled=true;$("bcCopyCheck").disabled=true;
        setNextLinks(n,false);
        return;
      }
      const item=dataForSelection(),calc=analyze(item,n,access.value==="yes"),ref=calc.reference;
      $("bcProductHeading").textContent=item.name;
      $("bcProductId").textContent=item.model;
      $("bcScenario").textContent="Your scenario: "+n+" adult hen"+(n===1?"":"s")+" · "+(access.value==="yes"?"Reliable daily outdoor/run access":"No regular outdoor/run access");
      $("bcBenchmark").textContent=num(ref.minimum)+" sq ft";
      $("bcAvailable").textContent=calc.indoor===null?"Unknown":num(calc.indoor,2)+" sq ft";
      $("bcRun").textContent=calc.run===null?"Not verified":(calc.run===0?"Not included":num(calc.run,2)+" sq ft");
      $("bcBarLabel").textContent=calc.indoor===null?"Insufficient interior measurements":num(Math.min(calc.ratio*100,100),0)+"% of this indoor reference";
      bar.style.width=calc.indoor===null?"0%":Math.min(calc.ratio*100,100)+"%";
      r.dataset.state=calc.status;
      const title=calc.status==="unknown"?"Not enough verified measurements":calc.status==="below"?"Below this indoor-area reference":"Indoor-area reference reached";
      $("bcResultTitle").textContent=title;
      let explanation=calc.status==="unknown"?
        "We cannot compare without a usable indoor-floor area. Ask for clear inner-house measurements; outside footprint and run area are not interchangeable.":
        calc.status==="below"?
        "The documented indoor floor ("+num(calc.indoor,2)+" sq ft) is "+num(Math.abs(calc.gap),2)+" sq ft below the "+num(ref.minimum)+" sq ft baseline for "+n+" hens in this scenario.":
        "The reported floor ("+num(calc.indoor,2)+" sq ft) reaches the "+num(ref.minimum)+" sq ft indoor-area baseline. This does NOT establish that this coop is suitable or safe for "+n+" hens.";
      $("bcResultText").textContent=explanation;
      $("bcAssumptions").textContent=ref.context+" This is one university-extension planning reference, not a legal limit, permit determination, guarantee or full welfare review. It assumes standard adult hens and does not verify actual clear floor, roost length, ventilation, predators, run suitability or neighborhood rules.";
      $("bcAreaEvidence").textContent=item.indoorEvidence;
      $("bcRunEvidence").textContent=item.runEvidence;
      $("bcFootnote").textContent=item.note;
      $("bcReferenceDifference").textContent=referenceDifference(n,access.value==="yes");
      $("bcPrintRecord").textContent=comparisonText(item,n,access.value==="yes");
      $("bcPrint").disabled=false;$("bcCopyCheck").disabled=false;
      const link=$("bcSellerSource");
      if(item.source){link.href=item.source;link.hidden=false;link.textContent="View original seller specs ↗";}
      else {link.removeAttribute("href");link.hidden=true;}
      setNextLinks(n,access.value==="yes");
    }
    doc.querySelectorAll("[data-bc-pick]").forEach(b=>b.addEventListener("click",()=>{
      choose(b.dataset.bcPick);
      trackBuyerAction("buyer_model_selected",{model_id:b.dataset.bcPick});
    }));
    [flock,access,customName,customL,customW,customUnit,$("bcCustomRunLength"),$("bcCustomRunWidth")].forEach(el=>el.addEventListener("input",render));
    access.addEventListener("change",render);
    async function copyText(msg,kind){
      try{
        if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");
        await navigator.clipboard.writeText(msg);
        const stale=$("bcCopyFallback");
        if(stale){stale.hidden=true;stale.value="";}
        showFeedback(kind==="check"?"Buyer check copied, including assumptions, source links and specification date.":"Seller question copied. No information was sent.");
        trackBuyerAction(kind==="check"?"buyer_comparison_copied":"buyer_seller_question_copied",{model_id:selected});
      }catch(e){
        const box=$("bcCopyFallback");
        box.hidden=false;box.value=msg;box.focus();box.select();
        showFeedback("Copy the selected text below.");
        trackBuyerAction(kind==="check"?"buyer_comparison_copy_fallback":"buyer_seller_question_fallback",{model_id:selected});
      }
    }
    $("bcCopyQuestion").addEventListener("click",()=>copyText(sellerQuestion(dataForSelection(),Number(flock.value),access.value==="yes"),"question"));
    $("bcCopyCheck").addEventListener("click",()=>{
      if(!validFlock(Number(flock.value)))return;
      return copyText(comparisonText(dataForSelection(),Number(flock.value),access.value==="yes"),"check");
    });
    $("bcPrint").addEventListener("click",()=>{if(validFlock(Number(flock.value))){trackBuyerAction("buyer_comparison_print",{model_id:selected});doc.defaultView?.print?.();}});
    for(const id of ["bcCalcLink","bcPlanLink"])$(id).addEventListener("click",e=>{
      if(!validFlock(Number(flock.value))||Number(flock.value)<2||access.value!=="yes")e.preventDefault();
    });
    const params=new URLSearchParams(doc.defaultView?.location?.search||"");
    const q=Number(params.get("hens"));
    if(validFlock(q))flock.value=String(q);
    choose("cabana");
  }
  return {PRODUCTS,SOURCE,SPEC_SNAPSHOT_DATE,benchmark,validFlock,calculateArea,analyze,sellerQuestion,referenceDifference,comparisonText,mount};
});
