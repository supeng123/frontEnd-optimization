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
        if (memo[start]) {
            return memo[start];
        }
        if (start > s.length - 1) { 
            return [[]];
        }
        const res = [];
        for (let i = start + 1; i <= s.length; i++) {
            const word = s.substring(start, i); 
            if (wordMap[word]) { 
                const restRes = recur(i);
                for (const restWords of restRes) {
                    res.push([word].concat(restWords));
                }
            }
        }
        memo[start] = res;
        return res;
    }
}
~~~