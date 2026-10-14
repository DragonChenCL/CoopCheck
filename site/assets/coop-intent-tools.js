/* CoopCheck browser-only intent calculators. No third-party services, quotes or fabricated prices. */
(function(root,factory){
 const api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.CoopIntentTools=api;
 if(!root?.document)return;
 function run(){
  const form=root.document.querySelector("form[data-coop-tool]");
  if(!form)return;
  const kind=form.dataset.coopTool,output=root.document.getElementById("toolOutput");
  const status=root.document.getElementById("toolStatus");
  const chart=root.document.getElementById("toolChart");
  const plan=root.document.getElementById("toolPlanLink");
  const num=name=>Number(form.elements.namedItem(name)?.value);
  function calculate(event){
   if(event)event.preventDefault();
   let ans;
   if(kind==="run")ans=api.run(num("flock"),num("width"),num("depth"));
   if(kind==="mesh")ans=api.mesh(num("width"),num("depth"),num("height"),form.elements.namedItem("roof").checked,num("apron"));
   if(kind==="nests")ans=api.nests(num("flock"));
   if(kind==="roost")ans=api.roost(num("flock"),num("barLength"));
   if(kind==="cost"){
    const values={};for(const name of api.budgetNames)values[name]=form.elements.namedItem(name).value.trim();
    ans=api.budget(values);
   }
   if(!ans){status.textContent="Please check your inputs. Use positive measurements and whole bird counts.";status.dataset.level="warning";output.replaceChildren();if(chart)chart.replaceChildren();return;}
   output.replaceChildren();
   function line(label,value){
    const el=root.document.createElement("div");el.className="ct-stat";
    const a=root.document.createElement("span");a.textContent=label;
    const b=root.document.createElement("strong");b.textContent=value;
    el.append(a,b);output.appendChild(el);
   }
   if(kind==="run"){
     line("Planning run target",ans.target+" sq ft");
     line("Your entered run",api.fmt(ans.area)+" sq ft");
     line("Target met?",ans.meets?"By area only":"No — below target");
     line("Birds at target",String(ans.capacity));
     status.textContent=ans.meets?"Your run meets the illustrative 10 sq ft per bird area target. This does NOT check predator safety, outdoor access, zoning or usable obstacles.":"Your run is below the 10 sq ft per bird planning target. Increase length/width or lower flock size. These targets are not municipal code.";
     status.dataset.level=ans.meets?"ok":"warning";
     if(chart)chart.innerHTML=api.shapeSvg(ans.width,ans.depth,"Proposed outdoor run");
     if(plan){plan.hidden=ans.flock>24;if(!plan.hidden)plan.href="/coop-plan.html?flock="+ans.flock+"&source=run-size";}
   }else if(kind==="mesh"){
     line("Run fencing perimeter",api.fmt(ans.perimeter)+" linear ft");
     line("Wall mesh (no openings subtracted)",api.fmt(ans.walls)+" sq ft");
     line("Optional roof mesh",api.fmt(ans.roof)+" sq ft");
     line("Optional ground apron",api.fmt(ans.apron)+" sq ft");
     line("Total unadjusted mesh",api.fmt(ans.total)+" sq ft");
     status.textContent="Geometry only: no cuts, overlaps, doors, rolls, mesh strength, connections or predator-proof build details are included. A coop sharing a wall can change the total.";
     status.dataset.level="neutral";
     if(chart)chart.innerHTML=api.shapeSvg(ans.width,ans.depth,"Fenced rectangle (not a site survey)");
   }else if(kind==="nests"){
     line("Nest boxes by 1 per 4",String(ans.boxes));
     line("Suggested inside size each","12 × 12 × 12 in");
     line("Flock size",ans.flock+" hens");
     status.textContent="Allow roughly one nest for every four standard laying hens. Boxes are for laying—not sleeping—and should be placed accessibly. This does not substitute for coop floor area.";
     status.dataset.level="neutral";
     if(chart)chart.innerHTML=api.nestSvg(ans.boxes);
     if(plan){plan.hidden=ans.flock>24;if(!plan.hidden)plan.href="/coop-plan.html?flock="+ans.flock+"&source=nesting-box";}
   }else if(kind==="roost"){
     line("Combined perch length",api.fmt(ans.total)+" ft");
     line("Entered bar length",api.fmt(ans.barLength)+" ft each");
     line("Bars by total linear length",String(ans.bars));
     line("Total supplied if cut as above",api.fmt(ans.bars*ans.barLength)+" ft");
     status.textContent="Length-only arithmetic; clearance, gaps between bars, height, bird breed and access are not determined. OSU Extension discusses 5–10 inches per chicken; we use 9 inches.";
     status.dataset.level="neutral";
     if(chart)chart.innerHTML=api.roostSvg(ans.bars,ans.barLength);
     if(plan){plan.hidden=ans.flock>24;if(!plan.hidden)plan.href="/coop-plan.html?flock="+ans.flock+"&source=roost";}
   }else if(kind==="cost"){
     line("Entered setup subtotal","$"+ans.subtotal.toFixed(2));
     line("Categories priced",ans.priced+" of "+api.budgetNames.length);
     line("Still unpriced",String(ans.missing.length));
     status.textContent=ans.missing.length?"Partial subtotal only. Missing costs: "+ans.missing.join(", ")+". Enter actual local quotes; this is not an estimated total.":"All listed categories have an entered price, but site-specific omissions, labor, delivery and permits must still be checked. This is NOT a supplier quote.";
     status.dataset.level=ans.missing.length?"warning":"ok";
     if(chart)chart.replaceChildren();
   }
   if(event&&typeof root.coopTrack==="function")root.coopTrack("coop_intent_tool_calculate",{tool:kind,complete:kind==="cost"&&ans.missing.length===0?1:0});
  }
  form.addEventListener("submit",calculate);
  calculate();
 }
 if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",run);else run();
})(typeof window!=="undefined"?window:null,function(){
 const budgetNames=["framing","siding","roofing","runMesh","hardware","site","equipment","labor"];
 const price=x=>x!==""&&/^\d+(?:\.\d{1,2})?$/.test(x)&&Number(x)<=1000000?Number(x):null;
 const f=n=>Number(n.toFixed(1));
 const fmt=n=>f(n).toString();
 const birds=n=>Number.isSafeInteger(n)&&n>=2&&n<=100;
 const len=n=>typeof n==="number"&&Number.isFinite(n)&&n>0&&n<=200;
 function run(flock,width,depth){
  if(!birds(flock)||!len(width)||!len(depth))return null;
  const area=width*depth,target=flock*10;
  return {flock,width,depth,area,target,capacity:Math.floor(area/10),meets:area+1e-8>=target};
 }
 function mesh(width,depth,height,roof,apron){
  if(!len(width)||!len(depth)||!len(height)||typeof roof!=="boolean"||!Number.isFinite(apron)||apron<0||apron>4)return null;
  const perimeter=2*(width+depth),walls=perimeter*height,roofArea=roof?width*depth:0,apronArea=perimeter*apron;
  return {width,depth,height,perimeter,walls,roof:roofArea,apron:apronArea,total:walls+roofArea+apronArea};
 }
 function nests(flock){return birds(flock)?{flock,boxes:Math.ceil(flock/4)}:null;}
 function roost(flock,barLength){
  if(!birds(flock)||!len(barLength))return null;
  const total=flock*.75,bars=Math.ceil((total-1e-10)/barLength);
  return {flock,total,bars,barLength};
 }
 function budget(values){
  if(!values||typeof values!=="object")return null;
  let subtotal=0,priced=0;const missing=[];
  for(const name of budgetNames){
   const raw=values[name];
   if(typeof raw!=="string")return null;
   if(!raw){missing.push(name);continue;}
   const n=price(raw);if(n===null)return null;
   subtotal+=n;priced++;
  }
  return {subtotal:Number(subtotal.toFixed(2)),priced,missing};
 }
 const esc=x=>String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;");
 function shapeSvg(w,d,name){
  const W=340,H=220,scale=Math.min(290/w,156/d),ww=w*scale,dd=d*scale,x=(W-ww)/2,y=40+(162-dd)/2;
  return '<svg viewBox="0 0 340 220" role="img" aria-label="'+esc(name)+' dimension sketch, not to a surveyed site scale" xmlns="http://www.w3.org/2000/svg"><rect width="340" height="220" fill="#f5faf4"/><rect x="'+f(x)+'" y="'+f(y)+'" width="'+f(ww)+'" height="'+f(dd)+'" fill="#e0f1de" stroke="#3c8560" stroke-width="3"/><text x="170" y="26" text-anchor="middle" font-size="15" font-family="Arial" fill="#2c6345">'+fmt(w)+' ft wide</text><text x="170" y="213" text-anchor="middle" font-size="15" font-family="Arial" fill="#2c6345">'+fmt(d)+' ft deep · '+fmt(w*d)+' sq ft</text></svg>';
 }
 function nestSvg(count){
  const ww=320,hh=180;let body="";
  for(let i=0;i<Math.min(count,8);i++){const x=15+i%4*76,y=25+Math.floor(i/4)*78;body+='<rect x="'+x+'" y="'+y+'" width="67" height="62" rx="5" fill="#ffecc6" stroke="#b58e57" stroke-width="2"/><text x="'+(x+33)+'" y="'+(y+37)+'" text-anchor="middle" font-size="20" fill="#82643e">N</text>';}
  return '<svg viewBox="0 0 '+ww+' '+hh+'" role="img" aria-label="Illustration of '+Math.min(count,8)+' nesting boxes; count and placement are schematic" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#f7f9f1"/>'+body+'<text x="160" y="169" text-anchor="middle" font-size="12" fill="#637465">'+(count>8?"Showing first 8 of "+count:"One 12-inch cube per four laying hens")+'</text></svg>';
 }
 function roostSvg(bars,length){
  let lines="";for(let i=0;i<Math.min(bars,7);i++){const y=30+i*23;lines+='<line x1="34" y1="'+y+'" x2="290" y2="'+y+'" stroke="#946a43" stroke-width="8" stroke-linecap="round"/>';}
  return '<svg viewBox="0 0 324 218" role="img" aria-label="'+Math.min(7,bars)+' schematic roost bars, each user-entered length '+fmt(length)+' ft; not to structural scale" xmlns="http://www.w3.org/2000/svg"><rect width="324" height="218" fill="#f7f9f1"/>'+lines+'<text x="162" y="208" text-anchor="middle" font-size="12" fill="#526b57">'+(bars>7?"First 7 of "+bars+" bars":bars+" bar(s)")+' · '+fmt(length)+' ft length each</text></svg>';
 }
 return {run,mesh,nests,roost,budget,budgetNames,shapeSvg,nestSvg,roostSvg,fmt};
});