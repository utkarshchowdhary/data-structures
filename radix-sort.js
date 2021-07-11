function radixSort(arr) {
  const max = arr.reduce((acc, v) => Math.max(acc, v));
  let numberOfDigits = Math.floor(Math.log10(max) + 1);
  let placeValue = 1;

  while (numberOfDigits-- > 0) {
    applyCountingSortOn(arr, placeValue);
    placeValue *= 10;
  }
}

function applyCountingSortOn(arr, placeValue) {
  const range = 10; // decimal system, numbers from 0-9
  const n = arr.length;
  const r = new Array(n);
  const count = new Array(range).fill(0);

  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / placeValue) % range;
    count[digit]++;
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / placeValue) % range;
    r[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = r[i];
  }
}

const arr = [387, 468, 134, 123, 68, 221, 769, 37, 7];
radixSort(arr);
console.log(arr);
