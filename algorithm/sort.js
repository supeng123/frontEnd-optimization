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

//bubble sort
function bubbleSort(data) {
    for (var i = 0; i < data.length; i ++ ) {
        for (var j = 0; j < data.length - 1; j ++ ) {
            if (data[j] > data[j + 1]) {
                let temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            } 
        }
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
    console.log(maxValue, minValue)
    var default_bucket_size = bucketSize ? bucketSize : 5;
    var bucketCount = Math.floor((maxValue-minValue)/default_bucket_size) + 1;
    var buckets = new Array(bucketCount);
    for (var j = 0; j < buckets.length; j++) {
        buckets[j] = [];
    }
    console.log("position:",bucketCount);
    for (var z = 0; z < arr.length; z++) {
        console.log("position:" + (Math.floor(arr[z] - minValue))%bucketCount);
        buckets[Math.floor((arr[z] - minValue))%bucketCount].push(arr[z]);
    }
    arr.length = 0;
    for (var d = 0; d < buckets.length; d++) {
        insertSort(buckets[d]);
        for (var w = 0; w < buckets[d].length; w++) {
            arr.push(buckets[d][w]);
        }
    }
    return arr;
}

const bucketSortData=[6,3,7,1,2,5,3,9]
const bucketSortResult = bucketSort(bucketSortData);
console.log(bucketSortResult)


