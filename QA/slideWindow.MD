### 1. 和至少为K的最短子数组
~~~
leetcode 862
function shortestSubarray (A, K) {
    let len = A.length
    const sum = [0]
    A.forEach((item, index)=> {
        sum.push(sum[index]+ item)
    })
    let queue = []
    let min = A.length + 1
    for (let i = 0; i < sum.length; i++) {
        / 上次的和大于本次的和，即sum[i-1]>sum[i],则不存取本次的j
        while (queue.length != 0 && sum[queue[queue.length-1]] >= sum[i]) {
            queue.pop()
        }
        while (queue.length !=0 && sum[i] - sum[queue[0]] >= K) {
            // 当本次的sum[i]>sum[滑动窗口初始值]，则取最小长度
            min = Math.min(min, i-queue[0])
            // 并删除滑动窗口初始值，而后重新push进当前i，则滑动窗口上次结束值为初始值，当前i为滑动窗口结束值
            queue.shift()
        }
        queue.push(i)
    }
    return min < A.length - 1 ? min : -1
}
~~~
### 2.最小覆盖子串
~~~
leetcode 76
function minimumSub(s, t) {
    const map = {}
    let missingCharactors = 0
    for (let i = 0; i < t.length; i++) {
        if (map[t[i]] == undefined) {
            map[t[i]] = 1
            missingCharactors++
        } else {
            map[t[i]]++
        }
    }

    let right = 0; 
    let left = 0
    let res = Infinity
    let resL
    for (right < s.length; right++) {
        const cur = s[right]
        if (map[cur] !== undefined) {
            map[cur]--
        }
        if (map[cur] == 0) {
            missingCharactors--
        }
        while (missingCharactors == 0) {
            if (right - left + 1 < res) {
                res = Math.min(res, len)
                resL = left
            }
            let leftCharactor = s[left]
            if (map[leftCharactor] !== undefined) map[leftCharactor]++
            if (map[leftCharactor] > 0) missingCharactors++
            left++
        }
    }
    return s.substring(resL, resL+res)
}
~~~