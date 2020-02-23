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

class HashTable {
    constructor() {
        this.storage = []
        //load factor
        this.count = 0
        this.limit = 7
    }

    hashFunc(str, size) {
        let hashCode = 0
        for (var i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        return hashCode%size
    }

    put(key, value) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]
        if (bucket === null) {
            bucket = []
            bucket.push([key, value])
            this.storage[index] = bucket   
            this.count += 1

            if (this.count > this.limit * 0.75) {
                let size = this.limit * 2
                while(!this.isPrime(size)) {
                    size += 1
                }
                this.resize(size)
            }
        }

        for (let i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                tuple[1] = value
                return
            }
        }
    }

    get(key) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]
        if (bucket === null) return null

        for (let i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                return tuple[1]
            }
        }
        return null
    }

    delete(key) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]
        if (bucket === null) return null
        for (let i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    let size = Math.floor(this.limit/2)
                    while(!this.isPrime(size)) {
                        size -= 1
                    }
                    this.resize(size)
                }
                return tuple[1]       
            }
        }
        return null
    }

    isEmpty() {
        return this.count === 0
    }

    size() {
        return this.count
    }

    resize(newLimit) {
        let oldStorage = this.storage
        this.storage = []
        this.count = 0
        this.limit = newLimit

        for (let i = 0; i <  oldStorage.length; i++) {
            let bucket = oldStorage[i]
            if (bucket === null) {
                continue
            }
            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[i]
                this.put(tuple[0],tuple(1))
            }
        }
    }

    isPrime(number) {
        var temp = parseInt(Math.sqrt(number))
        for (var i = 2; i <= temp; i++) {
            if (number%i === 0) {
                return false
            }
        }
        return true
    }
}
