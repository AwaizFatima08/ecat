# Brief: writing ECAT Computer Science practice MCQs

You are writing practice questions for **ECAT Prep**, a free offline Android app for Pakistani FSc ICS students
(age 17-19) preparing for UET Lahore's ECAT (100 MCQs in 100 minutes, Computer Science 30 of them for the ICS
group, no calculator, rough paper only). Every question is re-solved later by an independent examiner who does not
see your key; a question with two defensible answers or a wrong key is caught and thrown away. Accuracy matters
more than speed.

Students come from two book series: the **old PTB ICS books** (Part I: IT, networks, architecture, security,
Windows, Word, Excel, Internet; Part II: databases, MS Access, C) and the **new PECTAA "Computer Science and
Entrepreneurship" 11/12** (software development, Python, algorithms, data structures, analytics, emerging
technologies, ethics, networks). Write so a careful student of either series can answer from what their unit
teaches.

## Read first
- `content/syllabus.json`, subject `cs`: your unit's topic ids, LO codes and LO text. Stay inside them.
- `docs/textbook-chapters.md`, section 4: what the books cover for your unit.
- Your job card: unit, id range, how many per topic, output file, and any shared items already in the unit (read
  them; don't repeat their ideas or code).

## Format
Write a JSON array to your output file, one object per line:
```
{"id":"cs-09-041","topic":"cs-09-loops","lo":"CS-9.2","d":"M","q":"...","o":["...","...","...","..."],"a":0,"x":"..."}
```
- `id`: `<unit>-<NNN>`, three digits, consecutive over your range, no gaps.
- `topic` / `lo`: a topic id of your unit and that topic's LO code.
- `d`: about **20% E, 60% M, 20% D**. E = one definition or fact. M = apply a rule, trace short code, convert a
  number, compare two ideas. D = trace code with a loop and a condition, combine two ideas, spot the subtle case
  (off-by-one, integer division, short-circuit, a key that is not unique).
- `o`: exactly 4 options, all different, similar length and form.
- `a`: index 0-3 of the correct option. Don't spread answers; a script shuffles options afterwards. So options and
  explanations must **never refer to a letter or position**: no "A and C", "option B", "(D)", "all/none of the
  above", "none of these", "both of these". Name variables, tables and nodes anything but a lone A-D (use x, n, P,
  Q, R, S, T1, T2, Student…).
- `x`: 1-3 short sentences: why the key is right (for code: the trace, the values step by step), then why the most
  tempting wrong option is wrong.

## Code in stems
- Put code in a fenced block inside the stem string: `"What is printed?\n```\nint i = 5;\nprintf(\"%d\", i / 2);\n```"`.
  The app shows it in a monospace box with line breaks and indentation kept (4 spaces per level). Code ≤ 12 lines.
- Short code in running text or options goes in single backticks: `` `scanf` ``, `` `x += 2` ``, `` `len(s)` ``.
- Options that are program output are written exactly as printed (`0 3 6 9`); say "(nothing is printed)" or
  "an error" plainly where that is the answer, but only when it is certain.
- **C**: standard C as the old Part II book teaches it, with `#include <stdio.h>` and `main()` assumed unless the
  question is about them. Never depend on behaviour that differs between Turbo C and modern compilers or is
  undefined: no `i++ + ++i`, no two changes of one variable in one expression, no uninitialised variables, no
  `sizeof(int)` (books say 2 bytes, modern compilers 4), no overflow, no `getch`/`conio.h` output tricks, no
  `void main` vs `int main` debates. Integer division and `%` with **positive** numbers only.
- **Python**: Python 3. `print` with default `sep`/`end` unless shown; `/` gives a float (`7 / 2` → `3.5`), `//`
  floor division with positive numbers, `range` end excluded. Show output exactly as Python prints it (`[1, 2, 3]`,
  `{'a': 1}`, `3.0`, `True`).
- **SQL/Access**: simple SELECT with WHERE, ORDER BY, COUNT/SUM/AVG/MIN/MAX, AND/OR/NOT, LIKE with `*` or `%`
  (state which: say "in Access" for `*`), BETWEEN. Give the table's rows in the stem as `(1, Ayesha, Lahore, 78)`.
  Access field types and objects as Access names them (Short Text/Text, Number, Date/Time, Yes/No, AutoNumber).

## Facts and conventions
1. **Only facts the books and every standard reference agree on.** Where books differ or a fact has changed
   (number of OSI layers is 7 — safe; the "fastest supercomputer", the latest Windows version, IPv4 address counts
   beyond 2³², exact cache sizes, who invented what, years, brand-name trivia) leave it out or word it so it is
   true either way.
2. **Definitions**: use the textbook meaning (e.g. a candidate key that is not chosen is an alternate key; RAM is
   volatile; a hub sends to all ports, a switch to the destination port; half-duplex = both directions, one at a
   time). Avoid items where one book's definition makes a second option right.
3. **Number systems**: work every conversion twice (once by place values, once by grouping bits). Use subscripts
   `(1011)₂`, `(17)₈`, `(2F)₁₆`. Unsigned unless the stem says 2's complement and gives the bit width.
4. **Office**: Word/Excel features by name and effect (mail merge, Format Painter, absolute reference `$A$1`, `SUM`,
   `AVERAGE`, `IF`, `COUNT`, `MAX`); don't test keyboard shortcuts except universal ones (Ctrl+C, Ctrl+V, Ctrl+Z,
   Ctrl+S, Ctrl+B) and don't test menu paths that changed between Office versions. Excel formulas with given cell
   values: compute them twice.
5. **Algorithms**: trace on small inputs (5-6 elements); state which variant (e.g. "bubble sort that swaps adjacent
   out-of-order pairs, ascending; after the first full pass…"). Big-O as books give it (linear O(n), binary
   O(log n), bubble/selection/insertion O(n²) worst case). Stack/queue traces with explicit operations.
6. **Logic**: truth tables, implication (false only T→F), De Morgan, quantifiers ∀ ∃; symbols ∧ ∨ ¬ → ↔.
7. **Analytics/hypothesis**: mean, median, mode, range on small integer data; null vs alternative hypothesis,
   p-value vs significance level (reject H₀ when p < α); no formula tables.
8. **Distractors** from real mistakes: off-by-one in a loop, `=` vs `==`, integer vs float division, forgetting a
   `break` in `switch`, LIFO vs FIFO, primary vs foreign key, LAN vs MAN, RAM vs ROM, bus width vs speed, reading
   bits from the wrong end. No joke options.
9. **Exactly one correct option.** "NOT/EXCEPT" in capitals, at most 1 item in 8. Stems under about 60 words plus
   code. No repeats.
10. **Original work.** Never copy past ECAT/board papers, textbook exercises or prep sites; textbook-style
    questions with your own code and numbers are fine.

## Check before you finish
From `/mnt/storage/projects/ecat`:
```
node scripts/check_draft.js <your file> <unit> <first number> <count>
```
Fix every `ERR` until it prints `PASS`. Then re-read once more: is the key right (re-trace every code item), is
exactly one option right, does the explanation agree with the key? Fix or replace anything doubtful.

Only write your own output file(s); don't edit anything else, don't run git. When done, reply with the PASS lines
and any items you were unsure about (id + why), or "none".
