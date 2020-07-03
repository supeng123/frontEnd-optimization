###1.有效的括号
~~~
leecode 20 
栈
function isValid(s) {
    const map = new Map()
    map.set('{', '}')
    map.set('(', ')')
    map.set('[', ']')
    const stack = []
    let result = true
    for (let i = 0; i < s.length; i++) {
        if(map.has(s[i])) {
            stack.push(map.get(s[i]))
        } else {
            const cur = stack.pop()
            if (cur !== s[i]) result = false
        }
    }
    return stack.length == 0 && result
}

function areBracketsClosed(randomString) {
    let sum = 0
    const splittedCharactors = randomString.split('');
    for (let i = 0; i < splittedCharactors.length; i++) {
        const charactor = splittedCharactors[i];
        if (charactor === '(') {
            sum ++;
        } else {
            if (sum === 0) {
                return false
            }
            sum --
        }
    }
    return sum === 0;
}
~~~
### 2.最长有效括号
~~~
leetcode 32
栈, 哨兵节点
function longestBrackets(s) {
    const stack = [-1]
    let max = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i)
        } else {
            stack.pop()
            if (stack.length === 0) {
                stack.push(i)
            } else {
                max = Math.max(max, i - stack[stack.length - 1])
            }
        }
    }
    return max
}
~~~
### 3.前序遍历
~~~
function preOrder(root) {
    const stack = []
    const result = []
    stack.push(root)
    while (stack.length !== 0) {
        for (let i = 0; i < stack.length; i++) {
            const cur = stack.pop()
            result.push(cur.val)
            cur.right && stack.push(cur.right)
            cur.left && stack.push(cur.left)
        }
    }
    return result
}
~~~
### 4.比较含退格的字符串
~~~
function backSpaceCompare(S, T) {
    if (S == T) return true
    return format(S) === format(T)
    function format(s) {
        const arr = s.split('')
        const stack = []
        arr.forEach(item => {
            if (item === '#') {
                stack.pop()
            } else {
                stack.push(item)
            }
        })
        return stack.join('')
    }
}
~~~
### 5.直线上的点
~~~
//leetcode 149
哈希表
function mostDots(points) {
    if (points.length <= 2) return points.length
    let counts = 2 
    
    for (let i = 0; i < points.length - 1; i++) {
        let repeat = 1
        let hash = {'_', 0}
        for （let j = i + 1; j < points.length; j++) {
            const [[x1, y1], [x2, y2]] = [points[i], points[j]]
            if (x1 == x2 && y1 == y2) {
                repeat++
                continue
            }
            let k = (x1-x2)/(y1-y2)
            if (k == - Infinity) k = Infinity
            if (hash[k]) {
                hash[k] = hash[k] + 1
            } else {
                hash[k] = 1
            }
        }
        counts = Math.max(Math.max(...Object.values(hash)+repeat), counts)
    }
    return counts
}
~~~
### 6.LRU
~~~
leetcode146
map

class LRU() {
    constructor(capacity) {
        this.contanier = new Map()
        this.capacity = capacity
    }

    get(key){
        if(this.container.has(key)) {
            const item = this.container.get(key)
            this.container.delete(key)
            this.container.set(key, item)
            return item
        }
        return -1
    }

    put(key, value){
        if (this.container.has(key)) {
            this.container.delete(key)
        }
        if (this.container.size >= capacity) {
            this.container.delete(this.container.keys().next().value)
        }
        this.container.set(key,value)
    }
}
~~~
### 7.字典中最长的单词
~~~
leetcode 720
map
function longestWord(words) {
    words.sort()
    let maxword = 0
    const map = new Map()
    map.set('', true)
    for (let item of words) {
        if (map.has(item.substr(0, item.length - 1))) {
            map.set(item, true)
            maxword = item.length > maxword.length ? item : maxword
        }
    }
    return maxword
}
~~~
### 8.括号的分数
~~~
leetcode 856
function scoreOfParentheses(S) {
    const stack
    if (S.length === 0) return 0
    for (item of S) {
        if (item === '(') {
            stack.push(item)
        } else {
            if (stack[stack.length - 1] == '(') {
                stack.pop()
                stack.push(1)
            } else if (Number(stack[stack.length - 1]) {
                let sum  = 0
                while (stack.length >= 0 && stack[stack.length - 1] !== '(') {
                   const currentVal = stack.pop()
                   sum = sum + currentVal
                }
                stack.pop()
                stack.push(sum*2)
            }
        }
    }
    return stack.reduce((total, item) => total + item)
}
~~~
### 10. 滑动窗口最大值
~~~
function MaxVal(nums) {
    const result = []
    const win = Window()
    for (let i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            win.push(nums[i])
        } else {
            win.push(nums[i])
            result.push(win.max())
            win.pop(nums[i-k+1])
        }
    }
    return result
}

class Window {
    constructor() {
        this.data = []
    }
    push(val) {
        while (this.data.length > 0 && this.data[this.data.length -1] < val) {
            this.data.pop()
        }
        this.data.push(val)
    }
    pop(val) {
        if (this.data.length > 0 && this.data[0] === val) {
            this.data.shift()
        }
    }
    max() {
        return this.data[0]
    }
}
~~~
### 11.重复字符串分组
~~~
function (strs) {
    const hash = {}
    for (let item of strs) {
        const key = item.split('').sort()
        if (!hash[key]) {
            hash[key] = []
        } else {
            hash[key].push(item)
        }
    }
    return Object.keys(hash).map(key => hash[key])
}
~~~