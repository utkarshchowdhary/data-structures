function insertionSort(array) {
  const n = array.length

  for (let i = 1; i < n; i++) {
    const value = array[i]
    let j = i - 1

    for (; j >= 0 && array[j] > value; j--) {
      array[j + 1] = array[j]
    }

    array[j + 1] = value
  }

  return array
}

console.log(insertionSort([6, 3, 5, 8, 0]))
