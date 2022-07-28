class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

class DoublyCircularLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  append(value) {
    const node = new Node(value)

    if (this.head) {
      this.tail.next = node
      node.prev = this.tail
      node.next = this.head
      this.tail = node
      this.head.prev = this.tail
    } else {
      this.head = node
      this.tail = node
      this.head.prev = this.tail
      this.tail.next = this.head
    }

    this.size++
  }

  prepend(value) {
    const node = new Node(value)

    if (this.head) {
      this.head.prev = node
      this.tail.next = node
      node.next = this.head
      node.prev = this.tail
      this.head = node
    } else {
      this.head = node
      this.tail = node
      this.head.prev = this.tail
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
      process.stdout.write(`${current.value}<->`)
      current = current.next
    }

    process.stdout.write(`${current.value}<->${this.head.value}\n`)
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

    while (index !== 0) {
      current = current.next
      index--
    }

    node.next = current
    node.prev = current.prev
    current.prev.next = node
    current.prev = node

    this.size++
  }

  removeFirst() {
    if (!this.head) return

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head.next.prev = this.tail
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
      this.tail.prev.next = this.head
      this.tail = this.tail.prev
      this.head.prev = this.tail
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

    while (index !== 0) {
      current = current.next
      index--
    }

    current.prev.next = current.next
    current.next.prev = current.prev

    this.size--
  }

  reverse() {
    if (!this.head) return

    let current = this.head

    do {
      const temp = current.next
      current.next = current.prev
      current.prev = temp

      current = temp
    } while (current !== this.head)

    const temp = this.head
    this.head = this.tail
    this.tail = temp
  }
}

const doublyCircularLinkedList = new DoublyCircularLinkedList()

doublyCircularLinkedList.append('3')
doublyCircularLinkedList.append('5')

doublyCircularLinkedList.prepend('1')

doublyCircularLinkedList.insert(1, '2')
doublyCircularLinkedList.insert(3, '4')

doublyCircularLinkedList.insert(0, '0')

doublyCircularLinkedList.reverse()

doublyCircularLinkedList.print()

console.dir(doublyCircularLinkedList, { depth: null })
