### 1. 在排序数组中查找元素的第一个和最后一个位置
~~~
//二分查找
function firstAndLast(nums, target) {
    let start = 0
    let end = nums.length - 1
    while (start <= end) {
        let mid = (start + end) >> 1
        if (nums[mid] = target) break
        if (nums[mid] > target) end--
        if (nums[mid] < target) start++
    }
    if (start > end) return[-1,-1]
    let i = mid
    let j = mid
    while(nums[i] == nums[i-1]) i--
    while(nums[j] == nums[j+1]) j++
    return[i, j]
} 
~~~
### 2.搜索插入位置
~~~
//leetcode 35
二分搜索
function positionSearch(nums, target) {
    let start  = 0
    let end = nums.length
    while (start < end) {
        const mid = (start + end) >> 1
        if (nums[mid] < target) {
            start = mid + 1 
        }else {
            end = mid
        }
    }
    return start
}
~~~
### 3.旋转排序数组中最小值
~~~
leetcode 154
//二分搜索 向右比较
function minValue(arr) {
    let left = 0
    let right = arr.length - 1
    while (left < right) {
        let mid = (left + right) >> 1
        if (arr[mid] > arr[right]) {
            left = mid + 1
        } else if (arr[mid] == arr[right]) {
            right--
        } else {
            right = mid
        }
    }
    return arr[left]
}
~~~
### 4.缺失的数字
~~~
leetcode 53
//二分搜索 向右比较
function minValue(arr) {
    let left = 0
    let right = arr.length - 1
    while (left <= right) {
        let mid = (left + right) >> 1
        if (arr[mid] == mid) {
            left = mid + 1
        } else if(mid < arr[mid]) {
            right = mid - 1
        }
    }
    return left
}
~~~
### 5.数对和
~~~
function pairSum(nums, target) {
    const result = []
    nums.sort((a,b) => a - b)
    let start = 0
    let end = nums.length - 1
    while (start < end) {
        if (nums[start] + nums[end] == target) {
            result.push([nums[start], nums[end]])
            start++
            end--
        } else if (nums[start] + nums[end] < target) {
            start++
        } else if (nums[start] + nums[end] > target) {
            end--
        }
    }
    return result
}
~~~
### 6.online election
~~~
leetcode 911
var onLineElection = function(persons, times) {
    let lead = -1
    let votes = {}
    this.times = times
    this.leadings = []
    for (let i = 0; i < times.length; i++) {
        const person = persons[i]
        if (votes[person] == undefined) {
            votes[person] = 0
        }
        votes[person]++
        if (lead == -1) {
            lead = person
        }
        if (votes[person] >= votes[lead]) {
            lead = person
        }
        this.leadings.push(lead)
    }
}

onLineElection.prototype.query = function(t) {
    let left = 0
    let right = this.times.length-1
    while (left <= right) {
        let mid = Math.floor((left+right)/2)
        if (this.times[mid] == t) {
            return this.leadings[mid]
        } else if (this.times[mid] > t) {
            right = mid -1
        } else {
            left = mid + 1
        }
    }
    return this.leadings[right]
}
~~~
### 7.搜索旋转排序数组
~~~
function rotateListSearch(list, target) {
    let left = 0
    let right = list.length - 1
    let mid

    while (left <= right) {
        mid = Math.floor(left+(right-left)/2)
        if (list[target] == list[mid]) return true

        if (list[left] == list[mid]) {
            left++
            continue
        }

        if (list[left] <= list[mid]) {
            if (target >= list[left] && target < list[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            if (target <= list[right] && target > list[mid]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return false
}
~~~
### 8.找到平方根
~~~
leetcode 633
function findSqure(n) {
    for (let i = 0; i*i < n; i++) {
        let end = n - (i*i)
        if (binarySeach(0, end, end)) return true
    }
    return false

    function binarySeach(l, r, target) {
        if (l > r) return
        let mid = (l+r) >> 1
        if (mid*mid == target) {
            return true 
        } else if (mid*mid < target) {
            return binarySeach(mid+1, r, target)
        } else {
            return binarySeach(l, mid-1, target)
        }
    }
}
~~~
### 9.基于时间的键值存储
~~~
leetcode 981
function TimeMap() {
    let map = {}
}
TimeMap.prototype.set(key, value, timestamp) {
    if (this.map[key] === undefined) {
        this.map[key] = []
    }
    this.map[key].push([value, timestamp])
}
TimeMap.prototype.get(key, timestamp) {
    const list = this.map(key)
    if (!list) return ''
    const len = list.length
    if (timestamp > list[len-1][1]) {
        return list[len-1][0]
    } else if (timestamp < list[0][1]) {
        return ''
    }
    let l = 0
    let r = len
    while (l < r) {
        let mid = (l+r) >> 1
        if (list[mid][1] == timestamp) {
            return list[mid][0]
        } else if (list[mid][1] > timestamp) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return list[l][0]
}
~~~
### 在 D 天内送达包裹的能力
~~~
leetcode 1011
function dilever(weights, D) {
    let l = Math.max(...weights)
    let r = weights.reduce((a,b) => a + b, 0)
    while (l < r) {
        const mid = Math.floor((left+right)/2)
        let need = 1
        let cur = 0
        for (let w of weights) {
            if (cur+w > mid) {
                need++
                cur = 0
            }
            cur += w
        }

        if (need <= D) {
            r = mid
        } else {
            left = mid+1
        }
    }
    return left
}
~~~
### 制作 m 束花所需的最少天数
~~~
leetcode 1482
function days(bloomday, m, k) {
    if (bloomday.length < m*k) return -1
    let l = 1
    let r = Math.max(...bloomday)
    while (l <= r) {
        let mid = (r + l) >> 1
        if (canMake(mid)) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return l

    function canMake(day) {
        let count = 0
        let temp = 0
        for (let i = 0; i < bloomday.length; i++) {
            if (bloomday[i] <= day) {
                temp++
                if (temp == k) {
                    count++
                    temp = 0
                }
            } else {
                temp = 0
            }
        }
        return count >= m
    }
}
~~~
