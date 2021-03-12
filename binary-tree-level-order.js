const { Queue } = require("./Queue");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      if (!current.left) {
        current.left = new Node(value);
        break;
      } else {
        queue.enqueue(current.left);
      }

      if (!current.right) {
        current.right = new Node(value);
        break;
      } else {
        queue.enqueue(current.right);
      }
    }
  }
}

const tree = new BinaryTree();
tree.insert("1");
tree.insert("2");
tree.insert("3");
tree.insert("4");
tree.insert("5");

console.dir(tree, { depth: null });
