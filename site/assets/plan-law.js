/* Source-scoped city context for the concept-plan generator. No legal approvals. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.CoopPlanLaw=api;
})(typeof window!=="undefined"?window:null,function(){
  "use strict";
  const DEFAULTS={"portland-or":4,"arlington-tx":4,"denver-co":8,"seattle-wa":8,"chandler-az":6};
  function field(row,name){
    const f=row?.fields?.[name];
    return f?.verified===true&&typeof f.text==="string"&&f.text.trim()?f:null;
  }
  function resolve(data,slug){
    if(!data||!Object.prototype.hasOwnProperty.call(data,slug)||typeof slug!=="string")return null;
    const c=data[slug];if(!c||typeof c.name!=="string"||typeof c.state!=="string")return null;
    return c;
  }
  function suggestedFlock(row){
    if(!row||row.status==="needs_review")return null;
    return Object.prototype.hasOwnProperty.call(DEFAULTS,row.slug)&&field(row,"max")?DEFAULTS[row.slug]:null;
  }
  function review(data,slug,flock,lot,rooster,quick){
    const city=resolve(data,slug);
    if(!city)return null;
    const pending=city.status==="needs_review";
    const facts={};
    for(const k of ["max","roosters","permit","placement"])facts[k]=pending?null:field(city,k);
    const sourceUrl=(url)=>typeof url==="string"&&/^https:\/\//.test(url)?url:null;
    const result={
      city:city.name+", "+city.state,slug:city.slug,pending,status:city.status,
      facts,source:sourceUrl(facts.max?.url||city.url),suggested:suggestedFlock(city),
      kind:"review",title:"Municipal requirements still need property-specific review.",
      detail:"This page shows only source-checked city-level claims. It does not verify your address, permits, zoning, setback geometry, private rules or whether the generated plan can be built.",
      notes:[]
    };
    if(pending){
      result.title="City-law research is still pending.";
      result.detail="We do not have a verified city-specific flock limit or placement permission for this municipality. This tool only draws a geometry concept.";
      return result;
    }
    if(!facts.max)result.notes.push("Flock allowance is not independently confirmed in the available current municipal evidence.");
    if(!facts.placement)result.notes.push("Coop placement/setbacks have not been independently confirmed by a current clause.");
    if(typeof flock==="number"&&Number.isSafeInteger(flock)&&flock>=1&&flock<=100000
      &&quick&&quick.cities&&Object.prototype.hasOwnProperty.call(quick.cities,slug)
      &&typeof quick.evaluate==="function"){
      const screening=quick.evaluate({slug,hens:flock,lotSqFt:lot??"",rooster:!!rooster});
      if(screening.kind==="over")result.kind="warning";
      else if(screening.kind==="within")result.kind="within";
      else result.kind="review";
      result.title=screening.title;
      result.detail=screening.details;
      result.notes.push("Preliminary city screening only; figures can depend on total fowl, lot area, agricultural use, building distance, zoning or permit conditions.");
    }else{
      result.notes.push("Automated hen-count screening is not available for this city. Read the cited source and confirm the current rule with the municipality.");
    }
    return result;
  }
  return {resolve,review,suggestedFlock,field};
});
