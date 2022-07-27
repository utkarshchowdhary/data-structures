class ArrayList {
  constructor() {
    this.data = {}
    this.length = 0
  }

  get(index) {
    return this.data[index]
  }

  push(item) {
    this.data[this.length] = item
    return ++this.length
  }

  pop() {
    if (!this.length) return
    const lastItem = this.data[this.length - 1]
    delete this.data[this.length - 1]
    this.length--
    return lastItem
  }

  insertAtIndex(item, index) {
    if (this.length < index) return this.length
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1]
    }
    this.data[index] = item
    return ++this.length
  }

  unshift(item) {
    this.insertAtIndex(item, 0)
  }

  deleteAtIndex(index) {
    if (this.length <= index) return
    const item = this.data[index]
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1]
    }
    delete this.data[this.length - 1]
    this.length--
    return item
  }

  shift() {
    return this.deleteAtIndex(0)
  }
}

const arr = new ArrayList()
arr.push('hi')
arr.push('you')
arr.push('!')
arr.pop()
arr.shift()
arr.push('are')
arr.push('nice')
arr.unshift('hello')

console.log(arr)
