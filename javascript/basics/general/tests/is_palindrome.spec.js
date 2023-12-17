const lib = require('../is_palindrome');

describe("is_palindrome", () => {
  it("should work for negative numbers", () => {
    console.log(lib);
    expect(lib.isPalindrome(-100)).toBe(false);
  });
  it("should work for positive numbers", () => {
    expect(lib.isPalindrome(101)).toBe(true);
  });
});
