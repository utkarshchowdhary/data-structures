function merge(left, right) {
  const result = Array(left.length + right.length)
  let i = 0
  let j = 0
  let k = 0

  for (; i < left.length && j < right.length; k++) {
    if (left[i] < right[j]) {
      result[k] = left[i]
      i++
    } else {
      result[k] = right[j]
      j++
    }
  }

  for (; i < left.length; i++, k++) {
    result[k] = left[i]
  }

  for (; j < right.length; j++, k++) {
    result[k] = right[j]
  }

  return result
}

function mergeSort(arr) {
  const n = arr.length

  if (n < 2) return arr

  const middle = Math.floor(n / 2)
  const left = Array(middle)
  const right = Array(n - middle)

  for (let i = 0; i < n; i++) {
    if (i < middle) {
      left[i] = arr[i]
    } else {
      right[i - middle] = arr[i]
    }
  }

  return merge(mergeSort(left), mergeSort(right))
}

console.log(mergeSort([6, 5, 12, 10, 9, 1]))
