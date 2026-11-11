#!/usr/bin/env node
// mock_overlap.js — lists mock-pool items that look like a practice item of the same subject (high word overlap
// of the stem, or a lower overlap with the same correct answer), and same-subject repeats inside the pool.
// Usage: node scripts/mock_overlap.js <subject> [...]   (run from the project root)
const fs = require("fs");
const stop = new Set("the a an of in is are which following to and by for on as that with from its it be this at or what value".split(" "));
const toks = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !stop.has(w)));
const load = (dir, s) => fs.readdirSync(dir).filter((f) => f.startsWith(s + "-")).flatMap((f) => JSON.parse(fs.readFileSync(dir + f)));
for (const s of process.argv.slice(2)) {
  const prac = (fs.existsSync(`content/questions/${s}/`) ? load(`content/questions/${s}/`, s) : []).map((q) => ({ q, t: toks(q.q), k: toks(q.o[q.a]) }));
  const pool = load("content/mockpool/", s).map((q) => ({ q, t: toks(q.q), k: toks(q.o[q.a]) }));
  let hits = 0;
  const cmp = (x, y, tag) => {
    let n = 0; for (const w of x.t) if (y.t.has(w)) n++;
    const jac = n / (x.t.size + y.t.size - n || 1), same = [...x.k].join() === [...y.k].join();
    if (jac >= 0.7 || (jac >= 0.5 && same)) { hits++; console.log(`${jac.toFixed(2)} ${same ? "SAMEKEY " : ""}${tag} ${x.q.id} | ${x.q.q.slice(0, 110)} || ${y.q.id} | ${y.q.q.slice(0, 110)}`); }
  };
  for (const x of pool) for (const y of prac) cmp(x, y, "PRACTICE");
  for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) cmp(pool[i], pool[j], "POOL");
  console.log(`${s}: ${pool.length} pool items, ${hits} pair(s) to look at`);
}
