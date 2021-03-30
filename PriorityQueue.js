/*
  -In Priority Queue the data organized by importance rather than when it was added.
  -A node with higher priority is served before a node with lower priority.
  -When the priorities on nodes are same, they are served according to the order in which they were added.
*/

class Node {
  constructor(value, priority, order) {
    this.value = value;
    this.priority = priority;
    this.order = order;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
    this.count = 0;
  }

  isEmpty() {
    return this.values.length === 0;
  }

  enqueue(value, priority) {
    // adding a new node can be done by simply pushing it onto an array
    // then "bubbling up" the new node if its priority is greater than its parent's priority.
    const node = new Node(value, priority, this.count++);
    this.values.push(node);
    let index = this.values.length - 1;
    const current = this.values[index];

    // When index is at 0, can not go up any further.
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];

      // if the current node's priority is greater than its parent's priority,
      // swap them and save its parent's index which will be the next current.
      if (current.priority > parent.priority) {
        this.values[parentIndex] = current;
        this.values[index] = parent;
        index = parentIndex;
      } else break;
    }
  }

  dequeue() {
    // replace the root node with the "fartest right node" on the lowest level of the heap.
    const max = this.values[0];
    const end = this.values.pop();
    // if there are no nodes left in the heap after removing the last node,
    // i.e., initially it was empty or only had one node, end here.
    if (this.values.length === 0) {
      return max;
    }
    this.values[0] = end;

    let index = 0;
    const length = this.values.length;
    const current = this.values[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let largest = index;

      // if the left child exists.
      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        // if left child's priority is greater than current node's priority set its index to largest.
        if (leftChild.priority > current.priority) {
          largest = leftChildIndex;
        }
        // if left child's priority is equal to current node's priority
        // but it was inserted before current node i.e., its order is smaller set its index to largest.
        else if (
          leftChild.priority === current.priority &&
          leftChild.order < current.order
        ) {
          largest = leftChildIndex;
        }
      }

      // if the right child exists.
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        // if current node's priority was greater than left child or
        // if priorities were same its order is smaller than left child.
        if (largest === index) {
          // if right child's priority is greater than current node's priority set its index to largest.
          if (rightChild.priority > current.priority) {
            largest = rightChildIndex;
          }
          // if right child's priority is equal to current node's priority
          // but it was inserted before current node i.e., its order is smaller set its index to largest.
          else if (
            rightChild.priority === current.priority &&
            rightChild.order < current.order
          ) {
            largest = rightChildIndex;
          }
        }
        // if left child's priority was greater than current node or
        // if priorities were same its order is smaller than current node.
        else if (largest === leftChildIndex) {
          // if right child's priority is greater than left child's priority set its index to largest.
          if (rightChild.priority > leftChild.priority) {
            largest = rightChildIndex;
          }
          // if right child's priority is equal to left child's priority
          // but it was inserted before left child i.e., its order is smaller set its index to largest.
          else if (
            rightChild.priority === leftChild.priority &&
            rightChild.order < leftChild.order
          ) {
            largest = rightChildIndex;
          }
        }
      }

      // if the current node's priority was greater than priority of its left and right child or
      // if priorities were same its order is smaller than its left and right child, end here.
      if (largest === index) break;

      // Otherwise, swap current node with the largest node and
      // save its position which will be the next current.
      this.values[index] = this.values[largest];
      this.values[largest] = current;
      index = largest;
    }
    return max;
  }
}

const tree = new PriorityQueue();
/*
      4
    6  31
  3 5
*/
tree.enqueue(3, 2);
tree.enqueue(4, 5);
tree.enqueue(31, 1);
tree.enqueue(6, 3);
tree.enqueue(5, 2);

console.log(tree.dequeue());
console.log(tree.dequeue());
console.log(tree.dequeue());
console.log(tree.dequeue());
console.log(tree.dequeue());
