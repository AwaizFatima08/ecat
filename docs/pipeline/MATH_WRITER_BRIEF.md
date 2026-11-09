# Brief: writing ECAT Mathematics practice MCQs

You are writing practice questions for **ECAT Prep**, a free offline Android app for Pakistani FSc
Pre-Engineering and ICS students (age 17-19) preparing for UET Lahore's ECAT (100 MCQs in 100 minutes, Maths 30 of
them, **no calculator**, rough paper only). Every question is re-solved later by an independent examiner who does
not see your key; a question with two defensible answers or a wrong key is caught and thrown away. Accuracy matters
more than speed.

## Read first
- `content/syllabus.json`, subject `math`: your unit's topic ids, LO codes and LO text. Stay inside them.
- `docs/textbook-chapters.md`: what the Punjab FSc textbooks (old PTB 2002 books and new PECTAA/NCP books) cover
  for your unit. Use the standard FSc methods and notation.
- Your job card: unit, id range, how many per topic, output file, and any shared items already in the unit (don't
  repeat their ideas).

## Format
Write a JSON array to your output file, one object per line:
```
{"id":"math-05-001","topic":"math-05-det","lo":"MATH-5.2","d":"M","q":"...","o":["...","...","...","..."],"a":0,"x":"..."}
```
- `id`: `<unit>-<NNN>`, three digits, consecutive over your range, no gaps.
- `topic` / `lo`: a topic id of your unit and that topic's LO code.
- `d`: `E` easy, `M` moderate, `D` difficult; aim for about **20% E, 60% M, 20% D**. E = one standard step or a
  definition. M = a routine method with two or three steps. D = combine two ideas, a trap, or a longer but still
  hand-workable calculation. Nothing beyond FSc.
- `o`: exactly 4 options, all different, same form (all numbers, all expressions in the same style).
- `a`: index 0-3 of the correct option. Don't spread answers; a script shuffles options afterwards. So options
  and explanations must **never refer to a letter or position**: no "A and C", "option B", "(D)", "all of the
  above", "none of the above". "None of these" style options are not allowed either.
- `x`: the worked solution in 1-4 short sentences: the key steps with the numbers, then (where useful) which slip
  gives the most tempting wrong option.

## Maths rules
1. **Work every answer twice**, the second time by a different route where one exists (substitute the answer
   back, check a special value, differentiate an integral, test a point). Only then write the item.
2. **No calculator:** numbers work by hand in about a minute. Standard angles (0°, 30°, 45°, 60°, 90°, their
   multiples) and exact values (√2, √3, π, e, ln 2 left as symbols) are fine; options then use the same exact form.
3. **Distractors** come from real mistakes: sign slip, forgot the chain-rule factor, forgot +C or the constant,
   wrong formula (n(n+1)/2 vs n(n−1)/2), degrees vs radians, swapped order, missed a root, principal value vs
   general solution. No joke options.
4. **Exactly one correct option.** Equivalent forms count as the same answer: never put two options that are equal
   after simplification (e.g. 1/√2 and √2/2; ln(1/2) and −ln 2; tan²x and sec²x − 1). For indefinite integrals the
   options differ by more than a constant.
5. **Mix of types:** direct calculation, "find k if...", identify the true statement, conceptual ("the function is
   continuous at x = 1 if..."), properties (period, range, rank, nature of roots), reverse questions (given the
   answer, find the input), and short word problems where the syllabus has them (rate of change, AP/GP money,
   counting, probability). "NOT/EXCEPT" in capitals, at most 1 item in 8.
6. **Self-contained:** no figure or table needed; describe anything geometric in words. Stems under about 50
   words.
7. **Notation:** plain Unicode only, no LaTeX, HTML or Markdown: x², x³, xⁿ, √x, ∛x, π, θ, α, β, ω, ≤, ≥, ≠, ±,
   →, ∞, ∫, Σ, ∈, ∪, ∩, ⊂, ∅, ′ for derivatives (f′(x), y″), subscripts a₁ aₙ, ½, |x|, lim(x→0), dy/dx, e^(2x) for
   powers that are expressions, sin⁻¹x for inverse trig, log and ln as in the FSc books, nCr and nPr written
   ⁿCᵣ / ⁿPᵣ or C(n, r) / P(n, r) (pick one per item). Fractions as a/b with brackets: (x + 1)/(x − 2). Matrices in
   a row form: [[1, 2], [3, 4]] meaning rows (1 2) and (3 4); say "the matrix with rows (1, 2) and (3, 4)" in the
   stem the first time if helpful. Use × for multiplication of numbers and · or juxtaposition for algebra.
8. **Original work.** Never copy past ECAT papers, textbook exercises or prep sites; textbook-style questions with
   your own numbers are fine.
9. **No repeats.** Each item tests a different idea or the same idea in a clearly different way. Spread across the
   whole LO, not only its first idea.

## Check before you finish
From `/mnt/storage/projects/ecat`:
```
node scripts/check_draft.js <your file> <unit> <first number> <count>
```
Fix every `ERR` until it prints `PASS`. Then re-read once more: is the key right, is exactly one option right,
does the explanation agree with the key? Fix or replace anything doubtful.

Only write your own output file; don't edit anything else, don't run git. When done, reply with the PASS line and
any items you were unsure about (id + why), or "none".
