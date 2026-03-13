const lib = require("../src/is_palindrome"); // Fixed path

describe("is_palindrome", () => {
  it("should return false for negative numbers", () => {
    expect(lib.isPalindrome(-100)).toBe(false);
    expect(lib.isPalindrome(-1)).toBe(false);
  });

  it("should return true for single-digit numbers", () => {
    expect(lib.isPalindrome(0)).toBe(true);
    expect(lib.isPalindrome(5)).toBe(true);
  });

  it("should return false for numbers ending with 0 (except 0 itself)", () => {
    expect(lib.isPalindrome(10)).toBe(false);
    expect(lib.isPalindrome(100)).toBe(false);
  });

  it("should return true for palindrome numbers", () => {
    expect(lib.isPalindrome(101)).toBe(true);
    expect(lib.isPalindrome(121)).toBe(true);
    expect(lib.isPalindrome(1221)).toBe(true);
  });

  it("should return false for non-palindrome numbers", () => {
    expect(lib.isPalindrome(123)).toBe(false);
    expect(lib.isPalindrome(2101)).toBe(false);
  });
});
