### 1.无重复字符的最长子串
~~~
leecode 3
单向指针，Set
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