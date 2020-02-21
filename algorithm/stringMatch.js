function getHashCode(char) {
    let prime = 1315423911;
    for (var i = 0; i < char.length; i++) {
        prime ^= prime << 5 + char.charCodeAt(i) + prime >> 2;
    }
    return (prime & 0x7FFFFFFF);
}

console.log(getHashCode('supeng'))

function findAllPlaces(char, pattern) {
    const allAppearedIndex = [];
    const transformedCode = getHashCode(pattern);
    for (var i = 0; i < char.length - pattern.length; i++) {
        let currentCode = getHashCode(char.slice(i, i + pattern.length));
        if (currentCode === transformedCode) {
            allAppearedIndex.push(i)
        }
    }
    return allAppearedIndex;
}

const charactors = 'supengsupneg';
const result = findAllPlaces(charactors, 'n');
console.log(result)

//linked address
// each index will contain an linkedArray or array,if the hash data is repeat, put the repeat data in the linkedArray of array
//open address
// if the data is repeat, put it to the avialable space when the empty space can be found

function hasFunc(str, size) {
    var hashCode = 0
    for (var i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    return hashCode%size
}

class HashTable {
    constructor() {
        this.storage = []
        //load factor
        this.count = 0
        this.limit = 7
    }


}
