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

  delete_inorder_successor(node) {
    let parent = node;
    node = node.right;

    while (node.left) {
      parent = node;
      node = node.left;
    }

    if (parent.right === node) {
      // node is to the right of the parent (node was already at minimum).
      parent.right = node.right;
    } else if (parent.left === node) {
      // node is to the left of the parent.
      parent.left = node.right;
    }

    return node;
  }

  delete_iteratively(value) {
    let parent = null;
    let current = this.root;

    while (current && current.value !== value) {
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      }
    }

    if (!current) return;

    if (current.left && current.right) {
      // current node has both children.
      // delete the node with the minimum value in right subtree and place it's value to the current node.
      current.value = this.delete_inorder_successor(current).value;
    } else if (current.left) {
      // current node has only left child.
      if (!parent) {
        // current node is root with only left child.
        this.root = current.left;
      } else {
        if (parent.left === current) {
          // current node is to the left of the parent.
          parent.left = current.left;
        } else if (parent.right === current) {
          // current node is to the right of the parent.
          parent.right = current.left;
        }
      }
    } else if (current.right) {
      // current node has only right child.
      if (!parent) {
        // current node is root with only right child.
        this.root = current.right;
      } else {
        if (parent.left === current) {
          // current node is to the left of the parent.
          parent.left = current.right;
        } else if (parent.right === current) {
          // current node is to the right of the parent.
          parent.right = current.right;
        }
      }
    } else {
      // current node has no children.
      if (!parent) {
        // current node is root with no left or right.
        this.root = null;
      } else {
        if (parent.left === current) {
          // current node is to the left of the parent.
          parent.left = null;
        } else if (parent.right === current) {
          // current node is to the right of the parent.
          parent.right = null;
        }
      }
    }
  }

  find_min(node) {
    let current_node = node;
    while (current_node.left) {
      current_node = current_node.left;
    }
    return current_node;
  }

  delete(value) {
    if (this.root) this.root = this._delete(this.root, value);
  }

  _delete(node, value) {
    if (value < node.value) {
      if (node.left) node.left = this._delete(node.left, value);
    } else if (value > node.value) {
      if (node.right) node.right = this._delete(node.right, value);
    } else {
      if (node.left && node.right) {
        // If the node has two children.
        // Place the inorder successor in position of the node to be deleted.
        node.value = this.find_min(node.right).value;
        // Delete the inorder successor.
        node.right = this._delete(node.right, node.value);
      } else if (node.left) {
        // If the node has only left child.
        return node.left;
      } else if (node.right) {
        // If the node has only right child.
        return node.right;
      } else {
        // If the node has no child.
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
