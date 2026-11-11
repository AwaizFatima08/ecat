#!/usr/bin/env node
/**
 * assemble_mocks.js — deals the checked mock pools into 20 papers.
 *
 * Input: content/mockpool/<unit>.json (one file per unit, ids <unit>-501…, keys
 * already verified by the blind re-check; English items carry "p", a passage in
 * content/passages.json). Output: content/mocks/mock-01.json … mock-20.json.
 *
 * Maths, Physics, Chemistry and CS: each subject's unit pools are concatenated
 * in unit order, each pool ordered so difficulties interleave, then dealt
 * round-robin to the 20 papers. Every subject's pool total is exactly 20 × 30, so
 * each paper gets exactly 30 and every unit is spread as evenly as possible.
 * English: the pool is grouped by passage (5 questions each) and whole passages
 * are dealt, two per paper. One file holds both groups' papers (English, Maths,
 * Physics, then Chemistry for Pre-Eng and CS for ICS); the app picks by group.
 * Questions are renumbered mock-NN-001…130 and answer positions balanced per
 * paper (seeded, so re-running gives the same papers).
 *
 * Run: node scripts/assemble_mocks.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const N = 20;
const PAPER = { eng: 10, math: 30, phy: 30, chem: 30, cs: 30 };
const PER_PASSAGE = 5;
const syllabus = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "syllabus.json"), "utf8"));
const poolDir = path.join(ROOT, "content", "mockpool");

function seeded(str) {
  let h = 2166136261;
  for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
}
function shuffle(a, rand) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// Interleave difficulties so round-robin dealing spreads them over papers.
function interleave(items, rand) {
  const by = { D: shuffle(items.filter((q) => q.d === "D"), rand), M: shuffle(items.filter((q) => q.d === "M"), rand), E: shuffle(items.filter((q) => q.d === "E"), rand) };
  const out = [];
  const take = (k) => by[k].length && out.push(by[k].shift());
  for (let i = 0; out.length < items.length; i++) {
    // Pattern of 13: 2 D, 9 M, 2 E, falling back to whatever is left. 13 is coprime with
    // the 20 papers, so round-robin dealing spreads D and E instead of bunching them.
    const want = i % 13 < 2 ? "D" : i % 13 >= 11 ? "E" : "M";
    if (!take(want)) take("M") || take("D") || take("E");
  }
  return out;
}

const readPool = (u) => {
  const f = path.join(poolDir, `${u.id}.json`);
  if (!fs.existsSync(f)) throw new Error(`missing pool ${path.relative(ROOT, f)}`);
  return JSON.parse(fs.readFileSync(f, "utf8")).map((q) => ({ ...q, unit: u.id }));
};
const papers = Array.from({ length: N }, () => []);
for (const s of syllabus.subjects) {
  let dealt = 0;
  if (s.id === "eng") {
    // Whole passages: group by "p", keep each passage's question order, shuffle the passages.
    const groups = {};
    // Only comprehension (eng-01) is in the paper; vocabulary and sentence correction are practice-only.
    for (const u of s.units.filter((u) => u.id === "eng-01")) for (const q of readPool(u)) (groups[q.p] ||= []).push(q);
    for (const [p, g] of Object.entries(groups)) if (g.length !== PER_PASSAGE) throw new Error(`passage ${p}: ${g.length} questions, need ${PER_PASSAGE}`);
    shuffle(Object.keys(groups).sort(), seeded("eng")).forEach((p, i) => { papers[i % N].push(...groups[p]); dealt += groups[p].length; });
  } else {
    for (const u of s.units) for (const q of interleave(readPool(u), seeded(u.id))) papers[dealt++ % N].push(q);
  }
  if (dealt !== PAPER[s.id] * N) throw new Error(`${s.id}: pools hold ${dealt}, need ${PAPER[s.id] * N}`);
}

fs.mkdirSync(path.join(ROOT, "content", "mocks"), { recursive: true });
papers.forEach((qs, p) => {
  const id = `mock-${String(p + 1).padStart(2, "0")}`;
  const rand = seeded(id);
  // Balanced answer targets: equal A/B/C/D, shuffled.
  const targets = qs.map((_, i) => i % 4);
  for (let i = targets.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [targets[i], targets[j]] = [targets[j], targets[i]]; }
  const questions = qs.map((q, i) => {
    const correct = q.o[q.a], others = q.o.filter((_, k) => k !== q.a), t = targets[i];
    return { id: `${id}-${String(i + 1).padStart(3, "0")}`, src: q.id, unit: q.unit, topic: q.topic, lo: q.lo, d: q.d,
      ...(q.p != null ? { p: q.p } : {}), q: q.q, o: others.slice(0, t).concat([correct], others.slice(t)), a: t, x: q.x };
  });
  fs.writeFileSync(path.join(ROOT, "content", "mocks", `${id}.json`),
    `{"id":${JSON.stringify(id)},"title":${JSON.stringify(`Mock ${p + 1}`)},"questions":[\n` + questions.map((q) => "  " + JSON.stringify(q)).join(",\n") + "\n]}\n");
  const d = { E: 0, M: 0, D: 0 }; questions.forEach((q) => d[q.d]++);
  console.log(`${id}: ${questions.length} questions, E/M/D ${d.E}/${d.M}/${d.D}`);
});
