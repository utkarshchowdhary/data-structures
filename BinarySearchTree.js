/*
  -In Binary Search Tree all internal nodes have value greater than values in it's left subtree and 
   less than those in it's right subtree.
  -In a balanced binary search tree each comparison skips about half of the remaining tree, 
   so the whole lookup takes time proportional to the binary logarithm of the number of items 
   stored in the tree.
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert_iteratively(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new Node(value);
          break;
        }
      } else if (value > current.value) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new Node(value);
          break;
        }
      }
    }
  }

  insert(value) {
    if (this.root) {
      this._insert(this.root, value);
    } else {
      this.root = new Node(value);
    }
  }

  _insert(node, value) {
    if (value < node.value) {
      if (node.left) {
        this._insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else if (value > node.value) {
      if (node.right) {
        this._insert(node.right, value);
      } else {
        node.right = new Node(value);
      }
    }
  }

  search_iteratively(value) {
    let current = this.root;
    while (current) {
      if (current.value === value) {
        break;
      } else if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      }
    }
    return current;
  }

  search(value) {
    return this._search(this.root, value);
  }

  _search(node, value) {
    if (!node || node.value === value) {
      return node;
    } else if (value < node.value) {
      return this._search(node.left, value);
    } else if (value > node.value) {
      return this._search(node.right, value);
    }
  }

  find_min(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  delete(value) {
    this.root = this._delete(this.root, value);
  }

  _delete(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._delete(node.left, value);
    } else if (value > node.value) {
      node.right = this._delete(node.right, value);
    } else {
      if (node.left && node.right) {
        node.value = this.find_min(node.right).value;
        node.right = this._delete(node.right, node.value);
      } else if (node.left) {
        return node.left;
      } else if (node.right) {
        return node.right;
      } else {
        return null;
      }
    }
    return node;
  }
}

const tree = new BinarySearchTree();
/*
      9
    4  20
  1 6 15 170
*/
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

console.dir(tree, { depth: null });
