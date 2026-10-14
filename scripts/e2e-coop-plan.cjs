/* Real Chromium smoke tests for the free chicken-coop plan generator. */
const assert=require("node:assert/strict");
const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),os=require("node:os");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"../site"),base="http://127.0.0.1:4173";
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"coopcheck-browser-"));
const screens=path.resolve(__dirname,"../test-results");
fs.mkdirSync(screens,{recursive:true});
const mimes={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".json":"application/json",".png":"image/png"};
const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,base).pathname;
  const safe=path.resolve(root,"."+decodeURIComponent(pathname==="/"?"/index.html":pathname));
  if(!safe.startsWith(root+path.sep))return res.writeHead(403).end("Forbidden");
  fs.readFile(safe,(err,bytes)=>{
    if(err)return res.writeHead(404).end("Not found");
    res.writeHead(200,{"Content-Type":mimes[path.extname(safe)]||"application/octet-stream","Cache-Control":"no-store"});
    res.end(bytes);
  });
});
async function main(){
  await new Promise((resolve,reject)=>server.once("error",reject).listen(4173,"127.0.0.1",resolve));
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browser.newContext({viewport:{width:1365,height:860},acceptDownloads:true});
  const page=await context.newPage();const fatal=[];
  page.on("pageerror",error=>fatal.push("pageerror "+error.message));
  page.on("console",message=>{if(message.type()==="error")fatal.push("console "+message.text());});
  try{
    const response=await page.goto(base+"/coop-plan.html",{waitUntil:"networkidle"});
    assert.equal(response.status(),200);
    await page.locator("#planSvgPreview svg").waitFor({state:"visible",timeout:10000});
    assert.match(await page.locator("#planResult").innerText(),/meets both illustrative floor-area planning targets/i);
    const defaultStats=await page.locator("#planStats").innerText();
    assert(defaultStats.includes("32 sq ft"),"6-bird default indoor geometry");
    assert(defaultStats.includes("184 sq ft"),"6-bird default run geometry");
    assert(defaultStats.includes("2 × 12 in"),"nest boxes");
    await page.screenshot({path:path.join(screens,"coop-desktop.png"),fullPage:true});
    console.log("PASS: desktop initial render and default flock/area math");

    for(const template of ["raised","compact","walkin"]){
      await page.locator('label:has(input[name="style"][value="'+template+'"])').click();
      assert(await page.locator('input[name="style"][value="'+template+'"]').isChecked());
      await page.locator("#planGenerate").click();
      assert.equal(await page.locator("#planSvgPreview svg").count(),1);
      const title=await page.locator("#planSvgPreview svg title").textContent();
      assert(title.toLowerCase().includes(template==="walkin"?"walk-in":template),"selected template visible");
    }
    console.log("PASS: all three radio-selected styles re-render");

    await page.locator("#planFlock").fill("24");
    await page.locator("#planWidth").fill("6");
    await page.locator("#planDepth").fill("8");
    await page.locator("#planGenerate").click();
    assert.equal(await page.locator("#planResult").getAttribute("data-level"),"warning");
    assert.match(await page.locator("#planResult").innerText(),/fall short/i);
    const warningStats=await page.locator("#planStats").innerText();
    assert(warningStats.includes("96 sq ft")&&warningStats.includes("240 sq ft"),"24-bird area targets shown");
    await page.screenshot({path:path.join(screens,"coop-overcrowded-warning.png"),fullPage:true});
    console.log("PASS: overcrowded scenario visibly warns instead of false legal clearance");

    await page.locator("#planFlock").fill("6");
    await page.locator("#planWidth").fill("12");
    await page.locator("#planDepth").fill("18");
    await page.locator("#planGenerate").click();
    const [svgDownload]=await Promise.all([page.waitForEvent("download"),page.locator("#planDownloadSvg").click()]);
    assert.match(svgDownload.suggestedFilename(),/\.svg$/);
    const svgPath=path.join(tmp,"plan.svg");
    await svgDownload.saveAs(svgPath);
    const svgText=fs.readFileSync(svgPath,"utf8");
    assert(svgText.includes("<svg")&&svgText.includes("NOT PERMIT")&&svgText.length>1500);
    const [pngDownload]=await Promise.all([page.waitForEvent("download",{timeout:12000}),page.locator("#planDownloadPng").click()]);
    assert.match(pngDownload.suggestedFilename(),/\.png$/);
    const pngPath=path.join(tmp,"plan.png");
    await pngDownload.saveAs(pngPath);
    const pngBytes=fs.readFileSync(pngPath);
    assert(pngBytes.length>10000,"PNG is not empty");
    assert.equal(pngBytes.subarray(0,8).toString("hex"),"89504e470d0a1a0a");
    console.log("PASS: SVG and PNG are actually downloaded by Chromium");

    await page.evaluate(()=>{window.__printTriggered=0;window.print=()=>window.__printTriggered++;});
    await page.locator("#planPrint").click();
    assert.equal(await page.evaluate(()=>window.__printTriggered),1,"print button is functional");
    await page.emulateMedia({media:"print"});
    assert.equal(await page.locator("header.site-header").evaluate(el=>getComputedStyle(el).display),"none");
    const pdfPath=path.join(screens,"coop-print.pdf");
    await page.pdf({path:pdfPath,format:"A4",printBackground:true});
    assert(fs.readFileSync(pdfPath).subarray(0,4).toString()==="%PDF");
    await page.emulateMedia({media:"screen"});
    console.log("PASS: Print/PDF works and print stylesheet hides navigation");

    // Same-origin local sketch from map planner, with no address leaked to server.
    await page.evaluate(()=>{
      const key="coop_e2e";
      localStorage.setItem("coopcheck:project-id",key);
      localStorage.setItem("coopcheck:sketch:v1:"+key,JSON.stringify({
        version:1,city:"portland-or",setbacks:{side:3,front:10,rear:3},
        features:[{type:"Feature",properties:{role:"coop"},geometry:{type:"Polygon",coordinates:[[
          [-122.680000,45.500000],[-122.679950,45.500000],[-122.679950,45.500060],
          [-122.680000,45.500060],[-122.680000,45.500000]
        ]]}}]
      }));
    });
    await page.goto(base+"/coop-plan.html?from=map",{waitUntil:"networkidle"});
    assert.match(await page.locator("#importHint").innerText(),/Saved map coop-only outline/i);
    assert.match(await page.locator("#importHint").innerText(),/not the entire coop \+ run/i);
    const dims=await page.evaluate(()=>({
      width:Number(document.getElementById("planWidth").value),depth:Number(document.getElementById("planDepth").value)
    }));
    assert.deepEqual(dims,{width:12,depth:18},"map coop-only rectangle must NOT overwrite combined coop+run area");
    assert.equal(await page.locator("#planCity").inputValue(),"portland-or","map transfers selected municipality");
    assert.equal(await page.locator("#planFlock").inputValue(),"4","screened Portland default when selected from map");
    assert.equal(await page.locator("#planSvgPreview svg").count(),1);
    assert.match(await page.locator("#planLawResult").innerText(),/standard small-fowl count tier/i);
    console.log("PASS: map transfers city and separate COOP-only outline while preserving total combined area");

    // Real rule-screening interactions, including conditional Portland lot area.
    await page.goto(base+"/coop-plan.html?city=portland-or&source=rules",{waitUntil:"networkidle"});
    assert.equal(await page.locator("#planCity").inputValue(),"portland-or");
    assert.equal(await page.locator("#planFlock").inputValue(),"4");
    assert.match(await page.locator("#planCityFacts").innerText(),/4 on any lot/i);
    assert((await page.locator("#planSourceLink").getAttribute("href")).startsWith("https://"));
    assert.match(await page.locator("#planLawResult").innerText(),/within the standard small-fowl count tier/i);
    await page.locator("#planFlock").fill("5");
    await page.locator("#planGenerate").click();
    assert.match(await page.locator("#planLawResult").innerText(),/Enter lot size/i);
    await page.locator("#planLot").fill("10000");
    await page.locator("#planGenerate").click();
    assert.match(await page.locator("#planLawResult").innerText(),/within the standard small-fowl count tier/i);
    await page.locator("#planRooster").check();
    await page.locator("#planGenerate").click();
    assert.equal(await page.locator("#planLawResult").getAttribute("data-level"),"warning","rooster condition warns");
    await page.screenshot({path:path.join(screens,"coop-portland-rules.png"),fullPage:true});
    console.log("PASS: Portland 4/6 conditional rule, city source and rooster screening");

    await page.goto(base+"/coop-plan.html?city=peoria-az&source=rules",{waitUntil:"networkidle"});
    assert.match(await page.locator("#planLawResult").innerText(),/research is still pending/i);
    assert.match(await page.locator("#planCityFacts").innerText(),/Not independently confirmed/i);
    assert.equal(await page.locator("#planFlock").inputValue(),"6","pending city cannot prefill numerical allowance");
    await page.goto(base+"/coop-plan.html?city=austin-tx&source=rules",{waitUntil:"networkidle"});
    assert.match(await page.locator("#planLawResult").innerText(),/More city or property checks needed/i);
    console.log("PASS: pending and scope-limited city law screens fail closed");

    await page.setViewportSize({width:375,height:812});
    await page.reload({waitUntil:"networkidle"});
    const metrics=await page.evaluate(()=>({
      viewport:innerWidth,doc:document.documentElement.scrollWidth,
      button:document.getElementById("planGenerate").getBoundingClientRect().width,
      svg:document.querySelector("#planSvgPreview svg").getBoundingClientRect().width
    }));
    await page.screenshot({path:path.join(screens,"coop-mobile.png"),fullPage:true});
    assert(metrics.doc<=metrics.viewport+2,"horizontal overflow "+JSON.stringify(metrics));
    assert(metrics.button>200&&metrics.svg>240,"mobile controls remain visible");
    console.log("PASS: 375px mobile layout fits without horizontal overflow");

    assert.deepEqual(fatal,[],"page JS and console errors");
    console.log("PASS: no uncaught browser exceptions or console errors");
  }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||String(e));process.exitCode=1;}).finally(()=>{server.close();});
