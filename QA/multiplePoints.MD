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