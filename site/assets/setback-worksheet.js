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
        ? result.buffersOverlap?"Your example buffers exceed your lot dimensions, leaving no usable rectangle. This is not a legal setback check."
          : "Inside your example buffers: "+api.formatFeet(result.availableWidth)+" ft wide × "+api.formatFeet(result.availableDepth)+" ft deep. A "+api.formatFeet(values.coopWidth)+" × "+api.formatFeet(values.coopDepth)+" ft coop footprint "+(result.fits?"FITS":"DOES NOT FIT")+" this simple rectangle. This is geometry only—not an approval or city setback lookup."
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
    const rawWidth=v.lotWidth-v.left-v.right;
    const rawDepth=v.lotDepth-v.front-v.rear;
    const availableWidth=Math.max(0,rawWidth);
    const availableDepth=Math.max(0,rawDepth);
    const buffersOverlap=rawWidth<0||rawDepth<0;
    return {valid:true,availableWidth,availableDepth,buffersOverlap,fits:!buffersOverlap&&availableWidth>=v.coopWidth&&availableDepth>=v.coopDepth};
  }
  return {calculate,keys,formatFeet};
});
