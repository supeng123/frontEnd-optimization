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
### 搜索旋转排序数组
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
### 找到平方根
~~~
leetcode 633
function findSqure(n) {
    
}
~~~
