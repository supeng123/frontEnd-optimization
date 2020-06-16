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