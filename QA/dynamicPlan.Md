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
### 2.打家劫舍
~~~
//leetcode 198
funtion rob(nums) {
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    let pre = nums[0]
    let next = Math.max(nums[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        let temp = Math.max(nums[i] + pre, next)
        pre = next
        next = temp
    }
    return next
}
~~~