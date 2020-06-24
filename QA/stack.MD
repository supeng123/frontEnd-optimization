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
### 23.直线上的点
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