class Stack {
  constructor() {
    this.stack = []
  }

  isEmpty() {
    return !!this.stack.length
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  push(value) {
    return this.stack.push(value)
  }

  pop() {
    return this.stack.pop()
  }
}

exports.Stack = Stack
