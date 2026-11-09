#!/usr/bin/env node
// make_test_mock.js — writes content/mocks/test-mock.json, a DEV-ONLY sample
// paper for testing the mock engine before the real mocks exist. It draws from
// the practice bank where a subject has questions and fills the rest with
// placeholder items (answer always "Right answer", shuffled position), in the
// real 10/30/30 + 30 Chemistry + 30 CS split. It is gitignored and only built
// with ECAT_TEST_MOCKS=1 (npm run build:test).
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const PAPER = { eng: 10, math: 30, phy: 30, chem: 30, cs: 30 };
const syllabus = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "syllabus.json")));
const out = [];
for (const [s, n] of Object.entries(PAPER)) {
  const dir = path.join(ROOT, "content", "questions", s);
  let pool = [];
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) pool = pool.concat(JSON.parse(fs.readFileSync(path.join(dir, f))).map((q) => ({ ...q, unit: f.replace(".json", "") })));
  pool.sort(() => Math.random() - 0.5);
  const picked = pool.slice(0, n);
  const units = syllabus.subjects.find((x) => x.id === s).units;
  if (!units.length) throw new Error(`syllabus has no units for ${s}`);
  for (let i = picked.length; i < n; i++) {
    const u = units[i % units.length], t = u.topics[0];
    const opts = ["Right answer", "Wrong answer one", "Wrong answer two", "Wrong answer three"];
    const a = i % 4;
    [opts[0], opts[a]] = [opts[a], opts[0]];
    picked.push({ id: `test-${s}-${i + 1}`, unit: u.id, topic: t.id, lo: (t.los && t.los[0] && t.los[0].code) || "", d: "M",
      ...(s === "eng" ? { p: "test-passage" } : {}),
      q: `TEST ${s} question ${i + 1} (${u.name}): pick "Right answer".`, o: opts, a, x: "Placeholder item for testing the mock engine only." });
  }
  out.push(...picked);
}
fs.mkdirSync(path.join(ROOT, "content", "mocks"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "content", "passages.test.json"), JSON.stringify({ "test-passage": { title: "TEST passage",
  text: "This is a placeholder reading passage for testing the mock engine. It has two paragraphs so the layout can be checked.\n\nThe second paragraph adds enough words to pass the length check in the build, and it never ships in a release build." } }));
fs.writeFileSync(path.join(ROOT, "content", "mocks", "test-mock.json"), JSON.stringify({ id: "test-mock", title: "TEST mock (placeholders)", questions: out }));
console.log(`wrote content/mocks/test-mock.json (${out.length} questions)`);
