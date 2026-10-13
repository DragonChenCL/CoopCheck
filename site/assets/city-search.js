(function(root){
"use strict";
function normalize(value){
  return String(value||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
}
function matches(city,query){
  if(!query)return true;
  const text=normalize([city.name,city.state,city.stateName,city.slug].join(" "));
  return query.split(" ").every(token=>text.split(" ").some(word=>word.startsWith(token)));
}
function rank(city,query){
  const name=normalize(city.name), full=normalize(city.name+" "+city.state),slug=normalize(city.slug);
  if(!query)return 0;
  if(name===query||full===query||slug===query)return 0;
  if(name.startsWith(query))return 1;
  if(full.startsWith(query)||slug.startsWith(query))return 2;
  if(name.includes(query))return 3;
  return 4;
}
function filterCities(cities,query,state,status,limit){
  const q=normalize(query);
  return cities.filter(c=>(!state||c.state===state)&&(!status||status==="all"|| (status==="reviewed"?c.status!=="needs_review":c.status==="needs_review"))&&matches(c,q))
    .sort((a,b)=>rank(a,q)-rank(b,q)||(a.status==="needs_review")-(b.status==="needs_review")||a.name.localeCompare(b.name)||a.state.localeCompare(b.state))
    .slice(0,limit||1000);
}
function statusLabel(city){
  return city.status==="needs_review"?"Research pending":city.status==="verified_limited_scope"?"Partially reviewed":"Source reviewed";
}
if(typeof module!=="undefined"&&module.exports)module.exports={normalize,filterCities,statusLabel};
if(typeof document==="undefined")return;
const doc=document;
let dataPromise;
function getCities(){
 if(!dataPromise)dataPromise=fetch("/assets/city-search-index.json",{credentials:"same-origin"}).then(r=>{if(!r.ok)throw Error("City search index unavailable");return r.json()}).then(j=>{if(!Array.isArray(j.cities)||j.cities.length!==100)throw Error("City index malformed");return j.cities});
 return dataPromise;
}
function track(slug,status,location){
 try{root.coopTrack?.("city_search_select",{city_slug:slug,verification_scope:status,search_location:location});}catch(_){}
}
function makeNode(tag,className,text){
 const e=doc.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e;
}

function stateOptions(cities){
 const states=[...new Map(cities.map(c=>[c.state,c.stateName])).entries()]
   .sort((a,b)=>a[1].localeCompare(b[1]));
 return [{value:"",label:"All states"},...states.map(([code,name])=>({value:code,label:name+" ("+code+")"}))];
}
function selectedValue(el){return el?.dataset?.value??el?.value??"";}
function setupDropdown(wrapper,options,onChange,externalMenu){
 if(!wrapper)return null;
 const trigger=wrapper.querySelector("[data-dropdown-trigger]");
 const label=wrapper.querySelector("[data-dropdown-label]");
 const menu=externalMenu||wrapper.querySelector("[data-dropdown-menu]");
 if(!trigger||!label||!menu)return null;
 let expanded=false;
 const optionButtons=[];
 function close(restoreFocus=false){
  expanded=false;menu.hidden=true;trigger.setAttribute("aria-expanded","false");
  wrapper.classList.remove("is-open");
  if(restoreFocus)trigger.focus();
 }
 function open(){
  expanded=true;menu.hidden=false;trigger.setAttribute("aria-expanded","true");
  wrapper.classList.add("is-open");
 }
 function setValue(value){
  const option=options.find(item=>item.value===value)||options[0];
  wrapper.dataset.value=option.value;
  label.textContent=option.label;
  optionButtons.forEach(b=>b.setAttribute("aria-selected",String(b.dataset.value===option.value)));
 }
 function choose(option){
  setValue(option.value);
  close();trigger.focus();
  onChange?.(option.value);
 }
 for(const option of options){
  const item=makeNode("button","cc-dropdown-option");
  item.type="button";item.setAttribute("role","option");item.dataset.value=option.value;
  item.setAttribute("aria-selected",String(option.value===(wrapper.dataset.value||"")));
  const dot=makeNode("span","cc-dropdown-option-name",option.label);
  const tick=makeNode("span","cc-dropdown-option-check","✓");
  tick.setAttribute("aria-hidden","true");
  item.append(dot,tick);menu.append(item);optionButtons.push(item);
  item.addEventListener("click",()=>choose(option));
  item.addEventListener("keydown",event=>{
   const index=optionButtons.indexOf(item);
   if(event.key==="ArrowDown"||event.key==="ArrowUp"){
    event.preventDefault();optionButtons[(index+(event.key==="ArrowDown"?1:-1)+optionButtons.length)%optionButtons.length].focus();
   }else if(event.key==="Home"||event.key==="End"){
    event.preventDefault();optionButtons[event.key==="Home"?0:optionButtons.length-1].focus();
   }else if(event.key==="Escape"){event.preventDefault();close(true);}
  });
 }
 const current=options.find(o=>o.value===wrapper.dataset.value)||options[0];
 wrapper.dataset.value=current.value;label.textContent=current.label;
 trigger.addEventListener("click",()=>{if(expanded)close();else open();});
 trigger.addEventListener("keydown",event=>{
  if(event.key==="Escape"){if(expanded){event.preventDefault();close();}}
  else if(event.key==="ArrowDown"||event.key==="ArrowUp"||event.key===" "){
   event.preventDefault();open();
   const chosen=optionButtons.find(b=>b.dataset.value===selectedValue(wrapper));
   (chosen||optionButtons[0])?.focus();
  }
 });
 doc.addEventListener("pointerdown",event=>{
  if(expanded&&!wrapper.contains(event.target)&&!menu.contains(event.target))close();
 });
 doc.addEventListener("focusin",event=>{
  if(expanded&&!wrapper.contains(event.target)&&!menu.contains(event.target))close();
 });
 return {close,open,setValue,isOpen:()=>expanded};
}
function setupHero(rootEl,cities){
 const input=rootEl.querySelector("[data-search-input]");
 const state=rootEl.querySelector("[data-search-state]");
 const panel=rootEl.querySelector("[data-search-results]");
 const hint=rootEl.querySelector("[data-search-hint]");
 const stateMenu=rootEl.querySelector("[data-dropdown-menu]");
 if(!input||!panel)return;
 let selected=-1,view=[],open=false;
 const defaultHint="Search all 100 city profiles. Unverified cities are clearly marked.";
 function setOpen(show){
  open=show;panel.hidden=!show;input.setAttribute("aria-expanded",String(show));
  if(!show){input.removeAttribute("aria-activedescendant");selected=-1;}
 }
 function closeResults(){
  setOpen(false);
  if(!input.value.trim()&&!selectedValue(state))hint.textContent=defaultHint;
 }
 const dropdown=setupDropdown(state,stateOptions(cities),()=>{
  input.focus();
  paint();
 },stateMenu);
 function paint(){
  dropdown?.close();
  if(!input.value.trim()&&!selectedValue(state)){
   view=[];panel.replaceChildren();closeResults();
   hint.textContent=defaultHint;
   return;
  }
  view=filterCities(cities,input.value,selectedValue(state),"all",8);
  selected=-1;panel.replaceChildren();
  if(view.length===0){
   panel.append(makeNode("div","cc-search-empty","No matching cities. Try a nearby city or browse all 100 profiles."));
  }else{
   for(let i=0;i<view.length;i++){
    const city=view[i],a=makeNode("a","cc-result-row");
    a.id="city-result-"+i;
    a.href="/cities/"+encodeURIComponent(city.slug)+".html";
    a.setAttribute("role","option");
    a.setAttribute("aria-selected","false");
    a.append(
      makeNode("span","cc-result-name",city.name+", "+city.state),
      makeNode("span","cc-result-badge"+(city.status==="needs_review"?" is-pending":city.status==="verified_limited_scope"?" is-limited":""),statusLabel(city))
    );
    a.addEventListener("click",()=>track(city.slug,city.status,"home"));
    panel.append(a);
   }
  }
  hint.textContent=input.value.trim()
    ?view.length+" matching "+(view.length===1?"city":"cities")+(view.length===8?" (showing first 8)":"")
    :view.length+" cities in selected state (showing up to 8)";
  setOpen(true);
 }
 function mark(){
  const links=[...panel.querySelectorAll('[role="option"]')];
  links.forEach((link,i)=>{
   link.classList.toggle("is-active",i===selected);
   link.setAttribute("aria-selected",String(i===selected));
  });
  if(selected>=0&&links[selected]){
   input.setAttribute("aria-activedescendant",links[selected].id);
   links[selected].scrollIntoView({block:"nearest"});
  }else input.removeAttribute("aria-activedescendant");
 }
 function goTo(city){
  track(city.slug,city.status,"home");
  root.location.assign("/cities/"+encodeURIComponent(city.slug)+".html");
 }
 rootEl.querySelector("[data-search-submit]")?.addEventListener("click",()=>{
  const current=filterCities(cities,input.value,selectedValue(state),"all",8);
  if(!input.value.trim()&&!selectedValue(state)){
   hint.textContent="Enter a city name or choose a state to see matches.";
   closeResults();input.focus();return;
  }
  if(current.length===1)goTo(current[0]);
  else{input.focus();paint();}
 });
 input.addEventListener("focus",()=>{
  if(input.value.trim()||selectedValue(state))paint();
 });
 input.addEventListener("input",paint);
 input.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
   if(open){event.preventDefault();closeResults();}
   return;
  }
  if(event.key==="ArrowDown"||event.key==="ArrowUp"){
   if(!open&&(input.value.trim()||selectedValue(state)))paint();
   if(view.length===0||!open)return;
   event.preventDefault();
   selected=event.key==="ArrowDown"?(selected+1)%view.length:(selected-1+view.length)%view.length;
   mark();
  }else if(event.key==="Enter"&&open&&view.length){
   event.preventDefault();goTo(view[selected<0?0:selected]);
  }
 });
 rootEl.addEventListener("focusout",event=>{
  const next=event.relatedTarget;
  if(!next||(!panel.contains(next)&&next!==input))closeResults();
 });
 doc.addEventListener("pointerdown",event=>{
  if(!rootEl.contains(event.target)){closeResults();dropdown?.close();}
 });
 doc.addEventListener("focusin",event=>{
  if(!rootEl.contains(event.target)){closeResults();dropdown?.close();}
 });
 state?.querySelector("[data-dropdown-trigger]")?.addEventListener("click",()=>closeResults());
}
function setupDirectory(cities){
 const filter=doc.querySelector("[data-directory-filter]");if(!filter)return;
 const input=filter.querySelector("[data-directory-query]");
 const state=filter.querySelector("[data-directory-state]");
 const status=filter.querySelector("[data-directory-status]");
 const counter=filter.querySelector("[data-directory-count]"),empty=doc.querySelector("[data-directory-empty]");
 const cards=[...doc.querySelectorAll("[data-city-row]")],groups=[...doc.querySelectorAll("[data-city-group]")];
 function apply(){
  const matched=filterCities(cities,input?.value||"",selectedValue(state),selectedValue(status)||"all");
  const included=new Set(matched.map(c=>c.slug));
  let shown=0;
  for(const card of cards){const visible=included.has(card.dataset.city);card.hidden=!visible;if(visible)shown++;}
  for(const group of groups){group.hidden=![...group.querySelectorAll("[data-city-row]")].some(el=>!el.hidden);}
  if(empty)empty.hidden=shown!==0;
  if(counter)counter.textContent=shown+" "+(shown===1?"city":"cities")+" shown of "+cities.length;
 }
 const stateDropdown=setupDropdown(state,stateOptions(cities),apply);
 const statusOptions=[
   {value:"all",label:"All verification statuses"},
   {value:"reviewed",label:"Source-reviewed only"},
   {value:"pending",label:"Research pending only"}
 ];
 const statusDropdown=setupDropdown(status,statusOptions,apply);
 input?.addEventListener("input",apply);
 filter.querySelector("[data-directory-reset]")?.addEventListener("click",()=>{
  if(input)input.value="";
  stateDropdown?.setValue("");
  statusDropdown?.setValue("all");
  stateDropdown?.close();
  statusDropdown?.close();
  apply();input?.focus();
 });
 apply();
}
getCities().then(cities=>{
 for(const el of doc.querySelectorAll('[data-city-search="hero"]'))setupHero(el,cities);
 setupDirectory(cities);
}).catch(()=>{
 for(const el of doc.querySelectorAll('[data-city-search="hero"]')){const h=el.querySelector("[data-search-hint]");if(h)h.textContent="Search is temporarily unavailable. Browse all city profiles using the directory link."; }
 const f=doc.querySelector("[data-directory-count]");if(f)f.textContent="City directory is available below.";
});
})(typeof window!=="undefined"?window:globalThis);
