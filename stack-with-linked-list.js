/*
  -A Stack is a linear data structure in which elements can be inserted and deleted only from one end 
  of the list.
  -Stacks are based on the LIFO principle, i.e., the element inserted at the last, is the first element to 
  come out of the list.
*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  top = null;
  size = 0;

  isEmpty() {
    return this.top === null;
  }

  peek() {
    return this.top && this.top.value;
  }

  push(value) {
    const node = new Node(value);

    if (this.top) {
      node.next = this.top;
      this.top = node;
    } else {
      this.top = node;
    }
    return ++this.size;
  }

  pop() {
    if (this.top) {
      const current = this.top;
      this.top = this.top.next;
      this.size--;
      return current.value;
    }
    return null;
  }
}

const stack = new Stack();

stack.push("google");
stack.push("yahoo");
stack.push("bing");

stack.pop();

console.dir(stack, { depth: null });
