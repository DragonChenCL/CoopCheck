(function(){
  const TOKEN=window.COOPCHECK_MAPBOX_TOKEN||"";
  const $=id=>document.getElementById(id);
  if(!$("map")) return;
  if(!TOKEN){
    $("map").innerHTML='<div class="map-missing"><strong>Mapbox token is not configured.</strong><br>Add the MAPBOX_TOKEN GitHub Actions secret, then redeploy.</div>';
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

  const drawRoleColor=[
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
      {id:"cc-fill-inactive",type:"fill",filter:["all",["==","active","false"],["==","$type","Polygon"]],paint:{"fill-color":drawRoleColor,"fill-opacity":0.18}},
      {id:"cc-fill-active",type:"fill",filter:["all",["==","active","true"],["==","$type","Polygon"]],paint:{"fill-color":drawRoleColor,"fill-opacity":0.23}},
      {id:"cc-line-inactive",type:"line",filter:["all",["==","active","false"],["==","$type","Polygon"]],paint:{"line-color":drawRoleColor,"line-width":2.5}},
      {id:"cc-line-active",type:"line",filter:["all",["==","active","true"],["==","$type","Polygon"]],paint:{"line-color":drawRoleColor,"line-width":3}},
      {id:"cc-vertex-halo",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"]],paint:{"circle-radius":6,"circle-color":"#fff"}},
      {id:"cc-vertex",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"]],paint:{"circle-radius":4,"circle-color":"#1f2937"}}
    ]
  });
  map.addControl(draw,"top-right");

  let pendingRole="property";
  let marker=null;
  let drawing=false;
  let draftCoords=[];

  function city(){
    const list=window.COOP_CITIES||[];
    return list.find(c=>c.slug===$("city").value)||list[0];
  }
  function num(id){return Math.max(0,Number($(id)?.value)||0)}
  function roleLabel(role){
    return role==="property"?"Property":role==="house"?"House":"Coop";
  }
  function setMapStatus(msg,type){
    const el=$("mapStatus");
    if(!el)return;
    el.textContent=msg;
    el.className="map-status "+(type||"");
  }
  function featureFor(role){
    return draw.getAll().features.find(f=>f.properties&&f.properties.role===role);
  }
  function removeOldRole(role){
    draw.getAll().features.forEach(f=>{
      if(f.properties&&f.properties.role===role) draw.delete(f.id);
    });
  }
  function updateButtons(){
    const property=featureFor("property");
    const house=featureFor("house");
    if($("drawHouse")) $("drawHouse").disabled=!property||drawing;
    if($("drawCoop")) $("drawCoop").disabled=!house||drawing;
    if($("drawProperty")) $("drawProperty").disabled=drawing;
  }
  function setDrawingUI(active,role){
    drawing=active;
    const finish=$("finishShape");
    if(finish){
      finish.hidden=!active;
      finish.disabled=active&&draftCoords.length<3;
      finish.textContent=active
        ? (draftCoords.length<3
          ? "✓ Finish shape ("+draftCoords.length+"/3 points)"
          : "✓ Finish shape")
        : "✓ Finish shape";
    }
    ["drawProperty","drawHouse","drawCoop"].forEach(id=>{
      const el=$(id);
      if(el)el.classList.remove("drawing-active");
    });
    if(active){
      const id=role==="property"?"drawProperty":role==="house"?"drawHouse":"drawCoop";
      $(id)?.classList.add("drawing-active");
      map.getCanvas().style.cursor="crosshair";
      map.doubleClickZoom.disable();
    }else{
      map.getCanvas().style.cursor="";
      map.doubleClickZoom.enable();
    }
    updateButtons();
  }

  function emptyFeatureCollection(){
    return {type:"FeatureCollection",features:[]};
  }

  function updateDraft(){
    const source=map.getSource("draft-shape");
    if(!source)return;

    if(!drawing||draftCoords.length===0){
      source.setData(emptyFeatureCollection());
      setDrawingUI(drawing,pendingRole);
      return;
    }

    const features=[];
    const props={role:pendingRole};

    if(draftCoords.length>=2){
      features.push({
        type:"Feature",
        properties:props,
        geometry:{type:"LineString",coordinates:draftCoords}
      });
    }
    draftCoords.forEach((coord,i)=>{
      features.push({
        type:"Feature",
        properties:{role:pendingRole,index:i+1},
        geometry:{type:"Point",coordinates:coord}
      });
    });
    if(draftCoords.length>=3){
      const closed=[...draftCoords,draftCoords[0]];
      features.unshift({
        type:"Feature",
        properties:props,
        geometry:{type:"Polygon",coordinates:[closed]}
      });
    }
    source.setData({type:"FeatureCollection",features});
    setDrawingUI(true,pendingRole);
  }

  function cancelDraft(message){
    draftCoords=[];
    setDrawingUI(false,pendingRole);
    updateDraft();
    if(message)setMapStatus(message,"");
  }

  function startDraw(role){
    if(drawing)return;

    if(role==="house"&&!featureFor("property")){
      setMapStatus("Finish the property boundary first.","bad");
      return;
    }
    if(role==="coop"&&!featureFor("house")){
      setMapStatus("Finish the house first.","bad");
      return;
    }

    pendingRole=role;
    draftCoords=[];
    setDrawingUI(true,role);
    updateDraft();

    const label=role==="property"?"property boundary":role;
    setMapStatus("Drawing "+label+": click each corner on the map. Add at least 3 points, then press Finish shape.","drawing");
  }

  function finishCurrentShape(){
    if(!drawing)return;
    if(draftCoords.length<3){
      setMapStatus("Add at least 3 corner points before finishing this shape.","bad");
      return;
    }

    const role=pendingRole;
    const closed=[...draftCoords,draftCoords[0]];

    removeOldRole(role);

    const ids=draw.add({
      type:"Feature",
      properties:{role},
      geometry:{
        type:"Polygon",
        coordinates:[closed]
      }
    });

    const id=ids&&ids[0];
    if(id)draw.setFeatureProperty(id,"role",role);

    draftCoords=[];
    setDrawingUI(false,role);
    updateDraft();

    // Exit vertex-edit mode so a finished shape looks obviously finished.
    draw.changeMode("simple_select");

    updateSafeZone();
    updateDrawSummary();
    updateButtons();

    const next=role==="property"
      ?"Next: Draw house is now enabled."
      : role==="house"
        ?"Next: Draw coop is now enabled."
        :"All three shapes are complete.";

    setMapStatus(roleLabel(role)+" saved. "+next,"good");
  }

  function onMapClick(e){
    if(!drawing)return;
    draftCoords.push([e.lngLat.lng,e.lngLat.lat]);
    updateDraft();
    if(draftCoords.length<3){
      setMapStatus(
        roleLabel(pendingRole)+" point "+draftCoords.length+" added. Add "+(3-draftCoords.length)+" more minimum.",
        "drawing"
      );
    }else{
      setMapStatus(
        roleLabel(pendingRole)+" has "+draftCoords.length+" points. Add more corners or press Finish shape.",
        "drawing"
      );
    }
  }

  $("drawProperty")?.addEventListener("click",()=>startDraw("property"));
  $("drawHouse")?.addEventListener("click",()=>startDraw("house"));
  $("drawCoop")?.addEventListener("click",()=>startDraw("coop"));
  $("finishShape")?.addEventListener("click",finishCurrentShape);

  $("clearMap")?.addEventListener("click",()=>{
    cancelDraft();
    draw.deleteAll();
    if(map.getSource("safe-zone"))map.getSource("safe-zone").setData(emptyFeatureCollection());
    updateDrawSummary();
    updateButtons();
    setMapStatus("Map cleared. Search an address or draw a new property.","");
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"&&drawing){
      cancelDraft("Current drawing cancelled.");
    }
    if(e.key==="Enter"&&drawing){
      e.preventDefault();
      finishCurrentShape();
    }
  });

  map.on("load",()=>{
    map.addSource("safe-zone",{type:"geojson",data:emptyFeatureCollection()});
    map.addLayer({
      id:"safe-zone-fill",
      type:"fill",
      source:"safe-zone",
      paint:{"fill-color":"#16a34a","fill-opacity":0.22}
    });
    map.addLayer({
      id:"safe-zone-line",
      type:"line",
      source:"safe-zone",
      paint:{"line-color":"#15803d","line-width":2,"line-dasharray":[2,2]}
    });

    map.addSource("draft-shape",{type:"geojson",data:emptyFeatureCollection()});
    const draftRoleColor=[
      "match",["get","role"],
      "property","#2563eb",
      "house","#64748b",
      "coop","#d97706",
      "#7c3aed"
    ];
    map.addLayer({
      id:"draft-fill",
      type:"fill",
      source:"draft-shape",
      filter:["==",["geometry-type"],"Polygon"],
      paint:{"fill-color":draftRoleColor,"fill-opacity":0.18}
    });
    map.addLayer({
      id:"draft-line",
      type:"line",
      source:"draft-shape",
      filter:["==",["geometry-type"],"LineString"],
      paint:{"line-color":draftRoleColor,"line-width":3,"line-dasharray":[2,1]}
    });
    map.addLayer({
      id:"draft-points",
      type:"circle",
      source:"draft-shape",
      filter:["==",["geometry-type"],"Point"],
      paint:{
        "circle-radius":6,
        "circle-color":"#ffffff",
        "circle-stroke-color":draftRoleColor,
        "circle-stroke-width":3
      }
    });

    map.on("click",onMapClick);

    updateButtons();
    setMapStatus("Step 1: search your address. Then click Draw property.","");
  });

  map.on("draw.update",()=>{
    updateSafeZone();
    updateDrawSummary();
  });
  map.on("draw.delete",()=>{
    updateSafeZone();
    updateDrawSummary();
    updateButtons();
  });

  function updateSafeZone(){
    if(!map.getSource("safe-zone"))return;

    const c=city();
    const property=featureFor("property");

    if(!property||!c||c.planner.mode!=="property"){
      map.getSource("safe-zone").setData(emptyFeatureCollection());
      return;
    }

    const setback=Math.max(
      num("sideSetback"),
      num("rearSetback"),
      num("frontSetback")
    );

    if(!setback){
      map.getSource("safe-zone").setData(property);
      return;
    }

    try{
      const safe=turf.buffer(property,-setback,{units:"feet"});
      map.getSource("safe-zone").setData(safe||emptyFeatureCollection());
    }catch(err){
      map.getSource("safe-zone").setData(emptyFeatureCollection());
    }
  }

  function updateDrawSummary(){
    const property=featureFor("property");
    const house=featureFor("house");
    const coop=featureFor("coop");

    const area=property?turf.area(property)*10.7639104167:0;

    if($("mapArea"))$("mapArea").textContent=
      area?Math.round(area).toLocaleString()+" sq ft":"—";
    if($("mapHouse"))$("mapHouse").textContent=
      house?"Drawn":"Not drawn";
    if($("mapCoop"))$("mapCoop").textContent=
      coop?"Drawn":"Not drawn";

    const c=city();
    if($("mapRuleMode")){
      $("mapRuleMode").textContent=
        c?.planner.mode==="property"
          ?"Conservative boundary zone shown"
          : c?.planner.mode==="advisory"
            ?"Extra neighbor/parcel checks required"
            :"Manual rule review required";
    }
  }

  ["sideSetback","rearSetback","frontSetback"].forEach(id=>{
    $(id)?.addEventListener("input",updateSafeZone);
  });
  $("city")?.addEventListener("change",()=>{
    updateSafeZone();
    updateDrawSummary();
  });

  async function geocode(){
    const input=$("addressSearch");
    const q=(input?.value||"").trim();
    if(!q)return;

    const btn=$("findAddress");
    btn.disabled=true;
    btn.textContent="Finding…";
    setMapStatus("Searching Mapbox for that address…","drawing");

    try{
      const url=
        "https://api.mapbox.com/search/geocode/v6/forward?q="+
        encodeURIComponent(q)+
        "&country=US&limit=1&access_token="+
        encodeURIComponent(TOKEN);

      const res=await fetch(url);
      if(!res.ok)throw new Error("Mapbox search failed");

      const data=await res.json();
      const f=data.features&&data.features[0];
      if(!f)throw new Error("No address found");

      const coords=f.geometry.coordinates;
      map.flyTo({
        center:coords,
        zoom:19,
        pitch:0,
        bearing:0,
        essential:true
      });

      if(marker)marker.remove();
      marker=new mapboxgl.Marker({color:"#2f6b45"})
        .setLngLat(coords)
        .addTo(map);

      const props=f.properties||{};
      const label=props.full_address||props.name||q;
      $("resolvedAddress").textContent=label;

      const lower=label.toLowerCase();
      const matched=(window.COOP_CITIES||[]).find(c=>
        lower.includes(c.name.toLowerCase())
      );

      if(matched){
        $("city").value=matched.slug;
        $("city").dispatchEvent(new Event("change"));
        setMapStatus(
          "Address found. Matched "+matched.name+" rules. Click Draw property to outline the lot.",
          "good"
        );
      }else{
        setMapStatus(
          "Address found. This city is not in our verified rule set yet; use supported city rules only for testing.",
          ""
        );
      }
    }catch(err){
      setMapStatus(err.message||"Could not find that address.","bad");
    }finally{
      btn.disabled=false;
      btn.textContent="Find address";
    }
  }

  $("findAddress")?.addEventListener("click",geocode);
  $("addressSearch")?.addEventListener("keydown",e=>{
    if(e.key==="Enter"){
      e.preventDefault();
      geocode();
    }
  });
})();