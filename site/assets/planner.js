(function(){
  const C=window.COOP_CITIES||[];
  const $=id=>document.getElementById(id);
  const sel=$("city");
  if(!sel||!C.length)return;

  C.forEach(c=>{
    const o=document.createElement("option");
    o.value=c.slug;
    o.textContent=c.name+", "+c.state;
    sel.appendChild(o);
  });

  const q=new URLSearchParams(location.search);
  sel.value=C.some(c=>c.slug===q.get("city"))?q.get("city"):"portland-or";

  function cur(){return C.find(c=>c.slug===sel.value)||C[0]}

  function apply(){
    const c=cur(),p=c.planner;
    $("sideSetback").value=p.side;
    $("rearSetback").value=p.rear;
    $("frontSetback").value=p.front;
    $("cityRule").innerHTML="<strong>"+c.name+":</strong> "+c.max+" · "+c.roosters+"<br><span class='small'>"+c.placement+" "+c.note+"</span>";
    $("source").href=c.source;
    $("source").textContent="Open official "+c.name+" source ↗";
    $("mode").textContent=p.mode==="property"?"Geometry supported":p.mode==="advisory"?"Advisory geometry":"Manual review";
    $("mode").className="pill "+(p.mode==="property"?"":"warn");
  }

  sel.addEventListener("change",apply);
  $("print")?.addEventListener("click",()=>window.print());

  apply();
})();