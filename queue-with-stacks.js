const { Stack } = require("./stack-with-array");

class Queue {
  constructor() {
    this.one = new Stack();
  }

  isEmpty() {
    return this.one.isEmpty();
  }

  peek() {
    return this.one[this.one.length - 1];
  }

  enqueue(value) {
    const two = new Stack();

    while (!this.one.isEmpty()) {
      two.push(this.one.pop());
    }

    this.one.push(value);

    while (!two.isEmpty()) {
      this.one.push(two.pop());
    }
  }

  dequeue() {
    return this.one.pop();
  }
}

const queue = new Queue();

queue.enqueue("QuickSilver");
queue.enqueue("Wanda");
queue.enqueue("Vision");

queue.dequeue();

console.log(queue);
