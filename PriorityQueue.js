/**
 * In Priority Queue the data organized by importance rather than when it was added.
 * A node with higher priority is served before a node with lower priority.
 * When the priorities on nodes are same, they are served according to the order in which they were added.
 */

class Node {
  constructor(value, priority, serialNumber) {
    this.value = value
    this.priority = priority
    this.serialNumber = serialNumber
  }
}

class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = []
    this.identity = 0
    this.comparator = (a, b) => {
      const value = comparator(a.priority, b.priority)
      return (value === 0 ? a.serialNumber - b.serialNumber : value) < 0
    }
  }

  swap(i, j) {
    ;[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
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
    const node = new Node(value, priority, ++this.identity)

    // adding a new node can be done by simply pushing it onto an array
    // then "bubbling up" the new node if its priority is greater than its parent's priority.
    this.bubbleUp(this.heap.push(node) - 1)
  }

  bubbleUp(i) {
    // When index is at 0, can not go up any further,
    // if the node's priority is greater than its parent's priority,
    // swap them and save its parent's index.
    while (i > 0 && this.comparator(this.heap[i], this.heap[this.parent(i)])) {
      this.swap(this.parent(i), i)
      i = this.parent(i)
    }
  }

  dequeue() {
    const root = this.heap[0]
    const last = this.heap.pop()

    // if there are no nodes left in the heap after removing the last node,
    // i.e., if it was empty or only had one node, return the root node.
    if (!this.isEmpty()) {
      // replace the root node with the "fartest right node" on the lowest level of the heap.
      this.heap[0] = last
      this.bubbleDown(0)
    }

    return root
  }

  bubbleDown(i) {
    const n = this.heap.length

    while (true) {
      let leftIndex = this.left(i)
      let rightIndex = this.right(i)
      let next = i

      // if the left child exists,
      // set the index of the left child to the next
      // if its priority is greater than the priority of the i-th node
      // or if its priority is equal to the i-th node's
      // but it was inserted before the i-th node.
      if (
        leftIndex < n &&
        this.comparator(this.heap[leftIndex], this.heap[i])
      ) {
        next = leftIndex
      }

      // if the right child exists,
      // set the index of the right child to the next
      // if its priority is greater than the greatest priority between the i-th node and its left child
      // or if its priority is equal to the next node's
      // but it was inserted before the next node.
      if (
        rightIndex < n &&
        this.comparator(this.heap[rightIndex], this.heap[next])
      ) {
        next = rightIndex
      }

      // if the i-th node's priority is greater than the priorities of its children,
      // or if the priorities are the same, it was inserted before its children
      // break out of the loop.
      if (next === i) break

      // Otherwise, swap the i-th node with the next node and
      // save its position.
      this.swap(i, next)
      i = next
    }
  }
}

// min-priority queue
// const pq = new PriorityQueue()
/*
      31
    5  3
  4 6
*/
// pq.enqueue(3, 2)
// pq.enqueue(4, 5)
// pq.enqueue(31, 1)
// pq.enqueue(6, 3)
// pq.enqueue(5, 2)

// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())

// max-priority queue
// const pq = new PriorityQueue((a, b) => b - a)
/*
      4
    6  31
  3 5
*/
// pq.enqueue(3, 2)
// pq.enqueue(4, 5)
// pq.enqueue(31, 1)
// pq.enqueue(6, 3)
// pq.enqueue(5, 2)

// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())

exports.PriorityQueue = PriorityQueue
