function heapSort(arr) {
  let n = arr.length

  // Build max heap
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    heapify(arr, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    ;[arr[i], arr[0]] = [arr[0], arr[i]]

    // Heapify root node
    heapify(arr, i, 0)
  }
}

function heapify(arr, n, i) {
  // Find largest among root, left child and right child
  let max = i
  let left = 2 * i + 1
  let right = 2 * i + 2

  if (left < n && arr[left] > arr[max]) max = left

  if (right < n && arr[right] > arr[max]) max = right

  // Swap and continue heapifying if root is not the largest
  if (max != i) {
    ;[arr[i], arr[max]] = [arr[max], arr[i]]

    heapify(arr, n, max)
  }
}

const arr = [1, 12, 9, 5, 6, 10]

heapSort(arr)

console.log(arr)
