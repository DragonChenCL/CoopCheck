/* Source-checked decision cases for six independent planning tools.
 * This module adds real arithmetic, falsifiable assumptions, and field checklists;
 * it does NOT supply a code minimum, measured product dimensions, or live prices.
 * Editorial sources checked 2026-11-05. */
'use strict';
const v = (n) => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
const a = (url,label) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const PSU = 'https://extension.psu.edu/small-scale-poultry-housing';
const OSU = 'https://extension.oregonstate.edu/catalog/ec-1644-living-land-backyard-chicken-coop-design';
const USU = 'https://extension.usu.edu/poultry/research/basics-for-raising-backyard-chickens';
const UMN = 'https://extension.umn.edu/agriculture/animals-and-livestock/poultry/caring-for-chickens-in-cold-weather';
const UNH = 'https://extension.unh.edu/blog/2024/02/how-should-i-take-care-backyard-chickens-winter';
const GRIDS = 'https://extension.uconn.edu/2018/05/21/basic-management-of-small-poultry-flocks/';
const group=(title,body)=>`<section class="cs-panel id-depth" aria-label="${title}"><h2>${title}</h2>${body}</section>`;
const table=(caption,heads,rows)=>`<div class="cs-table-scroll"><table class="cs-table"><caption>${caption}</caption><thead><tr>${heads.map(s=>`<th scope="col">${s}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((s,i)=>i===0?`<th scope="row">${s}</th>`:`<td>${s}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const context=label=>`<p class="cs-small">Evidence boundary: ${label} Figures are illustrative calculations, not an inspection, animal-welfare certification, local legal minimum, supplier quote or engineered build plan. Sources describe different management conditions.</p>`;
const pages={};
{
 const scenarios=[[6,10],[3,20],[5,12]].map(([w,l])=>({w,l,area:w*l,perimeter:2*(w+l),mesh:2*(w+l)*6}));
 const x=scenarios[0],y=scenarios[1];
 if(x.area!==y.area||x.area!==60||x.perimeter!==32||y.perimeter!==46||x.mesh!==192||y.mesh!==276)throw Error('run-shape regression');
 pages['chicken-run-size-calculator']=group('Two 60-square-foot runs can have very different footprints',
 `<p><strong>Area alone does not price a build or show that the run fits.</strong> For the same six-hen, 60-square-foot illustrative outdoor target, compare a standard 6 × 10-foot rectangle to a narrow 3 × 20-foot strip. The floor areas are equal; perimeter, mesh requirements and practical access are not.</p>`+
 table('Original geometry comparison; 6-foot wall height is a scenario assumption, not a prescribed fence', ['Run shape','Outdoor area','Perimeter','6-ft-high wall mesh before openings'], scenarios.map(z=>[`${z.w} × ${z.l} ft`,`${z.area} sq ft`,`${z.perimeter} ft`,`${z.mesh} sq ft`]))+
 `<p>The narrow 3 × 20-foot option needs <strong>${y.perimeter-x.perimeter} more feet</strong> of fence and <strong>${y.mesh-x.mesh} extra square feet</strong> of nominal six-foot-high wall mesh: ${v((y.perimeter/x.perimeter-1)*100)}% more perimeter for the same 60 sq ft of ground. Neither rectangle is certified suitable by its shape alone.</p>`+
 `<h3>Subtract truly inaccessible floor before deciding</h3><p>If a permanently inaccessible 2 × 3-foot bay occupies part of a measured 6 × 10-foot run, usable ground is 60 − 6 = <strong>54 sq ft</strong>. That is six square feet below this site's 60-square-foot comparison for six hens. A movable perch or shade object should not automatically be subtracted if the birds can still use the floor underneath.</p>`+
 `<h3>Before choosing the cheaper-looking rectangle</h3><ol><li>Draw the entrance, gate swing, feeders, dry ground, shade and cleaning route; a long narrow run may be harder to manage.</li><li>Measure the remaining accessible ground rather than multiplying advertised external dimensions.</li><li>Price fence length and gate access separately in the <a href="/guides/chicken-run-fencing-calculator.html">run-fencing calculator</a>.</li><li>Confirm the coop remains separate and any applicable animal count or structure rules with the local authority.</li></ol>`+
 `<p>Source context: ${a(PSU,'Penn State Extension on housing, drainage and predator protection')} and ${a(OSU,'Oregon State University Extension on outdoor access and coop design')}.</p>`+
 context('The 10-square-foot-per-bird outdoor value is this site\'s published comparison target; legal and management requirements vary.'));
}
{
 const options=[[8,12],[6,16],[4,24]].map(([w,l])=>{const P=2*(w+l);return {w,l,P,wall:P*6,roof:w*l,apron:P,total:P*6+w*l+P}});
 if(options[0].P!==40||options[0].wall!==240||options[0].total!==376||options[1].P!==44||options[1].total!==404)throw Error('fencing bill arithmetic');
 pages['chicken-run-fencing-calculator']=group('Turn mesh area into a materials enquiry without inventing a roll count',
 `<p>The calculator returns <em>geometric area</em>, not a shopping list. The same 96-square-foot run can require different amounts of vertical mesh because perimeter changes with its shape. These worked cases assume six-foot-high side walls, a fully meshed horizontal roof and a one-foot outward ground apron, all before cutting waste and door-specific details.</p>`+
 table('Original 96 sq ft run comparison, mesh areas before cut losses',['Ground footprint','Fence perimeter','Vertical mesh','Roof mesh','1-ft outward apron','Total nominal mesh area'],options.map(z=>[`${z.w} × ${z.l} ft`,`${z.P} ft`,`${z.wall} sq ft`,`${z.roof} sq ft`,`${z.apron} sq ft`,`${z.total} sq ft`]))+
 `<p>Choosing 6 × 16 instead of 8 × 12 adds <strong>${options[1].total-options[0].total} sq ft</strong> of nominal mesh, even though both give 96 sq ft of ground. This table does not deduct a gate opening, overlap joined panels or estimate fasteners. Confirm which surfaces actually use the same mesh grade before adding their areas.</p>`+
 `<h3>Why 376 ÷ 200 is not a roll purchase order</h3><p>A hypothetical 4-foot-wide × 50-foot-long roll contains 200 square feet <em>by area</em>. The 8 × 12 example has 376 square feet of nominal mesh surfaces, so 376 ÷ 200 = 1.88 rolls by raw area alone; rounding to two is only a theoretical lower bound. A six-foot wall is taller than one four-foot strip. Joining strips requires an approved overlap and attachment method, and roof sections and gate cuts constrain how lengths can be cut. The minimum area calculation cannot tell you how many rolls to buy.</p>`+
 `<h3>Do not confuse a horizontal apron with a buried vertical barrier</h3><p>An outward apron and a vertical buried extension have different placement and protection details even if their rectangular mesh areas are numerically equal. ${a(PSU,'Penn State Extension')} discusses burying wire at least 12 inches and toeing it outward around six inches; ${a(GRIDS,'UConn Extension')} describes another buried L/J configuration. These are educational practices, <strong>not guaranteed predator-proof designs</strong> or rules for every location.</p>`+
 `<p>Ask the supplier for: roll width and length; actual mesh opening and wire gauge; overlap/fastening instructions; compatible roof mesh; gate and corners; ground conditions and local predator exposure. Keep each measurement in feet and each <em>area</em> in square feet; never add them directly.</p>`+
 context('All roll dimensions and six-foot fence heights in this worked example are hypothetical, not verified retail inventory.'));
}
{
 const n=[4,6,12,13,16];
 pages['chicken-nesting-box-calculator']=group('The box count is easy; placement and daily access are the real decisions',
 `<p>The one-box-per-four-laying-hens starting ratio is a planning convention, not a guarantee of quiet nesting or an ordinance. Count the adult hens expected to lay, not every animal in a mixed-age flock. For an unknown future laying flock, write down the assumed final number and revisit the count as birds mature.</p>`+
 table('Round up the illustrative one-nest-per-four ratio; no fraction of a physical box',['Laying hens','Calculation','Example box count'],n.map(x=>[String(x),`ceil(${x} ÷ 4)`,String(Math.ceil(x/4))]))+
 `<p>Moving from 12 laying hens to 13 raises the worksheet from <strong>three to four</strong> boxes. That one-bird threshold affects your layout more than merely changing a number on a calculator.</p>`+
 `<h3>Draw the nest front, not only the box footprint</h3><p>${a(USU,'Utah State University Extension')} describes nest width and height around 12–15 inches, at least 12 inches of depth, a 4–6-inch front lip and dry bedding; it also describes roughly one box for four to five hens. These are <em>extension suggestions</em>, not exact dimensions for every breed or an engineered design. Three boxes each with 12-inch-wide openings need at least 36 inches of nominal opening width before partitions, fasteners or keeper access are allowed for. A fourth adds another 12-inch opening before those allowances.</p>`+
 `<h3>Prevent a mathematically correct but impractical nest wall</h3><ol><li>Show how eggs can be reached without crawling behind a perch or through droppings.</li><li>Keep roosts positioned so litter and manure do not fall into nests; the highest cozy box may become a sleeping spot.</li><li>Plan dry, replaceable bedding and an entry that works for the bird size in your flock.</li><li>Ask whether an external nest projection changes the building or setback dimensions; it does not automatically increase bird floor.</li></ol>`+
 `<p>Cross-check with the <a href="/guides/chicken-roost-length-calculator.html">independent perch-length calculator</a> and the ${a(USU,'USU nest construction and placement notes')}.</p>`+
 context('The 36-inch front example assumes 12-inch openings; it is not an external coop measurement or a final cut list.'));
}
{
 const hens=8,need=hens*9,bars=2,len=48;
 const cases=[0,6,8].map(block=>({block,total:bars*(len-2*block)}));
 if(need!==72||cases[1].total!==72||cases[2].total!==64)throw Error('roost usable length');
 pages['chicken-roost-length-calculator']=group('Roost-bar end losses: nominal length is not always usable length',
 `<p>Counting bars is not the same as measuring usable perches. The existing calculator uses <strong>nine inches of combined perch per bird</strong> as a transparent comparison. For eight hens that is 8 × 9 = <strong>${need} inches</strong> (6 feet), but fittings, walls or inaccessible ends may change what is actually usable.</p>`+
 table('Hypothetical pair of nominal 48-inch roost bars; blocked length is assumed at BOTH ends of EACH bar',['Blocked at each end','Usable length per bar','Two-bar total','Compared with 72-in example'],cases.map(x=>[`${x.block} in`,`${len-2*x.block} in`,`${x.total} in`,x.total>=need?'At/above target':`${need-x.total} in short`]))+
 `<p>With eight inches blocked at both ends of each 48-inch bar, there are only 32 usable inches per bar: 2 × 32 = <strong>64 inches</strong>. The nominal 96 inches of purchased lumber does not supply 96 inches of usable bird perch. These blocked lengths are an arithmetic scenario; they are <strong>not</strong> published clearance requirements.</p>`+
 `<h3>Position matters more than a perfect total</h3><p>${a(USU,'Utah State University Extension')} gives a rough 6–10-inch linear perch range per bird, while ${a(UNH,'University of New Hampshire Extension')} discusses around 9–12 inches. Those ranges are not one universal welfare standard. Draw landing, dismount and access paths. Prevent roost droppings from falling into nests or feed and keep the cleaning tray reachable. ${a(UMN,'University of Minnesota Extension')} identifies roost areas as manure accumulation points and recommends controlling moisture and ammonia.</p>`+
 `<p>Put a real measured usable length, bar position, bird size, and floor/ceiling clearance in your plan. If the birds are regularly confined inside, re-check ventilation and usable floor separately; adding more perch footage does not compensate for a cramped or damp coop.</p>`+
 context('Usable-bar losses are hypothetical; measure actual fixtures rather than treating assumed six- or eight-inch end losses as a building rule.'));
}
{
 const parts=[['Framing and lumber',210],['Panels and floor',180],['Roof and weather layer',135],['Mesh and posts',220],['Fasteners and doors',95],['Drainage / site preparation',85],['Nest and feed equipment',75]];
 const sum=parts.reduce((z,p)=>z+p[1],0),reserve=sum*.15,laborHours=20,laborRate=25;
 if(sum!==1000||reserve!==150||laborHours*laborRate!==500)throw Error('budget arithmetic');
 pages['chicken-coop-cost-calculator']=group('A reproducible sample budget, not a made-up national price',
 `<p>Below is a <strong>hypothetical quotation worksheet</strong> showing exactly how to combine categories and how a contingency and paid labor change the outcome. The dollar figures are round teaching inputs, not store prices observed in November 2026. Replace every figure with a dated local quote before using the calculator for a purchase.</p>`+
 table('Illustrative user-entered budget inputs; USD, not researched market averages',['Line item','Example input','Evidence needed before purchase'],parts.map(([k,amt])=>[k,`$${amt}`,k==='Mesh and posts'?'Roll specification and cut plan':k==='Drainage / site preparation'?'Ground condition and scope':'Dated supplier quote or contractor scope']))+
 `<p>Materials and site line-items: <strong>$${sum}</strong>. An optional <em>example</em> 15% project reserve is $${reserve}, bringing that subtotal to <strong>$${sum+reserve}</strong> before tax, permit fees, shipping, replacement tools and ongoing upkeep. This reserve rate is a scenario input, not a recommended industry percentage.</p>`+
 `<p>For a paid-labor comparison, another hypothetical 20 hours at $25/hour adds <strong>$500</strong>, giving $${sum+reserve+laborHours*laborRate} before the same excluded items. Volunteer labor may have zero cash cost without having zero time cost. The worksheet purposely treats blank estimates as <em>unpriced</em>, not free.</p>`+
 `<h3>Why borrowed kit prices are misleading</h3><p>${a('https://extension.umn.edu/agriculture/farm-operations-and-systems/small-farms/farmbytes-diy-mobile-poultry-hut','University of Minnesota Extension')} publishes a specific mobile poultry-hut example with a historical materials table. Its project dimensions, material choices and publication context differ from your quote. Do not reuse its total as a 2026 national-price promise. ${a(PSU,'Penn State Extension')} notes drainage, openings and predator protection as important housing considerations; omitting them to match a low advertised price changes the job.</p>`+
 `<h3>Before approving a contractor quote</h3><ol><li>List usable <em>inside</em> coop floor and outdoor run separately; scope the roof, mesh, fasteners, gates and buried protection.</li><li>Specify drainage, foundation, cleanout access and safety requirements rather than accepting “complete coop” as sufficient detail.</li><li>Separate quoted cash costs, a labelled reserve, non-cash owner labor and ongoing maintenance.</li><li>Confirm whether your address needs a zoning or building approval and leave its actual fee blank until verified.</li></ol>`+
 context('All USD figures above are constructed example inputs. No price or labor rate was collected from a retailer or builder.'));
}
{
 const inside=4*4,run=5*8,foot=inside+run,side=9*8,end=5*12;
 if(foot!==56||side!==72||end!==60)throw Error('plan geometry');
 pages['free-chicken-coop-floor-plans']=group('Same sheltered and run areas, very different whole-site envelopes',
 `<p>A free concept plan can test whether proposed shapes even fit the property, but it is not a cut list or structural building plan. Take a four-hen illustrative combination: <strong>4 × 4 ft enclosed coop</strong> (16 sq ft) and <strong>5 × 8 ft separate run</strong> (40 sq ft). Their usable areas total ${foot} sq ft; that is <strong>not</strong> the same as their outer bounding rectangle.</p>`+
 table('Two hypothetical ways to place the same rectangles; zero spacing is assumed for the geometry only',['Placement of two separate rectangles','Minimum outer bounding rectangle','Bounding area','Unallocated rectangle area'],[['Side by side', '9 × 8 ft',`${side} sq ft`,`${side-foot} sq ft`],['End to end','5 × 12 ft',`${end} sq ft`,`${end-foot} sq ft`]])+
 `<p>For side-by-side placement, width is 4 + 5 = 9 ft, length is the larger of 4 and 8 = 8 ft. For end-to-end placement, depth is 4 + 8 = 12 ft, width is the larger of 4 and 5 = 5 ft. Those results assume two rectangles touch. A real build can require gate clearances, keeper access, drainage, roof projection and legal setbacks, so the actual envelope may be larger.</p>`+
 `<h3>A five-line measurement sheet to take outside</h3><ol><li>Measure the available site dimensions from an appropriate, verified property reference; a phone map is not a boundary survey.</li><li>Record the enclosed <em>clear indoor</em> footprint, and note nest projections and permanently blocked floor separately.</li><li>Record the <em>separate usable run</em> rectangle and every permanent obstruction.</li><li>Draw the gate swing, roof overhang, grading and safe cleanout route; do not mistake unused bounding-area cells for usable bird ground.</li><li>Check local flock, structure and setback rules in the <a href="/coverage.html">city source directory</a> before asking a contractor to build.</li></ol>`+
 `<p>${a(OSU,'Oregon State University Extension')} emphasizes predator protection, secure flooring, ventilation and the management difference between birds with and without outdoor access. Those considerations are outside these two rectangles. Open the <a href="/coop-plan.html">downloadable 2D concept tool</a> to try different orientations, then keep the source assumptions with the drawing.</p>`+
 context('A zero-gap bounding rectangle is purely geometric. It is not a safe, lawful or construction-ready plan.'));
}
module.exports={pages};
