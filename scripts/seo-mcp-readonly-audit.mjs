#!/usr/bin/env node
// Read-only trial against the pinned Akxan/google-seo-mcp code.
// Run from the upstream checkout so the MCP SDK resolves locally.
import fs from 'node:fs';
import path from 'node:path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const origin = 'https://coopcheck.serunio.com';
const outDir = path.resolve(process.cwd(), '../seo-mcp-audit-output');
fs.mkdirSync(outDir, { recursive: true });
const records = [];
const checks = [
  ['robots_check', { urls: [origin + '/', origin + '/cities/portland-or.html', origin + '/guides/chicken-coop-size-calculator.html'] }],
  ['sitemap_check', { url: origin + '/', sampleSize: 25, checkAll: false, listUrls: false, concurrency: 3 }],
  ['page_audit', { url: origin + '/' }],
  ['page_audit', { url: origin + '/cities/portland-or.html' }],
  ['page_audit', { url: origin + '/guides/chicken-coop-size-calculator.html' }],
  ['page_audit', { url: origin + '/research/2026-backyard-chicken-laws.html' }],
  ['site_crawl', { startUrl: origin + '/', maxPages: 150, concurrency: 4, includeSitemap: true, includePages: false }],
];
function writeReports() {
  const report = {
    generatedAt: new Date().toISOString(),
    site: origin,
    upstream: 'Akxan/google-seo-mcp@faa34653cf372689c02810cb9b9a0bc5c23f04bc',
    scope: 'Read-only public web audits. GSC and GA4 are NOT queried.',
    records,
  };
  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(report, null, 2));
  const lines = [
    '# CoopCheck SEO MCP — read-only trial',
    '',
    'Generated: ' + report.generatedAt,
    '',
    'Upstream: ' + report.upstream,
    '',
    '**Scope:** Only public HTTP checks. No GSC/GA4 authentication or modifications.',
    '',
    '| Tool | URL | Status |',
    '|---|---|---|',
    ...records.map(r => '| ' + r.tool + ' | ' + (r.arguments.url ?? r.arguments.startUrl ?? '(multiple)') + ' | ' + (r.error ? 'ERROR: ' + String(r.error).replace(/\|/g, '/') : 'OK') + ' |'),
    '',
  ];
  for (const record of records) {
    lines.push('## ' + record.tool + ' — ' + (record.arguments.url ?? record.arguments.startUrl ?? '(multiple)'));
    lines.push('');
    lines.push('```json');
    lines.push(JSON.stringify(record.result ?? { error: record.error }, null, 2).slice(0, 50000));
    lines.push('```');
    lines.push('');
  }
  fs.writeFileSync(path.join(outDir, 'report.md'), lines.join('\n'));
}
const client = new Client({ name: 'coopcheck-readonly-audit', version: '1.0.0' }, { capabilities: {} });
let connected = false;
try {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ['dist/index.js', '--read-only', '--toolsets=web'],
    cwd: process.cwd(),
    env: { ...process.env, SEO_MCP_READ_ONLY: '1', SEO_MCP_TOOLSETS: 'web' },
  });
  await client.connect(transport);
  connected = true;
  const listed = await client.listTools();
  const names = new Set(listed.tools.map(t => t.name));
  console.log('Read-only MCP web tools:', [...names].join(', '));
  for (const [tool, args] of checks) {
    if (!names.has(tool)) {
      records.push({ tool, arguments: args, error: 'Not registered in selected toolset' });
      continue;
    }
    console.log('Running', tool, args.url ?? args.startUrl ?? '');
    try {
      const res = await client.callTool(
        { name: tool, arguments: args },
        undefined,
        { timeout: tool === 'site_crawl' ? 300000 : 90000 },
      );
      const text = (res.content ?? []).filter(c => c.type === 'text').map(c => c.text).join('\n');
      let result;
      try { result = JSON.parse(text); } catch { result = text; }
      records.push({ tool, arguments: args, ...(res.isError ? { error: 'MCP tool reported isError' } : {}), result });
    } catch (error) {
      records.push({ tool, arguments: args, error: String(error) });
    }
  }
} catch (error) {
  records.push({ tool: 'mcp_connection', arguments: {}, error: String(error) });
} finally {
  writeReports();
  if (connected) await client.close().catch(() => {});
}
console.log('SEO MCP report saved to', outDir);
