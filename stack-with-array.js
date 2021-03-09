class Stack {
  constructor() {
    this.array = [];
  }

  isEmpty() {
    return this.array.length === 0;
  }

  peek() {
    return this.array[this.array.length - 1];
  }

  push(value) {
    return this.array.push(value);
  }

  pop() {
    return this.array.pop();
  }
}

// const stack = new Stack();

// stack.push("google");
// stack.push("yahoo");
// stack.push("bing");

// stack.pop();

// console.log(stack);

exports.Stack = Stack;
