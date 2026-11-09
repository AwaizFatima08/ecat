#!/usr/bin/env node
/**
 * import_shared.js — turns tagged sibling-app items into ECAT draft files.
 *
 * Usage: node scripts/import_shared.js <app> <targets.json> <outDir> <map.tsv,...> <bank.jsonl> [...]
 * e.g.   node scripts/import_shared.js csca docs/pipeline/math-targets.json drafts/math \
 *          drafts/math/map-a.tsv,drafts/math/map-b.tsv ../csca/content/bank/math/*.jsonl
 *
 * A map line is "<srcId>\t<topicId>\t<lo>" (or "\tSKIP\t<reason>"). Kept items are grouped by unit, capped at half
 * the unit's target (spread round-robin over topics, in source order), numbered <unit>-001 upward and written to
 * <outDir>/<unit>.shared.json with from = "<app>:<srcId>". Options and keys are kept; balance_answers moves them later.
 */
const fs = require("fs");
const path = require("path");
const [app, targetsFile, outDir, maps, ...banks] = process.argv.slice(2);
if (!banks.length) { console.error("usage: import_shared.js <app> <targets.json> <outDir> <map.tsv,...> <bank.jsonl> [...]"); process.exit(1); }
// Units already written in full by writers: SKIP_UNITS=math-05,math-07 node scripts/import_shared.js ...
const skipUnits = new Set((process.env.SKIP_UNITS || "").split(",").filter(Boolean));
const targets = JSON.parse(fs.readFileSync(targetsFile, "utf8"));
const src = new Map();
for (const f of banks) for (const line of fs.readFileSync(f, "utf8").split("\n")) if (line.trim()) { const q = JSON.parse(line); src.set(q.id, q); }
const D = { 1: "E", 2: "M", 3: "D" };
const byUnit = {};
let skipped = 0;
for (const m of maps.split(",")) for (const line of fs.readFileSync(m, "utf8").split("\n")) {
  const [id, topic, lo] = line.split("\t").map((s) => (s || "").trim());
  if (!id) continue;
  if (topic === "SKIP") { skipped++; continue; }
  const q = src.get(id);
  if (!q) throw new Error(`${m}: unknown source id ${id}`);
  const unit = topic.split("-").slice(0, 2).join("-");
  if (skipUnits.has(unit)) { skipped++; continue; }
  ((byUnit[unit] ||= {})[topic] ||= []).push({ topic, lo, d: D[q.level], q: q.stem, o: q.options, a: q.answer, x: q.explanation, from: `${app}:${id}` });
}
fs.mkdirSync(outDir, { recursive: true });
let kept = 0;
for (const [unit, topics] of Object.entries(byUnit).sort()) {
  const cap = Math.floor((targets[unit] || 0) / 2);
  const queues = Object.values(topics);
  const picked = [];
  while (picked.length < cap && queues.some((qq) => qq.length)) for (const qq of queues) if (qq.length && picked.length < cap) picked.push(qq.shift());
  const items = picked.map((q, i) => ({ id: `${unit}-${String(i + 1).padStart(3, "0")}`, ...q }));
  fs.writeFileSync(path.join(outDir, `${unit}.shared.json`), "[\n" + items.map((q) => "  " + JSON.stringify(q)).join(",\n") + "\n]\n");
  const total = Object.values(topics).reduce((s, qq) => s + qq.length, 0) + picked.length;
  console.log(`${unit}: ${picked.length} shared (of ${total} kept, cap ${cap}, target ${targets[unit]})`);
  kept += picked.length;
}
console.log(`total shared ${kept}, skipped ${skipped}`);
