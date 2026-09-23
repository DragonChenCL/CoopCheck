(function(){
  const TOKEN=window.COOPCHECK_MAPBOX_TOKEN||"";
  const $=id=>document.getElementById(id);
  if(!$("map"))return;

  if(!TOKEN){
    $("map").innerHTML='<div class="map-missing"><strong>Mapbox token is not configured.</strong><br>Add the MAPBOX_TOKEN GitHub Actions secret, then redeploy.</div>';
    return;
  }
  if(!window.mapboxgl||!window.MapboxDraw||!window.turf)return;

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
  let currentSafeZone=null;
  let lastTouchPointAt=0;
  let lastGeometryEventKey="";
  let lastGeometryAnalyticsState=null;

  function track(name,params){
    if(typeof window.coopTrack==="function"){
      window.coopTrack(name,params||{});
    }
  }

  function analyticsInputMethod(){
    return window.matchMedia&&window.matchMedia("(pointer: coarse)").matches?"touch":"pointer";
  }

  function trackGeometryState(name,params){
    const c=city();
    const key=name+"|"+(c?.slug||"");
    if(lastGeometryAnalyticsState===key)return;
    lastGeometryAnalyticsState=key;
    track(name,Object.assign({city_slug:c?.slug||""},params||{}));
  }

  function city(){
    const list=window.COOP_CITIES||[];
    return list.find(c=>c.slug===$("city").value)||list[0];
  }
  function num(id){return Math.max(0,Number($(id)?.value)||0)}
  function roleLabel(role){return role==="property"?"Property":role==="house"?"House":"Coop"}
  function emptyFeatureCollection(){return {type:"FeatureCollection",features:[]}}
  function areaSqFt(feature){return feature?Math.max(0,turf.area(feature)*10.7639104167):0}
  function fmtArea(v){return v?Math.round(v).toLocaleString()+" sq ft":"—"}
  function fmtFt(v){
    if(v===null||v===undefined||!Number.isFinite(v))return "—";
    return (Math.round(v*10)/10).toFixed(1)+" ft";
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
      if(f.properties&&f.properties.role===role)draw.delete(f.id);
    });
  }

  function updateButtons(){
    const property=featureFor("property");
    const house=featureFor("house");
    if($("drawHouse"))$("drawHouse").disabled=!property||drawing;
    if($("drawCoop"))$("drawCoop").disabled=!house||drawing;
    if($("drawProperty"))$("drawProperty").disabled=drawing;
  }

  function setDrawingUI(active,role){
    drawing=active;

    const finishButtons=[$("finishShape"),$("finishShapeMobile")].filter(Boolean);
    finishButtons.forEach(finish=>{
      finish.hidden=!active;
      finish.disabled=active&&draftCoords.length<3;
      finish.textContent=active
        ?(draftCoords.length<3?"Finish shape ("+draftCoords.length+"/3 points)":"Finish shape")
        :"Finish shape";
    });

    ["drawProperty","drawHouse","drawCoop"].forEach(id=>$(id)?.classList.remove("drawing-active"));

    const shell=document.querySelector(".map-shell");
    shell?.classList.toggle("drawing-mode",active);

    if(active){
      const id=role==="property"?"drawProperty":role==="house"?"drawHouse":"drawCoop";
      $(id)?.classList.add("drawing-active");
      map.getCanvas().style.cursor="crosshair";

      // In drawing mode, a finger tap must place a point instead of panning/zooming the map.
      map.dragPan.disable();
      map.touchZoomRotate.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.scrollZoom.disable();
      map.keyboard.disable();
    }else{
      map.getCanvas().style.cursor="";

      map.dragPan.enable();
      map.touchZoomRotate.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.scrollZoom.enable();
      map.keyboard.enable();
    }
    updateButtons();
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
      features.push({type:"Feature",properties:props,geometry:{type:"LineString",coordinates:draftCoords}});
    }
    draftCoords.forEach((coord,i)=>{
      features.push({type:"Feature",properties:{role:pendingRole,index:i+1},geometry:{type:"Point",coordinates:coord}});
    });
    if(draftCoords.length>=3){
      features.unshift({type:"Feature",properties:props,geometry:{type:"Polygon",coordinates:[[...draftCoords,draftCoords[0]]]}});
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
    track(role+"_draw_start",{
      city_slug:city()?.slug||"",
      input_method:analyticsInputMethod()
    });
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
      geometry:{type:"Polygon",coordinates:[closed]}
    });

    const id=ids&&ids[0];
    if(id)draw.setFeatureProperty(id,"role",role);

    const completedFeature=id?draw.get(id):featureFor(role);
    window.coopTrack?.(role+"_draw_complete",{
      city_slug:city()?.slug,
      point_count:Math.max(0,closed.length-1),
      area_sq_ft:Math.round(areaSqFt(completedFeature))
    });

    draftCoords=[];
    setDrawingUI(false,role);
    updateDraft();
    draw.changeMode("simple_select");
    if(role==="coop")lastGeometryAnalyticsState=null;
    refreshGeometry();

    track(role+"_draw_complete",{
      city_slug:city()?.slug||"",
      point_count:closed.length-1,
      area_sq_ft:Math.round(areaSqFt(featureFor(role)))
    });

    if(role==="coop"){
      track("geometry_check_complete",{
        city_slug:city()?.slug||"",
        coop_area_sq_ft:Math.round(areaSqFt(featureFor("coop")))
      });
    }

    const next=role==="property"
      ?"Next: Draw house is now enabled."
      :role==="house"
        ?"Next: Draw coop is now enabled."
        :"All three shapes are complete. Compliance results are shown below.";

    setMapStatus(roleLabel(role)+" saved. "+next,"good");
  }

  function addDraftPoint(lngLat){
    if(!drawing||!lngLat)return;

    draftCoords.push([lngLat.lng,lngLat.lat]);
    updateDraft();

    if(draftCoords.length<3){
      setMapStatus(roleLabel(pendingRole)+" point "+draftCoords.length+" added. Add "+(3-draftCoords.length)+" more minimum.","drawing");
    }else{
      setMapStatus(roleLabel(pendingRole)+" has "+draftCoords.length+" points. Add more corners or press Finish shape.","drawing");
    }
  }

  function onMapClick(e){
    if(!drawing)return;

    // Mobile browsers can emit a synthetic click after touchend.
    // Ignore it so one tap never creates two vertices.
    if(Date.now()-lastTouchPointAt<650)return;
    addDraftPoint(e.lngLat);
  }

  function onMapTouchEnd(e){
    if(!drawing)return;

    const original=e.originalEvent;
    if(original?.changedTouches&&original.changedTouches.length!==1)return;

    lastTouchPointAt=Date.now();
    if(typeof e.preventDefault==="function")e.preventDefault();
    addDraftPoint(e.lngLat);
  }

  function polygonRing(feature){
    return feature?.geometry?.type==="Polygon"?feature.geometry.coordinates[0]:[];
  }

  function minBoundaryDistanceFt(inner,outer){
    if(!inner||!outer)return null;
    try{
      const outerLine=turf.polygonToLine(outer);
      const innerLine=turf.polygonToLine(inner);
      let min=Infinity;

      polygonRing(inner).slice(0,-1).forEach(coord=>{
        min=Math.min(min,turf.pointToLineDistance(turf.point(coord),outerLine,{units:"feet"}));
      });
      polygonRing(outer).slice(0,-1).forEach(coord=>{
        min=Math.min(min,turf.pointToLineDistance(turf.point(coord),innerLine,{units:"feet"}));
      });

      return Number.isFinite(min)?min:null;
    }catch(e){
      return null;
    }
  }

  function polygonsDisjoint(a,b){
    if(!a||!b)return true;
    try{
      if(typeof turf.booleanDisjoint==="function")return turf.booleanDisjoint(a,b);
      return !turf.intersect(a,b);
    }catch(e){
      return false;
    }
  }

  function conservativeSetback(){
    return Math.max(num("sideSetback"),num("rearSetback"),num("frontSetback"));
  }

  function computeSafeZone(){
    const c=city();
    const property=featureFor("property");
    const house=featureFor("house");

    if(!property||!c||c.planner.mode!=="property")return null;

    try{
      const setback=conservativeSetback();
      let safe=setback>0?turf.buffer(property,-setback,{units:"feet"}):property;
      if(!safe)return null;

      if(house&&typeof turf.difference==="function"){
        try{
          const cut=turf.difference(safe,house);
          if(cut)safe=cut;
        }catch(e){}
      }
      return safe;
    }catch(e){
      return null;
    }
  }

  function renderSafeZone(){
    const source=map.getSource("safe-zone");
    if(!source)return;
    currentSafeZone=computeSafeZone();
    source.setData(currentSafeZone||emptyFeatureCollection());

    const houseSource=map.getSource("house-exclusion");
    if(houseSource){
      const house=featureFor("house");
      houseSource.setData(house||emptyFeatureCollection());
    }
  }

  function setGeometryWarning(lotArea,houseArea,coopArea,property,house,coop){
    const el=$("geometryWarning");
    if(!el)return;

    const warnings=[];
    if(lotArea>87120)warnings.push("The drawn property is larger than 2 acres, which is unusual for this backyard-planning workflow.");
    if(houseArea>15000)warnings.push("The drawn house footprint is unusually large; make sure you traced only the main building.");
    if(coopArea>500)warnings.push("The drawn coop is unusually large for a backyard chicken coop; check the outline.");
    if(lotArea>0&&coopArea/lotArea>0.15)warnings.push("The coop occupies more than 15% of the drawn property, which may indicate a drawing mistake.");

    if(property&&house){
      try{
        if(!turf.booleanWithin(house,property))warnings.push("Part of the house outline falls outside the property outline.");
      }catch(e){}
    }

    if(!warnings.length){
      el.hidden=true;
      el.innerHTML="";
      return;
    }

    el.hidden=false;
    el.innerHTML="<strong>⚠ Drawing sanity check</strong>"+warnings.map(w=>"<div>• "+w+"</div>").join("")+"<div class='small' style='margin-top:5px'>These are usability warnings, not legal rules.</div>";
  }

  function updateSupportAndVerification(c,p){
    const support=$("geometrySupport");
    if(support){
      if(p.mode==="property"){
        support.className="support-note pass";
        support.innerHTML="<span>✓</span><strong>Property-line setback check supported for "+c.name+".</strong>";
      }else{
        support.className="support-note warn";
        support.innerHTML="<span>!</span><strong>Property-line setback check is only partial for "+c.name+".</strong>";
      }
    }

    if($("verifyPermit")){
      $("verifyPermit").textContent="City note: "+c.permit+". Verify current requirements before building.";
    }

    const extra=$("verifyExtraRow");
    let extraCount=0;
    if(extra){
      extra.hidden=true;

      if(p.mode!=="property"){
        extra.hidden=false;
        extraCount=1;
        $("verifyExtraTitle").textContent="Neighbor / parcel-specific geometry";
        $("verifyExtraText").textContent=c.note||"Additional geometry data is needed for this city.";
      }else if(p.rearOnly){
        extra.hidden=false;
        extraCount=1;
        $("verifyExtraTitle").textContent="Rear-yard placement";
        $("verifyExtraText").textContent="The city requires rear-yard placement; CoopCheck does not yet identify the legal front/rear yard automatically.";
      }else if(p.rearHalf){
        extra.hidden=false;
        extraCount=1;
        $("verifyExtraTitle").textContent="Rear-half placement";
        $("verifyExtraText").textContent="The city requires placement in the rear half of the lot; verify lot orientation manually.";
      }
    }

    return 3+extraCount;
  }

  function setResultCounts(passCount,failCount,unavailableCount,manualCount,ready){
    const el=$("resultCounts");
    if(!el)return;

    if(!ready){
      el.textContent="0/3 geometry checks complete · "+manualCount+" items still need verification";
      return;
    }

    const parts=[passCount+"/3 geometry checks passed"];
    if(failCount)parts.push(failCount+" failed");
    if(unavailableCount)parts.push(unavailableCount+" not automated");
    parts.push(manualCount+" items still need verification");
    el.textContent=parts.join(" · ");
  }

  function setCheck(id,state,detail){
    const row=$(id);
    if(!row)return;
    row.className="check-row "+state;
    const icon=row.querySelector(".check-icon");
    const small=row.querySelector("small");
    if(icon)icon.textContent=state==="pass"?"✓":state==="fail"?"×":state==="warn"?"!":"•";
    if(small)small.textContent=detail;
  }

  function setHero(state,title,detail){
    const hero=$("complianceHero");
    if(!hero)return;
    hero.className="compliance-hero "+state;
    hero.innerHTML="<strong>"+title+"</strong><span>"+detail+"</span>";
  }

  function trackGeometryResult(type,params){
    const c=city();
    const key=type+"|"+(c?.slug||"")+"|"+JSON.stringify(params||{});
    if(key===lastGeometryEventKey)return;
    lastGeometryEventKey=key;
    window.coopTrack?.("geometry_check_"+type,Object.assign({
      city_slug:c?.slug
    },params||{}));
  }

  function updateDrawSummary(){
    const property=featureFor("property");
    const house=featureFor("house");
    const coop=featureFor("coop");

    if($("mapArea"))$("mapArea").textContent=fmtArea(areaSqFt(property));
    if($("mapHouse"))$("mapHouse").textContent=fmtArea(areaSqFt(house));
    if($("mapCoop"))$("mapCoop").textContent=fmtArea(areaSqFt(coop));

    setGeometryWarning(
      areaSqFt(property),
      areaSqFt(house),
      areaSqFt(coop),
      property,
      house,
      coop
    );

    const c=city(),p=c?.planner||{};
    if($("mapRuleMode")){
      $("mapRuleMode").textContent=
        p.mode!=="property"
          ?"Manual/advisory checks required"
          :p.rearOnly||p.rearHalf
            ?"Geometry + yard-position check"
            :"Conservative geometry check";
    }
  }

  function updateCompliance(){
    const property=featureFor("property");
    const house=featureFor("house");
    const coop=featureFor("coop");
    const c=city();
    const p=c?.planner||{};

    const lotArea=areaSqFt(property);
    const houseArea=areaSqFt(house);
    const coopArea=areaSqFt(coop);
    const required=conservativeSetback();
    const manualCount=updateSupportAndVerification(c,p);

    $("metricLotArea").textContent=fmtArea(lotArea);
    $("metricHouseArea").textContent=fmtArea(houseArea);
    $("metricCoopArea").textContent=fmtArea(coopArea);
    $("metricRequiredSetback").textContent=fmtFt(required);

    if(!property||!house||!coop){
      $("metricBoundaryDistance").textContent="—";
      $("metricMargin").textContent="—";
      setHero(
        "waiting",
        "Draw all three shapes to run the geometry check.",
        "Property, house and coop geometry are required."
      );
      setCheck("checkProperty","pending","Draw the property and coop first.");
      setCheck("checkHouse","pending","Draw the house and coop first.");
      setCheck("checkSetback","pending","Draw the property and coop first.");
      setResultCounts(0,0,0,manualCount,false);
      return;
    }

    let insideProperty=false;
    let noHouseOverlap=false;
    let insideSafe=false;
    let boundaryDistance=null;

    try{insideProperty=turf.booleanWithin(coop,property)}catch(e){}
    noHouseOverlap=polygonsDisjoint(coop,house);
    try{insideSafe=!!currentSafeZone&&turf.booleanWithin(coop,currentSafeZone)}catch(e){}
    boundaryDistance=minBoundaryDistanceFt(coop,property);

    const margin=boundaryDistance===null?null:boundaryDistance-required;

    $("metricBoundaryDistance").textContent=fmtFt(boundaryDistance);
    $("metricMargin").textContent=margin===null?"—":((margin>=0?"+":"")+fmtFt(margin));

    const propertyState=insideProperty?"pass":"fail";
    const houseState=noHouseOverlap?"pass":"fail";
    const canGeometry=p.mode==="property";
    const setbackState=canGeometry?(insideSafe?"pass":"fail"):"warn";

    setCheck(
      "checkProperty",
      propertyState,
      insideProperty
        ?"The entire coop polygon is inside the drawn property."
        :"Part of the coop is outside the drawn property."
    );

    setCheck(
      "checkHouse",
      houseState,
      noHouseOverlap
        ?"The coop does not overlap the drawn house footprint."
        :"The coop overlaps the drawn house footprint."
    );

    setCheck(
      "checkSetback",
      setbackState,
      !canGeometry
        ?"This city's property-line rule needs additional geometry or parcel data."
        :insideSafe
          ?"The coop is fully inside the conservative property-line setback zone."
          :"The coop crosses the conservative property-line setback zone. Move it farther inward."
    );

    const states=[propertyState,houseState,setbackState];
    const passCount=states.filter(x=>x==="pass").length;
    const failCount=states.filter(x=>x==="fail").length;
    const unavailableCount=states.filter(x=>x==="warn").length;
    setResultCounts(passCount,failCount,unavailableCount,manualCount,true);

    const hardGeometryFail=!insideProperty||!noHouseOverlap||(canGeometry&&!insideSafe);

    if(hardGeometryFail){
      const failureReason=!insideProperty
        ?"outside_property"
        :!noHouseOverlap
          ?"house_overlap"
          :"setback";
      trackGeometryState("geometry_check_fail",{
        failure_reason:failureReason,
        boundary_distance_ft:boundaryDistance===null?undefined:Math.round(boundaryDistance*10)/10,
        required_setback_ft:Math.round(required*10)/10,
        margin_ft:margin===null?undefined:Math.round(margin*10)/10
      });
      trackGeometryResult("fail",{
        nearest_boundary_ft:boundaryDistance===null?undefined:Number(boundaryDistance.toFixed(1)),
        required_setback_ft:required,
        inside_property:insideProperty,
        house_clear:noHouseOverlap,
        setback_clear:canGeometry?insideSafe:undefined
      });
      setHero(
        "fail",
        "Geometry FAIL — move the coop before relying on this layout.",
        !insideProperty
          ?"The proposed coop is not fully inside the drawn property."
          :!noHouseOverlap
            ?"The proposed coop overlaps the drawn house."
            :"The proposed coop crosses the conservative property-line setback."
      );
      return;
    }

    if(!canGeometry){
      trackGeometryState("geometry_check_manual",{
        reason:"rule_not_automated",
        boundary_distance_ft:boundaryDistance===null?undefined:Math.round(boundaryDistance*10)/10
      });
      trackGeometryResult("manual",{
        reason:"setback_not_automated",
        nearest_boundary_ft:boundaryDistance===null?undefined:Number(boundaryDistance.toFixed(1))
      });
      setHero(
        "manual",
        "Partial geometry check — one setback rule is not automated yet.",
        "The property and house-overlap checks pass, but "+c.name+" needs additional geometry or parcel data before CoopCheck can evaluate the setback."
      );
      return;
    }

    const needsExtraPlacement=p.rearOnly||p.rearHalf;

    if(needsExtraPlacement){
      trackGeometryState("geometry_check_manual",{
        reason:p.rearOnly?"rear_yard":"rear_half",
        boundary_distance_ft:boundaryDistance===null?undefined:Math.round(boundaryDistance*10)/10,
        required_setback_ft:Math.round(required*10)/10,
        margin_ft:margin===null?undefined:Math.round(margin*10)/10
      });
      trackGeometryResult("manual",{
        reason:p.rearOnly?"rear_yard":"rear_half",
        nearest_boundary_ft:boundaryDistance===null?undefined:Number(boundaryDistance.toFixed(1)),
        required_setback_ft:required
      });
      setHero(
        "manual",
        "Geometry PASS — property-line checks pass, with one placement rule still to verify.",
        "The proposed coop clears the conservative boundary and house checks. Confirm the city's yard-position rule before relying on this layout."
      );
      return;
    }

    trackGeometryState("geometry_check_pass",{
      boundary_distance_ft:boundaryDistance===null?undefined:Math.round(boundaryDistance*10)/10,
      required_setback_ft:Math.round(required*10)/10,
      margin_ft:margin===null?undefined:Math.round(margin*10)/10
    });
    trackGeometryResult("pass",{
      nearest_boundary_ft:boundaryDistance===null?undefined:Number(boundaryDistance.toFixed(1)),
      required_setback_ft:required,
      setback_margin_ft:margin===null?undefined:Number(margin.toFixed(1))
    });
    setHero(
      "pass",
      "Geometry PASS — the drawn coop clears the checks CoopCheck can calculate.",
      boundaryDistance===null
        ?"The coop is inside the conservative property-line zone and does not overlap the house."
        :"Nearest drawn property line: "+fmtFt(boundaryDistance)+" · conservative requirement: "+fmtFt(required)+" · margin: "+(margin>=0?"+":"")+fmtFt(margin)+"."
    );
  }
  function refreshGeometry(){
    renderSafeZone();
    updateDrawSummary();
    updateCompliance();
    updateButtons();
  }

  $("drawProperty")?.addEventListener("click",()=>startDraw("property"));
  $("drawHouse")?.addEventListener("click",()=>startDraw("house"));
  $("drawCoop")?.addEventListener("click",()=>startDraw("coop"));
  $("finishShape")?.addEventListener("click",finishCurrentShape);
  $("finishShapeMobile")?.addEventListener("click",finishCurrentShape);

  $("clearMap")?.addEventListener("click",()=>{
    cancelDraft();
    draw.deleteAll();
    currentSafeZone=null;
    lastGeometryAnalyticsState=null;
    map.getSource("safe-zone")?.setData(emptyFeatureCollection());
    refreshGeometry();
    setMapStatus("Map cleared. Search an address or draw a new property.","");
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"&&drawing)cancelDraft("Current drawing cancelled.");
    if(e.key==="Enter"&&drawing){
      e.preventDefault();
      finishCurrentShape();
    }
  });

  map.on("load",()=>{
    map.addSource("safe-zone",{type:"geojson",data:emptyFeatureCollection()});
    map.addLayer({id:"safe-zone-fill",type:"fill",source:"safe-zone",paint:{"fill-color":"#16a34a","fill-opacity":0.22}});
    map.addLayer({id:"safe-zone-line",type:"line",source:"safe-zone",paint:{"line-color":"#15803d","line-width":2,"line-dasharray":[2,2]}});

    map.addSource("house-exclusion",{type:"geojson",data:emptyFeatureCollection()});
    map.addLayer({
      id:"house-exclusion-fill",
      type:"fill",
      source:"house-exclusion",
      paint:{"fill-color":"#59636d","fill-opacity":0.66}
    });
    map.addLayer({
      id:"house-exclusion-line",
      type:"line",
      source:"house-exclusion",
      paint:{"line-color":"#414952","line-width":2.5}
    });

    map.addSource("draft-shape",{type:"geojson",data:emptyFeatureCollection()});
    const draftRoleColor=[
      "match",["get","role"],
      "property","#2563eb",
      "house","#64748b",
      "coop","#d97706",
      "#7c3aed"
    ];
    map.addLayer({id:"draft-fill",type:"fill",source:"draft-shape",filter:["==",["geometry-type"],"Polygon"],paint:{"fill-color":draftRoleColor,"fill-opacity":0.18}});
    map.addLayer({id:"draft-line",type:"line",source:"draft-shape",filter:["==",["geometry-type"],"LineString"],paint:{"line-color":draftRoleColor,"line-width":3,"line-dasharray":[2,1]}});
    map.addLayer({id:"draft-points",type:"circle",source:"draft-shape",filter:["==",["geometry-type"],"Point"],paint:{"circle-radius":9,"circle-color":"#ffffff","circle-stroke-color":draftRoleColor,"circle-stroke-width":3}});

    map.on("click",onMapClick);
    map.on("touchend",onMapTouchEnd);
    refreshGeometry();
    setMapStatus("Step 1: search your address. Then click Draw property.","");
  });

  map.on("draw.update",refreshGeometry);
  map.on("draw.delete",refreshGeometry);

  ["sideSetback","rearSetback","frontSetback"].forEach(id=>{
    $(id)?.addEventListener("input",refreshGeometry);
  });
  $("city")?.addEventListener("change",refreshGeometry);

  async function geocode(){
    const input=$("addressSearch");
    const q=(input?.value||"").trim();
    if(!q)return;

    track("address_search",{
      query_length:q.length,
      city_slug:city()?.slug||""
    });

    const btn=$("findAddress");
    window.coopTrack?.("address_search",{query_length:q.length});
    btn.disabled=true;
    btn.textContent="Finding…";
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
      window.coopTrack?.("address_search_success",{
        result_label:label.slice(0,100)
      });

      const lower=label.toLowerCase();
      const matched=(window.COOP_CITIES||[]).find(c=>lower.includes(c.name.toLowerCase()));

      track("address_search_success",{
        matched_city:!!matched,
        city_slug:matched?.slug||""
      });

      if(matched){
        window.coopTrack?.("city_rule_matched",{
          city_slug:matched.slug,
          city_name:matched.name,
          state:matched.state
        });
        $("city").value=matched.slug;
        $("city").dispatchEvent(new Event("change"));
        track("city_rule_matched",{city_slug:matched.slug,state:matched.state});
        setMapStatus("Address found. Matched "+matched.name+" rules. Click Draw property to outline the lot.","good");
      }else{
        setMapStatus("Address found. This city is not in our verified rule set yet; use supported city rules only for testing.","");
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