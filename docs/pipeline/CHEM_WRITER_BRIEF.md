# Brief: writing ECAT Chemistry practice MCQs

You are writing practice questions for **ECAT Prep**, a free offline Android app for Pakistani FSc
Pre-Engineering students (age 17-19) preparing for UET Lahore's ECAT (100 MCQs in 100 minutes, Chemistry 30 of
them, **no calculator**, rough paper only). Every question is re-solved later by an independent examiner who does
not see your key; a question with two defensible answers or a wrong key is caught and thrown away. Accuracy matters
more than speed.

## Read first
- `content/syllabus.json`, subject `chem`: your unit's topic ids, LO codes and LO text. Stay inside them.
- `docs/textbook-chapters.md`: what the Punjab FSc Chemistry textbooks (old PTB books and new PECTAA/NCP books)
  cover for your unit. Use the facts, names and conventions those books use.
- Your job card: unit, id range, how many per topic, output file, and any shared items already in the unit (read
  them; don't repeat their ideas).

## Format
Write a JSON array to your output file, one object per line:
```
{"id":"chem-09-021","topic":"chem-09-ph","lo":"CHEM-9.2","d":"M","q":"...","o":["...","...","...","..."],"a":0,"x":"..."}
```
- `id`: `<unit>-<NNN>`, three digits, consecutive over your range, no gaps.
- `topic` / `lo`: a topic id of your unit and that topic's LO code.
- `d`: about **20% E, 60% M, 20% D**. E = one recall fact or one-step calculation. M = apply a concept or formula
  with a conversion or two steps, compare compounds, predict a product. D = combine two ideas (e.g. limiting
  reactant then yield; hybridisation then shape then polarity; a two-step organic sequence), still within FSc.
- `o`: exactly 4 options, all different, same form (all formulas, all names, all with the same unit).
- `a`: index 0-3 of the correct option. Don't spread answers; a script shuffles options afterwards. So options and
  explanations must **never refer to a letter or position**: no "A and C", "option B", "(D)", "all/none of the
  above", "none of these". Name compounds or species X, Y, Z, P, Q, never A-D.
- `x`: the reasoning or working in 1-4 short sentences; then which slip gives the most tempting wrong option.

## Chemistry rules
1. **Mix by unit type.** Physical chemistry units (mole, gases, thermochemistry, equilibrium, pH, solutions,
   electrochemistry, kinetics): about half numerical. Inorganic and organic units: reactions and products,
   reagents and conditions, trends and their reasons, structure, isomer counts, naming (IUPAC), tests that tell
   two compounds apart, mechanism steps, comparisons (acidity, boiling point, reactivity).
2. **No calculator.** Choose numbers so the arithmetic is short. Atomic masses H 1, C 12, N 14, O 16, Na 23,
   Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5 may be assumed; give any other in the stem. Give every
   constant you need in the stem: R = 8.314 J K⁻¹ mol⁻¹ or 0.0821 dm³ atm K⁻¹ mol⁻¹, Nₐ = 6.02 × 10²³ mol⁻¹,
   F = 96500 C mol⁻¹, molar volume 22.4 dm³ at STP, Kw = 1 × 10⁻¹⁴ at 25 °C, and any Ka, Ksp, E°, ΔH or log
   value (log 2 = 0.30, log 3 = 0.48).
3. **Work every answer twice**, the second time by another route (units check, mass balance, electron count,
   draw the structure and count again). Only then write the item.
4. **Distractors** from real mistakes: forgot the mole ratio, used mass instead of moles, wrong sign of ΔH, mixed
   up oxidation and reduction or anode and cathode, Markovnikov vs anti-Markovnikov, SN1 vs SN2, counted only
   structural isomers, ortho/para vs meta director, forgot to convert °C to K or cm³ to dm³. No joke options.
5. **Exactly one correct option.** Where books or conventions differ (sign of work, STP 0 °C and 1 atm, old vs new
   IUPAC names, "hydration energy" vs "hydration enthalpy"), word the stem so the answer is the same under each.
   Avoid textbook-edition trivia (exact year of a discovery, a named scientist's minor contribution). Trends with
   well-known exceptions (ionisation energy of N vs O, electron affinity of F vs Cl, boiling point of HF): state
   them correctly or avoid the exception.
6. **Self-contained:** no figure or table, no drawn structures. Write formulas in one line (CH₃CH₂OH,
   CH₃COCH₃, C₆H₅NO₂) or name them. Stems under about 55 words.
7. **Notation:** plain Unicode only, no LaTeX or HTML: subscripts H₂SO₄, charges Fe³⁺ SO₄²⁻, arrows → and ⇌,
   ΔH, kJ mol⁻¹, mol dm⁻³, 10⁻⁵, °C, K, sp³, σ, π. Units with a space: 2.5 mol dm⁻³, 44 g mol⁻¹.
8. **Original work.** Never copy past ECAT papers, textbook exercises or prep sites; textbook-style questions with
   your own numbers and compounds are fine. "NOT/EXCEPT" in capitals, at most 1 item in 8. No repeats.

## Check before you finish
From `/mnt/storage/projects/ecat`:
```
node scripts/check_draft.js <your file> <unit> <first number> <count>
```
Fix every `ERR` until it prints `PASS`. Then re-read once more: is the key right, is exactly one option right, does
the explanation agree with the key? Fix or replace anything doubtful.

Only write your own output file(s); don't edit anything else, don't run git. When done, reply with the PASS lines
and any items you were unsure about (id + why), or "none".
