class Node {
  constructor(value, priority, order) {
    this.value = value;
    this.priority = priority;
    this.order = order;
  }
}

class PriorityQueue {
  heap = new Array();
  count = 0;

  isEmpty() {
    return this.heap.length === 0;
  }

  enqueue(value, priority) {
    const node = new Node(value, priority, this.count++);
    this.heap.push(node);
    let index = this.heap.length - 1;
    const current = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (current.priority < parent.priority) {
        this.heap[parentIndex] = current;
        this.heap[index] = parent;
        index = parentIndex;
      } else break;
    }
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length === 0) return min;

    this.heap[0] = end;

    let index = 0;
    const length = this.heap.length;
    const current = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let smallest = index;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];

        if (leftChild.priority < current.priority) {
          smallest = leftChildIndex;
        } else if (
          leftChild.priority === current.priority &&
          leftChild.order < current.order
        ) {
          smallest = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];

        if (smallest === index) {
          if (rightChild.priority < current.priority) {
            smallest = rightChildIndex;
          } else if (
            rightChild.priority === current.priority &&
            rightChild.order < current.order
          ) {
            smallest = rightChildIndex;
          }
        } else if (smallest === leftChildIndex) {
          if (rightChild.priority < leftChild.priority) {
            smallest = rightChildIndex;
          } else if (
            rightChild.priority === leftChild.priority &&
            rightChild.order < leftChild.order
          ) {
            smallest = rightChildIndex;
          }
        }
      }

      if (smallest === index) break;

      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = current;
      index = smallest;
    }

    return min;
  }
}

// const tree = new PriorityQueue();
/*
      31
    5  3
  4 6
*/
// tree.enqueue(3, 2);
// tree.enqueue(4, 5);
// tree.enqueue(31, 1);
// tree.enqueue(6, 3);
// tree.enqueue(5, 2);

// console.log(tree.dequeue());
// console.log(tree.dequeue());
// console.log(tree.dequeue());
// console.log(tree.dequeue());
// console.log(tree.dequeue());

exports.PriorityQueue = PriorityQueue;
