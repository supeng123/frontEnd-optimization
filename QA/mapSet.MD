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

### 8.单词接龙
~~~
leetcode 127
function ladderzlength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList)
    let q = [[beginWord, 1]]
    while(q.length > 0) {
        let [word, level] = q.shift()
        if(word == endWord) return level
        for (let i = 0; i < word.length; i++) {
            for (let j = 0; j <= 122; j++) {
                const newWord = word.slice(0,i)+String.fromCharCode(j)+word.slice(i+1)
                if (wordSet.has(newWord)) {
                    q.push([newWord, level+1])
                    wordSet.delete(newWord)
                }
            }
        }
    }
    return 0
}
~~~
### 9.最长连续序列
~~~
leetcode 128
function longestSequence(nums) {
    if (!nums || nums.length <1 ) return 0
    nums.sort((a,b)=> a-b)

    let res = 1;
    let i = 0
    while (i < nums.length) {
        let pre = i 
        let cur = i+1
        let repeated = 0
        while (nums[cur] == nums[pre] || nums[cur] == nums[pre]+1) {
            if (nums[cur] == nums[pre]) repeated++
            pre = cur
            cur++
        }
        res = Math.max(res, pre+1-i-repeated)
        if (pre > i) {
            i = pre
        } else {
            i++
        }
    }
    return res
}
~~~
### 组队排名
~~~
leetcode 1366
function ranks(votes) {
    let len = votes[0].length
    const rank = {}
    votes.forEach(v => {
        for (let i = 0; i < len; i++) {
            let c= v[i]
            if (rank[c] === undefined) {
                rank[c] = new Array.fill(0)
            }
            rank[c][i]++
        }
    })

    let res = Object.keys(rank).sort((a,b) => {
        let listA = rank[a]
        let listB = rank[b]
        for (let i = 0; i < len; i++) {
            if (listA[i] != listB[i]) {
                return listB[i] - listA[i]
            }
        }
        return a > b ? 1 : -1
    })

    return res.join('')
}
~~~
###
~~~
leetcode 1056
function confusingNumber(N) {
    let n = N + ''
    const rotated = {0: 0, 1:1, 6:9, 9:6, 8:8}
    for (let i = n.length-1; i>= 0; i--) {
        const c = n[i]
        if (rotated[c] === undefined) {
            return false
        }
        res.push(rotated[c])
    }
    return res.join('') != n
}

leecode 1088
funtion confusingNUmberII(N) {
    let res = 0
    const nums = [0,1,6,8,9]
    const rotated = {0: 0, 1:1, 6:9, 9:6, 8:8}

    function recur(v, r, digits) {
        if (v > N) return
        if (v != r) {
            res++
        }
        nums.forEach(n => {
            recur(v*10+n, rotated[n]*digits+r, digits*10)
        })
    }

    recur(1,1,10)
    recur(6,9,10)
    recur(9,6,10)
    recur(8,8,10)
    return res
}
~~~
### 有效的数独
~~~
leetcode 36
function valid(matrix) {
    const set = new Set()
    for (let i = 0;  i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            const number = matrix[i][j]
            if (number == '-') continue
            const r = `${number}r${i}`
            const c = `${number}c${j}`
            const zone = `${number}z(${Math.floor(i/3)}, ${Math.floor(j/3)})`
            if (set.has(r) || set.has(c) || set.has(zone)) return false
            set.add(r)
            set.add(c)
            set.add(zone)
        }
    }
    return false
}
~~~
### 砖墙
~~~
leetcode 554
function bricks(wall) {
    let leastBricks = 0
    let m = {}
    let max  = 0
    for (let i = 0; i < wall.length; i++) {
        const widths = wall[i]
        let sum = 0
        for (let j = 0; j < widths.length - 1; j++) {
            sum = sum + widths[j]
            if (m[sum] == undefined) {
                m[sum] = 0
            }
            n[sum]++
        }
    }
    for (let key in m) {
        max = Math.max(m[key], max)
    }
    return wall.length - max
}
~~~