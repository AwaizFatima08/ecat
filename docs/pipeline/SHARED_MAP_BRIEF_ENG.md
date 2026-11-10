# Brief: tagging shared MDCAT English items to ECAT topics

ECAT Prep (`/mnt/storage/projects/ecat`) is an offline app for Pakistani FSc students preparing for UET Lahore's
ECAT. ECAT's own English is reading comprehension only; the app adds two **extra-practice** units, and these may
reuse items from our sibling app MDCAT Prep:
- `eng-02` Vocabulary: `eng-02-syn` (ENG-2.1, word closest in meaning), `eng-02-ant` (ENG-2.2, most nearly
  opposite), `eng-02-usage` (ENG-2.3, commonly confused words and phrasal verbs).
- `eng-03` Sentence Correction: `eng-03-agree` (ENG-3.1, subject-verb agreement and tense), `eng-03-prep`
  (ENG-3.2, prepositions and articles), `eng-03-struct` (ENG-3.3, modifiers, parallelism, pronouns, word order).

Your input file lists MDCAT items as `id`, stem, options A-D, `key`.

## For each item, decide
- **KEEP**: it fits one of the six topics above, the key is right (answer it yourself first), exactly one option is
  correct in standard British/Pakistani school English, and nothing in it is a matter of style or regional usage.
  Tag it with the topic id and its LO code. A "meaning in this sentence" vocabulary item goes to `eng-02-syn`.
  A "choose the correct sentence" or "fill the blank" item goes to the eng-03 topic of the error it tests (tense or
  agreement → agree; preposition or article → prep; anything else structural → struct). Word-form items
  (adjective vs adverb) go to `eng-03-struct`.
- **SKIP** with a short reason when: it tests something outside the six topics (active/passive voice, direct and
  indirect speech, figures of speech, punctuation only, idioms); the key is wrong or doubtful; two options are
  defensible (e.g. both "different from" and "different to", "in the street" / "on the street"); it names options by
  letter or uses "all/none of the above"; it has a medical framing a non-medical student would find odd.

Be strict: a skipped item costs nothing (new items fill the bank).

## Output
One line per input item, tab-separated, in input order, to your output file:
```
eng-02-001<TAB>eng-02-syn<TAB>ENG-2.1
eng-02-140<TAB>SKIP<TAB>indirect speech
```
Every input id exactly once. Only write your own output file; don't edit anything else, don't run git. When done,
reply with: lines written, KEEP count per topic, and any MDCAT keys you believe are wrong (id + right answer + why).
