### 1.单词拆分
~~~
leetcode 140
function wordBreak(s, wordDict) {
    const wordMap = {}
    wordDict.forEach(w => wordMap[w]=true)
    const memo = {}
    const result = recur(0)

    rteurn result.map(sentence => {
        return sentence.join(' ')
    })

    function recur(start) {
        if (start > s.length-1) return [[]]
        if (memo[start] !== undefined) return memo[start]
        res = []
        for (let i = start+1; i <= s.length; i++) {
            let word = s.substring(0, i)
            if (wordMap[word]) {
                let rest = recur(i)
                for (let j = 0; j < rest.length; j++) {
                    res.push([word, ...rest[j]])
                }
            }
        }
        memo[start] = res
        return res
    }
}
~~~