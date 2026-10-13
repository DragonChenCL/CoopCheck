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
function populateStates(select,cities){
 if(!select)return;
 const values=[...new Map(cities.map(c=>[c.state,c.stateName])).entries()].sort((a,b)=>a[1].localeCompare(b[1]));
 const current=select.value;
 while(select.options.length>1)select.remove(1);
 for(const [code,name] of values){const o=doc.createElement("option");o.value=code;o.textContent=name+" ("+code+")";select.append(o);}
 select.value=current;
}
function setupHero(rootEl,cities){
 const input=rootEl.querySelector("[data-search-input]"),state=rootEl.querySelector("[data-search-state]"),panel=rootEl.querySelector("[data-search-results]"),hint=rootEl.querySelector("[data-search-hint]");
 if(!input||!panel)return;
 populateStates(state,cities);
 let selected=-1,view=[],open=false;
 const setOpen=show=>{open=show;panel.hidden=!show;input.setAttribute("aria-expanded",String(show));if(!show)input.removeAttribute("aria-activedescendant");};
 function paint(){
  view=filterCities(cities,input.value,state?.value||"","all",8);selected=-1;panel.replaceChildren();
  if(view.length===0){
   const empty=makeNode("div","cc-search-empty","No matching cities. Try a nearby city or browse all 100 profiles.");
   panel.append(empty);
  }else{
   for(let i=0;i<view.length;i++){
    const c=view[i],a=makeNode("a","cc-result-row"),id="city-result-"+i;
    a.id=id;a.href="/cities/"+encodeURIComponent(c.slug)+".html";a.setAttribute("role","option");a.setAttribute("aria-selected","false");
    const first=makeNode("span","cc-result-name",c.name+", "+c.state);
    const badge=makeNode("span","cc-result-badge"+(c.status==="needs_review"?" is-pending":c.status==="verified_limited_scope"?" is-limited":""),statusLabel(c));
    a.append(first,badge);a.addEventListener("click",()=>track(c.slug,c.status,"home"));panel.append(a);
   }
  }
  hint.textContent=input.value.trim()?view.length+" matching "+(view.length===1?"city":"cities")+(view.length===8?" (showing first 8)":""):"Start typing, or select a state to find a city.";
  setOpen(true);
 }
 function mark(){
  const items=[...panel.querySelectorAll('[role="option"]')];
  items.forEach((e,i)=>{e.classList.toggle("is-active",i===selected);e.setAttribute("aria-selected",String(i===selected));});
  if(selected>=0&&items[selected]){input.setAttribute("aria-activedescendant",items[selected].id);items[selected].scrollIntoView({block:"nearest"});}else input.removeAttribute("aria-activedescendant");
 }
 const submit=rootEl.querySelector("[data-search-submit]");
 submit?.addEventListener("click",()=>{
  if(!input.value.trim() && !state?.value){input.focus();paint();return;}
  const current=filterCities(cities,input.value,state?.value||"","all",8);
  if(current.length===1){
   const c=current[0];track(c.slug,c.status,"home");
   root.location.assign("/cities/"+encodeURIComponent(c.slug)+".html");
  }else{input.focus();paint();}
 });
 input.addEventListener("focus",paint);
 input.addEventListener("input",paint);
 state?.addEventListener("change",()=>{paint();input.focus();});
 input.addEventListener("keydown",e=>{
  if(e.key==="Escape"){setOpen(false);return;}
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){
   e.preventDefault();if(!open)paint();
   if(view.length){selected=e.key==="ArrowDown"?(selected+1)%view.length:(selected-1+view.length)%view.length;mark();}
  }else if(e.key==="Enter"&&open&&view.length){
   e.preventDefault();const c=view[selected<0?0:selected];track(c.slug,c.status,"home");root.location.assign("/cities/"+encodeURIComponent(c.slug)+".html");
  }
 });
 doc.addEventListener("pointerdown",e=>{if(!rootEl.contains(e.target))setOpen(false);});
}
function setupDirectory(cities){
 const filter=doc.querySelector("[data-directory-filter]");if(!filter)return;
 const input=filter.querySelector("[data-directory-query]"),state=filter.querySelector("[data-directory-state]"),status=filter.querySelector("[data-directory-status]");
 const counter=filter.querySelector("[data-directory-count]"),empty=doc.querySelector("[data-directory-empty]");
 const cards=[...doc.querySelectorAll("[data-city-row]")],groups=[...doc.querySelectorAll("[data-city-group]")];
 populateStates(state,cities);
 function apply(){
  const matched=filterCities(cities,input?.value||"",state?.value||"",status?.value||"all");
  const included=new Set(matched.map(c=>c.slug));
  let shown=0;
  for(const card of cards){const visible=included.has(card.dataset.city);card.hidden=!visible;if(visible)shown++;}
  for(const group of groups){group.hidden=![...group.querySelectorAll("[data-city-row]")].some(el=>!el.hidden);}
  if(empty)empty.hidden=shown!==0;
  if(counter)counter.textContent=shown+" "+(shown===1?"city":"cities")+" shown of "+cities.length;
 }
 input?.addEventListener("input",apply);state?.addEventListener("change",apply);status?.addEventListener("change",apply);
 filter.querySelector("[data-directory-reset]")?.addEventListener("click",()=>{if(input)input.value="";if(state)state.value="";if(status)status.value="all";apply();input?.focus();});
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
