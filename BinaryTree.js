/*
  -Trees are hierarchical data structures. 
  -A tree whose nodes have at most 2 children is called a binary tree.

  Properties:
  -Edge – connection between one node to another.
  -Path – a sequence of nodes and edges connecting a node with a descendant.
  -Height – The height of a node is the number of edges towards the longest downward path from
   that node to a leaf node.
  -Depth – The depth of a node is the number of edges from that node to the tree's root node.
  -Level – The level of a node is the number of parent nodes from that node until the root node.
  -The maximum number of nodes at level ‘l’ of a binary tree is 2^l.
  -The maximum number of nodes in a binary tree of height ‘h’ is 2^(h+1)–1.
  -The minimum number of nodes in binary tree of height ‘h’ is h+1.
  -The maximum height of binary tree with ‘n’ nodes is n-1.
  -The minimum height of binary tree with ‘n’ nodes is floor(log2n) or ceil(log2(n+1)-1).

  Types:
  -In full binary tree every node has either 0 or 2 children.
  -In Complete Binary Tree all levels are completely filled 
   except possibly the last level where the leaf nodes lean towards left.
  -In Perfect Binary Tree all the internal nodes have two children and 
   all leaf nodes are at the same level.
  -A degenerate or pathological tree has a single child either left or right associated with a parent node.
  -A skewed binary tree is a pathological/degenerate tree in which the tree is either dominated by 
   the left nodes or the right nodes.
*/

const { Stack } = require("./stack-with-array");

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

  preOrderTraversalIterative() {
    if (!this.root) return;

    const stack = new Stack();
    stack.push(this.root);

    while (!stack.isEmpty()) {
      const current = stack.pop();

      process.stdout.write(`${current.value} `);

      if (current.right) {
        // right child is pushed first so that left is processed first
        stack.push(current.right);
      }

      if (current.left) {
        stack.push(current.left);
      }
    }
  }

  preOrderTraversal(node) {
    if (!node) return;

    process.stdout.write(`${node.value} `);
    this.preOrderTraversal(node.left);
    this.preOrderTraversal(node.right);
  }

  inOrderTraversalIterative() {
    const stack = new Stack();
    let current = this.root;

    while (!stack.isEmpty() || current) {
      if (current) {
        // if current node exists push it's reference onto the stack and traverse to it's left.
        stack.push(current);
        current = current.left;
      } else {
        // if current node is null take out the most recent node's reference from the stack,
        // print it's value and move to the right of it.
        current = stack.pop();
        process.stdout.write(`${current.value} `);
        current = current.right;
      }
    }
  }

  inOrderTraversal(node) {
    if (!node) return;

    this.inOrderTraversal(node.left);
    process.stdout.write(`${node.value} `);
    this.inOrderTraversal(node.right);
  }

  postOrderTraversalIterative() {
    const stack = new Stack();
    let current = this.root;
    let previous = null;

    while (!stack.isEmpty() || current) {
      if (current) {
        // if current node exists push it's reference onto the stack and traverse to it's left.
        stack.push(current);
        current = current.left;
      } else {
        // if the current node is null look at the most recent node's reference from the stack.
        let peekNode = stack.peek();
        // if the peeked node has a right child and it is unvisited
        // i.e., it is not equal to the last visited node move to it.
        if (peekNode.right && peekNode.right !== previous) {
          current = peekNode.right;
        } else {
          // if the peeked node dosn't have a right child
          // or it's right child is equal to last visited node i.e., it is already traversed,
          // print it's value and keep track of last visited node.
          process.stdout.write(`${peekNode.value} `);
          previous = stack.pop();
        }
      }
    }
  }

  postOrderTraversal(node) {
    if (!node) return;

    this.postOrderTraversal(node.left);
    this.postOrderTraversal(node.right);
    process.stdout.write(`${node.value} `);
  }
}

const tree = new BinaryTree();
/*
      1
    2  3
  4 5
*/
tree.root = new Node("1");
tree.root.left = new Node("2");
tree.root.right = new Node("3");
tree.root.left.left = new Node("4");
tree.root.left.right = new Node("5");

console.dir(tree, { depth: null });

console.log("PreOrder");
tree.preOrderTraversal(tree.root);
console.log("\nInOrder");
tree.inOrderTraversal(tree.root);
console.log("\nPostOrder");
tree.postOrderTraversal(tree.root);
