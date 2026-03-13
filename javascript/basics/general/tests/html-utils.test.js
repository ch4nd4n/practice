// ./tests/html-utils.test.js
const { byAttribute } = require("../src/html-utils");

describe("byAttribute", () => {
  it("should sort an array of objects by name attribute", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];
    byAttribute(data, "name");
    const expected = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];
    expect(data).toEqual(expected);
  });

  it("should sort an array of objects by age attribute in ascending order", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];
    byAttribute(data, "age");
    const expected = [
      { name: "Bob", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ];
    expect(data).toEqual(expected);
  });

  it("should return the unchanged array when an invalid sortKey is provided", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];
    const originalData = [...data];
    byAttribute(data, "invalid");
    expect(data).toEqual(originalData);
  });

  it("should handle an empty array", () => {
    const data = [];
    byAttribute(data, "name");
    expect(data).toEqual([]);
  });

  it("should handle an array with one element", () => {
    const data = [{ name: "Alice", age: 30 }];
    byAttribute(data, "name");
    expect(data).toEqual([{ name: "Alice", age: 30 }]);
  });
});
