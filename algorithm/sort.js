//find the the K largest number in a random array
// [5,7,4,2,1,6]
function findKLargestNumber(array, k) {
    const filterDic = {};
    let pivot = array[0];
    leftSide = [];
    rightSide = [];
    for (var i = 0 ; i < array.length; i++) {
        if (!filterDic[array[i]] && array[i]!= pivot) {
            filterDic[array[i]] = array[i];
            if (array[i] > pivot) {
                leftSide.push(array[i]);
            } else {
                rightSide.push(array[i]);
            }
        }
    };

    if ( k == leftSide.length + 1) {
        return pivot;
    }
    if ( k < leftSide.length + 1) {
        return findKLargestNumber(leftSide, k);
    } else {
        return findKLargestNumber(rightSide,  k - leftSide.length - 1);
    }
}

console.log(findKLargestNumber([6,7,4,2,1,6,8,9,1,4,3,1,10,11,16,19], 3))

//binary search
function binarySearch(array, value) {
    let start = 0;
    let end = array.length - 1;
    return binarySearchInside(array, start, end, value)
}

function binarySearchInside(data, start, end, value) {
    if (start > end) return -1;
    let mid = start + ((end - start) >> 1);
    if (data[mid] === value) {
        return mid;
    } else if (data[mid] > value) {
        end = mid - 1;
        return binarySearchInside(data, start, end, value);
    } else {
        start = mid + 1;
        return binarySearchInside(data, start, end, value);
    }
}

const binaryArray = [1,2,3,6,7,9,99];
console.log(binarySearch(binaryArray, 3));

//insert sort
function insertSort(data) {
    for (var i = 1; i < data.length; i++) {
        var value = data[i]
        var b = i - 1;
        for (; b >= 0; --b) {
            if (value < data[b]) {
                data[b+1] = data[b];
            } else {
                break;
            }
        }
        data[b+1] = value;
    }
}
const insertSortData = [5,3,7,9,1,4]
insertSort(insertSortData);
console.log(insertSortData)

//selection sort
function selectionSort(data) {
    for (var j = 0; j < data.length; j ++ ) {
        let min = j;
        for (var i = 0; i < data.length; i ++ ) {
            if(data[i] < data[min]) {
                min = i
            }
        }
        swap(data, j, min)
    }
}

function swap(data, i, j) {
    let temp;
    temp = data[i]
    data[i] = data[j]
    data[j] = temp
}

//bubble sort
function bubbleSort(data) {
    for (var i = 0; i < data.length; i ++ ) {
        let count = 0
        for (var j = 0; j < data.length - 1; j ++ ) {
            if (data[j] > data[j + 1]) {
                let temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            } else {
                count ++
            }
        }
        if (count === data.length) break;
    }
    return data;
}
const bubbleSortData = [5,3,7,9,1,4]
bubbleSort(bubbleSortData);
console.log(bubbleSortData)

//quick sort
function quickSort(data) {
    if (data.length <=1) return data;
    let pivotIndex = Math.floor(data.length / 2);
    let pivot = data.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i] < pivot) {
            left.push(data[i]);
        } else {
            right.push(data[i]);
        }
    }
    return quickSort(left).concat([pivot],quickSort(right));
}

const quickSortData = [5,3,7,9,1,4]
const result = quickSort(quickSortData);
console.log(result)

//count sort
function countSort(arr) {
    const newArr = [];
    let maxValue = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]>maxValue) {
            maxValue = arr[i];
        }
    }
    for (var j = 0 ;j < maxValue - 1; j++) {
        newArr[j] = 0;
    }
    for (var f = 0; f < arr.length; f++) {
        newArr[arr[f]]++
    }
    const result = [];
    for (var s = 0; s < newArr.length; s++) {
        while(newArr[s] > 0) {
            result.push(s)
            newArr[s]--;
        }
    }
    return result;
}

const countSortData=[6,3,7,1,2,5,3]
const countSortResult = countSort(countSortData);
console.log(countSortResult)

//bucket sort
function bucketSort(arr, bucketSize) {
    var minValue=arr[0];
    var maxValue=arr[0];
    for(var i = 1; i < arr.length; i++){
        if(arr[i] > maxValue) {
            maxValue = arr[i];
        } else if (arr[i] < minValue) {
            minValue = arr[i];
        }
    }

    var default_bucket_size = bucketSize ? bucketSize : 5;
    var bucketCount = ~~((maxValue - minValue)/default_bucket_size);
    var buckets = new Array(maxValue - minValue + 1);
    for (var j = 0; j < buckets.length; j++) {
        buckets[j] = [];
    }
    for (var z = 0; z < arr.length; z++) {
        buckets[(arr[z] - minValue)/bucketCount].push(arr[z]);
    }
  
    for (var d = 0; d < buckets.length; d++) {
        insertSort(buckets[d]);
    }
    return [].concat(...buckets);
}

const bucketSortData=[6,3,7,1,2,5,3,9]
const bucketSortResult = bucketSort(bucketSortData);
console.log(bucketSortResult)

function radixSort(arr, maxDigit) {
    let counter = [];
    let dev = 1;
    let mod = 10;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < arr.length; j++) {
            let bucket = ~~((arr[j]%mod)/dev);
            if (counter[bucket] ==  null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }

        let pos = 0;
        for(var j = 0; j < counter.length; j++) {
            let value = null;
            if (counter[j] != null) {
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}

const radixSortData=[6,3,7,1,2,5,3,9,20]
const radixSortResult = radixSort(radixSortData, 2);
console.log(radixSortResult)

//merge sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = ~~(arr.length/2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right))
}

function merge(leftList, rightList) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < leftList.length && rightIndex < rightList.length) {
        if (leftList[leftIndex] <= rightList[rightIndex]) {
            result.push(leftList[leftIndex]);
            leftIndex ++ ;
        } else {
            result.push(rightList[rightIndex]);
            rightIndex ++ ;
        }
    }
    return result.concat(leftList.slice(leftIndex)).concat(rightList.slice(rightIndex));
}
const mergeSortlist = [3, 4, 40, 23, 12, 4, 12, 4, 32, 1234, 23];
const r = mergeSort(mergeSortlist);
console.log(r);

const arr = []
function bfsTraversal(root, callback) {
    if (!root) return;
    var stack = [];
    var node = root;
    while (node != null) {
        callback(node);
        arr.push(node);
        if(node.children.length > 0) {
            for (var i = 0; i < node.children.length; i++) {
                stack.push(node.children[i]);
            }
        }
        node = stack.shift();
    }
}

const stack = [rootNode]

function dfsTraversal(number) {
    number = number || 0;
    if (stack[index]) {
        const current = stack[index];
        for (var i = 0 ; i < current.children.length; i ++) {
            stack.push(current[i])
        }
        dfsTraversal(++index);
    }
}


var LRUCache = class {

    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        let cache = this.cache;
        if (cache.has(key)) {
            let temp = cache.get(key)
            cache.delete(key);
            cache.set(key, temp);
            return temp;
        } else {
            return -1;
        }
    };

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        let cache = this.cache;
        if (cache.has(key)) {
            cache.delete(key);
        } else if (cache.size >= this.capacity) {
            cache.delete(cache.keys().next().value);
        }
        cache.set(key, value);
    };
};