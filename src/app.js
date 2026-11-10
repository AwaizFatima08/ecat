(function(){
"use strict";

/* ======================================================================
   CONTENT — injected by build/build.js from content/syllabus.json and
   content/questions/<subject>/<unit>.json. Edit the content files, never
   this block.
   ====================================================================== */
/* __CONTENT_INJECTION_POINT__ */

const SET_SIZE = 10;
const LETTERS = ["A","B","C","D"];
const DIFF_LABEL = { E:"Easy", M:"Moderate", D:"Difficult" };
const SUBJECT_COLOR = { math:"var(--math)", phy:"var(--phy)", chem:"var(--chem)", cs:"var(--cs)", eng:"var(--eng)" };
const SUBJECT_ABBR = { math:"Math", phy:"Phy", chem:"Chem", cs:"CS", eng:"Eng" };

/* ======================================================================
   LOOKUPS
   ====================================================================== */
const subjectById = {}, unitById = {}, topicById = {};
for(const s of SYLLABUS.subjects){
  subjectById[s.id] = s;
  for(const u of s.units){
    unitById[u.id] = { ...u, subject:s.id };
    for(const t of u.topics) topicById[t.id] = { ...t, unit:u.id };
  }
}
const qById = {};
const qByUnit = {}, qByTopic = {}, qBySubject = {};
for(const q of QUESTIONS){
  qById[q.id] = q;
  (qByUnit[q.unit] = qByUnit[q.unit] || []).push(q);
  (qByTopic[q.topic] = qByTopic[q.topic] || []).push(q);
  const s = unitById[q.unit].subject;
  (qBySubject[s] = qBySubject[s] || []).push(q);
}

/* ======================================================================
   PROGRESS — localStorage, per device, no login.
   progress.q[id] = { n: attempts, c: correct attempts, last: 1|0 }
   ====================================================================== */
const STORE_KEY = "ecat-prep-v1";
function loadProgress(){
  try{ const raw = localStorage.getItem(STORE_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  return { q:{}, bm:{} };
}
let progress = loadProgress();
progress.q = progress.q || {}; progress.bm = progress.bm || {};
// progress.mock = { active: {id, group, start, ans:[idx|null], flag:[0|1], i} | null,
//                   hist: { [mockId]: [{ at, group, used, ans, flag, auto }] } }
// progress.group = "pe" | "ics" — the student's ECAT subject group.
progress.mock = progress.mock || { active:null, hist:{} };
progress.group = progress.group || "pe";
function saveProgress(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(progress)); }catch(e){} }

function recordAnswer(id, isCorrect){
  const p = progress.q[id] || { n:0, c:0, last:0 };
  p.n++; if(isCorrect) p.c++; p.last = isCorrect ? 1 : 0;
  progress.q[id] = p;
  saveProgress();
}
// done = questions attempted at least once; right = last attempt correct.
function stats(list){
  let done = 0, right = 0;
  for(const q of list || []){
    const p = progress.q[q.id];
    if(p){ done++; if(p.last) right++; }
  }
  return { total:(list||[]).length, done, right, pct: done ? Math.round(100*right/done) : 0 };
}
function mistakes(){ return QUESTIONS.filter(q => progress.q[q.id] && !progress.q[q.id].last); }

/* ======================================================================
   SET PICKER — unseen first, then last-wrong, then the rest; shuffled
   within each group so repeats don't come in the same order.
   ====================================================================== */
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function pickSet(pool, size){
  // Reading questions come as whole passages (a set of 10 = two passages), so a passage is read once.
  if(pool.some(q => q.p != null)) return pickPassages(pool, size);
  const unseen = [], wrong = [], rest = [];
  for(const q of pool){
    const p = progress.q[q.id];
    if(!p) unseen.push(q); else if(!p.last) wrong.push(q); else rest.push(q);
  }
  return shuffle(unseen).concat(shuffle(wrong), shuffle(rest)).slice(0, size);
}
// Passages with unseen questions first, then those with a last-wrong answer, then the rest.
function pickPassages(pool, size){
  const groups = new Map();
  for(const q of pool){ const k = q.p != null ? q.p : q.id; if(!groups.has(k)) groups.set(k, []); groups.get(k).push(q); }
  const rank = g => g.some(q => !progress.q[q.id]) ? 0 : g.some(q => !progress.q[q.id].last) ? 1 : 2;
  const order = [[], [], []];
  for(const g of groups.values()) order[rank(g)].push(g);
  const set = [];
  for(const g of shuffle(order[0]).concat(shuffle(order[1]), shuffle(order[2]))){
    if(set.length >= size) break;
    set.push(...g);
  }
  return set;
}

/* ======================================================================
   ROUTER — hash based so Android back / browser back work.
   #/  #/s/math  #/u/math-01  #/play  #/results  #/mistakes  #/soon/<name>
   ====================================================================== */
const app = document.getElementById("app");
let session = null;   // current practice set: { title, back, items:[q], i, answers:[idx|null] }
let tick = null;      // mock timer interval, cleared on every render

function go(hash){ if(location.hash === hash) render(); else location.hash = hash; }
window.addEventListener("hashchange", render);

function esc(s){ return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
function bar(title, backHash){
  return `<div class="bar">${backHash!=null ? `<button class="iconbtn" data-go="${backHash}" aria-label="Back">←</button>` : ""}<h1>${esc(title)}</h1></div>`;
}
function pbar(pct){ return `<div class="pbar"><i style="width:${pct}%"></i></div>`; }
// Reading passage shown above an English comprehension question.
function passageHtml(q){
  const p = q.p != null && PASSAGES[q.p];
  return p ? `<details class="passage" open><summary>${esc(p.title)}</summary>${String(p.text).split(/\n\s*\n/).map(t => `<p>${esc(t)}</p>`).join("")}</details>` : "";
}

function render(){
  const h = location.hash.replace(/^#/, "") || "/";
  const parts = h.split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if(tick){ clearInterval(tick); tick = null; }
  if(parts[0] === "mocks") return renderMockList();
  if(parts[0] === "mock" && mockById[parts[1]]) return renderMockIntro(parts[1]);
  if(parts[0] === "mq" && progress.mock.active) return renderMockQ();
  if(parts[0] === "mgrid" && progress.mock.active) return renderMockGrid();
  if(parts[0] === "mres" && mockById[parts[1]]) return renderMockResults(parts[1], Number(parts[2]) || 0);
  if(parts[0] === "s" && subjectById[parts[1]]) return renderSubject(parts[1]);
  if(parts[0] === "u" && unitById[parts[1]]) return renderUnit(parts[1]);
  if(parts[0] === "play" && session) return renderPlayer();
  if(parts[0] === "results" && session) return renderResults();
  if(parts[0] === "mistakes") return renderMistakes();
  if(parts[0] === "guide") return parts[1] ? renderGuideSection(parts[1]) : renderGuide();
  if(parts[0] === "soon") return renderSoon(decodeURIComponent(parts[1] || ""));
  return renderHome();
}

/* ----- home ----- */
function renderHome(){
  const all = stats(QUESTIONS);
  const nMistakes = mistakes().length;
  let html = `<div class="bar"><h1>ECAT Prep</h1></div>
  <div class="hero">
    <h2>Prepare for ECAT</h2>
    <p>${esc(SYLLABUS.paperLine)}</p>
    <div class="stats">
      <div><b>${all.done}</b><span>of ${all.total} practised</span></div>
      <div><b>${all.done ? all.pct + "%" : "–"}</b><span>accuracy</span></div>
      <div><b>${nMistakes}</b><span>to review</span></div>
    </div>
  </div>
  <h3 class="section">Practice by subject</h3><div class="list">`;
  for(const s of SYLLABUS.subjects){
    const st = stats(qBySubject[s.id]);
    const avail = st.total;
    html += `<button class="row" data-go="#/s/${s.id}">
      <span class="badge" style="background:${SUBJECT_COLOR[s.id]}">${SUBJECT_ABBR[s.id]}</span>
      <span class="main"><span class="title">${esc(s.name)}</span>
        <div class="sub">${s.mcqsInPaper} MCQs in paper · ${s.units.length} units · ${avail ? `${st.done}/${avail} practised` : "questions coming soon"}</div>
        ${avail ? pbar(Math.round(100*st.done/avail)) : ""}</span>
      <span class="chev">›</span></button>`;
  }
  html += `</div>
  <h3 class="section">More</h3>
  <div class="tiles">
    <button class="tile" data-go="#/mistakes"><div class="ic">🔁</div><div class="title">Review mistakes</div><div class="sub">${nMistakes} question${nMistakes===1?"":"s"}</div></button>
    <button class="tile" data-go="#/mocks"><div class="ic">⏱️</div><div class="title">Mock exams</div><div class="sub">${progress.mock.active ? "paper in progress" : MOCKS.length ? `${MOCKS.length} full paper${MOCKS.length===1?"":"s"}` : "coming soon"}</div></button>
    <button class="tile" data-go="#/guide"><div class="ic">📋</div><div class="title">Rules &amp; guidelines</div><div class="sub">format, groups, merit</div></button>
    <button class="tile" data-go="#/soon/Memory%20cheats"><div class="ic">🧠</div><div class="title">Memory cheats</div><div class="sub">coming soon</div></button>
    <button class="tile" data-go="#/soon/Important%20topics"><div class="ic">⭐</div><div class="title">Important topics</div><div class="sub">coming soon</div></button>
  </div>`;
  app.innerHTML = html;
}

/* ----- subject ----- */
function renderSubject(sid){
  const s = subjectById[sid];
  let html = bar(s.name, "#/") + `<p class="note">${s.mcqsInPaper} of ${SYLLABUS.paperTotal} MCQs in the real paper (${Math.round(100*s.mcqsInPaper/SYLLABUS.paperTotal)}%).</p><div class="list">`;
  for(const u of s.units){
    const st = stats(qByUnit[u.id]);
    const has = st.total > 0;
    html += `<button class="row${has ? "" : " disabled"}" ${has ? `data-go="#/u/${u.id}"` : ""}>
      <span class="badge" style="background:${SUBJECT_COLOR[sid]}">${u.n}</span>
      <span class="main"><span class="title">${esc(u.name)}</span>
        <div class="sub">${has ? `${st.done}/${st.total} practised${st.done ? ` · ${st.pct}% right` : ""}` : `<span class="tag soon">coming soon</span>`}</div>
        ${has ? pbar(Math.round(100*st.done/st.total)) : ""}</span>
      ${has ? `<span class="chev">›</span>` : ""}</button>`;
  }
  app.innerHTML = html + `</div>`;
}

/* ----- unit ----- */
function renderUnit(uid){
  const u = unitById[uid];
  const st = stats(qByUnit[uid]);
  let html = bar(`${u.n}. ${u.name}`, `#/s/${u.subject}`) +
    (u.books ? `<p class="note">Textbooks: ${esc(u.books)}</p>` : "") + (u.note ? `<p class="note">${esc(u.note)}</p>` : "") +
    `<div class="card" style="padding:16px;margin-top:14px">
      <div class="sub" style="color:var(--muted);font-size:14px">${st.done}/${st.total} practised${st.done ? ` · ${st.pct}% right` : ""}</div>
      ${pbar(st.total ? Math.round(100*st.done/st.total) : 0)}
      <div class="actions"><button class="btn" data-start="unit:${uid}">Practise ${Math.min(SET_SIZE, st.total)} questions</button></div>
    </div>
    <h3 class="section">Topics</h3><div class="list">`;
  for(const t of u.topics){
    const tq = qByTopic[t.id] || [];
    const ts = stats(tq);
    html += `<button class="row${tq.length ? "" : " disabled"}" ${tq.length ? `data-start="topic:${t.id}"` : ""}>
      <span class="main"><span class="title">${esc(t.name)}</span>
        <div class="sub">${tq.length ? `${ts.done}/${tq.length} practised${ts.done ? ` · ${ts.pct}% right` : ""}` : "no questions yet"}</div>
        <ul class="lo">${(t.los||[]).map(lo => `<li><code>${esc(lo.code)}</code>${esc(lo.text)}</li>`).join("")}</ul></span>
      ${tq.length ? `<span class="chev">▶</span>` : ""}</button>`;
  }
  app.innerHTML = html + `</div>`;
}

/* ----- practice ----- */
function startSession(kind, id){
  let pool, title, back;
  if(kind === "unit"){ const u = unitById[id]; pool = qByUnit[id]; title = u.name; back = `#/u/${id}`; }
  else if(kind === "topic"){ const t = topicById[id]; pool = qByTopic[id]; title = t.name; back = `#/u/${t.unit}`; }
  else if(kind === "mistakes"){ pool = mistakes(); title = "Review mistakes"; back = "#/"; }
  if(!pool || !pool.length) return;
  session = { kind, id, title, back, items: pickSet(pool, SET_SIZE), i:0, answers:[] };
  go("#/play");
}

function renderPlayer(){
  const s = session, q = s.items[s.i], picked = s.answers[s.i];
  const answered = picked != null;
  const u = unitById[q.unit];
  let html = bar(s.title, s.back) +
    `<div class="qprog"><i style="width:${Math.round(100*(s.i + (answered?1:0))/s.items.length)}%"></i></div>
    <div class="qmeta"><span>Question ${s.i+1} of ${s.items.length}</span>
      <span class="tag">${esc(q.lo)}</span><span class="tag">${DIFF_LABEL[q.d]}</span>
      <button class="iconbtn" data-bm="${q.id}" aria-label="Bookmark" style="margin-left:auto">${progress.bm[q.id] ? "★" : "☆"}</button></div>
    ${passageHtml(q)}<div class="qtext">${esc(q.q)}</div><div class="opts">`;
  q.o.forEach((opt, i) => {
    let cls = "opt";
    if(answered){ cls += " locked"; if(i === q.a) cls += " correct"; else if(i === picked) cls += " wrong"; }
    html += `<button class="${cls}" ${answered ? "" : `data-pick="${i}"`}><span class="k">${LETTERS[i]}</span><span>${esc(opt)}</span></button>`;
  });
  html += `</div>`;
  if(answered){
    const ok = picked === q.a;
    html += `<div class="explain"><b class="${ok ? "verdict-ok" : "verdict-bad"}">${ok ? "✓ Correct" : `✗ Not quite — the answer is ${LETTERS[q.a]}`}</b>${esc(q.x)}</div>
      <div class="actions"><button class="btn" data-next>${s.i+1 < s.items.length ? "Next question" : "See results"}</button></div>`;
  }
  html += `<p class="note">${esc(subjectById[u.subject].name)} · Unit ${u.n}: ${esc(u.name)}</p>`;
  app.innerHTML = html;
}

function pick(i){
  const s = session, q = s.items[s.i];
  if(s.answers[s.i] != null) return;
  s.answers[s.i] = i;
  recordAnswer(q.id, i === q.a);
  renderPlayer();
}
function next(){
  if(session.i + 1 < session.items.length){ session.i++; renderPlayer(); window.scrollTo(0,0); }
  else go("#/results");
}

function renderResults(){
  const s = session;
  const right = s.items.filter((q, i) => s.answers[i] === q.a).length;
  const n = s.items.length;
  let html = bar("Results", s.back) +
    `<div class="card score"><div class="big">${right}/${n}</div><div class="of">${Math.round(100*right/n)}% correct · ${esc(s.title)}</div></div>
    <div class="actions">
      ${s.kind !== "mistakes" ? `<button class="btn" data-start="${s.kind}:${s.id}">Next ${SET_SIZE} questions</button>` : ""}
      <button class="btn secondary" data-go="${s.back}">Done</button>
    </div><h3 class="section">Review</h3>`;
  s.items.forEach((q, i) => {
    const ok = s.answers[i] === q.a;
    html += `<div class="card review"><div class="q">${i+1}. ${esc(q.q)}</div>
      <div class="ans ${ok ? "verdict-ok" : "verdict-bad"}">${ok ? "✓" : "✗"} ${s.answers[i] != null ? `You: ${LETTERS[s.answers[i]]}. ${esc(q.o[s.answers[i]])}` : "Not answered"}</div>
      ${ok ? "" : `<div class="ans verdict-ok">Answer: ${LETTERS[q.a]}. ${esc(q.o[q.a])}</div>`}
      <div class="x">${esc(q.x)}</div></div>`;
  });
  app.innerHTML = html;
}

/* ----- mistakes ----- */
function renderMistakes(){
  const list = mistakes();
  let html = bar("Review mistakes", "#/");
  if(!list.length){
    app.innerHTML = html + `<div class="empty">No mistakes to review yet.<br>Questions you get wrong will collect here until you answer them right.</div>`;
    return;
  }
  html += `<div class="card" style="padding:16px;margin-top:14px"><div>${list.length} question${list.length===1?"":"s"} you last got wrong.</div>
    <div class="actions"><button class="btn" data-start="mistakes:all">Practise ${Math.min(SET_SIZE, list.length)} of them</button></div></div>
    <h3 class="section">By unit</h3><div class="list">`;
  const byUnit = {};
  for(const q of list) byUnit[q.unit] = (byUnit[q.unit] || 0) + 1;
  for(const [uid, n] of Object.entries(byUnit)){
    const u = unitById[uid];
    html += `<button class="row" data-go="#/u/${uid}"><span class="badge" style="background:${SUBJECT_COLOR[u.subject]}">${u.n}</span>
      <span class="main"><span class="title">${esc(u.name)}</span><div class="sub">${esc(subjectById[u.subject].name)} · ${n} to review</div></span><span class="chev">›</span></button>`;
  }
  app.innerHTML = html + `</div>`;
}

/* ----- rules & guidelines ----- */
function renderGuide(){
  let html = bar("Rules & guidelines", "#/") + `<div class="list" style="margin-top:14px">`;
  for(const s of GUIDE.sections){
    html += `<button class="row" data-go="#/guide/${s.id}"><span class="badge" style="background:var(--brand-soft);font-size:22px">${s.icon}</span>
      <span class="main"><span class="title">${esc(s.title)}</span><div class="sub">${esc(s.summary)}</div></span><span class="chev">›</span></button>`;
  }
  html += `</div><p class="note">${esc(GUIDE.disclaimer)}</p><p class="note">Last checked: ${esc(GUIDE.updated)}</p>
    <h3 class="section">Official sources</h3><ul class="srcs">${GUIDE.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ul>`;
  app.innerHTML = html;
}

function guideBlock(b){
  switch(b.type){
    case "p": return `<p>${esc(b.text)}</p>`;
    case "h": return `<h4>${esc(b.text)}</h4>`;
    case "tip": return `<div class="callout tip">💡 ${esc(b.text)}</div>`;
    case "warn": return `<div class="callout warn">⚠️ ${esc(b.text)}</div>`;
    case "list": return `<ul>${b.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "table": return `<table><thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  return "";
}

function renderGuideSection(id){
  const i = GUIDE.sections.findIndex(s => s.id === id);
  if(i < 0) return renderGuide();
  const s = GUIDE.sections[i], nextS = GUIDE.sections[i+1];
  app.innerHTML = bar(s.title, "#/guide") +
    `<article class="card guide">${s.blocks.map(guideBlock).join("")}</article>
    ${nextS ? `<div class="actions"><button class="btn secondary" data-go="#/guide/${nextS.id}">Next: ${esc(nextS.title)} ›</button></div>` : ""}
    <p class="note">${esc(GUIDE.disclaimer)}</p>`;
}

/* ======================================================================
   MOCK EXAMS — a full ECAT paper: 100 MCQs in 100 minutes, +4 per correct
   answer, 400 marks, no negative marking (UET 2026 rule). One mock file
   holds both groups' papers; the student's group picks Chemistry or CS.
   The clock is wall-clock from the start time, so closing the app does not
   pause it. Answers are saved on every tap.
   ====================================================================== */
const MOCK_MS = 100 * 60 * 1000;
const PAPER_N = 100, MARK = 4, MAX = PAPER_N * MARK;
// Official UET group statistics, ECAT 2026 (out of 400).
const GROUPS = {
  pe:  { name:"Pre-Engineering", subjects:["eng","math","phy","chem"], avg:[203, 238] },
  ics: { name:"ICS (Physics)",   subjects:["eng","math","phy","cs"],   avg:[201, 227] },
};
// UET Fall 2026 Merit List 1, Main Campus Lahore, open merit (aggregate %).
const CLOSING = [["Computer Science", 87.47], ["Electrical Engineering", 85.14], ["Mechanical Engineering", 83.29], ["Civil Engineering", 82.64], ["Chemical Engineering", 81.70]];
const mockById = {};
for(const m of MOCKS) mockById[m.id] = m;
let mockReview = "all";               // results filter: all | wrong | blank | flagged
let mockConfirm = false;              // grid page: showing the submit confirmation

function subjectOfQ(q){ return unitById[q.unit].subject; }
// The 100 questions one group sits, in paper order (English, Maths, Physics, Chem/CS).
const paperCache = {};
function paperOf(m, g){
  const key = m.id + ":" + g;
  if(!paperCache[key]){
    const subs = GROUPS[g].subjects;
    paperCache[key] = subs.flatMap(s => m.questions.filter(q => subjectOfQ(q) === s));
  }
  return paperCache[key];
}
function msLeft(a){ return a.start + MOCK_MS - Date.now(); }
function fmtTime(ms){
  const t = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60;
  return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
// right / wrong / blank counts and marks under the 2026 rule (+4) and the 2025 rule (+4, −1).
function mockTally(qs, ans){
  let r = 0, w = 0;
  qs.forEach((q, i) => { if(ans[i] == null) return; if(ans[i] === q.a) r++; else w++; });
  return { r, w, b: qs.length - r - w, marks: r * MARK, marks2025: r * MARK - w };
}
function attemptGroup(h){ return h.group || "pe"; }

// Starts the visible countdown; submits the paper automatically at zero.
function startTick(){
  const a = progress.mock.active;
  const upd = () => {
    const el = document.getElementById("mtimer");
    const left = msLeft(a);
    if(left <= 0){ submitMock(true); return; }
    if(el){ el.textContent = fmtTime(left); el.classList.toggle("low", left < 10 * 60 * 1000); }
  };
  upd();
  tick = setInterval(upd, 1000);
}

function groupChips(){
  return `<div class="filters">` + Object.entries(GROUPS).map(([k, g]) =>
    `<button class="chip${progress.group === k ? " on" : ""}" data-group="${k}">${esc(g.name)}</button>`).join("") + `</div>`;
}

function renderMockList(){
  const g = GROUPS[progress.group];
  let html = bar("Mock exams", "#/") +
    `<p class="note">Each mock is a full paper like the real ECAT: 100 MCQs in 100 minutes, 4 marks each (400 total), no negative marking. Your group:</p>${groupChips()}
    <p class="note" style="margin-top:4px">${g.subjects.map(s => `${esc(subjectById[s].name)} ${subjectById[s].mcqsInPaper}`).join(" · ")}</p>`;
  const a = progress.mock.active;
  if(a && mockById[a.id]){
    html += `<div class="card" style="padding:16px;margin-top:14px"><b>${esc(mockById[a.id].title)} is in progress</b>
      <div class="sub" style="color:var(--muted);font-size:14px">${esc(GROUPS[a.group].name)} · ${fmtTime(msLeft(a))} left · ${a.ans.filter(x => x != null).length}/${PAPER_N} answered</div>
      <div class="actions"><button class="btn" data-go="#/mq">Resume paper</button></div></div>`;
  }
  if(!MOCKS.length) return void (app.innerHTML = html + `<div class="empty">The 20 mock papers are being prepared and will arrive in an update.</div>`);
  html += `<div class="list" style="margin-top:14px">`;
  MOCKS.forEach((m, i) => {
    const hist = (progress.mock.hist[m.id] || []).filter(h => attemptGroup(h) === progress.group);
    const best = hist.length ? Math.max(...hist.map(h => mockTally(paperOf(m, progress.group), h.ans).marks)) : null;
    html += `<button class="row" data-go="#/mock/${m.id}"><span class="badge" style="background:var(--brand)">${i+1}</span>
      <span class="main"><span class="title">${esc(m.title)}</span>
        <div class="sub">${hist.length ? `Best ${best}/${MAX} · ${hist.length} attempt${hist.length===1?"":"s"}` : "Not attempted"}</div></span>
      <span class="chev">›</span></button>`;
  });
  app.innerHTML = html + `</div>`;
}

function renderMockIntro(id){
  const m = mockById[id], a = progress.mock.active, g = GROUPS[progress.group];
  const hist = progress.mock.hist[id] || [];
  let html = bar(m.title, "#/mocks") + `<article class="card guide" style="margin-top:14px">
    <h4>Before you start</h4>
    <ul><li>100 questions in 100 minutes: ${g.subjects.map(s => `${esc(subjectById[s].name)} ${subjectById[s].mcqsInPaper}`).join(", ")}.</li>
      <li>4 marks for each correct answer, 400 in total. No negative marking (UET 2026 rule): answer every question.</li>
      <li>No calculator, as in the real test. Keep rough paper and a pen ready.</li>
      <li>The clock keeps running if you leave the app. The paper submits itself when time runs out.</li>
      <li>Move freely between questions, change answers, and mark ones to come back to.</li>
      <li>After you submit you get your score, marks per subject and chapter, and an explanation for every question.</li></ul>
    <p>Group: <b>${esc(g.name)}</b></p>${groupChips()}</article><div class="actions">`;
  if(a && a.id === id) html += `<button class="btn" data-go="#/mq">Resume paper (${fmtTime(msLeft(a))} left)</button>`;
  else if(a) html += `<p class="note">Finish or submit ${esc(mockById[a.id] ? mockById[a.id].title : "your current paper")} before starting another.</p><button class="btn secondary" data-go="#/mq">Go to paper in progress</button>`;
  else html += `<button class="btn" data-mstart="${id}">Start the 100-minute paper</button>`;
  html += `</div>`;
  if(hist.length){
    html += `<h3 class="section">Your attempts</h3><div class="list">`;
    hist.forEach((h, n) => {
      const t = mockTally(paperOf(m, attemptGroup(h)), h.ans);
      html += `<button class="row" data-go="#/mres/${id}/${n}"><span class="main"><span class="title">${t.marks}/${MAX} · ${Math.round(100*t.marks/MAX)}%</span>
        <div class="sub">${esc(GROUPS[attemptGroup(h)].name)} · ${new Date(h.at).toLocaleDateString()} · ${fmtTime(h.used)} used</div></span><span class="chev">›</span></button>`;
    });
    html += `</div>`;
  }
  app.innerHTML = html;
}

function startMock(id){
  if(progress.mock.active) return go("#/mq");
  progress.mock.active = { id, group: progress.group, start: Date.now(), ans: Array(PAPER_N).fill(null), flag: Array(PAPER_N).fill(0), i: 0 };
  saveProgress();
  go("#/mq");
}

function renderMockQ(){
  const a = progress.mock.active, m = mockById[a.id];
  if(!m){ progress.mock.active = null; saveProgress(); return go("#/mocks"); }
  const qs = paperOf(m, a.group), q = qs[a.i], picked = a.ans[a.i], sid = subjectOfQ(q);
  const answered = a.ans.filter(x => x != null).length;
  let html = `<div class="bar"><button class="iconbtn" data-go="#/mock/${m.id}" aria-label="Back">←</button>
      <h1>${esc(m.title)}</h1><span class="timer" id="mtimer"></span></div>
    <div class="qprog"><i style="width:${Math.round(100*answered/PAPER_N)}%"></i></div>
    <div class="qmeta"><span class="tag" style="background:${SUBJECT_COLOR[sid]};color:#fff">${SUBJECT_ABBR[sid]}</span>
      <span>Question ${a.i+1} of ${PAPER_N}</span>
      <button class="iconbtn flagbtn${a.flag[a.i] ? " on" : ""}" data-mflag aria-label="Mark for review" style="margin-left:auto">⚑</button></div>
    ${passageHtml(q)}<div class="qtext">${esc(q.q)}</div><div class="opts">`;
  q.o.forEach((opt, i) => {
    html += `<button class="opt${picked === i ? " chosen" : ""}" data-mpick="${i}"><span class="k">${LETTERS[i]}</span><span>${esc(opt)}</span></button>`;
  });
  html += `</div><div class="mnav">
      <button class="btn secondary" data-mnav="-1" ${a.i === 0 ? "disabled" : ""}>‹ Previous</button>
      <button class="btn secondary" data-go="#/mgrid">All questions</button>
      <button class="btn" data-mnav="1" ${a.i === PAPER_N - 1 ? "disabled" : ""}>Next ›</button></div>
    <p class="note">${answered}/${PAPER_N} answered${a.flag.some(Boolean) ? ` · ${a.flag.filter(Boolean).length} marked for review` : ""}</p>`;
  app.innerHTML = html;
  startTick();
}

function mockPick(i){
  const a = progress.mock.active;
  a.ans[a.i] = a.ans[a.i] === i ? null : i;   // tap again to clear
  saveProgress();
  renderMockQ();
}
function mockMove(d){
  const a = progress.mock.active;
  a.i = Math.min(PAPER_N - 1, Math.max(0, a.i + d));
  saveProgress();
  renderMockQ(); window.scrollTo(0, 0);
}

function renderMockGrid(){
  const a = progress.mock.active, m = mockById[a.id], qs = paperOf(m, a.group);
  const answered = a.ans.filter(x => x != null).length, blank = PAPER_N - answered;
  let html = `<div class="bar"><button class="iconbtn" data-go="#/mq" aria-label="Back">←</button>
      <h1>All questions</h1><span class="timer" id="mtimer"></span></div>
    <p class="note">${answered} answered · ${blank} not answered · ${a.flag.filter(Boolean).length} marked for review. Tap a number to go to it.</p>`;
  let start = 0;
  for(const sid of GROUPS[a.group].subjects){
    const n = qs.filter(q => subjectOfQ(q) === sid).length;
    html += `<h3 class="section">${esc(subjectById[sid].name)}</h3><div class="mgrid">`;
    for(let i = start; i < start + n; i++){
      html += `<button class="cell${a.ans[i] != null ? " done" : ""}${a.flag[i] ? " flag" : ""}${i === a.i ? " cur" : ""}" data-mjump="${i}">${i+1}</button>`;
    }
    html += `</div>`;
    start += n;
  }
  html += `<div class="actions">` + (mockConfirm
    ? `<div class="card" style="padding:16px"><b>Submit the paper?</b><div class="sub" style="color:var(--muted);font-size:14px;margin:6px 0 12px">${blank ? `${blank} question${blank===1?" is":"s are"} not answered. With no negative marking, a guess can only help.` : "All questions answered."} You can't change answers after submitting.</div>
        <button class="btn" data-msubmit="yes">Yes, submit</button><button class="btn secondary" data-msubmit="no">Keep working</button></div>`
    : `<button class="btn" data-msubmit="ask">Submit paper</button>`) + `</div>`;
  app.innerHTML = html;
  startTick();
}

function submitMock(auto){
  const a = progress.mock.active;
  if(!a) return;
  const used = Math.min(MOCK_MS, Date.now() - a.start);
  const hist = progress.mock.hist[a.id] = progress.mock.hist[a.id] || [];
  hist.push({ at: Date.now(), group: a.group, used, ans: a.ans, flag: a.flag, auto: auto ? 1 : 0 });
  progress.mock.active = null;
  mockConfirm = false; mockReview = "all";
  saveProgress();
  // Replace, so Back from the results never lands on the finished paper.
  location.replace(`#/mres/${a.id}/${hist.length - 1}`);
}

function renderMockResults(id, n){
  const m = mockById[id], h = (progress.mock.hist[id] || [])[n];
  if(!h) return go(`#/mock/${id}`);
  const g = attemptGroup(h), G = GROUPS[g], qs = paperOf(m, g);
  const t = mockTally(qs, h.ans);
  const bySubj = {}, byUnit = {};
  qs.forEach((q, i) => {
    const sid = subjectOfQ(q), ok = h.ans[i] === q.a ? 1 : 0;
    (bySubj[sid] = bySubj[sid] || { r:0, n:0 }); bySubj[sid].r += ok; bySubj[sid].n++;
    (byUnit[q.unit] = byUnit[q.unit] || { r:0, n:0 }); byUnit[q.unit].r += ok; byUnit[q.unit].n++;
  });
  const vs = (avg) => t.marks >= avg ? `${t.marks - avg} above` : `${avg - t.marks} below`;
  let html = bar("Mock results", `#/mock/${id}`) +
    `<div class="card score"><div class="big">${t.marks}/${MAX}</div><div class="of">${Math.round(100*t.marks/MAX)}% · ${esc(m.title)} · ${esc(G.name)}</div>
      <div class="of" style="margin-top:6px">${t.r} right · ${t.w} wrong · ${t.b} not answered</div>
      <div class="passrow"><span class="tag">ECAT 2026 average, Phase I: ${G.avg[0]} (you are ${vs(G.avg[0])})</span>
      <span class="tag">Phase II: ${G.avg[1]} (${vs(G.avg[1])})</span></div>
      <div class="of" style="margin-top:8px">Under the old 2025 rule (−1 per wrong answer) this would be ${t.marks2025}/${MAX}.</div>
      <div class="of" style="margin-top:4px">Time used ${fmtTime(h.used)} of 1:40:00${h.auto ? " · submitted when time ran out" : ""}</div></div>
    <h3 class="section">By subject</h3><div class="card"><table class="mtable"><thead><tr><th>Subject</th><th>Right</th><th>Marks</th></tr></thead><tbody>`;
  for(const sid of G.subjects){
    const b = bySubj[sid]; if(!b) continue;
    html += `<tr><td>${esc(subjectById[sid].name)}</td><td>${b.r}/${b.n}</td><td>${b.r*MARK}/${b.n*MARK}</td></tr>`;
  }
  html += `</tbody></table></div>`;
  // Weak chapters: at least 2 questions in this paper and under 60% right.
  const weak = Object.entries(byUnit).filter(([, b]) => b.n >= 2 && b.r / b.n < 0.6)
    .sort((x, y) => x[1].r / x[1].n - y[1].r / y[1].n);
  if(weak.length){
    html += `<h3 class="section">Chapters to practise</h3><div class="list">`;
    for(const [uid, b] of weak.slice(0, 8)){
      const u = unitById[uid];
      html += `<button class="row" data-go="#/u/${uid}"><span class="badge" style="background:${SUBJECT_COLOR[u.subject]}">${u.n}</span>
        <span class="main"><span class="title">${esc(u.name)}</span><div class="sub">${esc(subjectById[u.subject].name)} · ${b.r}/${b.n} right in this paper</div></span><span class="chev">›</span></button>`;
    }
    html += `</div>`;
  }
  html += `<h3 class="section">By chapter</h3><div class="card"><table class="mtable"><thead><tr><th>Chapter</th><th>Right</th></tr></thead><tbody>`;
  for(const sid of G.subjects) for(const u of subjectById[sid].units){
    const b = byUnit[u.id]; if(!b) continue;
    html += `<tr><td>${SUBJECT_ABBR[sid]} ${u.n}. ${esc(u.name)}</td><td>${b.r}/${b.n}</td></tr>`;
  }
  html += `</tbody></table></div>
    <h3 class="section">Estimated UET aggregate (optional)</h3>
    <div class="card" style="padding:16px"><div class="sub" style="color:var(--muted);font-size:14px">UET Lahore merit: ECAT 33% + FSc Part I 50% + Matric 17%. Minimum aggregate 50%. Other universities may use another formula — check their prospectus.</div>
      <div class="agg"><label>FSc Part I %<input type="number" min="0" max="100" inputmode="decimal" data-agg="fsc" value="${esc(progress.fsc || "")}"></label>
      <label>Matric %<input type="number" min="0" max="100" inputmode="decimal" data-agg="matric" value="${esc(progress.matric || "")}"></label></div>
      <div class="aggout" id="aggout" data-ecat="${(100*t.marks/MAX).toFixed(2)}"></div>
      <table class="mtable" style="margin-top:10px"><thead><tr><th>Fall 2026 closing merit (List 1, Lahore, open merit)</th><th>%</th></tr></thead><tbody>
      ${CLOSING.map(([p, v]) => `<tr><td>${esc(p)}</td><td>${v.toFixed(2)}</td></tr>`).join("")}</tbody></table>
      <div class="sub" style="color:var(--muted);font-size:12px;margin-top:6px">Closing merits change every year and with each merit list. Source: UET admissions, admission.uet.edu.pk.</div></div>`;
  // Review with a filter.
  const flags = h.flag || [];
  const keep = (q, i) => mockReview === "wrong" ? h.ans[i] != null && h.ans[i] !== q.a
    : mockReview === "blank" ? h.ans[i] == null : mockReview === "flagged" ? !!flags[i] : true;
  html += `<h3 class="section">Review</h3><div class="filters">` +
    [["all","All"],["wrong","Wrong"],["blank","Not answered"],["flagged","Marked"]].map(([k, l]) =>
      `<button class="chip${mockReview === k ? " on" : ""}" data-mfilter="${k}">${l}</button>`).join("") + `</div>`;
  let shown = 0, lastP = null;
  qs.forEach((q, i) => {
    if(!keep(q, i)) return;
    shown++;
    const ok = h.ans[i] === q.a;
    // Show a passage once, above the first of its questions in the list.
    if(q.p != null && q.p !== lastP) html += passageHtml(q).replace("<details class=\"passage\" open>", "<details class=\"passage\">");
    lastP = q.p;
    html += `<div class="card review"><div class="q">${i+1}. ${esc(q.q)}</div>
      <div class="ans ${ok ? "verdict-ok" : "verdict-bad"}">${ok ? "✓" : "✗"} ${h.ans[i] != null ? `You: ${LETTERS[h.ans[i]]}. ${esc(q.o[h.ans[i]])}` : "Not answered"}</div>
      ${ok ? "" : `<div class="ans verdict-ok">Answer: ${LETTERS[q.a]}. ${esc(q.o[q.a])}</div>`}
      <div class="x">${esc(q.x)}</div></div>`;
  });
  if(!shown) html += `<div class="empty">Nothing in this list.</div>`;
  app.innerHTML = html + `<div class="actions"><button class="btn secondary" data-go="#/mocks">Back to mock exams</button></div>`;
  updateAgg();
}

function updateAgg(){
  const out = document.getElementById("aggout");
  if(!out) return;
  const f = parseFloat(progress.fsc), mt = parseFloat(progress.matric), e = parseFloat(out.dataset.ecat);
  const ok = v => !isNaN(v) && v >= 0 && v <= 100;
  out.textContent = ok(f) && ok(mt) ? `Estimated aggregate: ${(0.33*e + 0.5*f + 0.17*mt).toFixed(2)}%` : "Enter your FSc Part I and Matric percentages to see an estimate.";
}

function renderSoon(name){
  app.innerHTML = bar(name || "Coming soon", "#/") + `<div class="empty">${esc(name)} is being built and will arrive in an update.</div>`;
}

/* ======================================================================
   EVENTS — one delegated listener for the whole app.
   ====================================================================== */
app.addEventListener("click", e => {
  const el = e.target.closest("[data-go],[data-start],[data-pick],[data-next],[data-bm],[data-mstart],[data-mpick],[data-mnav],[data-mflag],[data-mjump],[data-msubmit],[data-mfilter],[data-group]");
  if(!el || el.disabled) return;
  if(el.dataset.go != null) return go(el.dataset.go);
  const d = el.dataset;
  if(d.group){ progress.group = d.group; saveProgress(); return render(); }
  if(d.mstart) return startMock(d.mstart);
  if(d.mpick != null) return mockPick(Number(d.mpick));
  if(d.mnav) return mockMove(Number(d.mnav));
  if(d.mflag != null){ const a = progress.mock.active; a.flag[a.i] = a.flag[a.i] ? 0 : 1; saveProgress(); return renderMockQ(); }
  if(d.mjump != null){ progress.mock.active.i = Number(d.mjump); saveProgress(); return go("#/mq"); }
  if(d.msubmit === "ask"){ mockConfirm = true; return renderMockGrid(); }
  if(d.msubmit === "no"){ mockConfirm = false; return renderMockGrid(); }
  if(d.msubmit === "yes") return submitMock(false);
  if(d.mfilter){ mockReview = d.mfilter; return render(); }
  if(d.start){ const [k, id] = d.start.split(":"); return startSession(k, id); }
  if(d.pick != null) return pick(Number(d.pick));
  if(d.next != null) return next();
  if(d.bm){ const id = d.bm; if(progress.bm[id]) delete progress.bm[id]; else progress.bm[id] = 1; saveProgress(); renderPlayer(); }
});

// Android back button (Capacitor App plugin): step back through the hash
// history; from Home, close the app. If the WebView reports no history on a
// non-home screen, go Home rather than closing the app.
(function(){
  const AppPlugin = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if(!AppPlugin || !AppPlugin.addListener) return;
  AppPlugin.addListener("backButton", ({ canGoBack }) => {
    const home = !location.hash || location.hash === "#/" || location.hash === "#";
    if(home) AppPlugin.exitApp();
    else if(canGoBack) history.back();
    else location.replace("#/");
  });
})();

// A paper whose 100 minutes ran out while the app was closed is submitted on launch.
(function closeExpiredMock(){
  const a = progress.mock.active;
  if(!a) return;
  if(!mockById[a.id]){ progress.mock.active = null; saveProgress(); return; }
  if(msLeft(a) > 0) return;
  const hist = progress.mock.hist[a.id] = progress.mock.hist[a.id] || [];
  hist.push({ at: a.start + MOCK_MS, group: a.group, used: MOCK_MS, ans: a.ans, flag: a.flag, auto: 1 });
  progress.mock.active = null;
  saveProgress();
})();

app.addEventListener("input", e => {
  const k = e.target.dataset && e.target.dataset.agg;
  if(!k) return;
  progress[k] = e.target.value; saveProgress(); updateAgg();
});

render();
})();
