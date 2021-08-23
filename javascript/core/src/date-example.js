// This example is for today.

const today = new Date();
const numberOfTimes = 10;

for (let i = 0; i < numberOfTimes; i++) {
  const newDate = today.setDate(today.getDate() + i);
  console.log(new Date(newDate).toLocaleDateString());
}
