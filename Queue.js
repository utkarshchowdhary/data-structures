/**
 * A Queue is a linear data structure in which insertion and deletion happens on different ends
 * of the list.
 * Queues are based on the FIFO principle, i.e., the least recently added element, is the first element to
 * come out of the list.
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }

  isEmpty() {
    return !this.first
  }

  peek() {
    return this.first?.value
  }

  enqueue(value) {
    const node = new Node(value)

    if (this.isEmpty()) {
      this.first = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }

    return ++this.size
  }

  dequeue() {
    if (this.isEmpty()) return

    const current = this.first
    if (this.size === 1) {
      this.last = null
    }
    this.first = this.first.next
    this.size--

    return current.value
  }
}

// const queue = new Queue()

// queue.enqueue('QuickSilver')
// queue.enqueue('Wanda')
// queue.enqueue('Vision')

// queue.dequeue()

// console.dir(queue, { depth: null })

exports.Queue = Queue
