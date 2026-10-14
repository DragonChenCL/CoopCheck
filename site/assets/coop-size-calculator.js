/* Live, local-only chicken coop floor/run calculator. Not municipal zoning rules. */
(function(root,factory){
 const api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.CoopSizeCalculator=api;
 if(!root||!root.document)return;
 function boot(){
  const form=root.document.getElementById("coopSizeForm");
  if(!form)return;
  const input=root.document.getElementById("flockCount");
  const feedback=root.document.getElementById("calcFeedback");
  const outputs=[["calcIndoor","indoor"],["calcRun","run"],["calcNests","nests"],["calcRoost","roost"]];
  const link=root.document.getElementById("calcPlanLink");
  function render(event){
    if(event)event.preventDefault();
    const flock=Number(input.value),v=api.calculate(flock);
    if(!v){
      feedback.textContent="Enter a whole number from 2 to 24 adult hens.";
      feedback.dataset.error="true";
      return;
    }
    feedback.textContent="Illustrative planning targets, not a legal maximum or engineered design.";
    feedback.dataset.error="false";
    const fmt={indoor:v.indoor+" sq ft",run:v.run+" sq ft",nests:String(v.nests),roost:v.roost+" ft"};
    for(const [id,key] of outputs)root.document.getElementById(id).textContent=fmt[key];
    link.href="/coop-plan.html?flock="+flock+"&source=size-calculator";
    if(event&&typeof root.coopTrack==="function")root.coopTrack("chicken_coop_size_check",{flock_group:flock<=6?"2-6":flock<=12?"7-12":"13-24"});
  }
  form.addEventListener("submit",render);
  render();
 }
 if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",boot);
 else boot();
})(typeof window!=="undefined"?window:null,function(){
 function calculate(flock){
  if(!Number.isSafeInteger(flock)||flock<2||flock>24)return null;
  return {flock,indoor:flock*4,run:flock*10,nests:Math.ceil(flock/4),roost:Number((flock*0.75).toFixed(2))};
 }
 return {calculate};
});