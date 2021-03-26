/*
  -In JavaScript arrays are just objects with integer based keys.
  
  Pros:
  -Fast lookups
  -Fast push/pop
  -Ordered (close to each other in memory)

  Cons:
  -Slow inserts (needs to shift remaining, whenever its not at the end)
  -Slow Deletes ("")
  -Fixed size (in case of static array)
*/

class DecentArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  get(index) {
    return this.data[index];
  }
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }
  insertAtIndex(item, index) {
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this.length++;
    return this.length;
  }
  unshift(item) {
    this.insertAtIndex(item, 0);
  }
  deleteAtIndex(index) {
    const item = this.data[index];
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }
  shift() {
    return this.deleteAtIndex(0);
  }
}

const decentArray = new DecentArray();
decentArray.push("hi");
decentArray.push("you");
decentArray.push("!");
decentArray.pop();
decentArray.shift();
decentArray.push("are");
decentArray.push("nice");
decentArray.unshift("hi");

console.log(decentArray);
