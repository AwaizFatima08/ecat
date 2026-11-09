# Brief: tagging shared CSCA Maths items to ECAT topics

ECAT Prep (`/mnt/storage/projects/ecat`) is an offline app for Pakistani FSc Pre-Engineering and ICS students
preparing for UET Lahore's ECAT. Its Maths bank may reuse items from our sibling app CSCA Prep (Chinese university
admission test), but only items that fit the **Pakistani FSc (Class 11-12) Mathematics syllabus** as ECAT tests it.

## Read first
- `content/syllabus.json`, subject `math`: 25 units, each with topics (`math-NN-xxx`) and one LO code per topic
  (`MATH-N.M`) and its LO text. That is the scope.
- `docs/textbook-chapters.md`: what the Punjab textbooks (old PTB and new PECTAA) contain.
- Your input list (in the job card): items as `id`, stem, options A-D, `key`.

## For each item, decide
- **KEEP**: the item is inside FSc scope, the key is right (solve it yourself, by hand, before trusting the key),
  exactly one option is correct, it is solvable without a calculator in about two minutes, and it needs no table or
  figure. Tag it with the best ECAT topic id and that topic's LO code.
- **SKIP** with a short reason when any of these is true: outside FSc (solid geometry of prisms/pyramids/spheres as
  a topic, statistics and distributions, normal distribution, AM-GM style inequality proofs, sets notation peculiar
  to China such as ℕ* or ℤ⁺ conventions that FSc does not use, sequences given by complicated recursions, gaokao-only
  topics); wrong or doubtful key; two defensible answers; marked `[TABLE]`; refers to options by letter or uses
  "all/none of the above"; needs a calculator.

Be strict: a skipped item costs nothing (new items are written to fill the bank); a wrong item reaching a student
costs a lot. Expect to keep roughly half to two thirds.

## Output
Write one line per input item, tab-separated, in input order, to your output file:
```
md-t0001<TAB>math-17-first<TAB>MATH-17.1
md-t0002<TAB>SKIP<TAB>uses ℕ* notation
```
Every input id must appear exactly once. Only write your own output file; don't edit anything else, don't run
git. When done, reply with: lines written, KEEP count per ECAT unit (math-NN: n), and any keys you believe are
wrong in the CSCA source (id + correct answer + one-line reason) so they can be fixed there too.
