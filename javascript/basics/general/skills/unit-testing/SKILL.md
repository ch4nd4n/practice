---
name: unit-testing
description: Provide concise guidance for writing or extending Jest suites in this repo, including naming/structure conventions, when to update tests for src helpers, and how this aligns with the agents README style.
---

Keep instructions terse and actionable so agents can augment the existing Jest suites without re-reading the entire repo. Follow the documentation tone established by `agents.md`.

1. **Trigger** – use this skill whenever you are authoring, expanding, or refactoring `tests/*.js` that cover helpers under `src/`, or when a Jest diff requires attention.
2. **Workflow**
   - Start by reading the active README/`docs/next-steps.md` sections for the exercise focus, then open the matching test file (e.g., `tests/html-utils.test.js`).
   - Follow the repo pattern: pure helpers, plain JS, `describe`/`test` blocks, and `expect` assertions that encode edge cases (empty inputs, falsy values, boundary numbers).
   - Keep helpers small; separate setup data from assertions with clear comments, and prefer explicit checked outputs over complex inline loops.
   - Name tests to match behavior (`should`, `returns`, `throws`) and keep snapshots out unless Jest already uses them.
3. **Verification**
   - Rerun `pnpm test` or the specific file with `npx jest tests/…` after edits; interpret failing assertions by reading Jest’s diff, checking whether the helper or the test needs fixing.
   - If the failure originates from async code or a pending implementation, annotate the related TODO in the test file per the agents.md tone so future agents know the intent.
4. **Documentation style note** – this skill, like all repo docs, should stay concise and fact-forward. Avoid long narratives; list steps, call out naming/structure rules, and refer agents back to `agents.md` when style clarification is needed.

See `references/testing-guidelines.md` for a checklist, templated suite, and reusable snippets.
