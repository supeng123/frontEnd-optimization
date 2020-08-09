### 1.无重复字符的最长子串
~~~
leecode 3
单向指针，Set，滑动窗口
function lengthOfLongestSubstring (s) {
    const set = new Set()
    let j = 0
    let max = 0
    for (let i = 0 ; i < s.length; i++) {
        if (!set.has(s[i])) {
            set.add(s[i])
            max = Math.max(set.size, max)
        } else {
            while (set.has(s[i])) {
                set.delete(s[j])
                j++
            }
            set.add(s[i])
        }
    }
    return max
}
~~~
### 2.数组去重
~~~
leecode 3
双指针， 排序
function removeRepeat (arr) {
    arr.sort((a,b) => a - b)
    let pre = 0
    let cur = 1
    for (let i = 0; i < arr.length; i++) {
        if (pre < arr.length && cur < arr.length) {
            if (arr[pre] === arr[cur]) {
                cur++
            } else {
                pre++
                arr[pre] = arr[cur]
                cur++
            }
        }
    }
    arr.slice(0, pre + 1)
}
~~~
### 3.加一
~~~
leecode 66
从后往前遍历
function addOne (arr) {
    
}
~~~
### 4.按奇偶or(正负)数排序
~~~
leecode 905
单向指针
function sort (arr) {
    let j = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 0) {
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]] 
            }
            j++
        }
    }
    return arr
}
~~~
### 5.两数相加
~~~
leecode 1
set
function twoSum (arr, target) {
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(target - arr[i])) {
            return [i, map.get(target - arr[i])]
        } else {
            map.set(arr[i], i)
        }
    }
    return arr
}
~~~
### 6.买卖股票最佳时机
~~~
leecode 121
从前往后一次遍历
function maxProfit (prices) {
    if (prices.length < 2) return 0
    let max = 0
    let min = prices[0]
    for (let i = 0 ;i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i]
        } else {
            max = Math.max(prices[i] - min, maxPrice)
        }
    }
    return max
}
~~~
### 7.压缩字符串
~~~
leetcode 
function compressString(str) {
    let index = 1
    let result = ''
    for (let i = 0; i < str.length - 1; i ++) {
        if (str[i]===str[i + 1]) {
            index = index + 1
        } else {
            result = result + str[i] + index
            index = 1
        }
    }
    result = result + str[str.length - 1] + index;
    return result.length < str.length ? result : str
}
~~~
### 8.回文串判断
~~~
双指针
isPalindrome = (start, end) {
        let l = start
        let r = end
        while (l < r) {
            if (s[l++] !== r[r--]) return false
        }
        return true
    }
}
~~~
### 9.较大分组的位置
~~~
leetcode 830
双指针
largeGroupPositions = (s) {
       
}
~~~
### 10.接雨水
~~~
function trap(height) {
    if (height.length == 0) return 0
    const leftMax = []
    const rightMax = []
    let max = 0
    let count = 0
    for (let i = 0; i < height.length; i++) {
        leftMax[i] = max = Math.max(height[i], max)
    }
    max = 0
    for (let i = height.length -1; i >=0; i--) {
        rightMax[i]= max = Math.max(height[i], max)
    }

    for (let i = 0; i < height.length; i++) {
        count = count + Math.min(leftMax[i], rightMax[i]) - height[i]
    }
    return count
}
~~~
### 11.三数之和
~~~
leetcode 15
左右指针
threeSum = (arr) {
    const reuslt = []
    arr.sort((a,b) => a - b)
    for (let i = 0 ; i < arr.length - 2; i++) {
        let start = i + 1
        let end = arr.length - 1
        while (start < end) {
            const sum = arr[i] + arr[start] + arr[end]
            if (sum == 0) {
                result.push([arr[i],arr[start], arr[end]])
                start++
                end--
                while (arr[start] == arr[start-1]) start++
                while (arr[end] === arr[end+1]) end--
            } else if (sum > 0) {
                end--
            } else {
                start++
            }
        }
    }
    return result
}
~~~
### 12.螺旋矩阵
~~~
leetcode 54
方向指针
function spiralMatrix(matrix) {
    if (matrix.length <1) return []
    const result = []
    let direction = 'right'
    let left = 0
    let right = matrix[0].length - 1
    let top = 0
    let bottom = matrix.length -1
    while (left <= right && top <= bottom) {
        if (direction === 'right') {
            for (let i = left; i <= right; i++) {
                result.push(matrix[top][i])
            }
            top++
            direction = 'down'
        } else if (direction === 'down') {
            for (let i = top; i <= bottom; i++) {
                result.push(matrix[i][right])
            }
            right--
            direction = 'left'
        } else if (direction === 'left') {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i])
            }
            bottom--
            direction = 'up'
        } else if (direction === 'up') {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left])
            }
            left++
            direction = 'right'
        } 
    }
    
    return result
}
~~~
### 13.接雨水
~~~
function catchRain(heights) {
    const leftMax = []
    const rightMax = []
    let max = 0
    let counts = 0
    for (let i = 0; i < heights.length; i++) {
        leftMax[i] = max = Math.max(heights[i], max)
    }
    max = 0
    for (let i = heights.length - 1; i >= 0; i--) {
        rightMax[i] = max = Math.max(heights[i], max)
    }
    for (let i = 0; i < heights.length; i++) {
        counts = counts + Math.min(leftMax[i], rightMax[i]) - height[i]
    }
    return counts
}
~~~
### 14.跳跃游戏
~~~
leetcode 55
//从右向左比较，当前索引和值的和是否大于后面一位的索引
function jump(nums) {
    let maxJump = nums.length - 1
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] + i >= maxJump) {
            maxJump = i
        }
    }
    return maxJump === 0
}
~~~
### 15.除自身以外数组的乘积
~~~
//leetcode 238
左右遍历
funtion productExceptSelf(nums) {
    const result = new Array(nums.length).fill(1)
    let product = 1
    for (let i = 0; i < nums.length; i++) {
        result[i] = result[i] * product
        product = product * nums[i]
    }
    product = 1
    for (let i = nums.length - 1; i >= 0 ; i--) {
        result[i] = result[i] * product
        product = product * nums[i]
    }
    return result
}
~~~
### 16.移动零
~~~
//leetcode 238
左右遍历
funtion movezero(nums) {
    let j = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[j] = nums[i]
            j++
        }
    }
    for (let i = j; j < nums.length; j++) {
        nums[i] = 0
    }
    return nums
}
~~~

### 17.水果成篮
~~~
//leetcode 904
滑动窗口， map设置种类和位置
funtion longestPanlindrome(nums) {
    let max = 1
    let j = 0
    const map = new Map() 
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i)
        if (map.size > 2) {
            let minIndex = tree.length - 1
            for (let [fruit, index] of map) {
                if (index < minIndex) minIndex = index
            }
            map.delete(nums[minIndex])
            j = minIndex + 1
        }
        max = Math.max(max, i - j + 1)
    }
    return max
}
~~~
### 18.隔排序最小第一最大第二
~~~
左右指针
function meanderingArray(arr) {
    arr.sort((a,b)=> a-b)
    let start = 0
    let end = arr.length - 1
    let result = []
    while (start < end) {
        result.push(arr[start])
        result.push(arr[end])
        start++
        end--
    }
    if (start == end) result.push(arr[start])
    return result
}
~~~
### 19.加油站问题
~~~
functio gasStation(gasline, cost) {
    let totalCost, totalGasline, start, current = 0
    for (let i = 0; i <  gasline.length; i++) {
        totalCost += cost[i]
        totalGasline += gasline[i]
    }
    if (totalCost > totalGasline) return -1
    for (let i = 0 ; i < gasline.length; i++) {
        current = current + gasline[i] - cost[i]
        if (current < 0) {
            current = 0
            start = i + 1
        }
    }
    return start
}
~~~
### 20.四数之和
~~~
functio fourSum(nums, target) {
    const result = []
    nums.sort((a,b) => a - b)
    for (let i = 0 ; i < nums.length - 3; i++) {
        if (nums[i] == nums[i+1]) continue
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (nums[j] == nums[j+1]) continue
            let start = j+1
            let end = nums.length - 1
            while (start < end) {
                const sum = nums[i] + nums[j] + nums[start] + nums[end]
                if (sum === target) {
                    result.push(nums[i], nums[j], nums[start], nums[end])
                    start++
                    end--
                    while （nums[start] == nums[start - 1]) start ++
                    while （nums[end] == nums[end + 1]) end--
                } else if (sum < target) {
                    start++
                    while （nums[start] == nums[start - 1]) start ++
                } else {
                    end--
                    while （nums[end] == nums[end + 1]) end--
                }
            }
        }
    }
}
~~~
### 21.删除排序数组中的重复项
~~~
leetcode 26
快慢指针
function removeDulplicates(nums) {
    let start = 0
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] != nums[start]) {
            nums[start + 1] = nums[i]
            start++
        }
    }
    return start + 1
}
~~~
### 22.竖直打印单词
~~~
function verticalprint(s) {
    const arr = s.split(' ')
    let maxLength = 0
    for (let item of arr) {
        if (item.length > maxLength) maxLength == item.length
    }
    const result = new Array(maxLength).fill('')
    for(let i = 0; i < maxLength; i++) {
        for (let j = 0; j < arr.length; j++) {
            result[i] += arr[j][i] || ''
        }
    }

    result.map((item) => {
        item.replace(/\s*$/g, '')
    })
    return result
}
~~~
### 23.重复的DNA序列
~~~
//滑动窗口
leetcode 187
function repeatDNAs(s) {
    let start = 0
    let end = 10
    const map = new Map()
    const result = []
    for (let i = 0; i < s.length; i++) {
        const str = s.substring(start, end)
        if (map.has(str)) {
            map.set(str, map.get(str) + 1)
        } else {
            map.set(str, 1)
        }
    }
    for (let [key, val] of map) {
        if (val > 1) {
            result.push(key)
        }
    }
    return result
}
~~~
### 24.连续子数组的最大和 
~~~
leetCode 53
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
### 25.三数最近
~~~
function threeSum(nums, target) {
    const len = nums.length
    if (len < 3) return null
    nums.sort((a,b) => a - b)
    let result = nums[0] + nums[1] + nums[2]
    for (let i = 0; i < len - 2; i++) {
        let start = i + 1
        let end = len - 1
        while (start < end) {
            const sum = nums[i] + nums[start] + nums[end]
            if (Math.abs(target-sum) < Math.abs(target-result)) {
                result = sum
            }
            if (sum < target) {
                start++
            } else if (sum > target) {
                end--
            } else {
                result = sum
                break;
            }
        }
    }
    return result
}
~~~
### 26.下一个排列
~~~
leetcode 31
三指针,或全排列回溯
function nextPermutation(nums) {
    if (nums.length < 2) return nums
    let start = nums.length - 2
    let next = nums.length - 1
    let end = nums.length - 1
    while (nums[start] >= nums[next]) {
        start--
        next--
    }
    if (start < 0) return nums.reverse()
    while (start < end && nums[start] > nums[end]) {
        end--
    }
    [nums[start], nums[end]] = [nums[end], nums[start]]
    for (let i = nums.length - 1; i > next; next++, i--) {
        [nums[i], nums[next]] = [nums[next], nums[i]]
    }
    return nums
}
~~~

### 27.最长回文子串
~~~
//leetcode 5
从中间扩散，记住左节点和最大长度
funtion longestPanlindrome(s) {
    if (s.length < 2) return s
    let j = 0
    let start = 0
    let maxLength = 0
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i + 1)
        expandAroundCenter(i - 1, i + 1)
    }
    
    function expandAroundCenter(left ,right) {
        while (s[left] == s[right] && left != right && left >= 0 && right < s.length) {
            if (right - left + 1 > maxLength ) {
                start = left
                maxLength = right - left + 1
            }
            left--
            right++
        }
    }
    return s.substring(start, start + maxLength)
}
~~~
### 28.回文子串
~~~
//leetcode 647
dp
funtion Panlindrome(s) {
    const dp = new Array(s.length).fill('').map(() => new Array(s.length))
    let count = 0
    for (let i = 0 ; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (s[i] == s[j] && (i - j < 2 || dp[i-1] = dp[j+1])) {
                dp[i][j] = true
                count++
            }
        }
    }
    return count
}
~~~
### 29.区间合并
~~~
function mergeBlock(lists) {
    if (!lists.length) return []
    lists.sort((a, b) => a[0] - b[0])
    const mergedList = [lists[0]]
    for (let i = 1; i < lists.length; i++) {
        const position = mergelist.length - 1
        if (lists[position][1] >= lists[i][0]) {
            if (lists[position][1]< lists[i][1]) {
                lists[position][1] = lists[i][1]
            }
        } else {
            mergedList.push(lists[i])
        }
    }
    return mergedList
}
~~~
### 30.合并排序数组
~~~
function mergeBToA(A, m, B, n) {
    let count = m + n
    while (m > 0 && n > 0) {
        A[--count] = A[m-1] > B[n-1] ? A[--m] : B[--n]
    }
    if (n > 0)
    A.splice(0,n ...B.slice(0,n))
}
~~~
### 31.递归乘法
~~~
function multiply(A,B) {
    let min = Math.min(A, B)
    let max = Math.max(A, B)
    if (min < 2) return B
    return max + multiply(min-1, max)
}
~~~
### 32.阶乘尾数
~~~
function tailZero(n) {
    let count = 0
    for (n >=5) {
        n = n/5
        count +=n || 0
    }
    return count
}
~~~
### 33.最小差
~~~
function smallestDifference(a, b) {
    a.sort((x,y)=> x-y)
    b.sort((x,y)=> x-y)
    let L = 0
    let R = 0
    let result = Infinity
    while (L < a.length && R < b.length) {
        result = Math.min(res, Math.abs(a[L]-b[R]))
        if (a[L] > b[R]) {
            R++
        } else {
            L++
        }
    }
    return result
}
~~~
### 34.交换和
~~~
function findSwapValues (arr1, arr2) {
    const total1 = arr1.reduce((t, c) => t+c)
    const total2 = arr2.reduce((t, c) => t+c)
    total1.sort()
    total2.sort()

    const dif = total1-total2
    if (dif%2) return []

    let dif2
    for (let i = 0; i < arr1.length; i++) {
        dif2 = arr1[i] - dif/2
        if (arr2.includes(dif2)) {
            return [arr1[i], dif2]
        }
    }
    return []
}
~~~
### 35.单词距离
~~~
function wordsDistance (arr, word1, word2) {
    let index1 = -1
    let index2 = -1
    let min = Infinity
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == word1) {
            if (index2 >= 0) {
                min = Math.min(min, Math.abs(i - index2))
            }
        }
        if (arr[i] == word2) {
            if (index1 >= 0) {
                min = Math.min(min, Math.abs(i - index1))
            }
        }
    }
    return min
}
~~~
### 36.最短无序连续子数组
~~~
leetcode 581
function findUnsortedSubarray(nums) {
    let left = 0
    let right = 0
    let max = nums[0]
    let min = nums[nums.length -1]
    for (let i = 0; i < nums.length; i++) {
        max = Math.max(nums[i], max)
        if (nums[i] < max) {
            right = i
        }
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        min = Math.min(nums[i], min)
        if (nums[i] > min) {
            left = i
        }
    }
    return right - left > 0 ? right - left + 1 : 0
}
~~~
### 37.和为K的子数组
~~~
funciton SumK(nums, k) {
    let count = 0
    for (let i = 0 ; i < nums.length; i++) {
        let sum = 0
        for (let j = i; j < nums.length; j++) {
            sum += nums[j]
            if (sum == k) count++
        }
    }
    return count
}
~~~
wood wins categroy,the very clear winner with the higest number of points ever awarded in this section at this festival