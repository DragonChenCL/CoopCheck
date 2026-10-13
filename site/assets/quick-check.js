(function(){
  "use strict";
  const API=window.CoopQuickCheck;
  if(!API)return;
  document.querySelectorAll("[data-quick-check]").forEach((host)=>{
    const prefix=host.dataset.quickCheck==="planner"?"plannerQuick":"homeQuick";
    const available=API.slugs.map(s=>({slug:s,name:API.cities[s].city+", "+API.cities[s].state}));
    const defaultCity=new URLSearchParams(location.search).get("city");
    const selected=API.cities[defaultCity]?defaultCity:"portland-or";
    host.innerHTML=`
    <div class="cc-qc-shell">
      <div class="cc-qc-heading"><div><span class="cc-qc-eyebrow">STEP 1 · FREE INSTANT SCREENING</span>
      <h2>Can I keep these chickens in my city?</h2>
      <p>Check the basic flock number first. No address, account, or map drawing needed.</p></div>
      <span class="cc-qc-icon" aria-hidden="true">🐓</span></div>
      <form class="cc-qc-form" novalidate>
        <div class="cc-qc-field cc-qc-city"><label for="${prefix}City">City</label><select id="${prefix}City" name="city" required>
        ${available.map(c=>`<option value="${c.slug}" ${c.slug===selected?"selected":""}>${c.name}</option>`).join("")}
        </select></div>
        <div class="cc-qc-field"><label for="${prefix}Count">Number of hens</label><input id="${prefix}Count" type="number" min="1" max="100000" step="1" inputmode="numeric" name="hens" value="4" required></div>
        <div class="cc-qc-field"><label for="${prefix}Lot">Lot size <small>(sq ft · optional)</small></label><input id="${prefix}Lot" type="number" min="1" max="100000000" step="1" inputmode="numeric" name="lot" placeholder="e.g. 8,000"></div>
        <div class="cc-qc-actions"><label class="cc-qc-rooster"><input name="rooster" type="checkbox"><span>Planning to keep a rooster?</span></label><button type="submit" class="btn cc-qc-submit">Check flock rules →</button></div>
      </form>
      <div class="cc-qc-result" role="status" aria-live="polite" hidden></div>
      <p class="cc-qc-footnote">Screening only. A result never certifies compliance: zoning, permits, neighboring structures, flock mix, lot boundaries and private rules may matter. Only five cities are available in this pilot.</p>
    </div>`;
    const form=host.querySelector("form"),output=host.querySelector(".cc-qc-result");
    const citySelect=form.elements.city;
    function render(res){
      output.hidden=false;
      output.className="cc-qc-result cc-qc-"+res.kind;
      output.replaceChildren();
      const heading=document.createElement("h3");heading.textContent=res.title;output.appendChild(heading);
      const copy=document.createElement("p");copy.textContent=res.details;output.appendChild(copy);
      if(res.city&&res.kind!=="invalid"){
        const intro=document.createElement("strong");intro.className="cc-qc-checklist-label";intro.textContent="Still check before you build:";output.appendChild(intro);
        const ul=document.createElement("ul");for(const line of res.notes){const li=document.createElement("li");li.textContent=line;ul.appendChild(li);}output.appendChild(ul);
        const actions=document.createElement("div");actions.className="cc-qc-links";
        const rules=document.createElement("a");rules.href=host.dataset.basePath+"cities/"+res.slug+".html";rules.textContent="Full city guide ↗";rules.className="btn secondary";actions.appendChild(rules);
        const source=document.createElement("a");source.href=res.source;source.target="_blank";source.rel="noopener noreferrer";source.textContent="Read city source ↗";actions.appendChild(source);
        const plan=document.createElement("a");plan.href=(host.dataset.basePath||"")+"planner.html?city="+encodeURIComponent(res.slug)+(host.dataset.quickCheck==="planner"?"#map": "");plan.textContent="Continue to the map planner →";plan.className="cc-qc-plan";plan.addEventListener("click",()=>window.coopTrack?.("quick_check_planner_click",{city_slug:res.slug,quick_check_result:res.kind,quick_check_location:host.dataset.quickCheck}));actions.appendChild(plan);output.appendChild(actions);
        window.coopTrack?.("quick_check_submit",{city_slug:res.slug,quick_check_result:res.kind,quick_check_location:host.dataset.quickCheck,hen_count:res.henCount});
      }
    }
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const result=API.evaluate({slug:citySelect.value,hens:form.elements.hens.value,lotSqFt:form.elements.lot.value,rooster:form.elements.rooster.checked});
      render(result);
    });
    citySelect.addEventListener("change",()=>{
      output.hidden=true;
      if(host.dataset.quickCheck==="planner"&&document.getElementById("city")){
        const planner=document.getElementById("city");
        if([...planner.options].some(o=>o.value===citySelect.value)){planner.value=citySelect.value;planner.dispatchEvent(new Event("change",{bubbles:true}));}
      }
    });
  });
})();
