/* Keep fast-moving poultry policy news honest after the scheduled council session.
 * This checks editorial caveats and metadata, NOT the outcome of the meeting.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const html=fs.readFileSync(path.resolve(__dirname,'../site/research/grover-beach-poultry-policy-october-2026.html'),'utf8');
const sitemap=fs.readFileSync(path.resolve(__dirname,'../site/sitemap.xml'),'utf8');
const url='https://coopcheck.serunio.com/research/grover-beach-poultry-policy-october-2026.html';

assert(html.includes('<link rel="canonical" href="'+url+'">'),'Canonical remains stable');
assert(html.includes('"datePublished":"2026-10-24"'),'Initial publication date must not be rewritten');
assert(html.includes('"dateModified":"2026-10-29"'),'Last research update must match metadata');
assert(html.includes('id="october-27-status"'),'Visible post-meeting verification status is present');
assert(html.includes('id="october-28-reporting"'),'Sourced October 28 reporting must remain visible');
assert(html.includes('www.kcbx.org/government-and-politics/2026-10-28/'),'New reported details must cite KCBX');
assert(html.includes('not an enforceable new rule'),'Reporting must not be framed as enacted law');
assert(html.includes('Agenda Item 5'),'Primary agenda item remains identified');
assert(html.includes('not verified an adopted change'),'Cannot imply the agenda legalized backyard poultry');
assert(html.includes('meeting action not verified'),'Policy summary must disclose unknown decision');
assert(html.includes('effective date'),'Must distinguish potential enactment and effectiveness');
assert(html.includes('https://grover.org/Archive.aspx?ADID=2661'),'City archive citation remains');
assert(html.includes('https://www.grover.org/160/Agendas-Staff-Reports-Minutes'),'Official minutes index remains');
assert(sitemap.includes('<loc>'+url+'</loc><lastmod>2026-10-29</lastmod>'),'Sitemap update date is synchronized');
console.log('PASS: Grover Beach post-meeting status is appropriately unresolved and dated');
