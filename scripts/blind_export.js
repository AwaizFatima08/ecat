#!/usr/bin/env node
// blind_export.js — writes questions WITHOUT answers or explanations, for the
// independent re-check pass. Usage: node scripts/blind_export.js <in.json> <out.txt> [passages.json ...]
// An item with "p" gets its reading passage printed once, before the first question on it; passages are read
// from content/passages.json and any extra files given.
const fs = require("fs");
const path = require("path");
const [inp, out, ...pFiles] = process.argv.slice(2);
const items = JSON.parse(fs.readFileSync(inp, "utf8"));
const passages = {};
const main = path.join(__dirname, "..", "content", "passages.json");
for (const f of [main, ...pFiles]) if (fs.existsSync(f)) Object.assign(passages, JSON.parse(fs.readFileSync(f, "utf8")));
const L = ["A", "B", "C", "D"];
let lastP = null;
fs.writeFileSync(out, items.map((q) => {
  let head = "";
  if (q.p != null && q.p !== lastP) {
    if (!passages[q.p]) throw new Error(`${q.id}: passage ${q.p} not found`);
    head = `=== PASSAGE ${q.p}: ${passages[q.p].title} ===\n${passages[q.p].text}\n=== END PASSAGE ===\n\n`;
  }
  lastP = q.p ?? null;
  return head + `${q.id}${q.p ? ` [passage ${q.p}]` : ""}\n${q.q}\n` + q.o.map((o, i) => `  ${L[i]}) ${o}`).join("\n");
}).join("\n\n") + "\n");
console.log(`wrote ${items.length} blind questions to ${out}`);
