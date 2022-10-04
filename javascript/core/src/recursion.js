/**
 * Simple recursion example
 */

/**
 * Sum of first n number using recursion
 * @param {number} n till whatever number you want this to work
 */
function sum(n, prevsum) {
  if (n > 1) {
    const curSum = prevsum ? prevsum + n : n;
    return sum(n - 1, curSum);
  }
  return prevsum;
}

console.log(sum(10));