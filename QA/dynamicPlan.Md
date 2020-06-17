### 1.斐波那契数列
~~~
leetcode 509
dynamic plan
function fib(n) {
    const res = []
    res[0] = 0
    res[1] = 1
    for (let i =2 ;i <= n; i++) {
        res[i] = res[i-1] + res[i-2]
    }
    return res[n]
}

function fib(n) {
    let res = 0
    pre = 0
    next = 1
    for (let i =2 ;i <= n; i++) {
        res = pre + next
        pre = next
        next = res
    }
    return res
}
~~~