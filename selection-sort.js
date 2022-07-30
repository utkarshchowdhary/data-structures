function selectionSort(array) {
  const n = array.length

  for (let i = 0; i < n - 1; i++) {
    let min = i

    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) min = j
    }

    const temp = array[min]
    array[min] = array[i]
    array[i] = temp
  }

  return array
}

console.log(selectionSort([6, 3, 5, 8, 0]))
