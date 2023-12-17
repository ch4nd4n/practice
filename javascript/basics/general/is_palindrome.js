var isPalindrome = function(x) {
  if(x < 0) {
    return false;
  }
  let currentValue = x;
  while(currentValue > 0) {
    const remainder = currentValue % 10;
    console.log(remainder);
    currentValue = Math.floor(currentValue / 10);
  }
  return false;
}

module.exports = { isPalindrome };

// isPalindrome(2101);
