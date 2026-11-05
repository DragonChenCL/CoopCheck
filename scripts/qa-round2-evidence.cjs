'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,'site',p),'utf8');
const x=require('./lib/round2-evidence.cjs');
assert.equal(x.date,'2026-11-05');
assert.equal(x.sqft(34,33),7.79);
assert.equal(x.sqft(58,33),13.29);
assert.equal(x.sqft(41.74,40.35),11.7);
for(const [slug,checks]of Object.entries({
 'prefab-chicken-coop-buying-guide':['7.79 sq ft','13.29 sq ft','11.70 sq ft','overnight roosting','OSU','Tractor Supply'],
 'prefab-chicken-coop-capacity-checker':['7.79 sq ft','11.70 sq ft','unknown','source-by-source buyer analysis'],
 'coop-size-for-8-chickens':['30.03 sq ft','28.11 sq ft','26.25 sq ft','24.44 sq ft','24 sq ft'],
 'coop-size-for-6-chickens':['18 sq ft','48-60 sq ft','7.79 sq ft']
})){
 const h=read('guides/'+slug+'.html');
 assert.equal((h.match(/<!-- EDITORIAL:round2-guide-/g)||[]).length,1,slug+' one deep dive');
 assert(h.includes('EVIDENCE DEEP DIVE'),slug+' evidence context');
 for(const needle of checks)assert(h.includes(needle),slug+' missing '+needle);
 for(const u of [x.source.osu,x.source.omlet,x.source.tsc]){
  if(slug.includes('prefab')&&slug.includes('buying'))assert(h.includes(u),'published source '+u);
 }
 assert(/<link rel="canonical" href="https:\/\/coopcheck.serunio.com\/guides\//.test(h),slug+' canonical');
}
for(const [slug,checks] of Object.entries({
 'portland-or':['9,600 sq ft','10,400 sq ft','40 sq ft','60 sq ft','10 sq ft of usable shelter OR pen area'],
 'san-diego-ca':['60 - 15 - 15 = 30 ft','50-ft residential-building condition','80 sq ft'],
 'sacramento-ca':['$107','$75','$32 difference','twenty feet','15 and 42 sq ft']
})){
 const h=read('cities/'+slug+'.html');
 assert.equal((h.match(/<!-- EDITORIAL:round2-city-/g)||[]).length,1,slug+' one source-linked case');
 assert(h.includes('CITY-SPECIFIC DECISION EXAMPLE'),slug+' case heading');
 for(const needle of checks)assert(h.includes(needle),slug+' missing '+needle);
 assert(!h.includes('guaranteed municipal approval'));
}
const p=read('cities/peoria-az.html');
assert(p.includes('content="noindex,follow"'),'pending-city noindex intact');
assert(!read('sitemap.xml').includes('/cities/peoria-az.html'),'pending-city out of sitemap');
const before=[1,2,3,4].map(t=>Math.round((48-2*t)*(96-2*t)/144*100)/100);
assert.deepEqual(before,[30.03,28.11,26.25,24.44]);
assert.equal(3*20+47,107);
assert.equal(3*15+30,75);
assert.equal(2*(5+20),50);
console.log('PASS: evidence-backed product tables, six-hen scenarios, wall calculation, three local cases and noindex guards.');
