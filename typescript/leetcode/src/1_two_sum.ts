function twosum(nums: number[], target: number) {
  console.log("I don't do nothing");
  const targetArray: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const currentNumber = nums[i];
    console.log({ currentNumber });
    const diff = target - currentNumber;
    // search if diff exists in rest of the array
    console.log("Search");
    for (let j = i + 1; j < nums.length; j++) {
      const currentSubNum = nums[j];
      console.log(currentSubNum);
      if (currentSubNum === diff) {
        targetArray.push(currentNumber, currentSubNum);
      }
      break;
    }
    if (targetArray.length === 2) {
      return targetArray;
    }
  }
  return targetArray;
}

const result = twosum([1, 2, 3, 4], 7);
console.log({ result });
