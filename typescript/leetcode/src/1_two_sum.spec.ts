import { describe, expect, it } from "@jest/globals";

import { twoSum } from "./1_two_sum";

describe("twosum", () => {
  it("returns indices of two numbers that add up to target", () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(nums, target);
    expect(result).toEqual([0, 1]);
  });

  it("returns indices of two numbers that add up to target (with negative numbers)", () => {
    const nums = [-2, 7, -11, 15];
    const target = 4;
    const result = twoSum(nums, target);
    expect(result).toEqual([2, 3]);
  });
});
