function mergeSortedArrays(array1, array2) {
  if (array1.length === 0) {
    return array2;
  }

  if (array2.length === 0) {
    return array1;
  }

  const mergedArray = [];
  let i = 0,
    j = 0;

  while (i !== array1.length && j !== array2.length) {
    if (array1[i] <= array2[j]) {
      mergedArray.push(array1[i]);
      i++;
    } else {
      mergedArray.push(array2[j]);
      j++;
    }
  }

  while (i !== array1.length) {
    mergedArray.push(array1[i++]);
  }

  while (j !== array2.length) {
    mergedArray.push(array2[j++]);
  }

  return mergedArray;
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));
