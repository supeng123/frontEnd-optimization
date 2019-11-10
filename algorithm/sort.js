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
