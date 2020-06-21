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