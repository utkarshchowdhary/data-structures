function bubbleSort(array) {
  const length = array.length;

  for (let i = 0; i < length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return array;
}

console.log(bubbleSort([6, 3, 5, 8, 0]));
