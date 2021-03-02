/* Array
  pros:
  -Fast lookups
  -Fast push/pop
  -Ordered (close to each other in memory)

  cons:
  Slow inserts (needs to shift remaining, whenever its not at the end)
  Slow Deletes ("")
  Fixed size (in case of static array)
*/

const strings = ["a", "b", "c", "d"];

//access
strings[2]; //O(1)

//push
strings.push("e"); //O(1), can be O(n) on expanding memory

//pop
strings.pop(); //O(1)

//unshift
strings.unshift("x"); //O(n)

//shift
strings.shift(); //O(n)

//splice
strings.splice(2, 0, "alien"); //O(n)

console.log(strings);
