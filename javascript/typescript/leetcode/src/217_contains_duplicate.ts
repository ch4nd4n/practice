import Debug from "debug";

const debug = Debug("leetcode:containsDuplicate");

/**
 * leetcode 217. Contains Duplicate
 * @see https://leetcode.com/problems/contains-duplicate/
 * Given an integer array nums, return true if any value
 * appears at least twice in the array, and return false
 * if every element is distinct.
 *
 * @param {number[]} nums the input array
 * @return {boolean} true if any value appears at least twice in the array,
 * false if every element is distinct
 */

export function containsDuplicate(nums: number[] | null) {
  debug("---------");
  debug({ nums });
  if (!nums) return false;
  const sorted = nums.sort();
  let found = false;
  let prev: number | null = null;
  sorted.forEach((element) => {
    debug({ element, prev });
    if (prev !== null && prev === element) {
      found = true;
    }
    prev = element;
  });
  return found;
}
