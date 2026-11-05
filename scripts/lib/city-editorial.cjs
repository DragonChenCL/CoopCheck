'use strict';
const {DATE,esc,withAssets,replaceBlock}=require('./editorial-content.cjs');
const KEYS=['max','roosters','permit','placement'];
const LABELS={max:'Flock and lot eligibility',roosters:'Roosters and other counted animals',permit:'Keeping and construction approvals',placement:'What the distance is measured to'};
function isChecked(c,e,key){return c.audit.status!=='needs_review'&&e?.[key]?.status==='primary_clause_checked'&&e[key].verifiedClaim!==false;}
function followup(c,e,key){
 const text=String(c[key]||'')+' '+String(e?.[key]?.detail||'');
 if(!isChecked(c,e,key))return 'Ask the authority for the operative '+({max:'animal-count and lot-eligibility',roosters:'rooster',permit:'keeping-permit and separate building-approval',placement:'coop/enclosure placement'}[key])+' provision. The recorded evidence does not resolve this field.';
 if(key==='max'){
  if(/no universal|does not.*(?:numeric|numerical)|no.*(?:numeric|numerical).*cap/i.test(text))return 'Ask which zoning, nuisance and site constraints limit this proposal. A missing universal number is not permission for an unlimited flock.';
  if(/rabbit|combined|species|total fowl/i.test(text))return 'List every animal category counted by the cited rule, not just hens. Ask how the combined total and parcel eligibility apply to your household.';
  if(/consent|neighbor|adjoining/i.test(text))return 'Confirm the ordinary allowance separately from any consent-based exception; ask whose written consent is needed and retain it with the proposal.';
  if(/acre|sq.?\s*ft|square|parcel|zoning|lot|zone/i.test(text))return 'Bring the measured parcel area and zoning designation. Ask which row or threshold applies; do not substitute the postal city name for jurisdiction.';
  return 'Ask whether the stated count applies to this address and intended birds, including age, species and any zoning exception.';
 }
 if(key==='roosters'){
  if(/months|weeks|age/i.test(text))return 'Record bird age as well as sex. Ask which age-based restriction applies; do not turn an age threshold into a blanket all-age statement.';
  if(/noise|disturb|nuisance|vocal/i.test(text))return 'Confirm the applicable noise and nuisance conditions; a conditional statement is not an unconditional rooster allowance.';
  return 'Confirm the rule for the proposed birds and zone. A hen allowance does not independently authorize roosters.';
 }
 if(key==='permit'){
  if(/renew|licen[cs]e|annual|registration/i.test(text))return 'Request the keeping/licensing procedure and renewal conditions, then ask separately about the proposed structure, utilities and building approvals.';
  if(/sq|height|feet|ft|utility|electri|plumb/i.test(text))return 'Provide the coop footprint, height and utilities. Ask how the city classifies this structure and which conditions remain even if a building permit is exempt.';
  return 'Separate permission to keep birds from building, zoning and utility approvals. Obtain the applicable procedure for this particular proposal.';
 }
 if(/not.*(?:confirmed|established)|not.*copied|LARGE|large farm/i.test(text))return 'Ask for a chicken-specific or independently applicable structure rule. Do not borrow a livestock distance or use an unconfirmed buffer as a clearance.';
 if(/residen|dwell|habitab/i.test(text)&&/property|lot.line|boundary/i.test(text))return 'Label both boundary and building distances separately. Ask which rule applies to the coop, the run or the whole enclosure and how each distance is measured.';
 if(/residen|dwell|habitab/i.test(text))return 'Locate the relevant neighboring building on the plan. A distance to a fence or lot line does not prove a distance to a dwelling.';
 return 'Mark the legal boundary and the regulated part of the enclosure. Confirm zoning setbacks, easements and any additional structure requirements separately.';
}
function fieldCard(c,key,label,e){
 const fact=e?.[key],known=isChecked(c,e,key),safe=typeof fact?.url==='string'&&/^https:\/\//.test(fact.url);
 return '<article class="cc-law-card ed-evidence-card"><span class="cc-law-label">'+esc(label)+'</span><p class="ed-status '+(known?'ed-known':'ed-unknown')+'">'+(known?'Primary clause recorded':'Not fully confirmed')+'</p><p class="cc-law-answer">'+esc(c[key])+'</p><p class="small">'+(safe?'<a href="'+esc(fact.url)+'" target="_blank" rel="noopener noreferrer">'+esc(fact.section||'Recorded source')+'</a>':esc(fact?.section||'No field-level primary citation established'))+(fact?.checkedAt?' · recorded '+esc(fact.checkedAt):'')+'</p><details class="cc-law-detail"><summary>What to confirm for this proposal</summary><p>'+esc(followup(c,e,key))+'</p></details></article>';
}
function sheet(c,e){
 const known=KEYS.filter(k=>isChecked(c,e,k));
 const missing=KEYS.filter(k=>!isChecked(c,e,k));
 const pending=c.audit.status==='needs_review';
 const prompt=['Subject: '+c.name+', '+c.state+' poultry and proposed coop: address-specific confirmation','',
 'Property address / parcel ID: [fill in]', 'Zoning and measured parcel area: [fill in]',
 'Proposed birds, ages and other counted animals: [fill in]',
 'Coop and run dimensions, height and utilities: [fill in]',
 'Measured distances and objects measured to: [attach drawing]','',
 'Please confirm the following for this proposal, including the currently effective provision:'];
 KEYS.forEach((k,i)=>{prompt.push((i+1)+'. '+LABELS[k]+': '+followup(c,e,k));const x=e?.[k];if(isChecked(c,e,k)&&x?.url)prompt.push('   Recorded reference: '+(x.section||'')+' | '+x.url+' | checked '+(x.checkedAt||'date not recorded'));});
 prompt.push('','Please identify any additional approvals or conditions and the correct official application channel. This worksheet is not an application or a claim of permission.');
 const identifier='local-inquiry-'+c.slug;
 const items=KEYS.map(k=>{
  const x=e?.[k],ok=isChecked(c,e,k);
  return '<li><h3>'+esc(LABELS[k])+'</h3><p>'+esc(followup(c,e,k))+'</p>'+(ok&&x?.section?'<p class="small">Reference to discuss: '+(x.url?'<a href="'+esc(x.url)+'">'+esc(x.section)+'</a>':esc(x.section))+'</p>':'<p class="ed-unknown">Do not treat this unanswered field as permission.</p>')+'</li>';
 }).join('');
 // Registry annotation is shown as a dated research note, not a fresh legal opinion.
 const note=String(c.note||c.audit.note||'').trim();
 const specificNote=note&&!/^2026-10-13 claim-level government official-source update/.test(note)?'<details class="ed-local-note"><summary>Read the recorded '+esc(c.name)+' research caveat</summary><p>'+esc(note)+'</p></details>':'';
 return '<section class="section ed-city-sheet" id="local-verification"><div class="container"><div class="ed-kicker">LOCAL DECISION WORKSHEET · '+esc(c.name.toUpperCase())+', '+esc(c.state)+'</div><h2>'+esc(c.name)+': the questions to resolve before buying or building</h2><p><strong>'+known.length+' of 4 fields have a recorded primary-clause check.</strong> '+(pending?'This entire city profile remains in the research queue and is not offered as a verified ruleset.':missing.length?'Unresolved fields: '+missing.map(k=>esc(LABELS[k])).join('; ')+'.':'All four recorded fields still require an address-specific applicability check.')+'</p><p class="small">Evidence record: '+esc(c.verified||c.audit.reviewedAt||'date not recorded')+'. Worksheet edited '+DATE+'. The edit date is not a new verification of the local law.</p>'+specificNote+'<ol class="ed-actions">'+items+'</ol><details class="ed-inquiry"><summary>Open the '+esc(c.name)+' enquiry worksheet to copy or print</summary><p>Fill in the bracketed details yourself, then send through the authority\'s official channel. Nothing on this page submits your address or enquiry.</p><label for="'+identifier+'">Editable enquiry text</label><textarea id="'+identifier+'" rows="17" spellcheck="false">'+esc(prompt.join('\n'))+'</textarea><button type="button" class="btn secondary" data-ed-copy="'+identifier+'">Copy enquiry text</button><span class="ed-copy-status" role="status" aria-live="polite"></span></details><p><a href="/coop-plan.html?city='+c.slug+'&amp;source=rules">Carry the recorded city context into a concept layout</a> · <a href="/guides/backyard-chicken-permit-site-plan-checklist.html">Prepare dimensions for an official enquiry</a></p></div></section>';
}
function enhanceCity(c,e,html){
 const {citySection}=require('./round2-evidence.cjs');
 const deep=citySection(c.slug);
 if(deep)html=replaceBlock(html,'round2-city-'+c.slug,deep);
 html=withAssets(html);
 const originalIntro='Start with the four essentials below: flock size, roosters, permits and coop location. Open any long rule to read its full conditions and check the linked official sources before acting.';
 if(html.includes(originalIntro)){
  const supported=KEYS.filter(k=>isChecked(c,e,k));
  const key=supported.includes('max')?'max':supported[0];
  const lead=key?String(e[key].detail||c[key]):'The local rule evidence remains unresolved. Use the enquiry worksheet below to obtain an address-specific answer.';
  html=html.replace(originalIntro,esc(lead));
 }
 html=replaceBlock(html,'city-'+c.slug,sheet(c,e));
 if(!html.includes('/assets/editorial.js'))html=html.replace('</head>','<script defer src="/assets/editorial.js?v=20261105-1"></script></head>');
 return html;
}
module.exports={KEYS,LABELS,isChecked,followup,fieldCard,enhanceCity};
