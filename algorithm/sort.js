//find the the K largest number in a random array
// [5,7,4,2,1,6]
function findKLargestNumber(array, k) {
    const filterDic = {};
    let pivot = array[0];
    leftSide = [];
    rightSide = [];
    for (var i = 1 ; i < array.length; i++) {
        if (!filterDic[array[i]] && array[i]!= pivot) {
            filterDic[array[i]] = array[i];
            if (array[i] > pivot) {
                leftSide.push(array[i]);
            } else {
                rightSide.push(array[i]);
            }
        }
    };

    if ( k - 1 == leftSide.length) {
        return pivot;
    }
    if ( k - 1 < leftSide.length) {
        return findKLargestNumber(leftSide, k);
    } else {
        return findKLargestNumber(rightSide,  k - leftSide.length);
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

