(function(){
  const TOKEN=window.COOPCHECK_MAPBOX_TOKEN||"";
  const $=id=>document.getElementById(id);
  if(!$("map")) return;
  if(!TOKEN){
    const el=$("map");
    el.innerHTML='<div class="map-missing"><strong>Mapbox token is not configured.</strong><br>Add the MAPBOX_TOKEN GitHub Actions secret, then redeploy.</div>';
    return;
  }
  if(!window.mapboxgl||!window.MapboxDraw||!window.turf) return;

  mapboxgl.accessToken=TOKEN;
  const map=new mapboxgl.Map({
    container:"map",
    style:"mapbox://styles/mapbox/standard-satellite",
    center:[-98.5795,39.8283],
    zoom:3.2,
    attributionControl:true
  });
  map.addControl(new mapboxgl.NavigationControl({visualizePitch:true}),"top-right");

  const roleColor=[
    "match",["get","user_role"],
    "property","#2563eb",
    "house","#64748b",
    "coop","#d97706",
    "#7c3aed"
  ];
  const draw=new MapboxDraw({
    displayControlsDefault:false,
    userProperties:true,
    controls:{trash:true},
    styles:[
      {id:"cc-fill-inactive",type:"fill",filter:["all",["==","active","false"],["==","$type","Polygon"]],paint:{"fill-color":roleColor,"fill-opacity":0.18}},
      {id:"cc-fill-active",type:"fill",filter:["all",["==","active","true"],["==","$type","Polygon"]],paint:{"fill-color":roleColor,"fill-opacity":0.23}},
      {id:"cc-line-inactive",type:"line",filter:["all",["==","active","false"],["==","$type","Polygon"]],paint:{"line-color":roleColor,"line-width":2.5}},
      {id:"cc-line-active",type:"line",filter:["all",["==","active","true"],["==","$type","Polygon"]],paint:{"line-color":roleColor,"line-width":3}},
      {id:"cc-vertex-halo",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"]],paint:{"circle-radius":6,"circle-color":"#fff"}},
      {id:"cc-vertex",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"]],paint:{"circle-radius":4,"circle-color":"#1f2937"}}
    ]
  });
  map.addControl(draw,"top-right");

  let pendingRole="property";
  let marker=null;
  let drawing=false;
  let createdSeq=0;

  function city(){
    const list=window.COOP_CITIES||[];
    return list.find(c=>c.slug===$("city").value)||list[0];
  }
  function num(id){return Math.max(0,Number($(id)?.value)||0)}
  function setMapStatus(msg,type){
    const el=$("mapStatus");
    if(!el)return;
    el.textContent=msg;
    el.className="map-status "+(type||"");
  }
  function featureFor(role){
    return draw.getAll().features.find(f=>f.properties&&f.properties.role===role);
  }
  function removeOldRole(role,keepId){
    draw.getAll().features.forEach(f=>{
      if(f.id!==keepId&&f.properties&&f.properties.role===role) draw.delete(f.id);
    });
  }
  function updateButtons(){
    const property=featureFor("property"),house=featureFor("house");
    if($("drawHouse")) $("drawHouse").disabled=!property;
    if($("drawCoop")) $("drawCoop").disabled=!house;
  }
  function setDrawingUI(active,role){
    drawing=active;
    const finish=$("finishShape");
    if(finish) finish.hidden=!active;
    ["drawProperty","drawHouse","drawCoop"].forEach(id=>{
      const el=$(id);
      if(el) el.classList.remove("drawing-active");
    });
    if(active){
      const id=role==="property"?"drawProperty":role==="house"?"drawHouse":"drawCoop";
      $(id)?.classList.add("drawing-active");
    }
  }
  function startDraw(role){
    if(role==="house"&&!featureFor("property")){
      setMapStatus("Draw and finish the property boundary first.","bad");
      return;
    }
    if(role==="coop"&&!featureFor("house")){
      setMapStatus("Draw and finish the house first.","bad");
      return;
    }
    pendingRole=role;
    const label=role==="property"?"property boundary":role;
    setDrawingUI(true,role);
    setMapStatus("Drawing "+label+": click every corner, then press Finish shape.","drawing");
    draw.changeMode("draw_polygon");
  }
  function finishCurrentShape(){
    if(!drawing)return;
    const seq=createdSeq;
    draw.changeMode("simple_select");
    setDrawingUI(false,pendingRole);
    setTimeout(()=>{
      if(createdSeq===seq){
        setMapStatus("That shape was not saved. Add at least 3 points before pressing Finish shape.","bad");
      }
    },80);
  }

  $("drawProperty")?.addEventListener("click",()=>startDraw("property"));
  $("drawHouse")?.addEventListener("click",()=>startDraw("house"));
  $("drawCoop")?.addEventListener("click",()=>startDraw("coop"));
  $("finishShape")?.addEventListener("click",finishCurrentShape);
  $("clearMap")?.addEventListener("click",()=>{
    if(drawing) draw.changeMode("simple_select");
    setDrawingUI(false,pendingRole);
    draw.deleteAll();
    if(map.getSource("safe-zone")) map.getSource("safe-zone").setData({type:"FeatureCollection",features:[]});
    updateDrawSummary();
    updateButtons();
    setMapStatus("Map cleared. Search an address or draw a new property.","");
  });

  map.on("load",()=>{
    map.addSource("safe-zone",{type:"geojson",data:{type:"FeatureCollection",features:[]}});
    map.addLayer({id:"safe-zone-fill",type:"fill",source:"safe-zone",paint:{"fill-color":"#16a34a","fill-opacity":0.22}});
    map.addLayer({id:"safe-zone-line",type:"line",source:"safe-zone",paint:{"line-color":"#15803d","line-width":2,"line-dasharray":[2,2]}});
    updateButtons();
    setMapStatus("Step 1: search your address. Then click Draw property.","");
  });

  map.on("draw.create",e=>{
    createdSeq++;
    const f=e.features[0];
    draw.setFeatureProperty(f.id,"role",pendingRole);
    removeOldRole(pendingRole,f.id);
    setDrawingUI(false,pendingRole);
    draw.changeMode("simple_select",{featureIds:[f.id]});
    updateSafeZone();
    updateDrawSummary();
    updateButtons();
    const next=pendingRole==="property"?"Next: draw the house.":pendingRole==="house"?"Next: draw the coop.":"All three shapes are ready.";
    setMapStatus((pendingRole==="property"?"Property":pendingRole==="house"?"House":"Coop")+" saved. "+next,"good");
  });
  map.on("draw.update",()=>{updateSafeZone();updateDrawSummary()});
  map.on("draw.delete",()=>{updateSafeZone();updateDrawSummary();updateButtons()});

  function updateSafeZone(){
    if(!map.getSource("safe-zone")) return;
    const c=city();
    const property=featureFor("property");
    if(!property||!c||c.planner.mode!=="property"){
      map.getSource("safe-zone").setData({type:"FeatureCollection",features:[]});
      return;
    }
    const setback=Math.max(num("sideSetback"),num("rearSetback"),num("frontSetback"));
    if(!setback){
      map.getSource("safe-zone").setData(property);
      return;
    }
    try{
      const safe=turf.buffer(property,-setback,{units:"feet"});
      map.getSource("safe-zone").setData(safe||{type:"FeatureCollection",features:[]});
    }catch(err){
      map.getSource("safe-zone").setData({type:"FeatureCollection",features:[]});
    }
  }

  function updateDrawSummary(){
    const p=featureFor("property"),h=featureFor("house"),coop=featureFor("coop");
    const area=p?turf.area(p)*10.7639104167:0;
    if($("mapArea")) $("mapArea").textContent=area?Math.round(area).toLocaleString()+" sq ft":"—";
    if($("mapHouse")) $("mapHouse").textContent=h?"Drawn":"Not drawn";
    if($("mapCoop")) $("mapCoop").textContent=coop?"Drawn":"Not drawn";
    const c=city();
    if($("mapRuleMode")) $("mapRuleMode").textContent=c?.planner.mode==="property"?"Conservative boundary zone shown":c?.planner.mode==="advisory"?"Extra neighbor/parcel checks required":"Manual rule review required";
  }

  ["sideSetback","rearSetback","frontSetback"].forEach(id=>$(id)?.addEventListener("input",updateSafeZone));
  $("city")?.addEventListener("change",()=>{updateSafeZone();updateDrawSummary()});

  async function geocode(){
    const input=$("addressSearch");
    const q=(input?.value||"").trim();
    if(!q)return;
    const btn=$("findAddress");
    btn.disabled=true;btn.textContent="Finding…";
    setMapStatus("Searching Mapbox for that address…","drawing");
    try{
      const url="https://api.mapbox.com/search/geocode/v6/forward?q="+encodeURIComponent(q)+"&country=US&limit=1&access_token="+encodeURIComponent(TOKEN);
      const res=await fetch(url);
      if(!res.ok)throw new Error("Mapbox search failed");
      const data=await res.json();
      const f=data.features&&data.features[0];
      if(!f)throw new Error("No address found");
      const coords=f.geometry.coordinates;
      map.flyTo({center:coords,zoom:19,pitch:0,bearing:0,essential:true});
      if(marker)marker.remove();
      marker=new mapboxgl.Marker({color:"#2f6b45"}).setLngLat(coords).addTo(map);
      const props=f.properties||{};
      const label=props.full_address||props.name||q;
      $("resolvedAddress").textContent=label;
      const lower=label.toLowerCase();
      const matched=(window.COOP_CITIES||[]).find(c=>lower.includes(c.name.toLowerCase()));
      if(matched){
        $("city").value=matched.slug;
        $("city").dispatchEvent(new Event("change"));
        setMapStatus("Address found. Matched "+matched.name+" rules. Now draw the property boundary.","good");
      }else{
        setMapStatus("Address found. This city is not in our verified rule set yet; use supported city rules only for testing.","");
      }
    }catch(err){
      setMapStatus(err.message||"Could not find that address.","bad");
    }finally{
      btn.disabled=false;btn.textContent="Find address";
    }
  }
  $("findAddress")?.addEventListener("click",geocode);
  $("addressSearch")?.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();geocode()}});
})();