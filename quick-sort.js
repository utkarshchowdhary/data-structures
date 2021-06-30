function quickSort(a, low, high) {
  if (low < high) {
    let partitionIndex = low;
    for (let i = low; i < high; i++) {
      if (a[i] <= a[high]) {
        [a[partitionIndex], a[i]] = [a[i], a[partitionIndex]];
        partitionIndex++;
      }
    }

    [a[partitionIndex], a[high]] = [a[high], a[partitionIndex]];

    quickSort(a, low, partitionIndex - 1);
    quickSort(a, partitionIndex + 1, high);

    return a;
  }
}

const a = [8, 7, 6, 1, 0, 9, 2];
console.log(quickSort(a, 0, a.length - 1));
