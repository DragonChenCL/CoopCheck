(function(){
  const root=document.querySelector("[data-city-cards]");
  if(!root)return;
  root.innerHTML=(window.COOP_CITIES||[]).map(c=>
    '<article class="card">'+
      '<span class="pill">Official source checked</span>'+
      '<h3 style="margin-top:12px">'+c.name+', '+c.state+'</h3>'+
      '<div class="meta">'+
        '<span><strong>Chicken limit:</strong> '+c.max+'</span>'+
        '<span><strong>Verified:</strong> '+c.verified+'</span>'+
      '</div>'+
      '<a class="btn secondary" href="cities/'+c.slug+'.html">View local rules</a>'+
    '</article>'
  ).join("");
})();