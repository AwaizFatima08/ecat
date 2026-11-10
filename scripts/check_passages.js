#!/usr/bin/env node
/**
 * check_passages.js — extra checks for passage-based English drafts (run after check_draft.js).
 *
 * Usage: node scripts/check_passages.js <passages.json> <items.json> <firstPassageNum> <passageCount>
 * e.g.   node scripts/check_passages.js drafts/eng/eng-01.p1.json drafts/eng/eng-01.1.json 1 10
 *
 * Passages: ids eng-pNNN running from <firstPassageNum>, a title and a text of 140-300 words in 2-4 paragraphs.
 * Items: every item has "p" naming a passage of this file, each passage has exactly 5 items in a row, each
 * passage asks one main-idea, one detail, one inference and one words-in-context question (fifth: tone or
 * structure), and a quoted word in a words-in-context stem appears in its passage. Stems must not repeat the
 * passage (the app shows it above the question).
 */
const fs = require("fs");
const [pFile, iFile, firstArg, countArg] = process.argv.slice(2);
if (!countArg) { console.error("usage: check_passages.js <passages.json> <items.json> <firstPassageNum> <passageCount>"); process.exit(1); }
const first = Number(firstArg), count = Number(countArg);
const errs = [];
let passages, items;
try { passages = JSON.parse(fs.readFileSync(pFile, "utf8")); } catch (e) { console.error(`${pFile} NOT VALID JSON: ${e.message}`); process.exit(1); }
try { items = JSON.parse(fs.readFileSync(iFile, "utf8")); } catch (e) { console.error(`${iFile} NOT VALID JSON: ${e.message}`); process.exit(1); }
const ids = Object.keys(passages);
const want = Array.from({ length: count }, (_, i) => `eng-p${String(first + i).padStart(3, "0")}`);
if (ids.join() !== want.join()) errs.push(`passage ids should be ${want[0]}..${want[want.length - 1]} in order, got ${ids.join(", ")}`);
const words = {};
for (const [id, p] of Object.entries(passages)) {
  if (!p.title || String(p.title).length > 70) errs.push(`${id}: needs a title of up to 70 characters`);
  const text = String(p.text || "");
  const paras = text.split(/\n\s*\n/).filter((t) => t.trim());
  const n = text.split(/\s+/).filter(Boolean).length;
  words[id] = n;
  if (n < 140 || n > 300) errs.push(`${id}: ${n} words (aim 160-260, allowed 140-300)`);
  if (paras.length < 2 || paras.length > 4) errs.push(`${id}: ${paras.length} paragraph(s), want 2-4 separated by a blank line (\\n\\n)`);
  if (/[<>]|\\\(|\$/.test(text)) errs.push(`${id}: plain text only (no HTML, LaTeX or $)`);
}
const byP = {};
let prev = null;
const seen = new Set();
items.forEach((q, i) => {
  const at = `item ${i} (${q.id})`;
  if (!q.p || !passages[q.p]) { errs.push(`${at}: "p" must name a passage in ${pFile}`); return; }
  if (q.p !== prev && seen.has(q.p)) errs.push(`${at}: items of ${q.p} must be in a row`);
  seen.add(q.p); prev = q.p;
  (byP[q.p] ||= []).push(q);
  if (String(q.q).length > 400) errs.push(`${at}: stem too long — don't repeat the passage in the stem`);
  if (q.topic === "eng-01-vocab") {
    const m = String(q.q).match(/["“'‘]([^"”'’]{2,40})["”'’]/);
    const text = passages[q.p].text.toLowerCase();
    if (!m) errs.push(`${at}: words-in-context stem should quote the word or phrase`);
    else if (!text.includes(m[1].toLowerCase())) errs.push(`${at}: quoted "${m[1]}" is not in ${q.p}`);
  }
});
for (const id of ids) {
  const qs = byP[id] || [];
  if (qs.length !== 5) { errs.push(`${id}: has ${qs.length} items, want 5`); continue; }
  const t = qs.map((q) => q.topic);
  for (const need of ["eng-01-main", "eng-01-detail", "eng-01-infer", "eng-01-vocab"]) if (!t.includes(need)) errs.push(`${id}: no ${need} item`);
  if (!t.some((x) => x === "eng-01-tone" || x === "eng-01-structure")) errs.push(`${id}: fifth item should be eng-01-tone or eng-01-structure`);
}
if (errs.length) { errs.forEach((e) => console.log("ERR " + e)); console.log(`FAIL ${pFile}: ${errs.length} problem(s)`); process.exit(2); }
const w = Object.values(words);
console.log(`PASS ${pFile}: ${ids.length} passages, ${items.length} items, ${Math.min(...w)}-${Math.max(...w)} words`);
