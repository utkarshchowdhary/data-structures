/**
 * An AVL tree is a self balancing binary search tree in which for each node
 * the difference between the height of the left subtree and that of the right subtree differ by at most one.
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
    this.bf = 0;
  }
}

class AVLTree {
  root = null;

  contains(value) {
    return this._contains(this.root, value);
  }

  _contains(node, value) {
    if (!node) return false;

    if (value < node.value) {
      return this._contains(node.left, value);
    } else if (value > node.value) {
      return this._contains(node.right, value);
    } else {
      return true;
    }
  }

  insert(value) {
    if (!this.contains(value)) {
      this.root = this._insert(this.root, value);
      return true;
    }
    return false;
  }

  _insert(node, value) {
    if (!node) return new Node(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else {
      node.right = this._insert(node.right, value);
    }

    // Update node's height and balance factor.
    this.update(node);

    // Re-balance tree.
    return this.balance(node);
  }

  update(node) {
    const leftHeight = node.left ? node.left.height : -1;
    const rightHeight = node.right ? node.right.height : -1;

    // Update node's height.
    node.height = 1 + Math.max(leftHeight, rightHeight);

    // Update node's balance factor.
    node.bf = rightHeight - leftHeight;
  }

  balance(node) {
    // Left heavy subtree
    if (node.bf === -2) {
      // Left-Left case
      if (node.left.bf <= 0) {
        return this.leftLeftCase(node);
      } else {
        // Left-Right case
        return this.leftRightCase(node);
      }
      // Right heavy subtree
    } else if (node.bf === 2) {
      // Right-Right case
      if (node.right.bf >= 0) {
        return this.rightRightCase(node);
      } else {
        // Right-Left case
        return this.rightLeftCase(node);
      }
    }

    // Node either has a balance factor of -1, 0 or 1 which is fine.
    return node;
  }

  leftLeftCase(node) {
    return this.rightRotation(node);
  }

  leftRightCase(node) {
    node.left = this.leftRotation(node.left);
    return this.leftLeftCase(node);
  }

  rightRightCase(node) {
    return this.leftRotation(node);
  }

  rightLeftCase(node) {
    node.right = this.rightRotation(node.right);
    return this.rightRightCase(node);
  }

  leftRotation(node) {
    const newParent = node.right;
    node.right = newParent.left;
    newParent.left = node;
    this.update(node);
    this.update(newParent);
    return newParent;
  }

  rightRotation(node) {
    const newParent = node.left;
    node.left = newParent.right;
    newParent.right = node;
    this.update(node);
    this.update(newParent);
    return newParent;
  }

  remove(value) {
    if (this.contains(value)) {
      this.root = this._remove(this.root, value);
      return true;
    }
    return false;
  }

  _remove(node, value) {
    if (value < node.value) {
      node.left = this._remove(node.left, value);
    } else if (value > node.value) {
      node.right = this._remove(node.right, value);
    } else {
      if (node.left && node.right) {
        // remove from subtree with the greatest height.
        if (node.left.height > node.right.height) {
          node.value = this.findMax(node.left);
          node.left = this._remove(node.left, node.value);
        } else {
          node.value = this.findMin(node.right);
          node.right = this._remove(node.right, node.value);
        }
      } else if (node.left) {
        return node.left;
      } else if (node.right) {
        return node.right;
      } else {
        return null;
      }
    }

    // Update node's height and balance factor.
    this.update(node);

    // Re-balance tree.
    return this.balance(node);
  }

  findMin(node) {
    while (node.left) node = node.left;
    return node.value;
  }

  findMax(node) {
    while (node.right) node = node.right;
    return node.value;
  }
}

const tree = new AVLTree();
/*
    2
  1  4
    3 5
*/
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);

console.dir(tree, { depth: null });
