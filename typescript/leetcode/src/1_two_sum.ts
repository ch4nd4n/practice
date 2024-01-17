export function twoSum(nums: number[], target: number) {
  const targetArray: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const currentNumber = nums[i];
    const diff = target - currentNumber;
    for (let j = i + 1; j < nums.length; j++) {
      const currentSubNum = nums[j];
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

const result = twoSum([1, 2, 3, 4], 7);
console.log({ result });
