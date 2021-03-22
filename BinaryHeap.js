/*
  -Binary heaps are only allowed to have at most 2 children to a parent.
  -Unlike with binary search trees, where we compared and organized our values across siblings, 
   with heaps we only work between parents and their children.
  -The heap can either be a max heap or a min heap.
  -In a max heap all internal nodes have value greater than or equal to the values in it's children.
  -In a min heap all internal nodes have value less than or equal to the values in it's children.
  -Heap is always balanced because every new node will be added to a level from left to right until full.

  Properties:
  -The largest or the smallest element can be quickly found in a heap.
  -There is a consistent pattern for finding a node's children, 
   a node's left child will be at position 2i+1 and right child being at position 2i+2,
   with i being the parent index.
  -A node's parent will be at position floor((i-1)/2) with i being the child node's index.
*/

class BinaryHeap {
  constructor() {
    this.values = [];
  }

  add(value) {
    // adding a new node can be done by simply pushing it onto an array
    // then "bubbling up" new node's value if greater than parent.
    this.values.push(value);
    let index = this.values.length - 1;
    const current = this.values[index];

    // When index is at 0, can not go up any further.
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];

      // if the current node is greater than its parent,
      // swap them and save its parent's index which will be the next current.
      if (current >= parent) {
        this.values[parentIndex] = current;
        this.values[index] = parent;
        index = parentIndex;
      } else break;
    }
  }

  extractMax() {
    // replace the root node with the "fartest right node" on the lowest level of the heap.
    const max = this.values[0];
    const end = this.values.pop();
    // if there are no nodes left in the heap (initially it was empty or only had one node) end here.
    if (this.values.length <= 0) {
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
        // if left child is greater than current node set its index to largest.
        if (leftChild > current) {
          largest = leftChildIndex;
        }
      }

      // if the right child exists.
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        // if right child is greater than the greatest between current node and left child
        // set its index to largest.
        if (rightChild > (largest === index ? current : leftChild)) {
          largest = rightChildIndex;
        }
      }

      // if the current node is the greater than its left or right end here.
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

const tree = new BinaryHeap();
/*
      45
    12  7
  3 8
*/
tree.add(3);
tree.add(45);
tree.add(7);
tree.add(12);
tree.add(8);

console.log(tree);
