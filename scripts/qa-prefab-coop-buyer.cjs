/* Independent buyer comparison: arithmetic, source scoping, offline UI and SEO gates */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const api=require('../site/assets/prefab-capacity.js');
assert.equal(api.PRODUCTS.length,3);
assert.equal(new Set(api.PRODUCTS.map(x=>x.id)).size,3);
assert.deepEqual(api.PRODUCTS.map(x=>x.id),['cabana','guardian','pawhut']);
assert.equal(api.SOURCE,'https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design');
assert.equal(api.benchmark(6,true).minimum,18);
assert.equal(api.benchmark(6,false).minimum,48);
assert.equal(api.benchmark(4,true).minimum,12);
assert.equal(api.benchmark(4,false).minimum,32);
assert.equal(api.benchmark(0,true),null);
assert.equal(api.benchmark(25,false),null);
assert.equal(api.benchmark(2.5,true),null);
assert.equal(api.calculateArea(62.59,39.37,'in'),17.11);
assert.equal(api.calculateArea(5,4,'ft'),20);
assert.equal(api.calculateArea(0,4,'ft'),null);
assert.equal(api.calculateArea('nonsense',4,'ft'),null);
assert.equal(api.calculateArea(100,100,'parsec'),null);
assert.equal(api.analyze(api.PRODUCTS[0],6,true).status,'below');
assert.equal(api.analyze(api.PRODUCTS[0],6,true).gap,-2.46);
assert.equal(api.analyze(api.PRODUCTS[0],5,true).status,'reference-met');
assert.equal(api.analyze(api.PRODUCTS[0],6,false).status,'below');
assert.equal(api.analyze(api.PRODUCTS[1],6,true).indoor,17.11);
assert.equal(api.analyze(api.PRODUCTS[1],6,true).run,null,'Guardian run area must stay unknown');
assert.equal(api.analyze(api.PRODUCTS[2],4,true).status,'below');
assert.equal(api.analyze(api.PRODUCTS[2],4,true).run,0,'PawHut run not included');
assert.equal(api.analyze({indoor:null,run:null},6,true).status,'unknown','Missing specs must not become zero or guessed');
assert.equal(api.analyze(null,6,true),null);
assert.equal(api.analyze(api.PRODUCTS[0],6.5,true),null);
for(const item of api.PRODUCTS){
  assert(item.source.startsWith('https://'),'Official supplier source for '+item.id);
  assert(item.indoorEvidence.length>15,'Describe the original evidence');
  assert(api.sellerQuestion(item).includes('clear usable INTERIOR'),'Seller questions must request actual measurements');
}
const h=read('site/guides/prefab-chicken-coop-capacity-checker.html');
assert(h.includes('<link rel="canonical" href="https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html">'));
assert(h.includes('name="robots" content="index,follow"'));
assert(h.includes('/assets/prefab-capacity.js?v=20261015-1'));
assert(h.includes('/assets/prefab-capacity.css?v=20261015-1'));
for(const id of ['bcFlock','bcOutdoor','bcResults','bcBar','bcCopyQuestion','bcPrint','bcCustomFields','bcCustomLength','bcCustomWidth','bcCustomRunLength','bcCustomRunWidth','bcCustomName','bcUnit','bcRunEvidence','bcSellerSource'])
  assert(h.includes('id="'+id+'"'),'Required form/control ID '+id);
for(const id of api.PRODUCTS.map(x=>x.id).concat('custom'))
  assert(h.includes('data-bc-pick="'+id+'"'),'Required interactive model control '+id);
for(const v of ['15.54','75.1','17.11','8.18','not a complete housing assessment','No affiliate links','Oregon State University Extension'.toLowerCase()]){
  assert(h.toLowerCase().includes(v.toLowerCase()),'Page must communicate scope '+v);
}
assert(h.includes('No affiliate links')||h.toLowerCase().includes('no affiliate links'));
assert(h.includes('/guides/chicken-coop-size-calculator.html'));
assert(h.includes('/coop-plan.html'));
const css=read('site/assets/prefab-capacity.css');
assert(css.includes('@media(max-width:700px)')&&css.includes('@media print'),'Mobile and print styles');
assert(css.includes('prefers-reduced-motion'),'Reduced motion support');
const sitemap=read('site/sitemap.xml');
const url='https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html';
assert.equal(sitemap.split('<loc>'+url+'</loc>').length-1,1);
assert(sitemap.includes('<loc>'+url+'</loc><lastmod>2026-10-15</lastmod>'));
assert(read('site/index.html').includes('href="guides/prefab-chicken-coop-capacity-checker.html"'));
console.log('PASS: sourced prefab products, scenario arithmetic, invalid inputs, unknown run, buyer controls, mobile/print and canonical sitemap');
