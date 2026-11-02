(function(){
  const MEASUREMENT_ID="G-FF130M09C3";

  // Explicit operator mode is resolved before loading Google Analytics, so QA
  // page views and tool events never enter the very small acquisition sample.
  const INTERNAL_KEY="coopcheck:analytics-internal";
  const internalFlag=new URLSearchParams(location.search).get("cc_internal");
  let internal=false,persistent=false;
  try{
    internal=localStorage.getItem(INTERNAL_KEY)==="1";
    persistent=internal;
  }catch(_){}
  if(internalFlag==="1"||internalFlag==="0"){
    internal=internalFlag==="1";
    persistent=false;
    try{
      if(internal)localStorage.setItem(INTERNAL_KEY,"1");
      else localStorage.removeItem(INTERNAL_KEY);
      persistent=true;
    }catch(_){}
  }
  window.CoopAnalytics=Object.freeze({internal,persistent});
  if(internal){
    window["ga-disable-"+MEASUREMENT_ID]=true;
    window.coopTrack=function(){return false;};
    function showInternalMode(){
      if(document.querySelector("[data-coopcheck-internal]")||!document.body)return;
      const notice=document.createElement("aside");
      notice.dataset.coopcheckInternal="1";
      notice.className="no-print";
      notice.setAttribute("role","status");
      notice.style.cssText="position:fixed;bottom:12px;left:12px;z-index:10000;max-width:calc(100vw - 24px);box-sizing:border-box;padding:10px 14px;border:1px solid #a16207;border-radius:8px;background:#fef3c7;color:#422006;font:13px/1.5 system-ui,sans-serif;box-shadow:0 2px 8px #0002";
      notice.textContent=persistent?"Internal testing: analytics paused for this browser. ":"Internal testing: analytics paused on this page only; browser storage is unavailable. ";
      const resume=document.createElement("a");
      const url=new URL(location.href);
      url.searchParams.set("cc_internal","0");
      resume.href=url.href;
      resume.textContent="Resume analytics";
      resume.style.cssText="color:#713f12;text-decoration:underline;font-weight:600";
      notice.appendChild(resume);
      document.body.appendChild(notice);
    }
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",showInternalMode,{once:true});
    else showInternalMode();
    return;
  }

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
  if(location.pathname.endsWith("/report.html")){
    window.coopTrack("paid_report_offer_view",{offer_sku:"permit-report"});
  }

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

    const allowed=new Set(["paid_report_offer_click","paid_report_sample_click","paid_report_planner_click"]);
    const eventName=a.dataset?.ccEvent;
    if(allowed.has(eventName)){
      window.coopTrack(eventName,{offer_sku:"permit-report",source_page:location.pathname});
    }

    if(location.pathname.endsWith("/guides/prefab-chicken-coop-buying-guide.html")){
      try {
        const target=new URL(a.href,location.href);
        if(["www.tractorsupply.com","www.aosom.com"].includes(target.hostname)){
          window.coopTrack("buyer_product_source_click",{
            outbound_host:target.hostname,
            product_source:a.textContent.trim().slice(0,80),
            referral_type:"non_affiliate_primary_source"
          });
        }
      } catch (_) {}
    }
    // Budget intent: distinguish genuine reader transitions to the estimate tool
    // from article page views and external similarly named links.
    if(location.pathname==="/guides/prefab-chicken-coop-buying-guide.html"){
      try{
        const dest=new URL(a.href,location.href);
        if(dest.origin===location.origin&&dest.pathname==="/guides/chicken-coop-cost-calculator.html"){
          window.coopTrack("buyer_budget_calculator_click",{
            source_page:location.pathname,
            destination_page:dest.pathname,
            funnel_step:"buyer_research_to_cost_estimate"
          });
        }
      }catch(_){}
    }
    // Reader-service funnel: buying guide -> free, source-based capacity checker.
    // This measures a meaningful transition rather than treating a page view as a conversion.
    if(location.pathname==="/guides/prefab-chicken-coop-buying-guide.html"){
      try{
        const dest=new URL(a.href,location.href);
        if(dest.origin===location.origin&&dest.pathname==="/guides/prefab-chicken-coop-capacity-checker.html"){
          window.coopTrack("buyer_guide_checker_click",{
            source_page:location.pathname,
            destination_page:dest.pathname,
            funnel_step:"buyer_guide_to_free_checker"
          });
        }
      }catch(_){}
    }
    // Search Console intent experiment: did readers move from city-limit facts
    // to a specific city's source-reviewed profile? Only same-origin city links
    // with an explicit homepage marker qualify; external citations do not.
    if(location.pathname==="/"&&a.dataset?.ccEvent==="city_limits_city_click"){
      try{
        const dest=new URL(a.href,location.href);
        if(dest.origin===location.origin&&dest.pathname.startsWith("/cities/")&&dest.pathname.endsWith(".html")){
          window.coopTrack("city_limits_city_click",{
            source_page:location.pathname,
            destination_page:dest.pathname,
            funnel_step:"city_limits_answer_to_profile"
          });
        }
      }catch(_){}
    }
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
