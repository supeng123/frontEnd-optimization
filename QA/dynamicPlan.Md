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
### 3.最大子序和
~~~
//leetcode 53
当前位置的值与当前位置加上上一次的最大值比较
funtion maxSubArray(nums) {
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    const memo = []
    memo[0] = nums[0]
    let max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        memo[i] = Math.max(nums[i] + memo[i -1], nums[i])
        max = Math.max(max, memo[i])
    }
    return max
}
~~~
### 4.乘积最大子数组
~~~
//leetcode 152
当前位置的值与当前位置乘以上一次的最大值（上一次最小值）比较
funtion maxSubArray(nums) {
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    const maxMemo = []
    const minMemo = []
    maxMemo[0] = nums[0]
    minMemo[0] = nums[0]
    let max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        maxMemo[i] = Math.max(nums[i]* maxMemo[i - 1], nums[i], nums[i]* minMemo[i - 1])
        minMemo[i] = Math.min(nums[i]* maxMemo[i - 1], nums[i], nums[i]* minMemo[i - 1])
        max = Math.max(maxMemo[i], max)
    }
    return max
}
~~~
