/**
 * Sorts an array of objects by attribute.
 *
 * @param {Array<object>} arr - The array of objects to sort.
 * @param {string} sortKey - The attribute to sort by ('name' or 'age').
 * @returns {Array<object>} - The sorted array of objects.
 */
function byAttribute(arr, sortKey) {
  // Sort the array of objects by the specified attribute.
  // If the attribute is 'name', sort alphabetically by name.
  // If the attribute is 'age', sort in descending order by age.
  arr.sort((a, b) => {
    if (sortKey === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortKey === "age") {
      return a.age - b.age;
    } else {
      return 0;
    }
  });
}

module.exports = { byAttribute };
