var isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  if (x < 10) {
    return true;
  }
  if (x % 10 === 0) {
    return false;
  }

  let currentValue = x;
  let reversedHalf = 0;
  while (currentValue > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (currentValue % 10);
    currentValue = Math.floor(currentValue / 10);
  }

  return (
    currentValue === reversedHalf ||
    currentValue === Math.floor(reversedHalf / 10)
  );
};

module.exports = { isPalindrome };

// isPalindrome(2101);
