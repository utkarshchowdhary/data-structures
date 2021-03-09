const { Queue } = require("./Queue");

class Stack {
  constructor() {
    this.one = new Queue();
  }

  isEmpty() {
    return this.one.isEmpty();
  }

  peek() {
    return this.one.peek();
  }

  push(value) {
    const two = new Queue();

    while (!this.one.isEmpty()) {
      two.enqueue(this.one.dequeue());
    }

    this.one.enqueue(value);

    while (!two.isEmpty()) {
      this.one.enqueue(two.dequeue());
    }
  }

  pop() {
    this.one.dequeue();
  }
}

const stack = new Stack();

stack.push("google");
stack.push("yahoo");
stack.push("bing");

stack.pop();

console.dir(stack, { depth: null });
