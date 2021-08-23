function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

var preorderTraversal = function (root) {
    let currentNode = root;
    const numbers = [];
    const stack = [];
    while (currentNode) {
        console.log(currentNode);
        numbers.push(currentNode.val);
        if (currentNode.right) stack.push(currentNode.right);
        if (currentNode.left) {
            currentNode = currentNode.left;
        } else if (stack.length) {
            currentNode = stack.pop();
        } else {
            currentNode = null;
        }
    }
    return numbers;
};

// let left = new TreeNode(3, null, null);
// let right = new TreeNode(5, null, null);
let root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);

const nums = preorderTraversal(root);
console.log(nums);