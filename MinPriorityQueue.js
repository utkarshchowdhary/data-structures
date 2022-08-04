class Node {
  constructor(value, priority, order) {
    this.value = value
    this.priority = priority
    this.order = order
  }
}

class MinPriorityQueue {
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
    const node = new Node(value, priority, this.count++)

    let index = this.heap.push(node) - 1

    while (index > 0 && priority < this.heap[this.parent(index)].priority) {
      const parent = this.heap[this.parent(index)]

      this.heap[this.parent(index)] = node
      this.heap[index] = parent
      index = this.parent(index)
    }
  }

  dequeue() {
    const min = this.heap[0]
    const end = this.heap.pop()

    if (this.isEmpty()) return min

    this.heap[0] = end

    let index = 0
    const n = this.heap.length
    const current = this.heap[0]

    while (true) {
      let leftChildIndex = this.left(index)
      let rightChildIndex = this.right(index)
      let smallest = index

      if (leftChildIndex < n) {
        const leftChild = this.heap[leftChildIndex]

        if (leftChild.priority < current.priority) {
          smallest = leftChildIndex
        } else if (
          leftChild.priority === current.priority &&
          leftChild.order < current.order
        ) {
          smallest = leftChildIndex
        }
      }

      if (rightChildIndex < n) {
        const rightChild = this.heap[rightChildIndex]

        if (rightChild.priority < this.heap[smallest].priority) {
          smallest = rightChildIndex
        } else if (
          rightChild.priority === this.heap[smallest].priority &&
          rightChild.order < this.heap[smallest].order
        ) {
          smallest = rightChildIndex
        }
      }

      if (smallest === index) break

      this.heap[index] = this.heap[smallest]
      this.heap[smallest] = current
      index = smallest
    }

    return min
  }
}

const pq = new MinPriorityQueue()
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

exports.MinPriorityQueue = MinPriorityQueue
