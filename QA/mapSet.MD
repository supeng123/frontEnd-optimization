### 1.两数之和
~~~
leetcode 1
//map
function twoSum(arr, target) {
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(target - arr[i])) {
            return [i, map.get(target - arr[i])]
        } else {
            map.set(arr[i], i)
        }
    }
}
~~~
### 2.判断两组字符串是否单词个数相等
~~~
leetcode 1
//map
function isEqual(s1, s2) {
    if (s1.length != s2.length) return false
    const map = new Map()
    for (let i = 0; i < s1.length; i++) {
        if (map.has(s1[i])) {
            map.set(s1[i], map.get(s[i]) + 1)
        } else if (!map.has(s1[i])) {
            map.set(s1[i], 1)
        }

        if (map.has(s2[i])) {
            map.set(s2[i], map.get(s2[i]) - 1)
        } else if (!map.has(s2[i])) {
            map.set(s2[i], -1)
        }
    }

    for (let letter of map) {
        if (letter[1] > 0) return false
    }
    return true
}
~~~
### 3.字母异位词分组
~~~
leetcode 49
//obj
function groupAnagrams = function(s) {
    const result = []
    const object = {}
    for (let item of s) {
        const sortedItem = item.split('').sort().join('')
        if (object[sortedItem] == undefined) {
            object[sortedItem] = []
        }
        object[sortedItem].push(item)
    }
    for (let item in object) {
        result.push(object[item])
    }
    return result
}
~~~
### 4.矩阵置零
~~~
leetcode 73
//obj
function setZeros = function(matrix) {
    const columns = {}
    const rows = {}
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                rows[i] = false
                columns[j] = false
            }
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (rows[i] === false || columns[j] === false) {
                matrix[i][j] = 0
            }
        }
    }
    return matrix
}
~~~
### 5.数组交叉
~~~
//set, reduce
function intersection(nums) {
    return [... new Set(
        nums.reduce((result, num) => {
            result.filter((item) => num.includes(item))
        }, [])
    )]
}
~~~
### 6.常数时间插入、删除和获取随机元素
~~~
leetcode 380
var RandomizedSet = function() {
    this.map = {}
    this.list = []
};

RandomizedSet.prototype.insert = function(val) {
    if (this.map[val] === undefined) {
        this.list.push(val)
        this.map[val] = this.list.length-1
        return true
    }
    return false
};

RandomizedSet.prototype.remove = function(val) {
    if (this.map[val] === undefined) return false
    const index = this.map[val]
    const len = this.list.length
    if (index !== len-1) {
        this.list[index] = this.list[len-1]
        this.map[this.list[len-1]] = index
    }
    this.list.pop()
    delete this.map[val]
    return true
};

RandomizedSet.prototype.getRandom = function() {
    let res,
    let count = 0
    for (let i = 0; i < this.list.length; i++) {
        count++
        let index = Math.floor(Math.random()*count)
        if(index == 0) return i
    }
    return this.nums[res]
};

~~~