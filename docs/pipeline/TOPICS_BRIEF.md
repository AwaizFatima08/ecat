# Brief: important topics (piece 10)

Format as in MDCAT Prep (locked with Homi on 10 Nov 2026):
- **Every unit** of every subject (97: Maths 25, Physics 25, Chemistry 30, CS 14, English 3) is placed in one of
  three tiers:
  1. **Must-know**: a big chapter and/or a topic ECAT leans on (Maths and Physics numericals in particular);
  2. **Important**: a solid share, regularly asked;
  3. **Quick wins**: small units, fast to learn, still worth marks.
- Each entry has a 1-2 sentence **why** and the **1-3 LOs to focus on**; the app adds the student's own accuracy
  and a Practise button.
- The ranking is **our estimate, not official UET weightage**. UET publishes marks per subject only (English 10,
  Maths/Physics/Chemistry or CS 30 each) and no chapter list. The app says so on every page.

## Basis for the ranking
1. `drafts/topics/basis.tsv`: each unit's practice-bank target (our weighting by chapter size and ECAT emphasis,
   used for the 5,000-question bank), its mock-pool share and its topic count. Start from this.
2. **Exam judgement**: adjust where size misleads, e.g. a unit many others build on (vectors, functions, mole
   concept, C basics), or a big but low-yield chapter. Use what you know of FSc and ECAT emphasis.
3. Aim for roughly a third of each subject's units in each tier; English: comprehension (eng-01) is Must-know
   because it is the whole English paper; vocabulary and sentence correction are extra practice, rank them lower.
   CS: say in a why where the old (C, Access, Office) and new (Python, algorithms) books differ, if relevant.

## Rules for `why`
- 8-40 words, plain English, one or two sentences.
- Say *why* it matters: chapter size, breadth, how it is usually tested (numericals, traces, definitions), what it
  links to, or that it is a quick win.
- **No invented numbers about past papers** ("6 MCQs came from this in 2024"); we cannot verify them. Wording like
  "often tested" or "a favourite for numericals" only where it is well known.
- Any fact in the sentence must be correct at FSc level. Original writing.

## Rules for `focus`
- 1-3 LO codes taken **exactly** from that unit in `content/syllabus.json`, most useful first. Units with one LO list
  that one.

## File format
`drafts/topics/topics.json`, one JSON array of all 97 units. Within each subject, entries are in rank order (best
first); tiers must not go back up (all tier 1 before tier 2 before tier 3).

```json
{ "unit": "math-18", "tier": 1, "why": "...", "focus": ["MATH-18.2", "MATH-18.1"] }
```

Check with `node scripts/check_topics.js drafts/topics/topics.json` until it prints `PASS`. Only write that file;
don't edit anything else and don't run git. Reply with the PASS line and the tier counts per subject.
