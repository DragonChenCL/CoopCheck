/* Pure city-rule matching: fail closed when the geocoder cannot prove both city and state. */
(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.CoopRules=api;
})(typeof window!=="undefined"?window:null,function(){
  const states={AZ:"Arizona",CA:"California",CO:"Colorado",OR:"Oregon",WA:"Washington",TX:"Texas"};
  const normal=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g,"");
  function cityFromGeocode(feature,cities){
    const props=feature&&feature.properties||{},ctx=props.context||{};
    const place=(ctx.place&&ctx.place.name)||(props.feature_type==="place"&&props.name)||"";
    const region=ctx.region||{};
    const raw=String(region.region_code||region.short_code||region.name||"").toUpperCase();
    const state=raw.slice(-2);
    if(!place||!states[state]||!Array.isArray(cities))return null;
    return cities.find(c=>normal(c.name)===normal(place)&&String(c.state).toUpperCase()===state)||null;
  }
  function scopeLabel(city){
    if(!city)return "No supported city verified";
    return city.name+", "+city.state;
  }
  return {cityFromGeocode,scopeLabel};
});
