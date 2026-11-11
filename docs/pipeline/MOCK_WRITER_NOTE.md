# Note: writing mock-paper items (read with your subject's writer brief)

The 20 full mocks use **separate questions that never appear in practice**. You write a unit's **mock pool**; a script
later deals the pools into 20 papers. Everything in your subject brief applies (format, accuracy, notation, no
letter references, original work), plus:

1. **Not in practice.** Read the unit's practice file `content/questions/<subject>/<unit>.json` first. Don't repeat
   a practice item's idea with new numbers, its code, its passage topic or its wording; test the same LOs from a
   different angle, set-up or context. A student who has done all of practice must still meet new questions.
2. **Exam feel.** Write as UET would set the paper: clear, self-contained, about one minute each (Maths and Physics
   numericals up to two), no trick wording. Difficulty about **20% E, 60% M, 20% D** across your pool.
3. **Ids:** `<unit>-501` upward (`math-17-501`, `cs-09-512`, …), consecutive, no gaps. These ids are internal; the
   papers renumber them. Topic counts as on your job card.
4. **Spread within the pool:** across the topics as the card says, and across kinds (concept, numerical, code trace,
   data) so that any 1-3 items dealt to one paper look different from each other.
5. **English (eng-01 only):** passages `eng-p071` to `eng-p110`, written to the same rules as practice passages
   (`ENG_WRITER_BRIEF.md`), on themes **not** used by passages eng-p001-p070 in `content/passages.json` (read their
   titles first). Each passage has its 5 questions in a row with `"p"`; check with
   `node scripts/check_passages.js <passages file> <items file> <first passage number> <count>`.

Output and check as on your job card:
`node scripts/check_draft.js drafts/mock/<unit>.a.json <unit> 501 <count>` must print PASS.
