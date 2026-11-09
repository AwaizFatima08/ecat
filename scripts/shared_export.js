#!/usr/bin/env node
// shared_export.js — lists a sibling app's items compactly (id, stem, options, key)
// so a mapper can tag each one to an ECAT topic or skip it.
// Usage: node scripts/shared_export.js <out.txt> <bank.jsonl> [...]
const fs = require("fs");
const [out, ...files] = process.argv.slice(2);
const L = ["A", "B", "C", "D"];
const rows = [];
for (const f of files) for (const line of fs.readFileSync(f, "utf8").split("\n")) {
  if (!line.trim()) continue;
  const q = JSON.parse(line);
  rows.push(`${q.id}${q.table ? " [TABLE]" : ""}\n${q.stem}\n` + q.options.map((o, i) => `  ${L[i]}) ${o}`).join("\n") + `\n  key ${L[q.answer]}`);
}
fs.writeFileSync(out, rows.join("\n\n") + "\n");
console.log(`wrote ${rows.length} items to ${out}`);
