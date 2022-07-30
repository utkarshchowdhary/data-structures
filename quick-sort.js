function quickSort(arr, low, high) {
  if (low < high) {
    let partitionIndex = low

    for (let i = low; i < high; i++) {
      if (arr[i] < arr[high]) {
        ;[arr[partitionIndex], arr[i]] = [arr[i], arr[partitionIndex]]
        partitionIndex++
      }
    }

    ;[arr[partitionIndex], arr[high]] = [arr[high], arr[partitionIndex]]

    quickSort(arr, low, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, high)
  }

  return arr
}

const arr = [8, 7, 6, 1, 0, 9, 2]

console.log(quickSort(arr, 0, arr.length - 1))
