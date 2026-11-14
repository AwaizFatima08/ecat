# Brief: writing memory-cheat cards (piece 10)

Format as in MDCAT Prep (locked with Homi on 9 Nov 2026): short cards, browsed subject → unit → card, each with
Prev / Next and a "Practise unit" button. Card counts per unit are in `drafts/cheats/plan.tsv` (2-4 per unit, about
284 in all); your job card lists yours.

## What a card is
One idea a student can revise in under a minute, fitting about one phone screen: **at most ~120 words**
(the checker stops at 160), tables at most 4 columns × 8 rows. Kinds (pick the one that fits best):

| kind | use it for |
|---|---|
| `formula` | a formula sheet: formulas, symbols, units, one trap (most Maths and Physics cards) |
| `table` | a side-by-side comparison (A vs B vs C) |
| `map` | a chain or reaction map (A → B → C, with the reagent or condition on each arrow) |
| `mnemonic` | a memory phrase / acronym and what each part stands for |
| `rule` | a rule with one right and one wrong example (English, C/Python syntax, sign rules) |
| `trick` | a shortcut, pattern or exam trap and how to spot it |

## Rules
- **Correct first.** FSc level as the Punjab books (old PTB and new PECTAA) teach it; check
  `docs/textbook-chapters.md` for what your unit contains. Only facts you are certain of; where books differ (sign
  conventions, Cp − Cv, names of methods), give the convention the app's questions use or word it so both readers
  are right, and say so in one line.
- **Exam-useful for ECAT** (no calculator, about a minute per MCQ): the formulas, standard results, quick checks and
  traps that the unit's MCQs need. Read the unit's LOs in `content/syllabus.json` and skim its practice file
  `content/questions/<subject>/<unit>.json` to see what is tested. End most cards with one tip (💡) or trap (⚠️).
- **Original writing.** No text copied from academy notes, past papers, key books or websites. Well-known public
  mnemonics (e.g. SOH-CAH-TOA, OIL RIG) are fine with your own explanation; invented mnemonics must be clean, easy
  to say, and every letter must really match the fact.
- Plain English, short lines. Unicode for maths (x², √, π, θ, ∫, Σ, →, ⇌, λ, Ω, μ, ≤, ≠, ₁₂), never LaTeX.
- Two cards in one unit must not cover the same thing. Cover the unit's main ideas across its cards.

## File format
`drafts/cheats/<subject>.<part>.json` — a JSON array of cards:

```json
{
  "id": "phy-12-c01",
  "unit": "phy-12",
  "kind": "formula",
  "title": "Capacitors in series and parallel",
  "blocks": [
    { "type": "table", "head": ["Combination", "Total C", "Same for all"], "rows": [["Series", "1/C = 1/C₁ + 1/C₂", "charge Q"]] },
    { "type": "warn", "text": "..." }
  ]
}
```

- `id` = `<unit>-cNN`, numbered from c01 within each unit.
- Block types: `p` {text}, `h` {text}, `tip` {text}, `warn` {text}, `list` {items}, `table` {head, rows} (every row
  as long as head), `mn` {text, items} (the mnemonic phrase and what each part stands for), `code` {text} (CS only:
  a short C or Python snippet, ≤ 8 lines, shown in monospace with indentation kept; 4 spaces per level).

Check each file with `node scripts/check_cheats.js drafts/cheats/<subject>.<part>.json` until it prints `PASS`.
Then re-read every card once more as an examiner would: is every formula, value and statement exactly right?

Only write your own files; don't edit anything else and don't run git. Reply with the PASS line and any card you
were unsure about (id + why), or "none".
