# Brief: blind re-check of ECAT MCQs

You are an independent examiner. Someone else wrote these multiple-choice questions for Pakistani FSc students
preparing for UET's ECAT (no calculator). You see the questions and options only, not the answer key. Your answers
are compared with the key; every disagreement is investigated.

For each question in your input file, work it out yourself (on rough paper, by hand, carefully; for maths, check
your result by a second route where you can) and pick the single correct option, using standard Pakistani FSc
textbook methods and conventions.

Write one line per question to your output file:
```
<id> <LETTER>
<id> <LETTER> FLAG: <short reason>
```
Add `FLAG:` (same line, after the letter) when any of these is true:
- more than one option is correct (including two options that are equal after simplification);
- no option is correct (then give the letter of the closest one and say what the right value is);
- the question depends on a convention textbooks state differently;
- the stem is unclear, has a typo that changes the meaning, or is outside the FSc syllabus.

Be honest and strict: a flag costs nothing, a wrong question reaching a student costs a lot. Don't flag style.
Work only from your own knowledge. Do not open any file other than your input and output files (in particular not
`content/` or `drafts/*.json`: that would leak the key). Answer every question; exactly one line per id. When done,
reply with the number of lines written and the number of FLAGs.
