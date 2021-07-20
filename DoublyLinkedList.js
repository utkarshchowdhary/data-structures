/*
  -In Doubly Linked List nodes have double references (next and previous).
  -Doubly Linked List allow 2 way travesal.
*/

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  head = null;
  tail = null;
  size = 0;

  append(value) {
    const node = new Node(value);

    if (this.head) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);

    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  print() {
    let current = this.head;

    while (current !== null) {
      process.stdout.write(`${current.value}->`);
      current = current.next;
    }
    process.stdout.write(`null\n`);
  }

  insert(index, value) {
    if (index >= this.size) {
      // throw new Error("Index out of bounds");
      this.append(value);
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    const node = new Node(value);

    let current = this.head;

    while (index !== 0) {
      current = current.next;
      index--;
    }

    node.next = current;
    node.prev = current.prev;
    current.prev.next = node;
    current.prev = node;

    this.size++;
  }

  removeFirst() {
    if (this.head) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head.next.prev = null;
        this.head = this.head.next;
      }

      this.size--;
    }
  }

  removeLast() {
    if (this.head) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      }

      this.size--;
    }
  }

  remove(index) {
    if (index >= this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.removeFirst();
      return;
    } else if (index === this.size - 1) {
      this.removeLast();
      return;
    }

    let current = this.head;

    while (index !== 0) {
      current = current.next;
      index--;
    }

    current.prev.next = current.next;
    current.next.prev = current.prev;

    this.size--;
  }

  reverse() {
    let current = this.head;

    while (current !== null) {
      const temp = current.next;
      current.next = current.prev;
      current.prev = temp;

      current = temp;
    }

    const temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }
}

const linkedList = new LinkedList();

linkedList.append("0");
linkedList.append("2");
linkedList.append("3");

linkedList.insert(1, "1");

linkedList.reverse();

linkedList.print();

console.dir(linkedList, { depth: null });
