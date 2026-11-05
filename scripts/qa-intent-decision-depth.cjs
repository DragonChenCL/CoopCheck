'use strict';
/* Guard falsifiable geometry and source conditions, not just page length. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const {pages}=require('./lib/intent-decision-depth.cjs');
const keys=['chicken-run-size-calculator','chicken-run-fencing-calculator','chicken-nesting-box-calculator','chicken-roost-length-calculator','chicken-coop-cost-calculator','free-chicken-coop-floor-plans'];
const required={
 'chicken-run-size-calculator':['192 sq ft','276 sq ft','43.75%','54 sq ft','extension.psu.edu'],
 'chicken-run-fencing-calculator':['376 sq ft','404 sq ft','1.88 rolls','theoretical lower bound','extension.uconn.edu'],
 'chicken-nesting-box-calculator':['ceil(13 ÷ 4)','three to four','12–15 inches','extension.usu.edu'],
 'chicken-roost-length-calculator':['64 inches','72 inches','not</strong> published clearance requirements','extension.unh.edu'],
 'chicken-coop-cost-calculator':['$1000','$150','$1150','$1650','hypothetical quotation worksheet','extension.umn.edu'],
 'free-chicken-coop-floor-plans':['9 × 8 ft','5 × 12 ft','72 sq ft','60 sq ft','not</strong> the same','extension.oregonstate.edu']
};
assert.deepEqual(Object.keys(pages).sort(),keys.slice().sort());
const sitemap=fs.readFileSync(path.join(ROOT,'site/sitemap.xml'),'utf8');
for(const slug of keys){
 const h=fs.readFileSync(path.join(ROOT,'site/guides',slug+'.html'),'utf8');
 assert(h.includes('<section class="cs-panel id-depth"'),'actual decision-section in '+slug);
 assert.equal((h.match(/class="cs-panel id-depth"/g)||[]).length,1,'one authored depth section per page');
 assert(h.includes('<table class="cs-table">')&&h.includes('<th scope="row">'),'accessible comparison table '+slug);
 assert(h.includes('Evidence boundary:'),'evidence boundary '+slug);
 assert(h.includes('FREE · PLANNING ONLY · NOV 2026'),'visible truthful editorial update '+slug);
 assert(sitemap.includes('/guides/'+slug+'.html</loc><lastmod>2026-11-05</lastmod>'),'sitemap content freshness for six modified pages '+slug);
 for(const needle of required[slug])assert(h.includes(needle),slug+' missing '+needle);
 assert(h.includes('rel="canonical" href="https://coopcheck.serunio.com/guides/'+slug+'.html"'));
 assert(h.includes('name="robots" content="index,follow"'));
}
assert.equal(2*(6+10),32);
assert.equal(2*(3+20),46);
assert.equal(2*(3+20)*6-2*(6+10)*6,84);
assert.equal((46/32-1)*100,43.75);
assert.equal(2*(8+12)*6+8*12+2*(8+12),376);
assert.equal(2*(6+16)*6+6*16+2*(6+16),404);
assert.equal(376/200,1.88); // area-only thought experiment
assert.equal(Math.ceil(13/4),4);
assert.equal(2*(48-8-8),64);
assert.equal([210,180,135,220,95,85,75].reduce((a,b)=>a+b,0),1000);
assert.equal(4*4+5*8,56);
console.log('PASS: six independent source-backed decision guides, 6 tables, 6 evidence boundaries, dated sitemap, worked arithmetic.');
