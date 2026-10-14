(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(!root||!root.document)return;
  root.CoopSetbackWorksheet=api;
  const init=()=>{
    const form=root.document.getElementById("setbackWorksheet");
    const output=root.document.getElementById("setbackWorksheetResult");
    if(!form||!output)return;
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const values={};
      for(const key of api.keys){values[key]=Number(form.elements.namedItem(key)?.value);}
      const result=api.calculate(values);
      output.dataset.fit=result.valid?String(result.fits):"invalid";
      output.textContent=result.valid
        ? "Inside your example buffers: "+api.formatFeet(result.availableWidth)+" ft wide × "+api.formatFeet(result.availableDepth)+" ft deep. A "+api.formatFeet(values.coopWidth)+" × "+api.formatFeet(values.coopDepth)+" ft coop footprint "+(result.fits?"FITS":"DOES NOT FIT")+" this simple rectangle. This is geometry only—not an approval or city setback lookup."
        : "Enter positive lot/coop dimensions and non-negative distances in feet.";
      if(result.valid&&typeof root.coopTrack==="function")root.coopTrack("setback_worksheet_check",{fits:result.fits?1:0,calculator:"manual_example"});
    });
  };
  if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",init);
  else init();
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const keys=["lotWidth","lotDepth","coopWidth","coopDepth","left","right","front","rear"];
  const formatFeet=n=>Number(n.toFixed(2)).toString();
  function calculate(v){
    if(!v||keys.some(k=>typeof v[k]!=="number"||!Number.isFinite(v[k])))return {valid:false};
    if(["lotWidth","lotDepth","coopWidth","coopDepth"].some(k=>v[k]<=0)||["left","right","front","rear"].some(k=>v[k]<0))return {valid:false};
    const availableWidth=v.lotWidth-v.left-v.right;
    const availableDepth=v.lotDepth-v.front-v.rear;
    return {valid:true,availableWidth,availableDepth,fits:availableWidth>=v.coopWidth&&availableDepth>=v.coopDepth};
  }
  return {calculate,keys,formatFeet};
});
