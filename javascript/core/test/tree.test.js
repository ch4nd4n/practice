const { BinarySearchTree } = require("../src/tree");

test("BinaryTree", () => {
  const bst = new BinarySearchTree();

  bst.push(5);
  bst.push(3);
  bst.push(2);
  bst.push(7);
  bst.push(4);
  bst.push(6);
  bst.push(8);

  console.log(bst);
});
