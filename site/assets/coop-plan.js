/* CoopCheck local-only parametric 2D chicken-coop concept generator.
 * Source-backed planning targets, never building code or structural design.
 * No network requests, AI API, location upload or server-side computation. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.CoopPlan=api;
  if(!root||!root.document)return;
  function start(){
    const form=root.document.getElementById("coopPlanForm");
    if(!form)return;
    const result=root.document.getElementById("planResult");
    const preview=root.document.getElementById("planSvgPreview");
    const notes=root.document.getElementById("planNotes");
    const stats=root.document.getElementById("planStats");
    const hint=root.document.getElementById("importHint");
    let latest=null;
    let imported=false;
    const contextData=root.COOP_PLAN_LAW_DATA||{};
    const law=root.CoopPlanLaw;
    const quick=root.CoopQuickCheck;
    const params=new URLSearchParams(root.location.search);
    const cityInput=root.document.getElementById("planCity");
    const cityFacts=root.document.getElementById("planCityFacts");
    const cityDetails=root.document.getElementById("planLawDetails");
    const citySummary=root.document.getElementById("planCitySummary");
    const lawResult=root.document.getElementById("planLawResult");
    const lawNotes=root.document.getElementById("planLawNotes");
    const sourceLink=root.document.getElementById("planSourceLink");
    const rulesLink=root.document.getElementById("planRuleLink");
    const mapLink=root.document.getElementById("planMapLink");
    const printLaw=root.document.getElementById("planPrintLaw");
    const flockInput=form.elements.namedItem("flock");
    const lotInput=form.elements.namedItem("lot");
    const roosterInput=form.elements.namedItem("rooster");
    const cityList=Object.values(contextData).filter(x=>x&&x.slug&&x.name&&x.state).sort((a,b)=>(a.name+", "+a.state).localeCompare(b.name+", "+b.state));
    for(const row of cityList){
      const option=root.document.createElement("option");
      option.value=row.slug;option.textContent=row.name+", "+row.state+(row.status==="needs_review"?" · review pending":"");
      cityInput.appendChild(option);
    }
    let entry=law?.resolve(contextData,params.get("city")||"");
    if(entry)cityInput.value=entry.slug;
    function chooseCity(slug,applyDefault){
      const city=law?.resolve(contextData,slug);
      cityInput.value=city?.slug||"";
      if(city&&applyDefault){
        const number=law.suggestedFlock(city);
        if(number)flockInput.value=String(number);
      }
      renderCity();
    }
    function renderCity(){
      const selected=law?.resolve(contextData,cityInput.value);
      cityDetails.hidden=!selected;
      printLaw.hidden=!selected;
      if(!selected){
        citySummary.textContent="Optional: select a city to see source-checked law notes alongside this geometry-only concept.";
        printLaw.textContent="";
        return;
      }
      const count=Number(flockInput.value);
      const lot=lotInput.value.trim();
      const checked=law.review(contextData,selected.slug,count,lot,roosterInput.checked,quick);
      citySummary.textContent=(selected.status==="needs_review"?"Research pending for ":"City context: ")+selected.name+", "+selected.state+". This is not parcel approval.";
      cityFacts.replaceChildren();
      const labels={max:"Flock allowance",roosters:"Roosters",permit:"Permits / approval",placement:"Coop siting / setback"};
      for(const key of Object.keys(labels)){
        const dt=root.document.createElement("dt");dt.textContent=labels[key];
        const dd=root.document.createElement("dd");
        const claim=checked.facts[key];
        dd.textContent=claim?.text||"Not independently confirmed for this field.";
        if(claim?.section){
          const small=root.document.createElement("small");small.textContent=" Evidence: "+claim.section;dd.appendChild(small);
        }
        cityFacts.append(dt,dd);
      }
      lawResult.dataset.level=checked.kind;
      lawResult.textContent=checked.title+" "+checked.detail;
      lawNotes.replaceChildren();
      for(const text of checked.notes){
        const item=root.document.createElement("li");item.textContent=text;lawNotes.appendChild(item);
      }
      rulesLink.href="cities/"+encodeURIComponent(selected.slug)+".html";
      mapLink.href="planner.html?city="+encodeURIComponent(selected.slug);
      const source=checked.source||["max","placement","roosters","permit"].map(k=>checked.facts[k]?.url).find(u=>/^https:\/\//.test(u||""));
      sourceLink.hidden=!source;
      if(source)sourceLink.href=source;else sourceLink.removeAttribute("href");
      printLaw.textContent="USER-SELECTED CITY: "+checked.city+". Municipal rule context: "+checked.title+" "+checked.detail+" The generated drawing is NOT proof of legal compliance. Official source: "+(source||"Not verified")+".";
    }
    cityInput.addEventListener("change",()=>{chooseCity(cityInput.value,true);generate();});
    lotInput.addEventListener("change",renderCity);
    roosterInput.addEventListener("change",renderCity);
    flockInput.addEventListener("change",renderCity);
    function track(event,fields){
      if(typeof root.coopTrack==="function")root.coopTrack(event,fields||{});
    }
    function generate(event){
      if(event)event.preventDefault();
      const values={flock:Number(form.elements.namedItem("flock").value),
        width:Number(form.elements.namedItem("width").value),
        depth:Number(form.elements.namedItem("depth").value),
        style:form.elements.namedItem("style").value};
      const computed=api.design(values);
      if(!computed){
        result.textContent="Enter 2–24 birds, width 6–50 ft, and depth 8–80 ft.";
        result.dataset.level="warning";
        preview.textContent="";
        notes.replaceChildren();stats.replaceChildren();
        latest=null;return;
      }
      latest=computed;
      renderCity();
      const svg=api.renderSvg(computed);
      preview.innerHTML=svg;
      const summary=computed.meetsTargets
        ? "Your entered rectangle meets both illustrative floor-area planning targets. This does NOT validate local setbacks, structures or the design."
        : "Your current dimensions fall short of at least one illustrative bird-space target. Adjust space or flock size before relying on this layout.";
      result.textContent=summary;
      result.dataset.level=computed.meetsTargets?"good":"warning";
      const valuesToDisplay=[
        ["Coop indoor floor",api.format(computed.indoorArea)+" sq ft"],
        ["Illustrative outdoor run",api.format(computed.runArea)+" sq ft"],
        ["Indoor target",api.format(computed.targetIndoor)+" sq ft"],
        ["Run target",api.format(computed.targetRun)+" sq ft"],
        ["Nest boxes",String(computed.nestBoxes)+" × 12 in"],
        ["Roost length",api.format(computed.roostFeet)+" ft total"]
      ];
      stats.replaceChildren();
      for(const entry of valuesToDisplay){
        const card=root.document.createElement("div");
        card.className="cc-plan-stat";
        const label=root.document.createElement("span");label.textContent=entry[0];
        const val=root.document.createElement("strong");val.textContent=entry[1];
        card.append(label,val);stats.appendChild(card);
      }
      notes.replaceChildren();
      const add=(msg,type)=>{
        const item=root.document.createElement("li");
        item.className=type||"";item.textContent=msg;notes.appendChild(item);
      };
      for(const w of computed.warnings)add(w,"warning");
      add("The outside-run area is calculated as the input rectangle minus the indoor-coop footprint; no area beneath a raised coop is double-counted.","");
      add("Nest boxes and roost symbols are schematic; actual clearance, ventilation, door/ramp and maintenance access require detailed design.","");
      add("These targets are poultry-husbandry planning suggestions, not municipality-specific permits or engineering approval.","");
      track("chicken_coop_plan_generate",{template:computed.style,flock_group:computed.flock<=6?"2-6":computed.flock<=12?"7-12":"13-24",targets_met:computed.meetsTargets?1:0,from_saved_map:imported?1:0,city_slug:cityInput.value||undefined});
    }
    form.addEventListener("submit",generate);
    root.document.getElementById("planDownloadSvg")?.addEventListener("click",()=>{
      if(!latest)return;api.download("coopcheck-concept-plan.svg",new Blob([api.renderSvg(latest)],{type:"image/svg+xml;charset=utf-8"}));track("chicken_coop_plan_export",{format:"svg"});
    });
    root.document.getElementById("planDownloadPng")?.addEventListener("click",async()=>{
      if(!latest)return;
      try{await api.downloadPng(api.renderSvg(latest));track("chicken_coop_plan_export",{format:"png"});}
      catch(e){result.textContent="PNG export is unavailable in this browser. Try SVG download instead.";result.dataset.level="warning";}
    });
    root.document.getElementById("planPrint")?.addEventListener("click",()=>{if(latest){track("chicken_coop_plan_export",{format:"print_pdf"});root.print();}});
    if(params.get("from")==="map"){
      let saved=null;
      try{const id=root.localStorage.getItem("coopcheck:project-id");saved=id&&root.CoopProject?.load(root.localStorage,id);}catch(e){}
      if(saved){
        if(!entry&&law?.resolve(contextData,saved.city))chooseCity(saved.city,true);
        const mapMismatch=!(saved.addressMatched===true&&saved.addressCity===cityInput.value)?" The selected city was NOT matched to the address by the map geocoder.":" The saved geocoder city matched the selected city at the time of the sketch; parcel zoning is still unknown.";
        const outline=saved.features?.find(f=>f.properties.role==="coop");
        const dimensions=api.dimensionsFromPolygon(outline);
        if(dimensions){
          imported=true;
          hint.textContent="Saved map coop-only outline: approximately "+api.format(dimensions.width)+" × "+api.format(dimensions.depth)+" ft (axis-aligned bounding box). This measures the proposed COOP, not the entire coop + run. The total area inputs above remain unchanged; enter your measured combined space manually. No survey or legal buildable-area conclusion."+mapMismatch;
        }else{
          hint.textContent="Saved map project found, but it has no usable coop outline. Enter the TOTAL coop + run dimensions yourself."+mapMismatch;
        }
      }else{
        hint.textContent="No locally saved map sketch found. Enter your TOTAL coop + run dimensions. The generator does not send map coordinates or addresses to a server.";
      }
    }
    if(entry)chooseCity(entry.slug,true);
    else if(params.get("from")!=="map"&&["size-guide","size-calculator","coop-size","coop-footprint"].includes(params.get("source"))){
      const incoming=Number(params.get("flock"));
      if(Number.isSafeInteger(incoming)&&incoming>=2&&incoming<=24)flockInput.value=String(incoming);
      renderCity();
    }else renderCity();
    generate();
  }
  if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",start);
  else start();
})(typeof window!=="undefined"?window:null,function(){
  const roundHalf=n=>Math.ceil(n*2-1e-10)/2;
  const format=n=>Number((n||0).toFixed(1)).toString();
  const SOURCE_OSU="https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design";
  const SOURCE_PSU="https://extension.psu.edu/small-scale-poultry-housing";
  const SOURCE_UMN="https://extension.umn.edu/agriculture/animals-and-livestock/poultry/caring-for-chickens-in-cold-weather";
  const styles={walkin:"Walk-in",raised:"Raised",compact:"Compact"};
  function sanitize(v){
    if(!v)return null;
    const flock=v.flock,width=v.width,depth=v.depth,style=v.style;
    if(!Number.isInteger(flock)||flock<2||flock>24)return null;
    if(typeof width!=="number"||!Number.isFinite(width)||width<6||width>50)return null;
    if(typeof depth!=="number"||!Number.isFinite(depth)||depth<8||depth>80)return null;
    if(!Object.prototype.hasOwnProperty.call(styles,style))return null;
    return {flock,width,depth,style};
  }
  function design(raw){
    const v=sanitize(raw);
    if(!v)return null;
    const nestBoxes=Math.ceil(v.flock/4);
    const targetIndoor=4*v.flock;
    const targetRun=10*v.flock;
    let cw,cd,x,y;
    if(v.style==="walkin"){
      cw=Math.min(v.width,Math.max(4,roundHalf(v.width*.64),nestBoxes+1));
      cd=Math.min(v.depth,Math.max(4,roundHalf(targetIndoor/cw)));
      x=0;y=0;
    }else if(v.style==="raised"){
      cw=Math.min(v.width,Math.max(4,roundHalf(v.width*.52),nestBoxes+1));
      cd=Math.min(v.depth,Math.max(4,roundHalf(targetIndoor/cw)));
      x=v.width-cw;y=0;
    }else{
      cw=v.width;
      cd=Math.min(v.depth,Math.max(3.5,roundHalf(targetIndoor/cw)));
      x=0;y=0;
    }
    const indoorArea=cw*cd;
    const runArea=Math.max(0,v.width*v.depth-indoorArea);
    const warnings=[];
    if(indoorArea+1e-7<targetIndoor)warnings.push("The indoor coop footprint is smaller than the 4 sq ft per bird planning target. Increase available space or reduce flock size.");
    if(runArea+1e-7<targetRun)warnings.push("The outdoor run is smaller than the 10 sq ft per bird planning target. Increase available space or reduce flock size.");
    if(v.style==="raised")warnings.push("Raised style only marks a conceptual elevated coop: support loads, safe access and roof/footing details are not calculated. The footprint below it is NOT counted again as run.");
    if(v.style==="compact")warnings.push("Compact style favors a shallow coop band; verify actual interior headroom, nest/roost clearances and maintenance access before construction.");
    if(v.style==="walkin")warnings.push("Walk-in style illustrates an access-friendly coop zone; wall height, door swing, foundation and structural loads are not designed.");
    return {...v,coop:{x,y,width:cw,depth:cd},indoorArea,runArea,targetIndoor,targetRun,nestBoxes,roostFeet:Number((v.flock*.75).toFixed(2)),meetsTargets:indoorArea+1e-7>=targetIndoor&&runArea+1e-7>=targetRun,warnings};
  }
  function xml(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}
  function renderSvg(m){
    if(!m||!sanitize(m)||!m.coop)return "";
    const scale=Math.min(700/m.width,420/m.depth);
    const W=m.width*scale,D=m.depth*scale;
    const left=125+(700-W)/2,top=157+(420-D)/2;
    const cx=left+m.coop.x*scale,cy=top+m.coop.y*scale;
    const cw=m.coop.width*scale,cd=m.coop.depth*scale;
    const color=m.meetsTargets?"#287553":"#a46a29";
    const parts=[
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 760" width="980" height="760" role="img" aria-labelledby="ccPlanTitle ccPlanDesc">',
      '<title id="ccPlanTitle">'+xml(styles[m.style])+' chicken coop conceptual floor layout</title>',
      '<desc id="ccPlanDesc">Concept drawing of a '+xml(format(m.width))+' by '+xml(format(m.depth))+' foot area with a '+xml(format(m.coop.width))+' by '+xml(format(m.coop.depth))+' foot indoor coop, outdoor run, conceptual nest boxes and roost location. Not a construction drawing.</desc>',
      '<rect width="980" height="760" fill="#fffef9"/>',
      '<rect x="32" y="26" width="916" height="708" rx="21" fill="none" stroke="#dbe6dc" stroke-width="2"/>',
      '<text x="80" y="77" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#1c4430">COOPCHECK / COOP PLAN</text>',
      '<text x="80" y="104" font-family="Arial,sans-serif" font-size="15" fill="#617b6b">'+xml(styles[m.style])+' concept · '+m.flock+' laying hens · ft</text>',
      '<text x="899" y="78" font-family="Arial,sans-serif" font-size="13" text-anchor="end" fill="'+color+'">PLANNING CONCEPT · NOT PERMIT</text>',
      '<defs><pattern id="ccGrass" patternUnits="userSpaceOnUse" width="18" height="18"><path d="M1 17l6 -9 M12 11l4 -6" stroke="#d1e9d2" stroke-width="1.4"/></pattern></defs>',
      '<rect x="'+left+'" y="'+top+'" width="'+W+'" height="'+D+'" fill="#eaf6e8" stroke="#2d7658" stroke-width="3"/>',
      '<rect x="'+left+'" y="'+top+'" width="'+W+'" height="'+D+'" fill="url(#ccGrass)"/>',
      '<rect x="'+cx+'" y="'+cy+'" width="'+cw+'" height="'+cd+'" fill="#f6ddaf" stroke="#98713e" stroke-width="3"/>',
      '<rect x="'+(cx+7)+'" y="'+(cy+7)+'" width="'+Math.max(0,cw-14)+'" height="'+Math.max(0,cd-14)+'" fill="none" stroke="#bb925e" stroke-width="1.5" stroke-dasharray="6 4"/>',
      '<text x="'+(left+W/2)+'" y="'+(top-24)+'" font-family="Arial,sans-serif" font-size="18" font-weight="700" text-anchor="middle" fill="#37684d">'+xml(format(m.width))+' ft total width</text>',
      '<path d="M'+left+' '+(top-14)+' V'+(top-34)+' M'+(left+W)+' '+(top-14)+' V'+(top-34)+'" stroke="#5e8c6a" stroke-width="1.4"/>',
      '<line x1="'+left+'" y1="'+(top-15)+'" x2="'+(left+W)+'" y2="'+(top-15)+'" stroke="#5e8c6a" stroke-width="1.5"/>',
      '<line x1="'+(left-18)+'" y1="'+top+'" x2="'+(left-18)+'" y2="'+(top+D)+'" stroke="#5e8c6a" stroke-width="1.5"/>',
      '<path d="M'+(left-29)+' '+top+'H'+(left-6)+' M'+(left-29)+' '+(top+D)+'H'+(left-6)+'" stroke="#5e8c6a" stroke-width="1.4"/>',
      '<text x="'+(left-44)+'" y="'+(top+D/2)+'" transform="rotate(-90 '+(left-44)+' '+(top+D/2)+')" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#37684d" text-anchor="middle">'+xml(format(m.depth))+' ft total depth</text>'
    ];
    const headingSize=cw>170?18:13;
    parts.push('<text x="'+(cx+cw/2)+'" y="'+(cy+Math.min(28,cd*.28))+'" font-family="Arial,sans-serif" font-size="'+headingSize+'" font-weight="700" fill="#6f4a25" text-anchor="middle">INDOOR COOP</text>');
    parts.push('<text x="'+(cx+cw/2)+'" y="'+(cy+Math.min(46,cd*.42))+'" font-family="Arial,sans-serif" font-size="12" fill="#6f4a25" text-anchor="middle">'+xml(format(m.coop.width))+' × '+xml(format(m.coop.depth))+' ft</text>');
    const nb=m.nestBoxes;
    // 1-foot nest-box symbols, arranged along one or two coop walls as required.
    const size=Math.min(scale*.78,32);
    const maxCols=Math.max(1,Math.floor((Math.max(0,cw-20))/(size+3)));
    for(let i=0;i<nb;i++){
      const cols=Math.min(nb,maxCols);
      const xx=cx+10+(i%cols)*(size+3),yy=cy+Math.max(52,cd*.50)+Math.floor(i/cols)*(size+4);
      if(xx+size<=cx+cw-4&&yy+size<=cy+cd-4){
        parts.push('<rect x="'+xx+'" y="'+yy+'" width="'+size+'" height="'+size+'" rx="3" fill="#fff9e8" stroke="#976c42" stroke-width="1.4"/>');
        if(size>=16)parts.push('<text x="'+(xx+size/2)+'" y="'+(yy+size*.67)+'" font-size="'+Math.max(9,size*.5)+'" font-family="Arial,sans-serif" text-anchor="middle" fill="#94682e">N</text>');
      }
    }
    if(cd>=75){
      const ry=cy+cd-Math.min(25,cd*.20);
      parts.push('<line x1="'+(cx+16)+'" y1="'+ry+'" x2="'+(cx+cw-16)+'" y2="'+ry+'" stroke="#755d48" stroke-width="5" stroke-linecap="round"/>');
      parts.push('<text x="'+(cx+cw/2)+'" y="'+(ry-7)+'" text-anchor="middle" fill="#755d48" font-size="11" font-family="Arial,sans-serif">ROOST (SCHEMATIC)</text>');
    }
    // Access/ramp marker across the lower coop boundary.
    const doorX=cx+cw*.75;
    const doorY=cy+cd;
    if(doorY<top+D-18){
      parts.push('<path d="M'+(doorX-12)+' '+doorY+'l24 0" stroke="#fffef9" stroke-width="7"/>');
      parts.push('<path d="M'+doorX+' '+doorY+'l0 30" stroke="#bb8352" stroke-width="3" stroke-dasharray="4 3"/>');
    }
    if(m.runArea>0){
      const x=left+W/2,y=top+D*.82;
      if(y>cy+cd+20||x>cx+cw+28||x<cx-25){
        parts.push('<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="19" font-weight="700" font-family="Arial,sans-serif" fill="#357151">OUTDOOR RUN</text>');
      }
    }
    const bottomY=630;
    parts.push(
      '<line x1="78" y1="'+bottomY+'" x2="902" y2="'+bottomY+'" stroke="#d8e5da" stroke-width="2"/>',
      '<rect x="80" y="648" width="18" height="18" fill="#f6ddaf" stroke="#98713e"/>',
      '<text x="107" y="663" font-size="16" font-family="Arial,sans-serif" fill="#3d5948">Coop '+xml(format(m.indoorArea))+' sq ft</text>',
      '<rect x="354" y="648" width="18" height="18" fill="#eaf6e8" stroke="#2d7658"/>',
      '<text x="382" y="663" font-size="16" font-family="Arial,sans-serif" fill="#3d5948">OUTDOOR RUN '+xml(format(m.runArea))+' sq ft</text>',
      '<text x="905" y="663" text-anchor="end" font-size="14" font-family="Arial,sans-serif" fill="'+color+'">'+(m.meetsTargets?"AREA TARGETS MET":"AREA TARGET WARNING")+'</text>',
      '<text x="80" y="699" font-family="Arial,sans-serif" font-size="13" fill="#687a6e">Educational layout only. No construction details, engineering, zoning, survey or permit verification.</text>',
      '<text x="80" y="718" font-family="Arial,sans-serif" font-size="12" fill="#73867b">Guidance: Oregon State University / Penn State / University of Minnesota Extension. Generated locally.</text>',
      '</svg>'
    );
    return parts.join("");
  }
  function dimensionsFromPolygon(feature){
    const ring=feature?.geometry?.type==="Polygon"&&feature.geometry.coordinates?.[0];
    if(!Array.isArray(ring)||ring.length<4||ring.length>101)return null;
    let minLon=Infinity,maxLon=-Infinity,minLat=Infinity,maxLat=-Infinity;
    for(const p of ring){
      if(!Array.isArray(p)||p.length!==2||!p.every(n=>typeof n==="number"&&Number.isFinite(n))||Math.abs(p[0])>180||Math.abs(p[1])>90)return null;
      minLon=Math.min(minLon,p[0]);maxLon=Math.max(maxLon,p[0]);
      minLat=Math.min(minLat,p[1]);maxLat=Math.max(maxLat,p[1]);
    }
    if(ring[0][0]!==ring[ring.length-1][0]||ring[0][1]!==ring[ring.length-1][1])return null;
    const toFeet=6371008.8*Math.PI/180*3.280839895;
    const lat=(minLat+maxLat)/2*Math.PI/180;
    const width=(maxLon-minLon)*Math.cos(lat)*toFeet;
    const depth=(maxLat-minLat)*toFeet;
    if(!Number.isFinite(width)||!Number.isFinite(depth)||width<=0||depth<=0)return null;
    return {width,depth,method:"north-south / east-west axis-aligned bounding rectangle only"};
  }
  function download(filename,blob){
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  function downloadPng(svg){
    return new Promise((resolve,reject)=>{
      const image=new Image();
      const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));
      image.onload=()=>{
        try{
          const canvas=document.createElement("canvas");
          canvas.width=1960;canvas.height=1520;
          const ctx=canvas.getContext("2d");if(!ctx)throw Error("Canvas not available");
          ctx.fillStyle="#fffef9";ctx.fillRect(0,0,1960,1520);
          ctx.drawImage(image,0,0,1960,1520);
          canvas.toBlob(blob=>{
            URL.revokeObjectURL(url);
            if(!blob){reject(new Error("PNG conversion failed"));return;}
            download("coopcheck-concept-plan.png",blob);resolve();
          },"image/png");
        }catch(e){URL.revokeObjectURL(url);reject(e);}
      };
      image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("SVG rendering error"));};
      image.src=url;
    });
  }
  return {sanitize,design,renderSvg,dimensionsFromPolygon,format,download,downloadPng,styles,SOURCE_OSU,SOURCE_PSU,SOURCE_UMN};
});
