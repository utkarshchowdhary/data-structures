function firstRecurringCharacter(array) {
  const map = {};

  for (let i = 0; i < array.length; i++) {
    if (map[array[i]] !== undefined) {
      return array[i];
    }
    map[array[i]] = i;
  }
  return undefined;
}

console.log(firstRecurringCharacter([2, 5, 5, 2, 3, 4]));
