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
### 10.链表相交
~~~
leetcode 160
双指针交换
intersection = (s, t) {
    let list1 = s
    let list2 = t
    while (list1 != list2) {
        list1 = list1 ? list1.next : t
        list2 = list2 ? list2.next : s
    }
    return list1
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
### 13.旋转排序数组中最小值
~~~
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
### 17.最长回文子串
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
### 24.
~~~
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