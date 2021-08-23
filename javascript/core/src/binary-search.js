function BinarySearch(element, array) {
  let minIndex = 0;
  let maxIndex = array.length - 1;
  while(minIndex < maxIndex) {
    const currentIndex = Math.ceil((maxIndex + minIndex)/2);
    const currentElement = array[currentIndex];
    if(currentElement === element) {
      return currentIndex;
    } else if(currentElement > element) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex;
    }
  }
  return -1;
}

const ary = [1,2,3,4,5,6,7];

const result = BinarySearch(9, ary);
console.log({result});
