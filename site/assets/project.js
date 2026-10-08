/* Local-first sketch persistence. Never stores payment credentials or external IDs. */
(function(root,factory){
  const api=factory(root);
  if(typeof module!=="undefined"&&module.exports)module.exports=factory(null);
  if(root)root.CoopProject=api;
})(typeof window!=="undefined"?window:null,function(root){
  const PREFIX="coopcheck:sketch:v1:";
  const ROLES=["property","house","coop"];
  function polygon(f){
    if(!f||f.type!=="Feature"||f.geometry?.type!=="Polygon")return null;
    const role=f.properties?.role;
    const ring=f.geometry.coordinates?.[0];
    if(!ROLES.includes(role)||!Array.isArray(ring)||ring.length<4||ring.length>101)return null;
    if(!ring.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>typeof n==="number"&&Number.isFinite(n))&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90))return null;
    if(ring[0][0]!==ring[ring.length-1][0]||ring[0][1]!==ring[ring.length-1][1])return null;
    return {type:"Feature",properties:{role},geometry:{type:"Polygon",coordinates:[ring]}};
  }
  function sanitize(data){
    if(!data||data.version!==1||!Array.isArray(data.features)||data.features.length>3)return null;
    const features=data.features.map(polygon);
    if(features.some(x=>!x)||new Set(features.map(x=>x.properties.role)).size!==features.length)return null;
    const c=String(data.city||"").slice(0,50);
    const center=Array.isArray(data.center)&&data.center.length===2&&data.center.every(x=>typeof x==="number"&&Number.isFinite(x))?data.center:null;
    const setbacks={};
    for(const k of ["side","front","rear"]){const v=Number(data.setbacks?.[k]);if(!Number.isFinite(v)||v<0||v>500)return null;setbacks[k]=v;}
    return{version:1,features,city:c,center,zoom:Number.isFinite(data.zoom)?Math.min(22,Math.max(0,data.zoom)):null,setbacks,address:String(data.address||"").slice(0,200),addressMatched:!!data.addressMatched,addressCity:String(data.addressCity||"").slice(0,50),updatedAt:String(data.updatedAt||"").slice(0,40)};
  }
  function key(projectId){return PREFIX+String(projectId||"").slice(0,90)}
  function save(storage,projectId,data){
    const clean=sanitize(data);if(!clean||!storage||!projectId)return false;
    try{storage.setItem(key(projectId),JSON.stringify(clean));return true;}catch(e){return false;}
  }
  function load(storage,projectId){
    try{const raw=storage?.getItem(key(projectId));if(!raw)return null;return sanitize(JSON.parse(raw));}catch(e){return null;}
  }
  function clear(storage,projectId){try{storage?.removeItem(key(projectId));return true;}catch(e){return false;}}
  function serialize(data){const clean=sanitize(data);return clean?JSON.stringify(clean,null,2):null;}
  function parse(text){if(!text||text.length>250000)return null;try{return sanitize(JSON.parse(text));}catch(e){return null;}}
  return{sanitize,save,load,clear,serialize,parse};
});
