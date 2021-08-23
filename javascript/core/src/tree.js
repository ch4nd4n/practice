function Node(value) {
  this.item = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.push = function(value) {
  let currentNode = this.root;
  const newNode = new Node(value);
  if(!currentNode) {
    this.root = newNode;
    return;
  }

  while(currentNode) {
    if(value < currentNode.item) {
      if(currentNode.left) {
        currentNode = currentNode.left;
      } else {
        currentNode.left = newNode;
        break;
      }
    } else {
      if(currentNode.right) {
        currentNode = currentNode.right
      } else {
        currentNode.right = newNode;
        break;
      }
    }
  }
}

module.exports = { Node, BinarySearchTree };