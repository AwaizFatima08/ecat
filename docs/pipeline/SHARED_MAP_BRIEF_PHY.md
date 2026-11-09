# Brief: tagging shared MDCAT Physics items to ECAT topics

ECAT Prep (`/mnt/storage/projects/ecat`) is an offline app for Pakistani FSc Pre-Engineering and ICS students
preparing for UET Lahore's ECAT. Its Physics bank may reuse items from our sibling app MDCAT Prep (Pakistani medical
entry test), but only items that fit the **Pakistani FSc (Class 11-12) Physics syllabus** as ECAT tests it.

## Read first
- `content/syllabus.json`, subject `phy`: 25 units, each with topics (`phy-NN-xxx`) and one LO code per topic
  (`PHY-N.M`) and its LO text. That is the scope.
- `docs/textbook-chapters.md`: what the Punjab textbooks (old PTB and new PECTAA) contain.
- Your input list (in the job card): items as `id`, stem, options A-D, `key`.

## For each item, decide
- **KEEP**: the item is inside FSc scope, the key is right (solve it yourself, by hand, before trusting the key),
  exactly one option is correct, it is solvable without a calculator in about two minutes, and it needs no table or
  figure. Tag it with the best ECAT topic id and that topic's LO code.
- **SKIP** with a short reason when any of these is true: biology/medical framing that an engineering student
  would find odd and that cannot stand without it; wrong or doubtful key; two defensible answers; refers to options
  by letter or uses "all/none of the above"; needs a calculator (ECAT has none: numbers must work by hand in about
  a minute); a fact or convention that the FSc Physics books state differently.

MDCAT items were already blind-checked in MDCAT Prep, so expect a high keep rate; still solve every one yourself.

Be strict: a skipped item costs nothing (new items are written to fill the bank); a wrong item reaching a student
costs a lot.

## Output
Write one line per input item, tab-separated, in input order, to your output file:
```
phy-03-001<TAB>phy-04-work<TAB>PHY-4.1
phy-03-002<TAB>SKIP<TAB>needs a calculator
```
Every input id must appear exactly once. Only write your own output file; don't edit anything else, don't run
git. When done, reply with: lines written, KEEP count per ECAT unit (phy-NN: n), and any keys you believe are
wrong in the MDCAT source (id + correct answer + one-line reason) so they can be fixed in MDCAT Prep too.
