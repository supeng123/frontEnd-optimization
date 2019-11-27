//write a reverse linked table
function node (value, next) {
    this.value = value;
    this.next = next;
}

function reverseLinkedTable(table) {
    let previous = null;
    while (table != null) {
        let next = table.next;
        let current = previous;
        previous = current;
        current = next;
    }
    return previous;
}

//check the table is linked from tail to head
function checkLoop(table) {
    let first = table;
    let second = table;
    while (first !=null && first.next !=null && first.next.next != null) {
        first = frist.next;
        second = second.next.next;
        if (first.value === second.value ) return true;
    }
    return false;
}

//remove the second last node
function removeSecondLastNode(table, n) {
    let dummyNode = new ListNode(0);
    dummyNode.next = table;
    let fast = dummyNode;
    let slow = dummyNode;
    for (var i = 0; i <= n ; i++) {
        fast = table.next;
    }
    while (fast != null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummyNode.next;
}

//merge two sorted linked table
function mergeTable(table1, table2) {
    let dummyNode = new ListNode(0);
    let current = dummyNode;
    while(table1 != null && table2 != null) {
        if (table1.value < table2.value) {
            current.next = table1;
            table1 = table1.next;
            current = current.next;
        } else {
            current.next = table2;
            table2 = table2.next;
            current = current.next;
        }
    }
    if (table1 == null) {
        current.next = table2;
    }
    if (table2 == null) {
        current.next = table1;
    }
    return dummyNode.next;
}

//merge two sorted array
function mergeTwoSortedArray(arr1, arr2) {
    var i = 0;
    var result = [];
    while (arr1[i] != null && arr2[i] != null) {
        if (arr1[i] <= arr2[i]) {
            result.push(arr1[i]);
            arr1.shift()
        } else {
            result.push(arr2[i]);
            arr2.shift()
        }
    }
    if (arr1.length > 0) {
        return result.concat(arr1);
    }
    if (arr2.length > 0) {
        return result.concat(arr2);
    }
}

const oneArray = [1,3,5,7,9,10]
const twoArray = [2,3,4,6,8]

const mergeTwoArrayResult = mergeTwoSortedArray(oneArray, twoArray);
console.log(mergeTwoArrayResult);

//find the smalllest positive

function smallestPositiveNumber(arr) {
    let max = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > 0 && arr[i] > max) {
            max = arr[i]
        }
    }
    const buckets = new Array(max + 1);
    for (var j = 0; j < buckets.length; j++) {
        buckets[j] = [];
    }

    for (var j = 0; j < arr.length; j++) {
        if (arr[j] > 0) {
            buckets[arr[j]].push(arr[j])
        }
        
    }
    
    let current = 1;
    while(!!buckets[current] && buckets[current].length > 0 ) {
        current ++;
    }
    return current;
}

console.log(smallestPositiveNumber([1,2,0]))

// three number sum
function threeNumSum(numbers, n) {
    const result = [];
    numbers.sort((a, b) => a - b);
    console.log('threeSumResult')
    for (var i = 0; i < numbers.length - 2; i ++) {
        if (i > 0 && numbers[i] === numbers[i + 1]) continue;
        j = i + 1;
        l = numbers.length - 1;
        while (j < l) {
            let sums = numbers[i] + numbers[j] + numbers[l];
            if (sums < n) {
                j ++;
            } else if (sums > n) {
                l --;
            } else {
                result.push([numbers[i], numbers[j], numbers[l]])
                while (numbers[j] === numbers[j + 1]) {
                    j ++;
                }
                while (numbers[l] === numbers[l - 1]) {
                    l --;
                }
                j ++;
                l --;
            }
        }
    }
    return result;
}

const threeSumDataList = [9,6,-6,-5,-4,1,0,-1,-3]
const threeSumResult = threeNumSum(threeSumDataList, 0);
console.log(threeSumResult)

