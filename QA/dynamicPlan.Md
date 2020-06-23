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
    const memo = []
    memo[0] = num[0]
    memo[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        memo[i] = Math.max(nums[i] + memo[i - 2], memo[i - 1])
    }
    return memo[nums.length - 1]
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
### 5.爬楼梯
~~~
//leetcode 70
当前楼梯是前两个楼梯最大爬法之和
function staircase(n) {
    const counts = []
    counts[0] = 1
    counts[1] = 1
    coutns[2] = 2
    for (let i = 0 ; i <= n; i++) {
        counts[i] = (counts[i-1] + counts[i-2])%1000000007
    }
    return counts[n]
}
~~~
### 6.不同路径
~~~
//leetcode 62
各个点的路径总数是左边加上上边的数目
function differenetPath(r, c) {
    const count = []
    for (let i = 0 ; i < r; i++) {
        count[i] = Array(c).fill(0)
    }

    for (let i = 0 ; i < r; i++) {
        count[i][0] = 1
    }

    for (let i = 0 ; i < c; i++) {
        count[0][i] = 1
    }

    for (let i = 1; i < r; i++) {
        for (let j = 1; j < c; j++) {
            count[i][j] = count[i-1][j] + count[i][j-1]
        }
    }
    return arr[r - 1][c - 1]
}
~~~
### 7.不同的二叉搜索树
~~~
leetcode 96
function numTrees(n) {
    const dp = []
    dp[0] = 1
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = 0
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j-1] + dp[i-j]
        }
    }
    return dp[n]
}
~~~
### 8.三角形的最小路径和
~~~
leetcode 96
function minNumTotal(triangle) {
    const dp = []
    for (let i = 0; i < triangle.length; i++) {
        dp.push([])
        for (let j = 0; j <= i; j++) {
            dp[i][j] = Number.MAX_VALUE
        }
    }
    dp[0][0] = triangle[0][0]
    for (let i = 0; i < triangle.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i > 0 && j < i) {
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j] + triangle[i][j])
            }
            if ( j > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1] + triangle[i][j])
            }
        }
    }
    return Math.min(...dp[triangle.length - 1])
}
~~~
### 9.矩阵的最小路径和
~~~
leetcode 96
function minNumTotal(grid) {
    const dp = []
    for (let i = 0; i < grid.length; i++) {
        dp.push([])
        for (let j = 0; j < grid[0].length; j++) {
            dp[i][j] = Number.MAX_VALUE
        }
    }
    dp[0][0] = grid[0][0]
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j] + grid[i][j])
            }
            if ( j > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1] + grid[i][j])
            }
        }
    }
    return dp[grid.length - 1][grid[0].length - 1]
}
~~~