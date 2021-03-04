/*
  -HashMaps uses labels that could be a string, number, Object, or anything. 
  -Internally, the HashMap uses an Array, and it maps the labels to array indexes using a hash function.
  -The main difference between an array and hashmap is that the Array’s index doesn’t have any relationship 
   with the data.
*/

class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.5) {
    this.buckets = new Array(initialCapacity);
    this.loadFactor = loadFactor;
    this.size = 0;
    this.collisions = 0;
    this.keys = [];
  }

  hash(s) {
    let hashValue = 0;
    const stringKey = s.toString();

    for (let index = 0; index < stringKey.length; index++) {
      const charCode = stringKey.charCodeAt(index);
      hashValue += charCode << (index * 8);
    }

    return hashValue;
  }

  _getBucketIndex(key) {
    const hashValue = this.hash(key);
    const bucketIndex = hashValue % this.buckets.length;
    return bucketIndex;
  }

  _getKeyIndex(key) {
    return this.keys.findIndex((val) => val.content === key);
  }

  _getIndexes(key) {
    const bucketIndex = this._getBucketIndex(key);
    const keyIndex = this._getKeyIndex(key);
    const values = this.buckets[bucketIndex] || [];

    for (let entryIndex = 0; entryIndex < values.length; entryIndex++) {
      const entry = values[entryIndex];
      if (entry.key === key) {
        return { bucketIndex, entryIndex, keyIndex };
      }
    }

    return { bucketIndex };
  }

  get(key) {
    const { bucketIndex, entryIndex } = this._getIndexes(key);

    if (entryIndex === undefined) {
      return;
    }

    return this.buckets[bucketIndex][entryIndex].value;
  }

  has(key) {
    return !!this.get(key);
  }

  set(key, value) {
    const { bucketIndex, entryIndex } = this._getIndexes(key);

    if (entryIndex === undefined) {
      const keyIndex = this.keys.push({ content: key }) - 1; // keep track of the key index
      this.buckets[bucketIndex] = this.buckets[bucketIndex] || [];
      this.buckets[bucketIndex].push({ key, value, keyIndex });
      this.size++;
      if (this.buckets[bucketIndex].length > 1) {
        this.collisions++;
      }
    } else {
      this.buckets[bucketIndex][entryIndex].value = value;
    }

    if (this.loadFactor > 0 && this.getLoadFactor() > this.loadFactor) {
      this.rehash(this.buckets.length * 2);
    }
  }

  getLoadFactor() {
    return this.size / this.buckets.length;
  }

  rehash(newCapacity) {
    const newMap = new HashMap(newCapacity);

    this.keys.forEach((key) => {
      newMap.set(key.content, this.get(key.content));
    });

    this.buckets = newMap.buckets;
    this.collisions = newMap.collisions;
  }

  delete(key) {
    const { bucketIndex, entryIndex, keyIndex } = this._getIndexes(key);

    if (entryIndex === undefined) {
      return false;
    }

    this.buckets[bucketIndex].splice(entryIndex, 1);
    this.keys.splice(keyIndex, 1);
    this.size--;

    return true;
  }
}

const hashMap = new HashMap();

hashMap.set("De Una Vez", "Selena Gomez");
hashMap.set("Robbery", "Juice Wrld");
hashMap.set("Bad Liar", "Imagin Dragons");
hashMap.set("Surrender", "Natalie Taylor");

hashMap.set("Pineapple", "Pen Pineapple Apple Pen");
hashMap.set("Despacito", "Luis Fonsi");
hashMap.set("Bailando", "Enrique Iglesias");
hashMap.set("Dura", "Daddy Yankee");

hashMap.set("Lean On", "Major Lazer"); // <--- Trigger REHASH

hashMap.set("When We Were Young", "Adele");
hashMap.set("All About That Bass", "Meghan Trainor");
hashMap.set("This Is What You Came For", "Calvin Harris ");

console.log("Number of Collisions Occured:", hashMap.collisions);
console.log("Current Capicity:", hashMap.buckets.length);
console.log("Keys present in Map:", hashMap.keys);
console.log("Buckets Occupied:", hashMap.buckets);
