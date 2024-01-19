import { containsDuplicate } from './217_contains_duplicate';
describe("containsDuplicate", () => {
  it("returns true when has duplicates", () => {
    const result = containsDuplicate([1, 3, 1]);
    expect(result).toBe(true);
  });

  it("returns false when has no duplicates", () => {
    const result = containsDuplicate([1, 3, 4, 6, 10, 2, -1, -3]);
    expect(result).toBe(false);
  });

  it("returns false when has no duplicates all negative numbers", () => {
    const result = containsDuplicate([-11, -31, -1, -3]);
    expect(result).toBe(false);
  });

  it("returns false for empty arrays ", () => {
    const result = containsDuplicate([]);
    expect(result).toBe(false);
  });

  it("returns false for null", () => {
    const result = containsDuplicate(null);
    expect(result).toBe(false);
  });


  it("returns true for repeated 0", () => {
    const result = containsDuplicate([0, 1, 2, 3, 0]);
    expect(result).toBe(true);
  });

  it("returns true when parameter is already sorted", () => {
    const result = containsDuplicate([1, 2, 3, 4, 5]);
    expect(result).toBe(false);
  });

  it("returns false when parameter is all negative numbers without duplicates", () => {
    const result = containsDuplicate([-1, -2, -3, -4, -5]);
    expect(result).toBe(false);
  });


});
