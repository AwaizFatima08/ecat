# Brief: writing ECAT Physics practice MCQs

You are writing practice questions for **ECAT Prep**, a free offline Android app for Pakistani FSc
Pre-Engineering and ICS students (age 17-19) preparing for UET Lahore's ECAT (100 MCQs in 100 minutes, Physics 30
of them, **no calculator**, rough paper only). Every question is re-solved later by an independent examiner who does
not see your key; a question with two defensible answers or a wrong key is caught and thrown away. Accuracy matters
more than speed. ECAT Physics is more numerical than MDCAT: engineering students, standard FSc formulas applied.

## Read first
- `content/syllabus.json`, subject `phy`: your unit's topic ids, LO codes and LO text. Stay inside them.
- `docs/textbook-chapters.md`: what the Punjab FSc Physics textbooks (old PTB 2002 books and new PECTAA/NCP books)
  cover for your unit. Use standard FSc results, symbols and sign conventions.
- Your job card: unit, id range, how many per topic, output file, and any shared items already in the unit (read
  them; don't repeat their ideas).

## Format
Write a JSON array to your output file, one object per line:
```
{"id":"phy-12-041","topic":"phy-12-capacitors","lo":"PHY-12.5","d":"M","q":"...","o":["...","...","...","..."],"a":0,"x":"..."}
```
- `id`: `<unit>-<NNN>`, three digits, consecutive over your range, no gaps.
- `topic` / `lo`: a topic id of your unit and that topic's LO code.
- `d`: about **20% E, 60% M, 20% D**. E = one recall or one-formula step. M = apply a formula with a conversion or
  two steps, or reason about proportionality. D = combine two ideas or a careful multi-step calculation, still
  within FSc and hand-workable.
- `o`: exactly 4 options, all different, same form (all with units, same unit, similar precision).
- `a`: index 0-3 of the correct option. Don't spread answers; a script shuffles options afterwards. So options and
  explanations must **never refer to a letter or position**: no "A and C", "option B", "(D)", "all/none of the
  above", "none of these". Name points, vectors and charges P, Q, R, X, Y, q₁, q₂, never A-D.
- `x`: the worked solution in 1-4 short sentences: the formula, the numbers, the result; then which slip gives the
  most tempting wrong option.

## Physics rules
1. **About half of each topic is numerical** where the LO has formulas; the rest conceptual: proportionality ("if
   the distance is doubled, the force becomes…"), graphs described in words (slope of a v-t graph, area under an F-x
   graph), units and dimensions, direction rules (right-hand rule, Lenz's law), definitions and laws, which quantity
   is conserved, comparisons.
2. **No calculator.** g = 10 m s⁻² unless the stem says 9.8; friendly angles (sin 30° = 0.5, cos 60° = 0.5,
   sin 37° ≈ 0.6 only if given in the stem); constants given in the stem when needed: k = 9 × 10⁹ N m² C⁻²,
   ε₀ = 8.85 × 10⁻¹² F m⁻¹, μ₀ = 4π × 10⁻⁷ T m A⁻¹, h = 6.63 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m s⁻¹,
   mₑ = 9.1 × 10⁻³¹ kg, R = 8.31 J mol⁻¹ K⁻¹. Choose numbers so the arithmetic is short; give π-answers in terms of π
   or with π ≈ 3.14 stated.
3. **Work every answer twice**, the second time by a different route (units check, limiting case, energy instead
   of kinematics, ratio method). Only then write the item.
4. **Distractors** from real mistakes: forgot to square or square-root, used sin for cos, forgot the factor 2 or ½,
   wrong unit prefix (mA vs A, cm vs m, μF), series vs parallel swapped, used diameter for radius, Celsius instead
   of kelvin, mass number for atomic number. No joke options.
5. **Exactly one correct option.** No two options equal after unit conversion. Where books differ (sign convention
   for work in the first law, Cp − Cv, lens sign conventions, "weight" vs "mass"), word the stem so the answer is
   the same under every convention: say "work done on the gas" / "work done by the gas", give magnitudes, state
   real-is-positive only if you must use signs.
6. **Self-contained:** no figure or table; describe circuits and set-ups fully in words (which resistors are in
   series, which in parallel; where the charges sit). Stems under about 55 words.
7. **Notation:** plain Unicode only, no LaTeX or HTML: m s⁻², 10⁻¹⁹, Ω, μF, λ, θ, ω, ½, √2, v², T½, ×, →, °C, K,
   ²³⁵U or U-235 (pick one per item), α, β, γ. Units with a space: 5 m s⁻¹, 2 μC, 3 kΩ.
8. **Original work.** Never copy past ECAT papers, textbook exercises or prep sites; textbook-style questions with
   your own numbers are fine. "NOT/EXCEPT" in capitals, at most 1 item in 8. No repeats.

## Check before you finish
From `/mnt/storage/projects/ecat`:
```
node scripts/check_draft.js <your file> <unit> <first number> <count>
```
Fix every `ERR` until it prints `PASS`. Then re-read once more: is the key right, is exactly one option right, does
the explanation agree with the key? Fix or replace anything doubtful.

Only write your own output file(s); don't edit anything else, don't run git. When done, reply with the PASS lines
and any items you were unsure about (id + why), or "none".
