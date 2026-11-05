/* Browser QA for six source-backed independent planning-tool articles. */
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const site=path.resolve(__dirname,'../site'),base='http://127.0.0.1:4188';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,base).pathname;
 const safe=path.resolve(site,'.'+decodeURIComponent(pathname==='/'?'/index.html':pathname));
 if(!safe.startsWith(site+path.sep))return res.writeHead(403).end();
 fs.readFile(safe,(error,content)=>{
  if(error)return res.writeHead(404).end();
  res.writeHead(200,{'Content-Type':types[path.extname(safe)]||'application/octet-stream','Cache-Control':'no-store'}).end(content);
 });
});
const slugs=['chicken-run-size-calculator','chicken-run-fencing-calculator','chicken-nesting-box-calculator','chicken-roost-length-calculator','chicken-coop-cost-calculator','free-chicken-coop-floor-plans'];
(async()=>{
 await new Promise((ok,fail)=>server.once('error',fail).listen(4188,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:800}});
   await context.route('**/*',route=>{
    const url=route.request().url();
    if(!url.startsWith(base+'/'))route.abort();else route.continue();
   });
   for(const slug of slugs){
    const page=await context.newPage();const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(`${base}/guides/${slug}.html`,{waitUntil:'load',timeout:20000});
    assert.equal(response.status(),200,slug+' status');
    assert.equal(await page.locator('main h1').count(),1,slug+' heading');
    assert.equal(await page.locator('main .id-depth h2').count(),1,slug+' decision section');
    assert.equal(await page.locator('main .id-depth table').count(),1,slug+' comparison');
    assert(await page.locator('main .id-depth th[scope=row]').count()>=(slug==='free-chicken-coop-floor-plans'?2:3),slug+' accessible rows');
    const geometry=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,text:document.querySelector('.id-depth')?.textContent?.length||0}));
    assert(geometry.scroll<=geometry.viewport+1,`${slug} ${width} horizontal overflow ${JSON.stringify(geometry)}`);
    assert(geometry.text>1000,slug+' depth not rendered');
    assert.equal(errors.length,0,slug+' JS error '+errors.join('; '));
    if(slug!=='free-chicken-coop-floor-plans'){
     assert.equal(await page.locator('[data-coop-tool]').count(),1,slug+' existing interactive tool still present');
     const button=page.locator('[data-coop-tool] button[type=submit]');
     assert(await button.isEnabled(),slug+' submit enabled');
     await button.click();
     assert((await page.locator('#toolOutput').innerText()).length>10,slug+' results after submit');
    }
    if(width===390&&(slug==='chicken-run-fencing-calculator'||slug==='free-chicken-coop-floor-plans')){
     fs.mkdirSync(path.resolve(__dirname,'../test-results'),{recursive:true});
     await page.screenshot({path:path.resolve(__dirname,'../test-results/round3-'+slug+'.png'),fullPage:true});
    }
    console.log('PASS:',slug,width,'px, visible text length',geometry.text);
    await page.close();
   }
   await context.close();
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
