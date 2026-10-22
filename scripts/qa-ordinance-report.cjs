const fs=require('node:fs');
const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const cities=JSON.parse(read('site/data/cities.json')).cities;
const evidence=JSON.parse(read('site/data/policy-evidence.json')).cities;
const html=read('site/research/2026-backyard-chicken-laws.html');
const csv=read('site/research/2026-city-chicken-law-evidence.csv').replace(/^\uFEFF/,'');
function parseCSV(x){
  let rows=[],row=[],val='',quoted=false;
  for(let i=0;i<x.length;i++){
    const ch=x[i];
    if(ch==='"'){if(quoted&&x[i+1]==='"'){val+='"';i++}else quoted=!quoted}
    else if(ch===','&&!quoted){row.push(val);val=''}
    else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&x[i+1]==='\n')i++;row.push(val);if(row.length>1||row[0])rows.push(row);row=[];val=''}
    else val+=ch;
  }
  if(quoted)throw Error('unterminated CSV quote');
  if(val||row.length){row.push(val);rows.push(row)}
  return rows;
}
const [head,...raw]=parseCSV(csv);assert.equal(raw.length,cities.length,'row count must match city registry');
const names=['max','roosters','permit','placement'];
const reviewed=c=>c.audit.status!=='needs_review';
const checked=(c,key)=>reviewed(c)&&evidence[c.slug]?.[key]?.status==='primary_clause_checked'&&evidence[c.slug]?.[key]?.verifiedClaim!==false;
for(const c of cities){
 const r=raw.find(a=>a[head.indexOf('city_slug')]===c.slug);
 assert.ok(r,'CSV city missing: '+c.slug);
 assert.equal(r.length,head.length,'CSV column mismatch for '+c.slug);
 assert.equal(r[head.indexOf('audit_status')],c.audit.status);
 for(const k of names){
   const claim=r[head.indexOf(k+'_claim')],status=r[head.indexOf(k+'_evidence_status')],url=r[head.indexOf(k+'_source_url')];
   if(checked(c,k)){
     assert.equal(claim,c[k],'source-backed field mismatch '+c.slug+' '+k);
     assert.equal(status,'primary_clause_checked');
     assert.equal(url,evidence[c.slug][k].url||'');
   }else{
     assert.equal(claim,'','unconfirmed field leaked '+c.slug+' '+k);
     assert.equal(status,'not_confirmed');
     assert.equal(url,'','unverified citation leaked');
   }
 }
}
const full=cities.filter(c=>reviewed(c)&&names.every(k=>checked(c,k))).length;
assert.equal(full,71);assert.equal(cities.filter(reviewed).length,88);
for(const slug of cities.map(c=>c.slug))assert.ok(html.includes('data-query=')&&html.includes(slug),'missing HTML row '+slug);
assert.ok(html.includes('rel="canonical" href="https://coopcheck.serunio.com/research/2026-backyard-chicken-laws.html"'));
assert.ok(html.includes('2026-city-chicken-law-evidence.csv'));
const sitemap=read('site/sitemap.xml');
assert.ok(sitemap.includes('<loc>https://coopcheck.serunio.com/research/2026-backyard-chicken-laws.html</loc>'));
assert.ok(read('site/index.html').includes('research/2026-backyard-chicken-laws.html'));
console.log('PASS: 100-city evidence matrix, pending claim redaction, report, links, homepage and sitemap');
