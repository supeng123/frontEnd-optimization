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
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] < 9) {
            arr[i] = arr[i] + 1
            return arr
        } else {
            arr[i] = 0
        }
    }
    return [1].concat
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
//动态规划算法
function jump(nums) {
    let len = nums.length
    const dp = new Array(len).fill(false)
    dp[0] = true
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] + j >= i && dp[j])  {
                dp[i] = true
                break
            }
        }
    }
    return dp[len-1]
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
            let minIndex = nums.length - 1
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
            index1 = i
            if (index2 >= 0) {
                min = Math.min(min, Math.abs(i - index2))
            }
        }
        if (arr[i] == word2) {
            index2 = i
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
### 38.根据身高重建队列
~~~
leetcode 406
funciton reconstrcutQueue(heights) {
    if (heights.length == 0) return []
    let result = []
    heights.sort((a,b) => {
        if (a[0] != b[0]) {
            return b[0] - a[0]
        } else {
            return a[1] - b[1]
        }
    })
    heights.forEach(people => {
        result.splice(people[1], 0, people)
    })
    return result
}
~~~
### 40.找到所有数组中消失的数字
~~~
leetcode 448
funciton missingNumbers(nums) {
    const result  = []
    const array = new Array(nums.length+1)
    for (let num of nums) {
        array[num] = 1
    }
    for (let i = 1; i <= nums.length; i++) {
        if (array[i] == null) {
            result.push(i)
        }
    }
    return result
}
~~~
### 41.搜索二维矩阵
~~~
对角线查找双指针
leetcode 240
funciton searchMatrix(matrix) {
    if (matrix.length == 0) return false
    let row = matrix.length
    let column = matrix[0].length
    let left = 0
    let bottom = row - 1
    while (bottom >= 0 && left < column) {
        if (matrix[bottom][left] > target) {
            bottom--
        } else if (matrix[bottom][left] < target) {
            left++
        } else {
            return true
        }
    }
    return false
}
~~~
### 43.和为S的连续序列
~~~
function continousSequence(target) {
    let position = 1
    let index = 1
    const result = []
    let innerList = []
    let sum = 0
    while (position < target/2) {
        for (let i = 0; i < target; i++) {
            innerlist.push(i)
            sum += i
            if (sum == target) {
                result.push(innerList)
            }
            if (sum >= target) {
                innerList  = []
                sum = 0
                index++
                position = index
                break
            }
        }
    }
    return result
}
~~~
### 44.部分排序
~~~
function partsort(randomArray) {
    let r = -1
    let l = -1
    let max = -Infinity
    let min = Infinity
    for (let i = 0; i < randomArray.length; i++) {
        if (randomArray[i]>=max) {
            max = randomArray[i]
        } else {
            r = i
        }
    }
    for (let i = randomArray.length-1; i >= 0; i--) {
        if (randomArray[i]<=min) {
            min = randomArray[i]
        } else {
            l = i
        }
    }
    return [l,r]
}
~~~
### 45.跳水板
~~~
function jumpboard(short, longer, k) {
    if (!k) return []
    if (short === longer) return [k*short]
    const res
    for (let i = 0;i <= k; i++) {
        res.push(i*short + (k-i)*longer)
    }
    return res.sort((a,b)=>a-b)
}
~~~
### 46.最小差
~~~
function leastDifference(arr1,arr2) {
    arr1.sort((a,b)=>a-b)
    arr2.sort((a,b)=>a-b)
    let res
    let m = 0
    let n = 0
    while (m < arr1.length && n < arr2.length) {
        res = Math.min(res, Math.abs(arr1[m]-arr2[n]))
        if (arr1[m] < arr2[n]) {
            m++
        } else {
            n++
        }
    }
    return res
}
~~~
### 峰与谷
~~~
[5,4,3,2,1]
[4,5,3,2,1]
[4,5,2,3,1]
function wiggleSort(nums) {
    nums.sort((a,b)=>b-a) 
    for (let i = 0; i < nums.length; i+2) {
        [nums[i],nums[i+1]] = [nums[i+1], nums[i]]
    }
    return nums
}
~~~
### 48.合法二叉搜索树
~~~
function isValidBST(root) {
    let isValid = true
    let lastNode = null
    dfs(root)
    
    function dfs(node) {
        if (node == null || !isValid) return
        if (node.left) dfs(node.left)
        if (node.val <= lastNode) {
            isValid = false
            return;
        }
        lastNode = node.value
        if (node.right) dfs(node.right)
    }
    return isValid
}
~~~
### 49.特定深度节点链表
~~~
function treeToLinkList(root) {
    const res = []
    if (root == null) return res
    const queue = [root]
    while (queue.length > 0) {
        const dummyhead = {}
        let cur = dummyHead
        const len = queue.length
        for (let i = 0; i < len; i++) {
            const node = queue.shift()
            cur.next = new ListNode(node.val)
            cur = cur.next
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        res.push(dummyHead.next)
    }
    return res
}
~~~
### 旋转函数
~~~
leetcode 396 
var maxRotateFunction = function(A) {
    function getMax(arr) {
        return arr.reduce((total, item, index)=> total+=item*index,0)
    }
    let max = getMax(A)
    const len = A.length
    for (let i = 0; i < len - 1; i++) {
        A.unshift(A.pop())
        max = Math.max(max, getMax(A))
    }
    return max
};
~~~
### 包含所有三种字符的子字符串数目
~~~
leetcode 1358
var numberOfSubstrings = function(s) {
    const len = s.length
    let res = 0
    const map = {a : 0, b : 0, c : 0}
    for (let i = 0, j = 0; i < len; i++) {
        const current = s[i]
        map[current]++
        while(j < len && map[a]>0 && map[b] > 0 && map[c] > 0) {
            map[s[j]]--
            j++
        }
        res +=j
    }
    return res
};
~~~
### 包多次求和构造目标数组
~~~
leetcode 1354
var isPossible = function(target) {
    if (target.length < 2) return target[0] == 1
    let sum = target.reduce((total, cur) => total+cur, 0)
    let largest = getMax(target)
    
    while(largest[0] > 1) {
        var remain = sum - largest[0]
        var x = largest[0] % remain
        if (remain == 1) return true
        if (largest[0] < remain || x == 0) return false
        target[largest[1]] = x
        sum = remain+x
        largest = getMax(target)
    }
    return true

    function getMax(list) {
        var res = list[0]
        var resIdx = 0
        for (let i = 0; i < list.length; i++) {
            if (list[i] > res) {
                res = list[i]
                resIdx = i
            }
        }
        return [res, resIdx]
    }
};
~~~
### 最多可以参加的会议数目
~~~
leetcode 1353
var maxEvents = function(events) {
   let hSet = new Set()
   event.sort((a,b) => a[1] != b[1] ? a[1] - b[1] : a[0] - b[0])
   event.forEach(e => {
       for (let i = e[0]; i <= e[1]; i++) {
           if (!hSet.has(i)) {
               hSet.add(i)
               break
            }
       }
       
   })
   return hSet.size
};
~~~
### 制造字母异位词的最小步骤数
~~~
leetcode 1347
var minSteps = function(s, t) {
    const map = {}
    let res = 0
    const len = s.length
    if (len < 1) return 0
    for (let i = 0, j = 0; i < len && j < len; i++,j++) {
       const one = s[i]
       const two = t[j]
       if (map[one] == undefined) {
           map[one] = 0
       }
       if (map[two] == undefined) {
           map[two] = 0
       }
       map[one]++
       map[two]--
    }
    for (let key in map) {
        res += Math.abs(map[key])
    }
    return res/2
};
~~~
### 大小为 K 且平均值大于等于阈值的子数组数目(滑动窗口)
~~~
leetcode 1343
var numOfSubarrays = function(arr, k, threshold) {
    let len = arr.length
    let count = 0
    let i = 0
    let sum = 0
    for (i; i < k; i++) {
        sum += arr[i]
    }

    while(i < len) {
        if (sum/k >= threshold) {
            count++
        }
        sum -= arr[i-k]
        sum += arr[i]
        i++
    }
    if (sum/k >= threshold) count++
    return count
};
~~~
### 数组大小减半
~~~
leetcode 1338
function minSetSize(arr) {
    const len = arr.length
    let n = len
    let res = 0
    const map = {}
    arr.forEach(item => {
        if (!map[item]) map[item]=0
        map[item]++
    })
    const list = Object.keys(map).sort((a, b) => map[b]-map[a])
    for (let i = 0; i < list.length; i++) {
        const key = list[i]
        n -= map[key]
        res++
        if (n <= len/2) return res
    }
    return res
}
~~~
### 最多可以买到的苹果数量
~~~
leetcode 1196
function maxAppleSize(arr, target) {
    let sum = 0
    let res = 0
    arr.sort((a,b) => a -b)
    for (let i = 0; i < arr.length; i++) {
        const apple = arr[i]
        if (sum >= target) {
            break
        }
        res++
        sum += apple
    }
    return sum > target ? res - 1 : res
}
~~~
### “气球” 的最大数量
~~~
leetcode 1189
var maxNumberOfBalloons = function(text) {
    const map = {a: 0, b: 0, l: 0, n: 0, o: 0}
    Array.from(text).forEach(c => {
        if (map[c] !== undefined) {
            map[c]++
        }
    })
    map['l'] = Math.floor(map['l']/2)
    map['o'] = Math.floor(map['o']/2)
    let minValue = Number.MAX_VALUE
    Object.keys(map).forEach(item => {
        if (map[item] < minValue) {
            minValue = map[item]
        }
    })
    return minValue
};
~~~
### 字符串转整数
~~~
leetcode 8
var atoi = function(text) {
    let i = 0
    let sign = 1
    let res = 0
    while (str.charAt(i) == ' ') i++
    if (str.charAt(i) == '+') {
        i++
    } else if (str.charAt(i) == '-') {
        sign = -1
        i++
    }
    while (str.charAt(i)>= '0' && str.charAt(i) <= '9') {
        res = res*10 + (str.charAt(i)-0)
        if (res*sign >=2147483647) return 2147483647
        if (res*sign <=-2147483648) return -2147483648
        i++
    }
    return res*sign
};
~~~
### 对角线遍历
~~~
leetcode 498
var diagonalTraverse = function(matrix) {
    if (matrix.length == 0 || matrix[0].length == 0) return []
    const m = matrix.length
    const n = matrix[0].length
    const res = []
    let i = 0
    let j = 0
    for (let k = 0; k < m*n; k++) {
        res.push(matrix[i][j])
        if ((i+j)%2==0) {
            if (n-1 == j) {
                i++
            } else if (i == 0) {
                j++
            } else {
                i--
                j++
            }
        } else {
            if (m-1 == i) {
                j++
            } else if (j == 0) {
                i++
            } else {
                i++
                j--
            }
        }
    }
    return res
};
~~~
### 峰顶
~~~
leetcode 852
function peak(arr) {
    let len = arr.length
    let i = 0
    let peak = 0
    while (i < len-2) {
        while(arr[i+1] > arr[i]) {
            i++
        }
        peak = i
        while(arr[i+1] < arr[i]) {
            i++
        }
    }
    if (i = len-1) return peak
    return -1
}
~~~

autism characterized by difficulty in communicating
we give hope to people with limitation that those limitations are not what they think they are that they do have a shot

her prognosis is terminal without immediate medical intervention
Am I being punished for something, you just accept my answer at face value
you are very arrogant and arrogant people don't think they need to lie so you must be doing this to teach me
I look forward to learning from scut work
I my experience doctors don't listen to nurses and they only talk to us to lecture us when they figure we screwed something up
he has had to get pass people like you and their prejudices every step of the way
do you have any idea how many patients he has  scared the crap out of today
I can't discharge people if I think they might still be sick
residency is a whole lot more demanding than medical
you would not lie to convince a suicidal person to climb down off the ledge
all parents love all children more than anybody else
You are right my mom had problems So I could not afford to just sit around expecting everything to be
handed to me or whatever else it is that's holding you back, yeah I got some breaks, i have to work my ass off,
two jobs, and that's what got me to the place where I could save your life
don't let anyone ever tell you what you can and what you can't do
you should treat me like a person who are capable of handing her own life
you'd perfer her to be a lazy parasite living off a trust fund as oppose to contributing to the sociaty

everyone knows what looks like to overcome barrier, fighting to help peopel live out their own dreams
I am not alway the same here as it is at home

there are very few things that are worthwhile in life come without a cost.
he says getting away from things every now and again, having balance in our lives can be just as important to our performance as practice


I was no better than her and that I would never do anything i never being anyone
is there any chance if you son knows more than what you think he does
he said people who matter judge people based on their talent
he did not talk me out of it( don't do it)
bloating 胀气
constipation 便秘
nausea 恶心
agitated
creed 信条
stake 拿什么做赌注
malignant tumor 恶性肿瘤
pharmaceutical
amputation

影院灯光亮起，散场后总感觉一种说不出来的别扭，我坐在第一排竟然从《八佰》回想不起来一个有特征清晰的角色，大家使劲从头吼到尾，连炮声都压不住，编剧好不容易憋出一句严肃台词，观众笑场了，
美术蒙太奇特效闪回把观众拖进三国演义片场，导演说我来想一场比《敦刻尔克》更震撼的音效，差点将观众周五早上吃的千层饼倒腾出来，演员说我都这么用力煽情了你怎么还不感动，好，那那我直接拔高主题
我们一起爱国吧，你这该哭了吧。 什么？你想上厕所？那好，我掐电源了，啥？你还有意见想退票，别人情绪都这么稳定，为啥你有意见，不收割你还得了。
wood wins categroy,the very clear winner with the higest number of points ever awarded in this section at this festival