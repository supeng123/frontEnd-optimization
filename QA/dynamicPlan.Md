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
    for (let i = 3 ; i <= n; i++) {
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
    return count[r - 1][c - 1]
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
        for (let j = 0; j < grid[0].length; j++) {
            if (i > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j] + grid[i][j])
            }
            if ( j > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i][j-1] + grid[i][j])
            }
        }
    }
    return dp[grid.length - 1][grid[0].length - 1]
}
~~~
### 10.最长上升子序列
~~~
leetcode 300
function lengthOfLIS (nums) {
    if (nums.length < 2) return nums.length
    let max = 1
    const dp = new Array().fill(1)
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j]+1)
            }
        }
        max = Math.max(max, dp[i])
    }
    return max
}
~~~
### 11.零钱兑换
~~~
leetcode 322
function changes (coins, num) {
    const dp = new Array(num).fill(Inifinity)
    dp[0] = 0
    for (let i = 1; i < num; i++) {
        for (let coin of coins) {
            if (i - coin > 0) {
                dp[i] = Math.min(dp[i], dp[i-coin]+1)
            }
        }
    }
    dp[num] === Infinity ? -1 : dp[num]
}

function changes(coins = [2,5,7], num) {
    if (num == 0) return 0
    let res = Math.Infinite
    if (x >= 2) {
        res = Math.min(changes(num - 2) + 1, res)
    }
    if (x >= 5) {
        res = Math.min(changes(num - 5) + 1, res)
    }
    if (x >= 7) {
        res = Math.min(changes(num - 7) + 1, res)
    }
    return res
}

leetcode 588
function changes (num) {
    const coins = [1,5,10,25]
    const result = new Array(amount + 1).fill(0)
    result[0] = 1
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            result[i] = (result[i]+result[i - coin])%1000000007
        }
    }
    return result[amount]
}
~~~
### 11.单词拆分
~~~
leetcode 139
function wordsBreak (s, arrlist) {
    const dp = new Array(s.length + 1).fill(false)
    dp[0] = true
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && arrlist.includes(s.substring(j, i))) {
                dp[i] = true
                break;
            }
        }
    }
    return dp[s.length]
}
~~~
### 12.整数拆分
~~~
leetcode 343
function intergerBreak (n) {
    const dp = new Array(s.length + 1).fill(1)
    dp[0] = 0
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
    }
    dp[n]
}
~~~
### 12.最大正方形
~~~
leetcode 221
function maxSqure (matrix) {
    if (!matrix || matrix.length == 0 || !matrix[0]) return 0
    let max = 0
    const dp = new Array(matrix.length + 1).fill(’‘).map(()=> new Array(matrix.length+1).fill(0))
    for (let i = 0; i < matrix.length ; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 1
            } else {
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]) + 1
            }
            max = Math.max(dp[i][j], max)
        }
    }
    return Math.pow(max,2)
}
~~~
### 13.把数字翻译成字符串
~~~
function translateNum(num) {
    const str = num.toString()

    function dfs(str, index) {
        if (index >= str.length - 1) return 1
        const num = Number(str[index]+str[index+1])
        if (num >= 10 && num < 26) {
            return dfs(str, index+1) + dfs(str, index+2)
        } else {
            return dfs(str, index+1)
        }
    }
    return dfs(str, 0)
}

function translateNum(str) {
    const dp = new Array(str.length+1)
    dp[0] = 1
    dp[1] = 1
    for (let i = 2; i <= str.length; i++) {
        const num = Number(str[i-2]+str[i-1])
        if (num >= 10 && num < 26) {
            dp[i] = dp[i-2] + dp[i-1]
        } else {
            dp[i] = dp[i-1]
        }
    }
    return dp[]
}
~~~
### 14.股票的最大利润
~~~
function profit(prices) {
    const len = prices.length
    if (!len || len === 0) return 0
    const dp = new Array(len).fill(0)
    let min = prices[0]
    for (let i = 0; i < len; i++) {
        min = Math.min(prices[i], min)
        dp[i] = Math.max(dp[i - 1], prices[i] - min)
    }
    return dp[len-1]
}
~~~
### 15.交换和
~~~
~~~
### 16.单词拆分
~~~
~~~
### 17.最长公共子序列
~~~
function commonSequence(str1, str2) {
    const m = str1.length
    const n = str2.length
    const dp = Array.from(new Array(m+1), () => new Array(n+1).fill(0))
    for (let i = 1; i <= m, i++) {
        for (let j = 1; j <=n; j++) {
            if (str1[i] == str2[j]) {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
}
~~~
### 18.连续子数组的最大和
~~~
function maxSubArray(nums) {
    let max = -Infinity
    let sum = -Infinity
    for (let i = 0; i < nums.length; i++) {
        sum = Math.max(nums[i]+sum, nums[i])
        max = Math.max(sum, max)
    }
    return max
}

function maxSubArray(nums) {
    let max = -Infinity
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        if (sum < 0) {
            sum = nums[i]
        } else {
            sum += nums[i]
        }
        max = Math.max(sum, max)
    }
    return max
}
~~~
### 19.丑数
~~~
function uglyNumber(n) {
    const dp = []
    dp[0] = 1
    let two = 0
    let five = 0
    let three = 0
    for (let i = 0; i <= n; i++) {
        dp[i] = Math.min(dp[two]*2, dp[three]*3, dp[five]*5)
        if (dp[i] == dp[two]*2) two++
        if (dp[i] == dp[three]*3) three++
        if (dp[i] == dp[five]*5) five++
    }
    return dp[n-1]
}
~~~
### 20.最长不含重复字符的子字符串
~~~
~~~
### 21.最长连续子序列
~~~
leetcode 674
funciton longestSeqence(nums) {
    let max = 0
    const dp = new Array(nums.length).fill(1)
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] > nums[i-1]) {
            dp[i] = dp[i-1] + 1
        }
        if (dp[i] > max) {
            max = dp[i]
        }
    }
    return max
}
~~~
### 21.数组乘积
~~~
function maxofproduct(nums) {
    const maxDp = []
    const minDp = []
    maxDp[0] = nums[0]
    minDp[0] = nums[0]
    let max = 0
    for (let i = 1; i < nums.length; i++) {
        maxDp[i] = Math.max(nums[i], nums[i]*maxDp[i-1], nums[i]*minDp[i-1])
        minDp[i] = Math.min(nums[i], nums[i]*maxDp[i-1], nums[i]*minDp[i-1])
        max = Math.max(maxDp[i], max)
    }
    return max
}
~~~
### 22.三步问题
~~~
function threeSteps(n) {
    const dp = []
    dp[0] = 1
    dp[1] = 1
    dp[2] = 2
    dp[3] = 4
    for (let i = 4; i <= n; i++) {
        dp[i] = (dp[i-1]+dp[i-2]+dp[i-3])%1000000007
    }
    return dp[n]
}
~~~