/* Local-only coop and run sizing. Illustrative targets, never a permit or welfare guarantee. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.CoopSizeCalculator=api;
  if(!root||!root.document)return;
  function boot(){
    const form=root.document.getElementById("coopSizeForm");
    if(!form)return;
    const input=root.document.getElementById("flockCount");
    const slider=root.document.getElementById("flockSlider");
    const feedback=root.document.getElementById("calcFeedback");
    const link=root.document.getElementById("calcPlanLink");
    const results=root.document.getElementById("calcResults");
    const caption=root.document.getElementById("calcReadableResult");
    const indoorBar=root.document.getElementById("calcIndoorBar");
    const runBar=root.document.getElementById("calcRunBar");
    const indoorExample=root.document.getElementById("calcIndoorExample");
    const runExample=root.document.getElementById("calcRunExample");
    const outputs=[["calcIndoor","indoor"],["calcRun","run"],["calcNests","nests"],["calcRoost","roost"]];
    const presets=[...root.document.querySelectorAll("[data-flock-preset]")];
    const initial=new URLSearchParams(root.location.search).get("flock");
    if(initial&&api.calculate(Number(initial)))input.value=initial;
    let lastValid=null;
    function reportInteraction(flock){
      if(typeof root.coopTrack==="function")root.coopTrack("chicken_coop_size_check",{flock_group:flock<=6?"2-6":flock<=12?"7-12":"13-24"});
    }
    function render(track=false){
      const flock=Number(input.value),v=input.value.trim()?api.calculate(flock):null;
      input.setAttribute("aria-invalid",v?"false":"true");
      if(!v){
        feedback.textContent="Enter a whole number from 2 to 24 hens to see a usable estimate.";
        feedback.dataset.error="true";
        results.hidden=true;link.setAttribute("aria-disabled","true");
        caption.textContent="Please correct the flock size to update the planning diagram.";
        indoorBar.style.width="0%";runBar.style.width="0%";
        lastValid=null;return;
      }
      results.hidden=false;link.removeAttribute("aria-disabled");
      feedback.textContent="Planning example for adult hens with reliable daily outdoor run access — not a legal minimum.";
      feedback.dataset.error="false";
      slider.value=String(flock);
      for(const p of presets){
        const active=Number(p.dataset.flockPreset)===flock;
        p.setAttribute("aria-pressed",String(active));
      }
      const fmt={indoor:v.indoor+" sq ft",run:v.run+" sq ft",nests:String(v.nests),roost:v.roost+" ft"};
      for(const [id,key] of outputs)root.document.getElementById(id).textContent=fmt[key];
      const inside=api.exampleRectangle(v.indoor),outside=api.exampleRectangle(v.run);
      indoorExample.textContent=inside.width+" × "+inside.depth+" ft example";
      runExample.textContent=outside.width+" × "+outside.depth+" ft example";
      indoorBar.style.width=(v.indoor/v.run*100).toFixed(1)+"%";
      runBar.style.width="100%";
      caption.textContent="For "+flock+" hens: plan around "+v.indoor+" sq ft of usable indoor floor, PLUS a separate "+v.run+" sq ft outdoor run. These are not interchangeable.";
      link.href="/coop-plan.html?flock="+flock+"&source=size-calculator";
      lastValid=v;
      if(track)reportInteraction(flock);
    }
    input.addEventListener("input",()=>render());
    slider.addEventListener("input",()=>{input.value=slider.value;render();});
    slider.addEventListener("change",()=>{if(lastValid)reportInteraction(lastValid.flock);});
    for(const button of presets)button.addEventListener("click",()=>{
      input.value=button.dataset.flockPreset;render(true);
    });
    form.addEventListener("submit",e=>{
      e.preventDefault();render(true);
      if(!lastValid)input.focus();
    });
    link.addEventListener("click",e=>{if(!lastValid)e.preventDefault();});
    render();
  }
  if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",boot);
  else boot();
})(typeof window!=="undefined"?window:null,function(){
  function calculate(flock){
    if(!Number.isSafeInteger(flock)||flock<2||flock>24)return null;
    return {flock,indoor:flock*4,run:flock*10,nests:Math.ceil(flock/4),roost:Number((flock*.75).toFixed(2))};
  }
  // Rounded-up illustrative rectangles, not build specifications or a single mandated footprint.
  function exampleRectangle(area){
    if(!Number.isFinite(area)||area<=0)return null;
    const width=Math.ceil(Math.sqrt(area*2/3));
    return {width,depth:Math.ceil(area/width)};
  }
  return {calculate,exampleRectangle};
});
