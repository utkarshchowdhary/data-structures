/**
 * In Priority Queue the data organized by importance rather than when it was added.
 * A node with higher priority is served before a node with lower priority.
 * When the priorities on nodes are same, they are served according to the order in which they were added.
 */

class Node {
  constructor(value, priority, order) {
    this.value = value
    this.priority = priority
    this.order = order
  }
}

class MaxPriorityQueue {
  constructor() {
    this.heap = []
    this.count = 0
  }

  isEmpty() {
    return !this.heap.length
  }

  parent(i) {
    return Math.floor((i - 1) / 2)
  }

  left(i) {
    return 2 * i + 1
  }

  right(i) {
    return 2 * i + 2
  }

  enqueue(value, priority) {
    // adding a new node can be done by simply pushing it onto an array
    // then "bubbling up" the new node if its priority is greater than its parent's priority.
    const node = new Node(value, priority, this.count++)

    let index = this.heap.push(node) - 1

    // When index is at 0, can not go up any further,
    // if the node's priority is greater than its parent's priority,
    // swap them and save its parent's index.
    while (index > 0 && priority > this.heap[this.parent(index)].priority) {
      const parent = this.heap[this.parent(index)]

      this.heap[this.parent(index)] = node
      this.heap[index] = parent
      index = this.parent(index)
    }
  }

  dequeue() {
    // replace the root node with the "fartest right node" on the lowest level of the heap.
    const max = this.heap[0]
    const end = this.heap.pop()

    // if there are no nodes left in the heap after removing the last node,
    // i.e., initially it was empty or only had one node, end here.
    if (this.isEmpty()) return max

    this.heap[0] = end

    let index = 0
    const n = this.heap.length
    const current = this.heap[0]

    while (true) {
      let leftChildIndex = this.left(index)
      let rightChildIndex = this.right(index)
      let largest = index

      // if the left child exists.
      if (leftChildIndex < n) {
        const leftChild = this.heap[leftChildIndex]
        // set the index of the left child to the largest
        // if its priority is greater than the priority of the current node.
        if (leftChild.priority > current.priority) {
          largest = leftChildIndex
        }
        // set the index of the left child to the largest
        // if its priority is equal to the current node's
        // but it was inserted before the current node,
        // meaning that its order is smaller.
        else if (
          leftChild.priority === current.priority &&
          leftChild.order < current.order
        ) {
          largest = leftChildIndex
        }
      }

      // if the right child exists.
      if (rightChildIndex < n) {
        const rightChild = this.heap[rightChildIndex]
        // set the index of the right child to the largest
        // if its priority is greater than the greatest priority between the current node and its left child.
        if (rightChild.priority > this.heap[largest].priority) {
          largest = rightChildIndex
        }
        // set the index of the right child to the largest
        // if its priority is equal to the largest node's
        // but it was inserted before the largest node,
        // meaning that its order is smaller.
        else if (
          rightChild.priority === this.heap[largest].priority &&
          rightChild.order < this.heap[largest].order
        ) {
          largest = rightChildIndex
        }
      }

      // if the current node's priority is greater than the priorities of its children,
      // or if the priorities are the same, its order is smaller than its children, end here.
      if (largest === index) break

      // Otherwise, swap the current node with the largest node and
      // save its position, which will be the next current.
      this.heap[index] = this.heap[largest]
      this.heap[largest] = current
      index = largest
    }

    return max
  }
}

const pq = new MaxPriorityQueue()
/*
      4
    6  31
  3 5
*/
pq.enqueue(3, 2)
pq.enqueue(4, 5)
pq.enqueue(31, 1)
pq.enqueue(6, 3)
pq.enqueue(5, 2)

console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
