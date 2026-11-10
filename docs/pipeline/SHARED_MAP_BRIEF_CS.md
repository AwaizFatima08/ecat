# Brief: tagging shared NTS Computer items to ECAT CS topics

ECAT Prep (`/mnt/storage/projects/ecat`) is an offline app for Pakistani FSc Pre-Engineering and ICS students
preparing for UET Lahore's ECAT. Its Computer Science bank may reuse items from our sibling app NTS Prep, but only
items that fit the **Punjab ICS Computer Science syllabus** (old PTB Part I/II books and the new PECTAA "Computer
Science and Entrepreneurship" 11/12 books) as ECAT tests it.

## Read first
- `content/syllabus.json`, subject `cs`: 14 units, each with topics (`cs-NN-xxx`) and one LO code per topic
  (`CS-N.M`) and its LO text. That is the scope.
- `docs/textbook-chapters.md`, section 4: what the four ICS books contain.
- Your input list (in the job card): items as `id`, stem, options A-D, `key`.

## For each item, decide
- **KEEP**: the item is inside the ICS syllabus, the key is right (work it out yourself — trace every code item line
  by line on paper, convert every number by hand — before trusting the key), exactly one option is correct, and it
  needs no figure. Tag it with the best ECAT topic id and that topic's LO code.
  - C code → `cs-08-*` (elements, operators, printf/scanf) or `cs-09-*` (decisions, loops, functions, files).
  - Simple SQL (SELECT, WHERE, ORDER BY, COUNT/SUM/AVG/MIN/MAX, simple criteria) → `cs-07-queries` (Access queries
    are SQL underneath). Database theory → `cs-06-*`.
  - Number systems → `cs-01-numbers`; CPU, memory → `cs-01-*`; networks → `cs-02-*`; security → `cs-03-*`.
- **SKIP** with a short reason when any of these is true: outside ICS (SQL joins, subqueries, GROUP BY/HAVING,
  pointers, arrays of structs, recursion depth puzzles, C++/Java, operating-system internals such as scheduling or
  paging, compiler theory, NTS-only general-knowledge or brand trivia); a fact that has changed or that books state
  differently; wrong or doubtful key; two defensible answers; depends on compiler-specific or undefined C behaviour
  (`i++ + ++i`, `printf` of a wrong type, integer sizes other than "int is at least 2 bytes"); refers to options by
  letter or uses "all/none of the above".

Be strict: a skipped item costs nothing (new items are written to fill the bank); a wrong item reaching a student
costs a lot. Expect to keep roughly half to two thirds.

## Output
Write one line per input item, tab-separated, in input order, to your output file:
```
id-t0001<TAB>cs-07-queries<TAB>CS-7.2
ip-t0002<TAB>SKIP<TAB>uses pointers
```
Every input id must appear exactly once. Only write your own output file; don't edit anything else, don't run
git. When done, reply with: lines written, KEEP count per ECAT unit (cs-NN: n), and any keys you believe are
wrong in the NTS source (id + correct answer + one-line reason) so they can be fixed there too.
