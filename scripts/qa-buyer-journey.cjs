/* P0 regression: buyer research -> free checker attribution and worked-example guard. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const js=fs.readFileSync(path.join(root,'site/assets/analytics.js'),'utf8');
const article=fs.readFileSync(path.join(root,'site/guides/prefab-chicken-coop-buying-guide.html'),'utf8');
const GUIDE='/guides/prefab-chicken-coop-buying-guide.html';
const CHECKER='/guides/prefab-chicken-coop-capacity-checker.html';
assert(article.includes('id="footprint-arithmetic"'),'Worked example is present');
assert(article.includes('4 × 2 = <strong>8 sq ft</strong>'),'Indoor area arithmetic is explicit');
assert(article.includes('not measurements of any listed brand or model'),'Hypothetical example must not become manufacturer spec');
assert(article.includes('extension.oregonstate.edu/catalog/ec-1644'),'Keep primary husbandry reference');

function harness(pagePath){
  const location=new URL('https://coopcheck.serunio.com'+pagePath);
  const calls=[];
  const handlers=new Map();
  const doc={
    querySelector(){return null;},
    createElement(){return {dataset:{}};},
    head:{appendChild(){}},
    addEventListener(type,cb){handlers.set(type,cb);}
  };
  const window={
    dataLayer:[],
    gtag(...args){calls.push(args);}
  };
  vm.runInNewContext(js,{window,document:doc,location,URL,Date,encodeURIComponent});
  assert(handlers.has('click'),'Capture listener must be installed');
  return {
    calls,
    click(href){
      const anchor={
        href:new URL(href,location.href).href,
        textContent:'Open free checker',
        dataset:{},
        getAttribute(k){return k==='href'?href:null;},
        closest(selector){return selector==='.source-box'?null:null;}
      };
      handlers.get('click')({target:{closest(s){return s==='a'?anchor:null;}}});
    }
  };
}
const guide=harness(GUIDE);
guide.click(CHECKER);
const event=guide.calls.find(args=>args[0]==='event'&&args[1]==='buyer_guide_checker_click');
assert(event,'The real reader-service click must trigger analytics');
assert.equal(event[2].source_page,GUIDE);
assert.equal(event[2].destination_page,CHECKER);
assert.equal(event[2].funnel_step,'buyer_guide_to_free_checker');
guide.click('https://outside.example/guides/prefab-chicken-coop-capacity-checker.html');
assert.equal(guide.calls.filter(args=>args[1]==='buyer_guide_checker_click').length,1,'External lookalike cannot count as onsite funnel');
const other=harness('/about.html');
other.click(CHECKER);
assert.equal(other.calls.filter(args=>args[1]==='buyer_guide_checker_click').length,0,'Only the buying guide can generate this funnel event');
console.log('PASS: publisher-independent 4x8 example, grounded reference, buyer guide funnel click, external/other-page exclusion');
