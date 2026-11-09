#!/usr/bin/env node
// shared_export.js — lists a sibling app's items compactly (id, stem, options, key)
// so a mapper can tag each one to an ECAT topic or skip it.
// Usage: node scripts/shared_export.js <out.txt> <bank.jsonl|unit.json> [...]
// Reads CSCA .jsonl banks (stem/options/answer) and MDCAT unit .json arrays (q/o/a).
const fs = require("fs");
const [out, ...files] = process.argv.slice(2);
const L = ["A", "B", "C", "D"];
const rows = [];
const read = (f) => (f.endsWith(".jsonl") ? fs.readFileSync(f, "utf8").split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l)) : JSON.parse(fs.readFileSync(f, "utf8")));
for (const f of files) for (const q of read(f)) {
  const stem = q.stem ?? q.q, opts = q.options ?? q.o, key = q.answer ?? q.a;
  rows.push(`${q.id}${q.table ? " [TABLE]" : ""}\n${stem}\n` + opts.map((o, i) => `  ${L[i]}) ${o}`).join("\n") + `\n  key ${L[key]}`);
}
fs.writeFileSync(out, rows.join("\n\n") + "\n");
console.log(`wrote ${rows.length} items to ${out}`);
