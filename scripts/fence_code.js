#!/usr/bin/env node
// fence_code.js — wraps the code at the end of imported stems in a ``` block so the app shows it in monospace.
// NTS stems put code on the lines after a question line ending in "?" or ":"; those trailing lines are fenced.
// Usage: node scripts/fence_code.js <draft.json> [...]   (edits in place; stems already fenced are left alone)
const fs = require("fs");
for (const f of process.argv.slice(2)) {
  const items = JSON.parse(fs.readFileSync(f, "utf8"));
  let n = 0;
  for (const q of items) {
    if (q.q.includes("```") || !q.q.includes("\n")) continue;
    const lines = q.q.split("\n");
    const at = lines.findIndex((l, i) => i < lines.length - 1 && /[?:]\s*$/.test(l));
    if (at < 0) continue;
    q.q = [...lines.slice(0, at + 1), "```", ...lines.slice(at + 1), "```"].join("\n");
    n++;
  }
  fs.writeFileSync(f, "[\n" + items.map((q) => "  " + JSON.stringify(q)).join(",\n") + "\n]\n");
  console.log(`${f}: fenced ${n} stem(s)`);
}
