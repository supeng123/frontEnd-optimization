### 1.有效的括号
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
### 12.包含min函数的栈
~~~
leetcode 155
function MinStack() {
    this.stack = []
    this.minStack = []
}
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    if(this.minStack.length == 0 || x < this.minStack[this.minStack.length-1]) {
        this.minStack.push(x)
    }
}

MinStack.prototype.pop = function() {
    this.stack.pop()
    this.minStack.pop()
}

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
}

MinStack.prototype.min = function() {
    return this.minStack[this.minStack.length - 1]
}
~~~

### 13.栈的压入、弹出序列
~~~
leetcode 946
function MinStack(pushed, popped) {
    const stack = []
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i])
        while (stack.length !== 0 && stack[stack.length - 1] == popped[0]) {
            stack.pop()
            popped.shift()
        }
    }
    return popped.length == 0
}
~~~
### 14.包含max函数的队列
~~~
leetcode 155
function MaxQueue() {
    this.queue = []
    this.maxQueue = []
}
MaxQueue.prototype.push_back = function(x) {
    this.queue.push(x)
    while (this.maxQueue.length && this.maxQueue[this.maxQueue.length - 1] < x) {
        this.maxQueue.pop()
    }
    this.maxQueue.push(x)
}

MaxQueue.prototype.pop_front = function() {
    if (!this.queue.length) return -1
    const val = this.queue.shift()
    if (val === this.maxQueue[0]) {
        this.maxQueue.shift()
    }
    return val
}

MaxQueue.prototype.max_value = function() {
    return this.maxQueue.length ? this.maxQueue[0] : -1
}
~~~
### 15.圆圈中最后剩下的数字
~~~
leetcode 
function lastRemaining(n, m) {
    for (let i = 0; i < n; i++) {
        arr.push(i)
    }
    let head=0
    while (arr.length > 1) {
        const index = (head + m -1)%arr.length
        arr.splice(index, 1)
    }
    return arr[0]
}
~~~
### 16.一次编辑
~~~
leetcode 
function oneEditor(s1, s2) {
    const diff = s1.length - s2.length
    if (Math.abs(diff) > 1) return false
    const first = Array.from(s1)
    const second = Array.from(s2)
    const len = first.length > second.length ? frist.length : second.length
    for (let i = 0; i < len; i++) {
        if (first[i] != second[i]) {
            if (diff == 0) {
                second.splice(i,1,first[i])
            } else if (diff > 0) {
                second.splice(i,0,first[i])
            } else {
                first.splice(i,0,second[i])
            }
        }
    }
    return first.join() == second.join()
}
~~~
### 17.计算器
~~~
function computation(str) {
    const stack = []
    let cur = ''
    let mark = '+'
    let v = 0
    for (let i = 0; i <= str.length; i++) {
        cur = str.charAt(i)
        if (str[i] == ' ') continue
        if (Number(cur) > 0 && Number(cur) < 9) {
            v = parseInt(cur)
            continue
        }
        if (mark == '+') {
            stack.push(v)
        } else if (mark == '-') {
            stack.push(-v)
        } else if (mark == '*') {
            stack.push(stack.pop()*v)
        } else if (mark == '/') {
            stack.push(Math.trunc(stack.pop()/v))
        }
        mark == cur
    }
    return stack.reduce((t,c) => t+c)
}
~~~
### 设计循环队列
~~~
leetcode 622

let MyCircularQueue = function (k) {
    this.len = 0
    this.k = k
    this.front = 0
    this.rear = -1
    this.list = new Array(k)
}

MyCircularQueue.prototyp.enQueue = function (val) {
    if (!this.isFull()) {
        this.rear = (this.rear + 1)%this.k;
        this.list[this.rear] = value
        this.len++
        return true
    }
    return false
}

MyCircularQueue.prototyp.deQueue = function () {
    if (!this.isEmpty()) {
        let temp = this.list[this.front]
        this.front = (this.front+1)%this.k
        this.len--
        return true
    }
    return false
}

MyCircularQueue.prototyp.Front = function () {
    return this.isEmpty() ? -1 : this.list[this.front]
}

MyCircularQueue.prototyp.Rear = function () {
    return this.isEmpty() ? -1 : this.list[this.rear]
}

MyCircularQueue.prototyp.isEmpty = function () {
    return this.len == 0
}

MyCircularQueue.prototyp.isFull = function () {
    return this.len == this.k
}
~~~
### 逆波兰表达式
~~~
leetcode 150
function reversePolish(list) {
    const stack = []
    const expList = ['+', '-', '*', '/']
    for (let i = 0; i < list.length; i++) {
        if (expList.includes(list[i])) {
            const back = stack.pop()-0
            const pre = stack.pop()-0
            let res
            if (list[i] == '+') {
                res = pre + back
            } else if (list[i] == '-') {
                res = pre - back
            } else if (list[i] == '*') {
                res = pre + back
            } else {
                res = (pre/back) > 0 ? Math.floor(pre/back) : Math.ceil(pre/back)
            }
            stack.push(res)
        } else {
            stack.push(list[i])
        }
    }
    return stack[0]
}
~~~
###  柱状图中最大的矩形
~~~
//单调递增队列
leetcode 84

function largestRectangleArea (heights) {
    let maxArea = 0
    const stack = []
    heights = [0, ...heights, 0]         
    for (let i = 0; i < heights.length; i++) { 
        while (heights[i] < heights[stack[stack.length - 1]]) { // 当前bar比栈顶bar矮
            const stackTopIndex = stack.pop() // 栈顶元素出栈，并保存栈顶bar的索引
            maxArea = Math.max(               // 计算面积，并挑战最大面积
            maxArea,                        // 计算出栈的bar形成的长方形面积
            heights[stackTopIndex] * (i - stack[stack.length - 1] - 1)
            )
        }
        stack.push(i)                       // 当前bar比栈顶bar高了，入栈
    }
    return maxArea
};
~~~

