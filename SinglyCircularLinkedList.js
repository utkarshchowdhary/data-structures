/**
 * Circular linked list is a linked list where all nodes are connected to form a circle.
 * The last element of a circular linked list points to the head instead of pointing to null.
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class SinglyCircularLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  append(value) {
    const node = new Node(value)

    if (this.head) {
      this.tail.next = node
      node.next = this.head
      this.tail = node
    } else {
      this.head = node
      this.tail = node
      this.tail.next = this.head
    }

    this.size++
  }

  prepend(value) {
    const node = new Node(value)

    if (this.head) {
      node.next = this.head
      this.tail.next = node
      this.head = node
    } else {
      this.tail = node
      this.head = node
      this.tail.next = this.head
    }

    this.size++
  }

  print() {
    let current = this.head

    if (!current) {
      process.stdout.write(`null\n`)
      return
    }

    while (current.next !== this.head) {
      process.stdout.write(`${current.value}->`)
      current = current.next
    }

    process.stdout.write(`${current.value}->${this.head.value}\n`)
  }

  insert(index, value) {
    if (index >= this.size) {
      this.append(value)
      return
    }

    if (index === 0) {
      this.prepend(value)
      return
    }

    const node = new Node(value)

    let current = this.head
    let previous = null

    while (index !== 0) {
      previous = current
      current = current.next
      index--
    }

    node.next = current
    previous.next = node

    this.size++
  }

  removeFirst() {
    if (!this.head) return

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
      this.tail.next = this.head
    }

    this.size--
  }

  removeLast() {
    if (!this.head) return

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      let previousToTail = this.head

      while (previousToTail.next !== this.tail) {
        previousToTail = previousToTail.next
      }

      previousToTail.next = this.head
      this.tail = previousToTail
    }

    this.size--
  }

  remove(index) {
    if (index >= this.size) {
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      this.removeFirst()
      return
    } else if (index === this.size - 1) {
      this.removeLast()
      return
    }

    let current = this.head
    let previous = null

    while (index !== 0) {
      previous = current
      current = current.next
      index--
    }

    previous.next = current.next

    this.size--
  }

  reverse() {
    if (!this.head) return

    let current = this.head
    let prev = this.tail

    do {
      let next = current.next
      current.next = prev
      prev = current

      current = next
    } while (current !== this.head)

    this.tail = this.head
    this.head = prev
  }
}

const singlyCircularLinkedList = new SinglyCircularLinkedList()

singlyCircularLinkedList.append('3')
singlyCircularLinkedList.append('5')

singlyCircularLinkedList.prepend('1')

singlyCircularLinkedList.insert(1, '2')
singlyCircularLinkedList.insert(3, '4')

singlyCircularLinkedList.insert(0, '0')

singlyCircularLinkedList.reverse()

singlyCircularLinkedList.print()

console.dir(singlyCircularLinkedList, { depth: null })
