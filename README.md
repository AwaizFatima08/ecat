# ECAT Prep

Offline Android app for UET Lahore's ECAT (Engineering College Admission Test), Pre-Engineering and ICS groups. HomiLabs.
Built on the MDCAT Prep engine (`/mnt/storage/projects/mdcat`) with Mathematics in place of Biology.

- Scope: [docs/scope-v1.md](docs/scope-v1.md) (locked 9 Nov 2026). Research: [docs/ecat-research-raw.md](docs/ecat-research-raw.md), official documents in `docs/sources/`.
- Build: `npm run build` → `dist/app.html` (+ `www/index.html` for Capacitor). The build validates every MCQ and fails on any error.
- Content: `content/syllabus.json` (subject → chapter → topic → learning point), `content/questions/<subject>/<unit>.json`, `content/guide.json`.
- MCQ pipeline: same as MDCAT (`scripts/check_draft.js` → `merge_parts.js` → `balance_answers.js` → `blind_export.js` → blind re-solve → `blind_compare.js` → Homi spot-check).
- Site: https://ecat.homilabs.org, source in `website/`, `bash scripts/publish-site.sh`.
- Backups: `bash scripts/backup_ecat.sh` (local, Google Drive, GitHub).

## Pieces
1. App shell rebranded, site, AdMob app — done 9 Nov 2026
2. Guide · 3. Syllabus · 4. Mock engine · 5–8. Maths, Physics, Chemistry, English banks · 9. 20 mocks · 10. Cheats + important topics · 11. Release
