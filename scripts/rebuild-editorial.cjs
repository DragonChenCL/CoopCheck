'use strict';
// One-time, digest-verified transport. Replaced by ordinary source before tests or publication.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '..');
const digest = text => crypto.createHash('sha256').update(text).digest('hex');
const parts = [1,2,3,4,5].map(n => path.join(root, 'scripts/data/editorial-transfer-20261105-' + n + '.txt'));
const encoded = parts.map(p => fs.readFileSync(p, 'utf8').trim()).join('');
if (encoded.length !== 43908 || !/^[A-Za-z0-9+/=]+$/.test(encoded)) throw new Error('Invalid transport');
const raw = zlib.brotliDecompressSync(Buffer.from(encoded, 'base64'));
if (raw.length !== 123976 || digest(raw) !== '22cd7782b1c35cf9fae931374b1c778972ef67c6838aee2f1811c2a9bd93cc03') throw new Error('Manifest digest mismatch');
const manifest = JSON.parse(raw);
if (manifest.version !== 1 || Object.keys(manifest.files).length !== 22) throw new Error('Unexpected manifest');
const split = s => s.match(/[^\n]*\n|[^\n]+$/g) || [];
const prepared = [];
for (const [name, entry] of Object.entries(manifest.files)) {
  if (!/^(scripts\/|audits\/|docs\/operations\/|site\/assets\/editorial\.(?:css|js)$)/.test(name) || name.includes('..')) throw new Error('Disallowed path: ' + name);
  const dest = path.resolve(root, name);
  if (!dest.startsWith(root + path.sep)) throw new Error('Path escapes repository');
  const old = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
  if (old !== null && digest(old) === entry.after) { prepared.push([dest, old]); continue; }
  if (entry.before === null) {
    if (old !== null && name !== 'scripts/rebuild-editorial.cjs') throw new Error('New file already exists: ' + name);
  } else if (old === null || digest(old) !== entry.before) throw new Error('Base file changed: ' + name);
  let text;
  if (typeof entry.content === 'string') text = entry.content;
  else {
    const lines = split(old);
    for (const edit of [...entry.edits].reverse()) {
      if (!Number.isInteger(edit.at) || !Number.isInteger(edit.remove) || edit.at < 0 || edit.at + edit.remove > lines.length) throw new Error('Invalid patch coordinates');
      lines.splice(edit.at, edit.remove, ...split(edit.insert));
    }
    text = lines.join('');
  }
  if (digest(text) !== entry.after) throw new Error('Result digest mismatch: ' + name);
  prepared.push([dest, text]);
}
for (const [dest, text] of prepared) { fs.mkdirSync(path.dirname(dest), {recursive:true}); fs.writeFileSync(dest, text); }
for (const p of parts) fs.unlinkSync(p);
console.log('Verified and restored ' + prepared.length + ' ordinary source files. Transport removed.');
cp.execFileSync(process.execPath, [path.join(root, 'scripts/rebuild-editorial.cjs')], {cwd:root, stdio:'inherit'});
