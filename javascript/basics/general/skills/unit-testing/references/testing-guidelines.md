# Testing guidelines

## Suite template
```javascript
describe('helper name', () => {
  const scaffolding = /* minimal fixtures/inputs */

  it('should handle valid input', () => {
    const result = helper(scaffolding.valid)
    expect(result).toEqual(/* explicit value */)
  })

  it('should guard against missing or falsy input', () => {
    expect(() => helper()).toThrow(/required/)
  })
})
```

## Naming rules
- use `describe('<module name>', …)` when the helper exports a single function; add nouns for grouped helpers.
- start `it`/`test` descriptions with `should`, `returns`, or `throws` plus the condition.
- keep assertion explanation in the test title, not in inline comments.

## Checklist before committing
1. `tests/` mirrors every new `src/` helper added.
2. Each test file stays pure: avoid `document`/`window` access unless the helper already wraps DOM logic and is easily mocked.
3. Edge cases: falsy inputs, numbers out of range, empty arrays, and `undefined`.
4. Assertions use explicit values (`toEqual`, `toStrictEqual`, `toBeTruthy`) rather than manual loops.
5. Run `pnpm test` and resolve Jest failures; note any flaky async behavior the next reader needs to know.

## Troubleshooting hints
- When Jest complains about `runInBand` or concurrency issues, rerun `pnpm test --runInBand`.
- For async helpers, always `await` async calls and `return` the promise inside the test; avoid `done` unless the helper exposes a callback.
- If `jest` reports “No tests found”, ensure the file is named `*.test.js` or `*.spec.js` and resides inside `tests/`; add the new file to `package.json` scripts only if a custom pattern is required.
