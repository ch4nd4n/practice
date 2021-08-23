const sortedArray = [1,2,3,4,6,8];
const insertElement = 0;

function insert(insertElement, sortedArray) {
  sortedArray[sortedArray.length] = insertElement;
  for(let i = sortedArray.length - 1; i > 0; i--) {
    if(sortedArray[i] >= sortedArray[i - 1]) {
      console.log('returning');
      return sortedArray;
    } else {
      console.log('Swapping ', sortedArray[i - 1], sortedArray[i]);
      const temp = sortedArray[i];
      sortedArray[i] = sortedArray[i - 1];
      sortedArray[i - 1] = temp;
    }
  }
  return sortedArray;
}

const newArray = insert(insertElement, sortedArray);

console.log(newArray);

