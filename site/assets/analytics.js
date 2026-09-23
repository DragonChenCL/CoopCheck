(function(){
  const MEASUREMENT_ID="G-FF130M09C3";

  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};

  if(!document.querySelector('script[data-coopcheck-ga]')){
    const s=document.createElement("script");
    s.async=true;
    s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(MEASUREMENT_ID);
    s.dataset.coopcheckGa="1";
    document.head.appendChild(s);
  }

  window.gtag("js",new Date());
  window.gtag("config",MEASUREMENT_ID);

  function context(){
    const path=location.pathname;
    const cityMatch=path.match(/\/cities\/([^/]+)\.html$/);
    const stateMatch=path.match(/\/states\/([^/]+)\.html$/);
    return {
      page_path:path,
      city_slug:cityMatch?cityMatch[1]:undefined,
      state_slug:stateMatch?stateMatch[1]:undefined
    };
  }

  window.coopTrack=function(name,params){
    const base=context();
    const payload=Object.assign({},base,params||{});
    Object.keys(payload).forEach(k=>payload[k]===undefined&&delete payload[k]);
    window.gtag("event",name,payload);
  };

  const ctx=context();

  if(location.pathname.endsWith("/planner.html")){
    window.coopTrack("planner_open");
  }else if(ctx.city_slug){
    window.coopTrack("city_page_view",{city_slug:ctx.city_slug});
  }else if(ctx.state_slug){
    window.coopTrack("state_page_view",{state_slug:ctx.state_slug});
  }

  document.addEventListener("click",function(e){
    const a=e.target.closest&&e.target.closest("a");
    if(!a)return;

    const href=a.getAttribute("href")||"";
    const text=(a.textContent||"").trim().replace(/\s+/g," ").slice(0,100);

    if(/planner\.html(?:\?|$)/.test(href)){
      window.coopTrack(
        ctx.city_slug?"city_to_planner_click":"planner_click",
        {link_text:text,source_page:location.pathname,city_slug:ctx.city_slug}
      );
    }

    try{
      const u=new URL(a.href,location.href);
      const isOfficialSource=
        a.id==="source"||
        !!a.closest(".source-box")||
        /official/i.test(text);
      if(/^https?:$/.test(u.protocol)&&u.hostname!==location.hostname&&isOfficialSource){
        window.coopTrack("official_source_click",{
          link_text:text,
          outbound_host:u.hostname,
          source_page:location.pathname,
          city_slug:ctx.city_slug
        });
      }
    }catch(_){}
  },true);
})();