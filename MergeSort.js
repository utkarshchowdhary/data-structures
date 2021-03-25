function merge(left, right) {
  const result = Array(left.length + right.length);
  let i = 0;
  let j = 0;
  let k = 0;

  for (; i < left.length && j < right.length; k++) {
    if (left[i] < right[j]) {
      result[k] = left[i];
      i++;
    } else {
      result[k] = right[j];
      j++;
    }
  }

  for (; i < left.length; i++, k++) {
    result[k] = left[i];
  }

  for (; j < right.length; j++, k++) {
    result[k] = right[j];
  }
  return result;
}

function mergeSort(array) {
  const length = array.length;
  if (length < 2) {
    return array;
  }
  const middle = Math.floor(length / 2);
  const left = Array(middle);
  const right = Array(length - middle);

  for (let i = 0; i < length; i++) {
    if (i < middle) {
      left[i] = array[i];
    } else {
      right[i - middle] = array[i];
    }
  }
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([6, 5, 12, 10, 9, 1]));
