# ECAT Prep app — v1 scope (LOCKED 9 Nov 2026)

Built "on the line of" MDCAT Prep (`/mnt/storage/projects/mdcat`): same offline HTML/JS + Capacitor engine, same
content pipeline (writer → validator → blind re-solve → Homi spot-check), same ad rules. Facts and sources:
[ecat-research-raw.md](ecat-research-raw.md) (official UET documents saved in `docs/sources/`).

## 1. What Homi asked for (9 Nov 2026)
- A prep app for ECAT (UET Lahore's Engineering College Admission Test) like MDCAT Prep, **Maths instead of Biology**.
- Deep research first; share resources and question pools with the sibling apps.
- **20 mock tests with scoring and an explanation for every answer.**
- Repo `AwaizFatima08/ecat`, backup `/mnt/storage/project_backups/ecat_backup`, landing page and documents at
  `ecat.homilabs.org`, AdMob in homilabs.smc@gmail.com.

## 2. The test the app simulates (ECAT 2026 rules, official)
| Item | Rule |
|---|---|
| Questions | **100 MCQs**: English 10 + three subjects × 30 |
| Marks | **+4 per correct, 400 total** |
| Negative marking | **None from 2026** (2025 was −1 per wrong answer). Answer everything. |
| Time | **100 minutes**, computer-based (one question per screen), several sessions over 4–5 days |
| Calculator | Not allowed; rough paper given → numericals must be hand-solvable in about a minute |
| Attempts | Two per Fall intake (March and June), best score counts, valid for that intake only |
| Pass mark | None. UET merit = **ECAT 33 % + FSc Part I 50 % + Matric 17 %** (min aggregate 50 %) |
| Syllabus | "Entire Intermediate syllabus"; UET publishes no chapter list. English = reading comprehension only. |
| Typical score | Pre-Engineering averages 2026: 203/400 (Phase I), 238/400 (Phase II) — a hard paper |

Groups (all 10 English + 30 + 30 + 30): **Pre-Engineering Maths/Physics/Chemistry**, ICS Maths/Physics/CS,
Statistics combinations, Pre-Medical Biology/Physics/Chemistry.

## 3. Proposed content
### Subjects and structure
Subject → chapter → topic → learning point, tagged by **topic, not old chapter number**, because Punjab is moving to
the new National-Curriculum books (Class 11 from 2025–26, Class 12 from 2026–27). Chapters cover the old PTB books
and the new-book additions (complex numbers, special relativity, particle physics…). Chapter lists must be checked
against the textbook PDFs first (the research lists for the old books are from memory).

### Practice bank (≈ 4,000 MCQs, each with an explanation, difficulty E/M/D)
| Subject | MCQs | Source |
|---|---|---|
| Mathematics | 1,500 | new; CSCA Maths bank (≈1,200, no-calculator) as a starting pool for overlapping topics |
| Physics | 1,000 | share with MDCAT Physics (in progress) + CSCA Physics; new items for ECAT-only chapters (optics, oscillations…) |
| Chemistry | 1,000 | share MDCAT Chemistry (1,250, already blind-checked) + CSCA; new items for ECAT-only chapters |
| Computer Science (ICS) | 1,000 | new (old ICS books + Python from the new books) |
| English | 500 | ≈100 short passages × 5 comprehension MCQs (the official 2026 style) |

"Share" means: copy the item into this repo, re-tag it to the ECAT chapter/topic, re-run the validator and the blind
re-solve, and keep a `from` field (e.g. `mdcat:chem-01-004`) so fixes can flow both ways.

### 20 mock tests (Homi's request) — separate questions, never shown in practice
- 20 × 100 = **2,000 new MCQs** (Maths 600, Physics 600, Chemistry 600, English 200 = 40 passages).
- Exam screen like UET's CBT: one question per screen, question palette, mark-for-review, 100-minute timer, auto-submit.
- **Scoring:** score /400 with the 2026 rule (+4, no negative); optional "2025 rule" toggle (−1) to show the
  difference; per-subject and per-chapter marks; time used; percentile-style comparison with the official
  averages (203–238/400).
- **Review:** every question with your answer, the correct answer and its explanation; filter wrong / skipped /
  marked; weak chapters link straight to practice.
- Aggregate calculator (Matric 17 %, FSc Part I 50 %, ECAT 33 %) with last year's closing merits as reference.
- Difficulty mix per mock about 20/60/20 (E/M/D), every mock checked for exact subject counts.

### Other sections (as in MDCAT Prep)
Rules & guide (format, groups, marking change, test day, CBT tips, merit, dates, "check ecat.uet.edu.pk"), formula
sheets / quick cheats, important topics, progress, mistakes, bookmarks.

## 4. Pieces (each verified before the next)
1. App shell rebranded (done 9 Nov 2026), site live at ecat.homilabs.org, AdMob app created
2. Guide section (ECAT 2026 facts)
3. Syllabus file (chapters/topics) checked against textbooks — done 9 Nov 2026: 97 topic-based chapters
   (Maths 25, Physics 25, Chemistry 30, CS 14, English 3) mapped to old PTB and new PECTAA chapters
   (`docs/textbook-chapters.md`, `tool/make_syllabus.py`)
4. Mock engine (CBT screen, timer, scoring, review, aggregate calculator) — done 9 Nov 2026, tested with a
   placeholder paper (`npm run build:test`)
5. Maths bank · 6. Physics bank · 7. Chemistry bank · 8. English bank
9. 20 mocks' content · 10. Cheats + important topics · 11. Release (AdMob SDK + consent, icon, store listing)

## 5. Risks
- **Syllabus drift:** new books + no official chapter list. Tag by topic; re-check the ECAT 2027 notice.
- **Accuracy:** maths keys are checkable by computation — add a numeric re-check where possible.
- **Size:** ≈ 6,000 MCQs is many sessions; quality over speed. Useful for ECAT 2027 if live by about Feb 2027
  (Phase I is usually in March).

## 6. Decisions needed (Homi)
- **A. Groups:** Pre-Engineering only for v1 / also ICS (Computer Science instead of Chemistry)
- **B. Bank size:** ≈ 4,000 practice + 2,000 mock as above / smaller
- **C. Reuse:** share MDCAT + CSCA items after re-tag and blind re-check / write everything fresh
- **D. English:** comprehension only (official) / also vocabulary and sentence correction (prep-site style)
- Defaults (change any time): name **"ECAT Prep"**, English only, free with ads between sessions only, mocks use
  2026 marking.

## Locked decisions (Homi, 9 Nov 2026)
- **A. Groups:** Pre-Engineering **and ICS** in v1. The student picks a group; a mock is Eng 10 + Maths 30 + Physics 30 +
  Chemistry 30 (Pre-Eng) or Computer Science 30 (ICS). CS adds about 1,000 practice MCQs and 20 × 30 = 600 mock MCQs.
- **B. Size:** practice ≈ 5,000 (Maths 1,500, Physics 1,000, Chemistry 1,000, CS 1,000, English 500) + mocks
  20 × 100 per group, sharing English/Maths/Physics → 2,600 separate mock MCQs.
- **C. Reuse:** share MDCAT and CSCA items after re-tagging, validator and blind re-solve (`from` field kept).
- **D. English:** mocks are passage-based comprehension (official 2026 style); practice adds vocabulary and
  sentence-correction sets, labelled as extra practice.
