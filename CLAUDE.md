# ECAT Prep (HomiLabs) — project notes

Offline Android app for UET Lahore's ECAT, Pre-Engineering and ICS groups (Maths, Physics, Chemistry or Computer Science, English): practice by
chapter and topic with explanations, 20 full mock tests scored like UET (100 MCQs, 400 marks, 100 min), rules and
merit guide. Same stack and pipeline as MDCAT Prep (`/mnt/storage/projects/mdcat`): plain HTML/JS + JSON content +
`build/build.js` + Capacitor Android. No login, no server. Scope (locked 9 Nov 2026): `docs/scope-v1.md`.

## Locations
- Code: `/mnt/storage/projects/ecat` · GitHub `AwaizFatima08/ecat` (PUBLIC repo: no secrets, keys in `.secrets/`)
- Local backup: `/mnt/storage/project_backups/ecat_backup` · Google Drive: https://drive.google.com/drive/folders/1ojpLqTyCr4T-2NTlsLIFttxs-Cu7qQQo
- Backups: `bash scripts/backup_ecat.sh` (all three layers)
- Site: https://ecat.homilabs.org (Hostinger `public_html/ecat`, a checkout of the `deploy` branch), source in `website/`, `bash scripts/publish-site.sh`
- AdMob (homilabs.smc@gmail.com): ids in `docs/admob.md`

## Exam facts (official, checked 9 Nov 2026; details `docs/ecat-research-raw.md`)
100 MCQs = English 10 + Maths/Physics/Chemistry 30 each, +4 each, **no negative marking from 2026** (2025: −1),
100 min CBT, no calculator. English is reading comprehension. UET publishes no chapter list ("entire intermediate
syllabus"); Punjab is switching to new National-Curriculum books, so tag content by topic. Merit 17/50/33.
Re-check ecat.uet.edu.pk and the admission notice before each release.

## Content rules
- Every item is original HomiLabs work. Never copy UET material, past papers, textbooks' exercises or prep sites.
- Items shared from MDCAT Prep or CSCA Prep are re-tagged, re-validated and blind re-solved here, with a `from` field.
- Mock questions are separate from practice questions.
- Pipeline (briefs in `docs/pipeline/`): writers draft into gitignored `drafts/` → `scripts/check_draft.js` →
  `merge_parts.js` into `content/questions/<subject>/<unit>.json` → `balance_answers.js` → `blind_export.js` →
  blind solver → `blind_compare.js`. Shared items: `shared_export.js` → mapper (`SHARED_MAP_BRIEF.md`) →
  `import_shared.js` (capped at half a unit's target). Flags and fixes: `docs/review-flags.md`.
- Numericals solvable by hand in about a minute.
- Chapters: `tool/make_syllabus.py` writes Maths/Physics/Chemistry/CS units of `content/syllabus.json` (English is
  edited there by hand). Units are topic-based and map to old PTB and new PECTAA chapters (`docs/textbook-chapters.md`).
  Unit and topic ids are permanent once questions use them: append, never renumber.
- Mocks: `content/mocks/mock-NN.json`, 130 items each (Eng 10, Maths 30, Physics 30, Chemistry 30, CS 30; the
  student's group picks Chemistry or CS). English items carry `p` = a passage id in `content/passages.json`.
  `npm run build:test` adds a gitignored placeholder paper for testing the engine; never ship it.

## Ads
Interstitial only between sessions (after practice-set or mock results), never during a question, set or mock.
Google test ids while developing.
