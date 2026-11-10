# Brief: writing ECAT English practice MCQs

You are writing practice questions for **ECAT Prep**, a free offline Android app for Pakistani FSc students
(age 17-19) preparing for UET Lahore's ECAT (100 MCQs in 100 minutes; **English is 10 of them, and UET tests only
reading comprehension**). Every question is re-solved later by an independent examiner who sees the passage and
the question but not your key; a question with two defensible answers or a wrong key is caught and thrown away.
Accuracy matters more than speed.

## Read first
- `content/syllabus.json`, subject `eng`: the topic ids, LO codes and LO text. Stay inside them.
- Your job card: unit, id range, how many per topic, output file(s), theme list, and any shared items already in
  the unit (read them; don't repeat their words or sentences).

## Item format (all units)
A JSON array, one object per line:
```
{"id":"eng-01-021","p":"eng-p005","topic":"eng-01-infer","lo":"ENG-1.3","d":"M","q":"...","o":["...","...","...","..."],"a":0,"x":"..."}
```
- `id`: `<unit>-<NNN>`, three digits, consecutive over your range, no gaps. `p` only in eng-01 (see below).
- `d`: about **20% E, 60% M, 20% D**. E = a detail stated almost word for word, or a common word. M = paraphrase,
  a reason or comparison spread over two sentences, a word whose everyday meaning is not the one meant. D = an
  inference that joins two parts of the passage, the purpose of a paragraph, an attitude that is implied not stated,
  a harder word or a subtle error.
- `o`: exactly 4 options, all different, similar length and form.
- `a`: index 0-3 of the correct option. Don't spread answers; a script shuffles options afterwards. So options and
  explanations must **never refer to a letter or position**: no "A and C", "option B", "(D)", "all/none of the
  above", "none of these", "both of these".
- `x`: 1-3 short sentences: why the key is right, pointing to the words of the passage (or the grammar rule), then
  why the most tempting wrong option is wrong.

## Unit eng-01: reading comprehension (the ECAT style)
You write **passages** and **5 questions on each**.

**Passages file** (a JSON object, ids `eng-pNNN` as on your card, in order):
```
{
  "eng-p001": {"title": "Why Bridges Sway", "text": "First paragraph...\n\nSecond paragraph...\n\nThird paragraph..."},
  "eng-p002": {...}
}
```
- **160-260 words**, 2-4 paragraphs separated by a blank line (`\n\n`), plain text, a short title.
- Clear, educated English at FSc / O-level-to-A-level reading level, like a good newspaper feature or a textbook
  reader: varied sentences, a few words a strong 17-year-old may not know (that's where words-in-context items
  come from), and an argument or a line of thought, not a list of facts.
- **Original writing.** Never copy or close-paraphrase any published text, past paper, textbook reader or prep
  site. Write on your card's themes in your own words.
- **Facts:** every question must be answerable from the passage alone, never from outside knowledge. Keep real-world
  facts general and safe ("many engineers", "in some cities"); don't invent precise statistics, dates or quotes and
  attribute them to real people, institutions or studies. Invented people and places are fine and often best
  (a teacher in a small town, an engineer called Sana). Nothing political, religious, sectarian or about real
  living public figures; respectful to all communities; Pakistani settings welcome.
- Vary the kind: explanation (how something works), argument (a writer taking a side), narrative (a short story or
  memoir), comparison, problem-and-solution. Your card says the mix.

**Five questions per passage**, in a row, each with `"p": "<passage id>"`:
1. `eng-01-main` (ENG-1.1): main idea, best title, or the writer's main purpose.
2. `eng-01-detail` (ENG-1.2): a fact stated in the passage — test it through paraphrase, not by copying the
   sentence into the key.
3. `eng-01-infer` (ENG-1.3): something the passage supports but does not say. The key must follow from the text;
   distractors are either contradicted by it, go too far, or are true in life but not supported by the passage.
4. `eng-01-vocab` (ENG-1.4): the meaning of a word or phrase **as used in the passage**. Quote it exactly as it
   appears, e.g. `As used in the second paragraph, the word "tempered" most nearly means:`. Include the word's
   commoner meaning as a distractor when it has one.
5. `eng-01-tone` (ENG-1.5: tone, attitude, point of view) **or** `eng-01-structure` (ENG-1.6: what a pronoun or
   "this/such" refers to, what a paragraph does, how two paragraphs relate, what a linking word signals). Use the
   number of each that your card gives.

Stem rules: don't repeat the passage in the stem (the app shows it above every question). Point to the place
("in the third paragraph", "the phrase 'X'"). Avoid "According to the passage, which is NOT true" more than once per
two passages. The order of questions inside a passage is free.

The main danger is **two defensible answers.** Before you write the key, read each distractor against the passage
and ask: could a careful student argue for it from the text? If yes, change it. Make wrong options clearly wrong by
the text — not just less good — while still tempting to a hasty reader (a word from the passage used wrongly, a
detail from the wrong paragraph, a claim that is too strong, the opposite of what was said).

## Unit eng-02: vocabulary (extra practice)
- `eng-02-syn`: a word in a short sentence of your own that gives context; "In this sentence, 'X' most nearly
  means:". Options are single words or short phrases of the same part of speech.
- `eng-02-ant`: same, "most nearly opposite in meaning". Never put a synonym and an antonym as two options that
  could both be argued; only one option may be opposite.
- `eng-02-usage`: commonly confused words (affect/effect, principal/principle, complement/compliment, lose/loose,
  stationary/stationery, economic/economical, …) and phrasal verbs (put off, call off, look into, carry out, …) in a
  fill-the-blank sentence. One clearly right word.
- Words at the level of a strong FSc student: academic and newspaper words, not obscure GRE rarities.

## Unit eng-03: sentence correction (extra practice)
- `eng-03-agree`: subject-verb agreement (either/or, each, a number of / the number of, collective nouns, "one of
  the … who"), tense sequence, conditionals.
- `eng-03-prep`: prepositions after common words (aware of, depend on, prefer to, interested in, consist of,
  superior to) and articles (a/an/the/no article).
- `eng-03-struct`: dangling and misplaced modifiers, parallelism, pronoun case and reference, word order, adjective
  vs adverb, double negatives, comparatives.
- Forms: "Choose the correct sentence" (four full sentences, exactly one correct), "Fill in the blank", or "Which
  underlined part has the error" — but there is no underlining in the app, so quote the parts instead: `In the
  sentence "…", which part contains an error?` with options the quoted parts.
- **Only standard rules that every grammar book agrees on.** Don't test British vs American differences, split
  infinitives, "who/whom" in casual speech, "data is/are", "different from/to/than", "fewer/less" with borderline
  nouns, or anything a good teacher would call style. If a native writer could defend the "wrong" version, drop it.

## Check before you finish
From `/mnt/storage/projects/ecat`, run the check command(s) on your card (`check_draft.js` for every items file;
for eng-01 also `check_passages.js`). Fix every `ERR` until each prints `PASS`. Then re-read once more: is the key
right, is exactly one option right, does the explanation agree with the key and quote the passage correctly?
Fix or replace anything doubtful.

Only write your own output file(s); don't edit anything else, don't run git. When done, reply with the PASS lines
and any items you were unsure about (id + why), or "none".
