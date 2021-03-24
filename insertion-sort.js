function insertionSort(array) {
  const length = array.length;

  for (let i = 1; i < length; i++) {
    const value = array[i];
    j = i - 1;
    while (j >= 0 && array[j] > value) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = value;
  }
  return array;
}

console.log(insertionSort([6, 3, 5, 8, 0]));
