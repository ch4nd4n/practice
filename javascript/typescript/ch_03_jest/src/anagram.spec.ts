import { isAnagram } from './anagram';

describe("isAnagram", () => {
  it("returns true for anagrams", () => {
    expect(isAnagram('eat', 'ate')).toBe(true);
  });
  it("returns false for non-anagrams", () => {
    expect(isAnagram('abc', 'azy')).toBe(false);
  });
});
