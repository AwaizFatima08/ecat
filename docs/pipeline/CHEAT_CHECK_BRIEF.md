# Brief: fact-checking memory-cheat cards

You are an independent examiner checking revision cards that someone else wrote for **ECAT Prep**, an app for
Pakistani FSc students (Punjab old PTB and new PECTAA books). A wrong formula on a cheat card does more harm than a
wrong MCQ, because students memorise it. Check every card in your input file(s), line by line.

For each card, check:
- every formula, constant, unit, sign, condition, value, trend, reaction, product, reagent and example;
- every mnemonic: does each letter really match what it claims?
- every code snippet: trace it (or run it in your scratchpad); is the stated output exact?
- every table cell, and that tips (💡) and traps (⚠️) say something true;
- that the card is inside FSc / ECAT scope and does not state as fact something the books state differently
  (if it picks one convention, it must say so).

Don't report style, wording preferences or missing extra content: only things that are **wrong, misleading or out
of scope**.

Write your findings to your output file, one line per problem:
```
<card id> | ERROR | <what is wrong> | <the correct statement>
<card id> | DOUBT | <what may be wrong or differ between books> | <suggested fix>
```
If a card is fine, write nothing for it. End the file with a line `checked <n> cards, <e> errors, <d> doubts`.
Only write your output file; don't edit the cards; don't run git. Reply with the last line and the ERROR lines.
