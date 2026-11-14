#!/usr/bin/env node
// Takes the Play Store phone screenshots (1080×1920) of www/ with headless Chrome.
// Needs the preview server on :8768 (python3 -m http.server 8768 --directory www).
// Seeds some demo progress so the screens look in use; nothing leaves this machine.
// Usage: node scripts/store_screenshots.js
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "store-assets", "screenshots");
const BASE = "http://localhost:8768/";
const PORT = 9444;
const SHOTS = [
  ["01-home", "#/"],
  ["02-question", "PLAY"],
  ["03-code", "CODE"],
  ["04-mock", "#/mres/mock-01/0"],
  ["05-cheat", "#/cheat/phy-12-c02"],
  ["06-topics", "#/topics/math"],
  ["07-unit", "#/u/math-17"],
];

// Demo progress, built from the content files: ~30–50% of each subject
// answered (~76% right) and one finished mock.
function seedScript() {
  const root = path.join(__dirname, "..", "content");
  const share = { math: 0.35, phy: 0.3, chem: 0.25, cs: 0.2, eng: 0.4 };
  const p = { q: {}, bm: {}, mock: { active: null, hist: {} } };
  let k = 0;
  for (const sid of Object.keys(share)) {
    for (const f of fs.readdirSync(path.join(root, "questions", sid)).sort()) {
      for (const q of JSON.parse(fs.readFileSync(path.join(root, "questions", sid, f), "utf8"))) {
        k++;
        if (((k * 7919) % 1000) / 1000 < share[sid]) { const ok = (k * 104729) % 100 < 76; p.q[q.id] = { n: 1, c: ok ? 1 : 0, last: ok ? 1 : 0 }; }
      }
    }
  }
  // A Pre-Engineering attempt: the saved answers follow that group's 100-question paper (Eng, Maths, Phy, Chem).
  const m = JSON.parse(fs.readFileSync(path.join(root, "mocks", "mock-01.json"), "utf8"));
  const paper = ["eng", "math", "phy", "chem"].flatMap((s) => m.questions.filter((q) => q.unit.startsWith(s + "-")));
  p.mock.hist[m.id] = [{ at: Date.now() - 864e5, group: "pe", used: 5700000, ans: paper.map((q, i) => ((i * 37) % 100 < 74 ? q.a : (q.a + 1) % 4)), flag: [], auto: 0 }];
  return `localStorage.setItem("ecat-prep-v1", ${JSON.stringify(JSON.stringify(p))}); ${Object.keys(p.q).length}`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const dir = fs.mkdtempSync("/tmp/ecat-shots-");
  const chrome = spawn("google-chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${dir}`, "--hide-scrollbars", "--window-size=360,640", "about:blank"], { stdio: "ignore" });
  let list;
  for (let i = 0; i < 50 && !list; i++) { await sleep(200); try { list = await (await fetch(`http://localhost:${PORT}/json`)).json(); } catch (e) {} }
  const page = list.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const wait = {};
  ws.onmessage = (m) => { const r = JSON.parse(m.data); if (wait[r.id]) { wait[r.id](r.result); delete wait[r.id]; } };
  const send = (method, params = {}) => new Promise((r) => { wait[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

  await send("Emulation.setDeviceMetricsOverride", { width: 360, height: 640, deviceScaleFactor: 3, mobile: true });
  await send("Page.navigate", { url: BASE });
  await sleep(1500);
  console.log("seeded answers:", await evaluate(seedScript()));
  await send("Page.reload");   // the app reads progress only at start-up
  await sleep(1500);

  for (const [name, hash] of SHOTS) {
    await send("Page.navigate", { url: BASE + "#/" });
    await sleep(1200);
    if (hash === "PLAY") {
      // A Physics set with the first answer picked, so the explanation shows.
      await evaluate(`location.hash = "#/u/phy-12"; 1`); await sleep(400);
      await evaluate(`document.querySelector('[data-start^="unit:"]').click(); 1`); await sleep(400);
      await evaluate(`(() => { const b = document.querySelectorAll('[data-pick]'); b[0].click(); return b.length; })()`); await sleep(400);
    } else if (hash === "CODE") {
      // A Computer Science set, stepped on to the first question that shows code.
      await evaluate(`location.hash = "#/u/cs-09"; 1`); await sleep(400);
      await evaluate(`document.querySelector('[data-start^="unit:"]').click(); 1`); await sleep(400);
      await evaluate(`(async () => { for (let i = 0; i < 10 && !document.querySelector(".qtext pre.code"); i++) { document.querySelector("[data-pick]").click(); await new Promise((r) => setTimeout(r, 150)); document.querySelector("[data-next]").click(); await new Promise((r) => setTimeout(r, 150)); } return 1; })()`); await sleep(400);
    } else {
      await evaluate(`location.hash = ${JSON.stringify(hash)}; 1`); await sleep(700);
    }
    const shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(shot.data, "base64"));
    console.log("wrote", name);
  }
  ws.close();
  await new Promise((r) => { chrome.on("exit", r); chrome.kill(); });
  await sleep(300);
  fs.rmSync(dir, { recursive: true, force: true });
})();
