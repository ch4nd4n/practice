# JavaScript Basics Learning Platform

## Overview
This repository is a plain JavaScript learning playground. The goal is to practice core language features, algorithms, and DOM/utility helpers without bringing TypeScript or build-step complexity into the mix.

## Getting started
1. Install dependencies: `pnpm install`.
2. Run an exercise: open `is_palindrome.js` or anything under `src/`, add your helper, then run `pnpm test` to see your work execute.
3. Keep the focus on modern but idiomatic JavaScript (ES6+) and lean on `Array` and `String` helpers rather than transpilers.

## Project layout
- `is_palindrome.js`: LeetCode-style problem to check numeric palindromes without strings.
- `src/`: Utility modules such as `html-utils.js` that shape practice functions for sorting or DOM-related helpers.
- `tests/`: Jest suites that lock in the expected behavior for the helpers in this repo.

## Running tests
Use `pnpm test` to run the existing Jest suites. Each exercise should ship with its own test file so that feedback is fast and deterministic.

## Practice exercises
1. **Named sort helper**: Expand `src/html-utils.js` to accept comparator overrides (e.g., supply a thunk that can sort numbers or booleans) and add edge case coverage in tests.
2. **String transformation helper**: Create `src/text-utils.js` that exposes a `titleCase(sentence)` function plus a test that verifies punctuation and whitespace handling.
3. **Array reducer drill**: Build `src/stats.js` with `summaries(values)` that returns `{sum, avg, min, max}` from an array of numbers, and write a Jest suite that seeds positive, negative, and empty inputs.

Each exercise should live in the `src/` folder with a matching test under `tests/`. Keep the API surface small, document edge cases, and avoid introducing non-JS tooling.

## Contribution notes
- Keep commits focused on a single exercise or bug fix.
- Document any new utility in this README or link it from here.
- If you introduce helpers that touch the DOM, keep them abstract enough to run headless (no browser-specific APIs).
