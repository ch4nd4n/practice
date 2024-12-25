import Debug from 'debug';

import { fizzBuzz } from './412_fizz_buzz';

const debug = Debug('leetcode:fizzbuzz');

describe("fizzBuzz", () => {
  it("works for 3", () => {
    const result = fizzBuzz(3);
    expect(result).toEqual(["1","2","fizz"]);
  });
  it("works for 5", () => {
    const result = fizzBuzz(5);
    expect(result).toEqual(["1","2","fizz", "4", "buzz"]);
  });
  it("works for 10", () => {
    const result = fizzBuzz(10);
    expect(result).toEqual(["1","2","fizz", "4", "buzz", "fizz", "7", "8", "fizz", "10"]);
  });
});
