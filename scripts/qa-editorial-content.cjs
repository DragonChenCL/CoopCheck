'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const {KEYS,isChecked}=require('./lib/city-editorial.cjs');
const thinCityNotes=require('./data/thin-city-cases.json').cases;
const lastmodStates=new Set(['AZ','CA','CO','OR','WA','TX']);
const focusedResearch=new Set(['dallas-tx','lakewood-co','corvallis-or','bend-or','bellevue-wa']);
const cityLastmod=c=>lastmodStates.has(c.state)?'2026-11-02':thinCityNotes[c.slug]?'2026-10-22':(c.slug==='portland-or'||focusedResearch.has(c.slug))?'2026-10-21':'2026-10-17';
const {entries,footprints}=require('./data/decision-guides.cjs');
const reg=JSON.parse(read('site/data/cities.json')),ev=JSON.parse(read('site/data/policy-evidence.json')).cities;
const sitemap=read('site/sitemap.xml');let pending=0;
for(const c of reg.cities){
 const h=read('site/cities/'+c.slug+'.html'),id='local-inquiry-'+c.slug;
 assert.equal((h.match(new RegExp('id="'+id+'"','g'))||[]).length,1,'one editable local enquiry: '+c.slug);
 assert(h.includes('data-ed-copy="'+id+'"')&&h.includes('for="'+id+'"'),'accessible copy target '+c.slug);
 assert(h.includes('Nothing on this page submits your address or enquiry.'),'no automatic outreach '+c.slug);
 const count=KEYS.filter(k=>isChecked(c,ev[c.slug],k)).length;
 assert(h.includes(count+' of 4 fields have a recorded primary-clause check.'),'honest field count '+c.slug);
 assert(h.includes('The edit date is not a new verification of the local law.'),'do not launder source dates '+c.slug);
 if(c.audit.status==='needs_review'){
  pending++;assert(/content="noindex,follow"/.test(h));assert(!sitemap.includes('/cities/'+c.slug+'.html'));
 }else assert(sitemap.includes('/cities/'+c.slug+'.html</loc><lastmod>'+cityLastmod(c)+'</lastmod>'),'page-specific sitemap lastmod '+c.slug);
}
assert.equal(pending,12,'pending research is not promoted during an editorial rewrite');
const slugs=Object.keys(entries).map(n=>'coop-size-for-'+n+'-chickens');
const heads=new Set();
for(const slug of [...slugs,...Object.keys(footprints)]){
 const h=read('site/guides/'+slug+'.html');heads.add(h.match(/<h1>(.*?)<\/h1>/)[1]);
 assert(!h.includes('1 nest boxes'),'grammatical rounding output');
 assert(h.includes('Virginia Cooperative Extension')&&h.includes('Oregon State University Extension'));
 assert(h.includes('hypothetical')||h.includes('example')||h.includes('not a claim'),'worked examples must not impersonate testing');
}
assert.equal(heads.size,9,'nine distinct decision headings');
const examples={
 'coop-size-for-4-chickens':['14 sq ft','22 sq ft','opening'],
 'coop-size-for-6-chickens':['16 sq ft','24 sq ft','60 sq ft'],
 'coop-size-for-8-chickens':['26.25','5.75','42','90'],
 'coop-size-for-10-chickens':['40 ft','50 ft','300 sq ft'],
 'coop-size-for-12-chickens':['42 sq ft','58 sq ft'],
 'coop-size-for-16-chickens':['48 square feet','64 sq ft','150']
};
for(const [slug,needles]of Object.entries(examples)){const h=read('site/guides/'+slug+'.html');for(const n of needles)assert(h.includes(n),slug+': preserve worked result '+n);}
assert.equal((48-6)*(96-6)/144,26.25);assert.equal(32-26.25,5.75);assert.equal(2*(5+20),50);assert.equal(50*6,300);assert.equal(6*8-6,42);assert.equal(8*8-6,58);assert.equal(8*8-2*8,48);assert.equal(15*7+45,150);
for(const state of ['arizona','california','colorado','oregon','washington','texas']){
 const h=read('site/states/'+state+'.html');assert(h.includes('class="city-comparison"'));assert(h.includes('Field checked'));assert(h.includes('local enquiry worksheet'));assert(h.includes('manual measurement sketch'));
}
const about=read('site/about.html');assert(about.includes('AI-assisted')&&about.includes('We do not claim an expert credential'));assert(about.includes('seller-reported'));
const js=read('site/assets/editorial.js');assert(!/fetch\(|localStorage|sessionStorage|sendBeacon/.test(js),'enquiry copy has no storage or transmission');
assert(read('site/assets/editorial.css').includes('.cc-home .section-head{flex-wrap:wrap}'),'mobile heading wrap');
console.log('PASS: 100 local enquiry worksheets, 12 noindex guards, nine distinct decisions, arithmetic, source scope and six state matrices.');
