/* Source-reviewed quick screening for five benchmark cities. Not parcel-specific legal approval. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.CoopQuickCheck=api;
})(typeof window!=="undefined"?window:null,function(){
  "use strict";
  const cities={
  "portland-or": {
    "city": "Portland",
    "state": "OR",
    "scope": "Portland City Code, small domestic fowl (including chickens)",
    "primary": "https://www.portland.gov/code/13/40/020",
    "rules": "https://www.portland.gov/code/13/40",
    "notice": "Adult and young small domestic fowl count differently; qualifying agricultural-use exceptions and other zoning rules require manual review.",
    "placement": "Structures: 3 ft from side/rear property lines; 10 ft from front property line. On multi-unit lots an additional 15-ft rule applies.",
    "permit": "No standard livestock-keeping permit under city guidance; building or zoning permits may still apply.",
    "rooster": "Roosters prohibited outside qualifying agricultural uses.",
    "area": "At least 10 sq ft usable shelter or pen area per fowl over 12 weeks of age.",
    "verifiedFields": [
      "max",
      "roosters",
      "placement"
    ]
  },
  "austin-tx": {
    "city": "Austin",
    "state": "TX",
    "scope": "Adopted Austin Ordinance 20221013-030 (effective October 24, 2022), City Code §3-2-16; not parcel-wide clearance",
    "primary": "https://services.austintexas.gov/edims/document.cfm?id=396841",
    "rules": "https://services.austintexas.gov/edims/document.cfm?id=396841",
    "notice": "The examined fowl-enclosure provision does not set a universal hen cap or an automatic rooster permission/ban or building-permit waiver. Check zoning, adjacent buildings, nuisance rules, local construction approvals, and your parcel.",
    "placement": "Austin City Code §3-2-16(D) requires all fowl enclosures (no 2-bird trigger) to be at least 30 ft from an adjacent residence or business structure other than the keeper’s own. §3-2-16(E) requires 50 ft if the fowl or enclosure creates a health hazard. These distances are to buildings, not property lines.",
    "permit": "§3-2-16(A) requires secure four-sided enclosures with overhead cover; this provision does not independently decide a separate building/keeping permit or zoning approval.",
    "rooster": "The checked enclosure law does not establish citywide permission or a categorical rooster ban; Austin animal/noise requirements and site rules still apply.",
    "area": "The enclosure must meet current Code §3-2-11 housing and §3-2-16 fowl enclosure requirements; confirm usable area, distances and zoning on the parcel.",
    "verifiedFields": [
      "placement"
    ]
  },
  "arlington-tx": {
    "city": "Arlington",
    "state": "TX",
    "scope": "Arlington §5.02 municipal chicken count overview",
    "primary": "https://www.arlingtontx.gov/News-Articles/2025/March/Egg-xactly-How-Many-Chickens-Can-You-Own-in-Arlington-Anyway",
    "rules": "https://www.arlingtontx.gov/News-Articles/2025/March/Egg-xactly-How-Many-Chickens-Can-You-Own-in-Arlington-Anyway",
    "notice": "Published city guidance overlaps at exactly 10 birds; 5+ birds also require lot-size and dwelling-distance conditions. Confirm exact borderline cases with the city.",
    "placement": "Up to 4 chickens: no extra lot-size/distance test in the city poultry count guide. For 5+ birds, 50 ft to the nearest dwelling and lot-size tiers apply.",
    "permit": "Poultry-count article does not establish building/accessory-structure permits; check independently.",
    "rooster": "Roosters prohibited except agricultural zoning.",
    "area": "Check lot acreage: city flock tiers include <½ acre, >½ acre and >1 acre.",
    "verifiedFields": [
      "max",
      "roosters",
      "placement"
    ]
  },
  "denver-co": {
    "city": "Denver",
    "state": "CO",
    "scope": "Denver Food-Producing Animals permit and city-issued information packet",
    "primary": "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Animal-Shelter/Animal-Protection/Animal-Ordinances-and-Legislation",
    "rules": "https://www.denvergov.org/content/dam/denvergov/Portals/682/documents/Animal%20Protection/FoodProducingAnimals_InfoPacket.pdf",
    "notice": "Eight-bird limit counts hens and ducks together; this quick check asks for hens only. Shelter/zoning approvals require separate review; distances to adjacent dwellings are not automatically calculated.",
    "placement": "City-issued FPA packet p.1: minimum 16 sq ft permeable space per bird, with shelter and permeable area in rear 50% of zone lot. Detailed structure permitting: packet p.2.",
    "permit": "One-time $25 Food-Producing Animals permit per property for this program.",
    "rooster": "No roosters or drakes under the FPA program.",
    "area": "At least 16 sq ft permeable ground per bird (not paved floor), plus separately suitable shelter.",
    "verifiedFields": [
      "max",
      "roosters",
      "permit"
    ]
  },
  "seattle-wa": {
    "city": "Seattle",
    "state": "WA",
    "scope": "Seattle SDCI animal-code overview and Tip 244 (verify any recent code changes)",
    "primary": "https://www.seattle.gov/construction-and-inspections/codes/common-code-questions/animal-codes",
    "rules": "https://www.seattle.gov/DPD/publications/CAM/cam244.pdf",
    "notice": "Extra birds on qualifying lots over 10,000 sq ft require community-garden/urban-farm conditions; lot size alone is not enough. Tip 244 may be older than the operative code.",
    "placement": "SDCI Tip 244 p.1: fowl structures at least 10 ft from a residential structure on an adjacent lot, not automatically 10 ft from the lot line.",
    "permit": "The animal-code overview does not state a universal chicken permit; building and zoning approvals must be reviewed separately.",
    "rooster": "Roosters prohibited.",
    "area": "Larger-lot exceptions have additional use conditions; do not assume acreage alone grants more birds.",
    "verifiedFields": [
      "max",
      "roosters",
      "placement"
    ]
  }
};
  const slugs=["portland-or","austin-tx","arlington-tx","denver-co","seattle-wa"];
  function evaluate(input){
    const x=input||{};
    const slug=String(x.slug||"");
    const c=cities[slug];
    if(!c)return {kind:"review",title:"Choose one of the five supported cities.",details:"This simple check cannot give conclusions for other locations.",notes:[],city:null};
    const n=Number(x.hens),lot=(x.lotSqFt===null||x.lotSqFt===undefined||x.lotSqFt==="")?null:Number(x.lotSqFt);
    if(!Number.isSafeInteger(n)||n<1||n>100000)return {kind:"invalid",title:"Enter a valid number of hens.",details:"Use a positive whole number.",notes:[],city:c};
    if(lot!==null&&(!Number.isFinite(lot)||lot<1||lot>100000000))return {kind:"invalid",title:"Check your lot-size input.",details:"Enter square feet greater than zero, or leave the field blank.",notes:[],city:c};
    const roo=x.rooster===true;
    let kind="review",title="More city or property checks needed.",details="";
    if(slug==="portland-or"){
      const max=lot!==null&&lot>=10000?6:4;
      if(roo){kind="over";title="Roosters are restricted under the standard rule.";details=c.rooster;}
      else if(n<=max){kind="within";title="Within the standard small-fowl count tier.";details="The basic tier is "+max+" adult small fowl for this lot-size information. Count ducks and other small fowl together; youth-bird and agricultural exceptions need separate review.";}
      else if(lot===null&&n<=6){details="Four fowl are allowed on any lot; six may be possible if the lot is at least 10,000 sq ft. Enter lot size to screen the standard tier.";}
      else if(lot!==null&&lot>=20000){details="Above the standard six-bird tier. Some 20,000+ sq-ft lots may qualify for an agricultural-use exception; acreage alone is insufficient.";}
      else{kind="over";title="Above the standard small-fowl count for this lot tier.";details="The published standard limit is "+max+" small fowl; confirm age and any qualifying exception with the city.";}
    }else if(slug==="austin-tx"){
      details="The checked City Code §3-2-16 does not establish a universal numeric hen cap. It requires all fowl enclosures (including for one bird) to be at least 30 ft from an adjacent residence or business structure other than the keeper’s own; 50 ft applies if the fowl or enclosure creates a health hazard. These are building separations, NOT property-line setbacks.";
      if(roo)details+=" Rooster rules still require current code review.";
    }else if(slug==="arlington-tx"){
      if(roo){title="Roosters require agricultural zoning.";details="Roosters are prohibited under the ordinary residential rule. Check parcel zoning before relying on an exception.";}
      else if(n<=4){kind="within";title="Within the four-chicken small-flock tier.";details="The city describes up to four confined chickens without its additional distance or lot-size requirements; other property and structure rules remain.";}
      else{details="Five or more birds trigger distance-to-dwelling and lot-size conditions. City-published ranges overlap at ten birds, so no automated approval can be given. Check acreage and nearest dwelling distance.";}
    }else if(slug==="denver-co"){
      if(roo){kind="over";title="Roosters prohibited under Denver FPA.";details="The FPA program allows hens/ducks but no roosters or drakes.";}
      else if(n>8){kind="over";title="Above Denver's eight-bird FPA limit.";details="Denver counts hens and ducks together; this tool has screened only the hens entered.";}
      else{kind="within";title="Within Denver's basic hen-count ceiling.";details=n+" hens require at least "+(n*16)+" sq ft of permeable area under the city packet, in the rear half of the zone lot. Denver also requires a $25 FPA permit. Ducks count toward the same eight-bird limit.";}
    }else if(slug==="seattle-wa"){
      if(roo){kind="over";title="Roosters are prohibited in Seattle.";details="Seattle's city animal-code guidance expressly prohibits roosters.";}
      else if(n<=8){kind="within";title="Within Seattle's basic eight-fowl count.";details="Eight domestic fowl is the general allowance; qualifying larger-lot exceptions and coop placement remain separate.";}
      else if(lot!==null&&lot<=10000){kind="over";title="Above Seattle's ordinary eight-fowl limit.";details="The additional-fowl condition described in Tip 244 applies only above 10,000 sq ft and with qualifying garden/farm use.";}
      else{details="More than eight domestic fowl may be possible only on qualifying lots over 10,000 sq ft with community-garden/urban-farm use. A big lot alone does not automatically qualify.";}
    }
    return {kind,title,details,notes:[c.rooster,c.permit,c.placement,c.notice],city:c,slug,henCount:n,source:c.primary,source2:c.rules};
  }
  return {cities,slugs,evaluate};
});
