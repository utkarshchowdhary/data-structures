function binarySearch(a, t) {
  let start = 0;
  let end = a.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (a[middle] < t) {
      start = middle + 1;
    } else if (a[middle] > t) {
      end = middle - 1;
    } else {
      return middle;
    }
  }
}

const a = [3, 4, 7, 9];
console.log(binarySearch(a, 7));
