//write a reverse linked table
function node (value, next) {
    this.value = value;
    this.next = next;
}

function reverseLinkedTable(head) {
    let previous = null;
    while (head!= null) {
        let next = head.next;
        head.next = previous;
        previous = head;
        head = next;
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

class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    append(element) {
        const node = new VNode(element)
        if (this.length === 0) this.head = node
        else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length += 1
    }

    insert(position, element) {
        if (position > this.length && position < 0) return false
        const newNode = new VNode(element)
        if (position === 0) {
            newNode = this.head
            this.head = newNode
        } else {
            let index = 0
            let current = this.head
            let previous = null
            while (index++ < position) {
                previous = current
                current = current.next
            }
            newNode.next = current
            previous.next = newNode
        }
        this.length += 1
        return true
    }

    get(position) {
        if (position < 0 || position >= this.length) return null
        let index = 0
        let current = this.head
        while (index++ < position) {
            current = current.next
        }
        current.data
    }

    indexOf(element) {
        let index = 0
        let current = this.head
        while (current) {
            if (current.data = element) return index
            current = current.next
            index++
        }
        return -1
    }

    update(position, element) {
        if (position < 0 || position >= this.length) return null
        let index = 0
        let current = this.head
        while (index++ < position) {
            current = current.next
        }
        current.data = element
        return true
    }

    remove(element) {
        const index = this.indexOf(element)
        if (index !== -1) {
            this.removeAt(index)
        }
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) return false
        let current = this.head
        if (position === 0) this.head = this.head.next
        else {
            let index = 0
            let previous = null
            while(index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
            this.length -= 1
        }
        return current.data
    }

    isEmpty() {
        return this.length === 0 ? true : false
    }

    size() {
        return this.length
    }

    toString() {
        current = this.head
        var listString = ''
        while (current) {
            listString += current.data + " "
            current = current.next
        }
        return listString
    }

    reverseList() {
        let current = this.head
        let previous = null
        while (current) {
            let next = current.next
            current.next = previous
            previous = current
            current = next
        }
        return previous
    }
}

class VNode {
    constructor(data) {
        this.data = data
        this.next = null
        this.previous = null
    }
}

class TwoWayLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append(data) {
        const newNode = new VNode(data)
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.previous = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length += 1
    }

    forwardingString() {
        let current = this.head
        let resultString = ''

        while (current) {
            resultString += current.data + ' '
            current = current.previous
        }
        return resultString
    }

    insert(data, position) {
        if (position < 0 || position > this.length) return false
        const newNode = new VNode(data)
        if (this.lenght === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            if (position === 0) {
                this.head.previous = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position === this.length) {
                newNode.previous = this.tail
                this.tail.next = newNode
                this.tail = newNode
            } else {
                let current = this.head
                let index = 0
                while (index++ < position) {
                    current = current.next
                }
                newNode.next = current
                newNode.previous = current.previous
                current.previous.next = newNode //前面两个
                current.previous = newNode //前面一个
            }
        }
        this.length += 1
        return true
    }

    get(position) {
        if (position < 0 || position >= this.length) return false
        let index = 0
        let current = this.head
        while (index++ < position) {
            current = current.next
        }
        return current.data
    }

    indexOf(data) {
        let current = this.head
        let index = 0
        while (current){
            if (current.data = data) return index
            else {
                current = current.next
                index += 1
            }
        }
        return -1
    }

    update(position, data) {
        if (position < 0 || position >= this.length) return false
        let index = 0
        let current = this.head
        while (index++ < position) {
            current = current.next
        }
        current.data = data
        return true
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) return null
        let current = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            if (position === 0) {
                this.head.next.previous = null
                this.head = this.head.next
            } else if (position === this.length - 1) {
                current = this.tail
                this.tail.previous.next = null
                this.tail = this.tail.previous
            } else {
                var index = 0
                
                while (index++ < position) {
                    current = current.next
                }
                current.previous.next = current.next
                current.next.previous = current.previous
            }
        }
        this.length -= 1
        return current.data
    }

    remove(data) {
        const index = this.indexOf(data)
        if (index > 0) {
            this.removeAt(index)
        }
    }

    isEmpty() {
        return this.length === 0
    }

    size() {
        return this.length
    }
}

