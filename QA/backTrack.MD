### 1.括号生成
~~~
leetcode 22
回溯 dfs
function generateBracket(n) {
    const result = []
    backTrack(n, n, '')
    return result
    function backTrack(leftRemain, rightRemain , str) {
        if (leftRemain === 0 && rightRemain === 0) {
            result.push(str)
            return
        }
        if (leftRemain) backTrack(leftRemain - 1, rightRemain, str + '(')
        if (rightRemain > leftRemain) backTrack(leftRemain, rightRemain - 1, str + ')')
    }
}
~~~
### 2.组合
~~~
leetcode 39
回溯 dfs
function generateBracket(candidates) {
    const result = []
    candidates.sort((a, b) => a - b)
    let tempPath = []
    backTrack(tempPath, target, 0)
    return result

    function backTrack(tempPath, target , start) {
        if (target === 0) {
            result.push(tempPath)
            return
        }
        for (let i = start ;i < candidates.length; i++) {
            if (target < candidates[i]) break;
            tempPath.push(candidates[i])
            backTrack(tempPath.slice(), target - candidates[i], i)
            tempPath.pop(candidates[i])
        }
    }
}
~~~
### 3.全排列
~~~
function wholePermutation(candidates) {
    const result = []
    backTrack([])
    return result

    function backTrack(tempPath) {
        if (tempPath.length == candidates.length) {
            result.push([...tempPath])
            return
        }
        for (let i = 0 ;i < candidates.length; i++) {
            if (tempPath.includes(candidates[i])) continue
            tempPath.push(candidates[i])
            backTrack(tempPath.slice())
            tempPath.pop(candidates[i])
        }
    }
}
~~~
### 4.分割回文
~~~
function wholePermutation(candidates) {
    const result = []
    backTrack([], 0)
    return result

    function backTrack(tempPath, start) {
        if (start == candidates.length) {
            result.push([...tempPath])
            return
        }
        for (let i = start ;i < candidates.length; i++) {
            if(!isPalindrome(start, i)) continue
            tempPath.push(candidates.slice(start, i+1))
            backTrack(tempPath, i+1）
            tempPath.pop()
        }
    }

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