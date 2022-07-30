// counting sort works well when the range of the integers to be sorted isn't too wide.

function countingSort(arr) {
  const n = arr.length
  const out = Array(n)
  const max = arr.reduce((acc, v) => Math.max(acc, v))
  const count = Array(max + 1).fill(0)

  for (let i = 0; i < n; i++) {
    count[arr[i]]++
  }

  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1]
  }

  for (let i = n - 1; i >= 0; i--) {
    const curr = arr[i]

    out[count[curr] - 1] = curr
    count[curr]--
  }

  for (let i = 0; i < n; i++) {
    arr[i] = out[i]
  }
}

const arr = [4, 2, 2, 8, 3, 3, 1]

countingSort(arr)

console.log(arr)
