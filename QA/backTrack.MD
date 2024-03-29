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
### 2.子集
~~~
[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]
function subSet(nums) {
    const result = []
    backTrack([], 0)
    return result
    
    function backTrack(tempPath, start) {
        result.push(temPath)
        for (let i = start ;i < nums.length; i++) {
            tempPath.push(nums[i])
            backTrack(temPath.slice(), i+1)
            tempPath.pop()
        }
    }
}
n = 2

0, [0]
1, [0,1]
~~~
### 3.组合
~~~
leetcode 39
回溯 dfs
function generateBracket(candidates， target) {
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
            backTrack(tempPath.slice(), target - candidates[i], i + 1)
            tempPath.pop(candidates[i])
        }
    }
}

leetcode 77
function combination(n, k) {
    const res = []
    dfs([], 1)
    function dfs(temp, start) {
        if (temp.length == k) {
            console.log(`得到一个结果啦：`, temp)
            res.push(temp.slice())
            return
        }
        for (let i = start; i <= n; i++) {
            temp.push(i)
            console.log(i,`被加了进来，此时temp为:`, temp)
            dfs(temp, i+1)
            console.log('终于遍历完了')
            temp.pop()
            console.log(i,`被删了，此时temp为:`, temp)
        }
    }
    return res
}

combination(4, 2)

~~~
### 4.全排列
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

function twoDemensionArrayPermutation(arrays) {
    const len = arrays.length
    let result = ['']

    for(let i = 0; i < len; i++) {
        result = traverse(arrays[i], result)
    }
    console.log(result)
    return result

    function traverse(arr1, res) {
        const arr = []
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < arr1.length; j++) {
                const temp = res[i]+arr1[j]
                arr.push(temp)
            }
        } 
        return arr
    }
}
twoDemensionArrayPermutation([['a','b'],['c','d'],['e','f']])

function wholePermutation(candidates) {
    const result = []
    const map = {}
    backTrack([])
    return Array.from(new Set(result))

    function backTrack(tempPath) {
        if (tempPath.length == candidates.length) {
            result.push([...tempPath])
            return
        }
        for (let i = 0 ;i < candidates.length; i++) {
            if (!map[i]) {
                map[i] = true
                tempPath.push(candidates[i])
                backTrack(tempPath.slice())
                map[i] = false
                tempPath.pop(candidates[i])
            }
            
        }
    }
}
~~~

### 5.分割回文
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
            if (s[l++] !== s[r--]) return false
        }
        return true
    }
}
~~~
### 6.字母大小写全排列
~~~
leetcode 784
//回溯
function allPermutations(S) {
    const set = new Set()
    backTrack(0, [])
    return Array.from(set)
    function backtrack(start, str) {
        if (start === S.length) {
            set.add(str)
            return 
        }
        let cur = S[start]
        let low = str + cur.toLowerCase()
        let high = str + cur.toUpperCase()
        backTrack(start+1, low)
        backTrack(start+1, high)
    }
}
~~~
### 7.电话号码的字母组合  
~~~
function letterCombinations(digits) {
    if (!digits) return []
    let len = digits.length
    let map = new Map()
    map.set('2','abc');
    map.set('3','def');
    map.set('4','ghi');
    map.set('5','jkl');
    map.set('6','mno');
    map.set('7','pqrs');
    map.set('8','tuv');
    map.set('9','wxyz');
    const ans = [];

    function backTrack(index, currentString) {
        if (index == len) {
            ans.push(currentString)
            return
        }
        let temp = map.get(digits[index])
        for (let i = 0; i < temp.length; i+) {
            backTrack(index+1, currentString+temp[i])
        }
    }
    backTrack(0, '')
    return ans
}
~~~
### 8.目标和
~~~
leetcode 494
function sum(nums, target) {
    let count = 0
    backTrack(0, 0)
    backTrack(index, sum) {
        if (index == nums.length) {
            if (sum == target) {
                count++
            }
        } else {
            backTrack(index+1, sum+nums[index])
            backTrack(index+1, sum-nums[index])
        }
    }
    return count
}
~~~
### 9.恢复ip地址
~~~
leetcode 93
function restoreIpAddress(strings) {
    const res = []
    dfs(strings, [])

    funtion isValid(numbers) {
        if(numbers.length > 3) return
        return numbers[0] == '0' ? numbers.length == 1 : parseInt(numbers) < 256
    }

    function dfs(remains, temp) {
        if (isValid(remains) && temp.length == 3) {
            res.push([...temp, remains].join('.'))
            return
        }

        for (let i = 1; i < 4; i++) {
            if (isValid(remains.substr(0, i))) dfs(remains.substr(i), [...temp, remains.substr(0, i)])
        }
    }
    return res  
}
~~~
### 1.甲板上的战舰
~~~
leetcode 419
dfs
function countBattleShips(board) {
    let row = board.length
    let column = board[0].length
    let counts = 0
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (board[i][j] === 'X') {
                counts++
                dfs(i, j)
            }
        }
    }
    return counts

    function dfs(r, c) {
        if (
            r < 0 || c < 0 ||
            r >= row || c >= column || board[r][c] !== 'X'
        ) return
        board[r][c] = '0'
        dfs(r-1, c)
        dfs(r+1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    }
}
~~~
### 2.路径总和
~~~
leetcode 112
~~~
### 3.岛屿的最大面积
~~~
leetcode 695
function largestIsland(grid) {
    let result = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] = '1') {
                const counts =  dfs(i, j)
                result = Math.max(result, counts)
            }
        }
    }

    dfs(row ,column) {
        if (row < 0 || column < 0 || row >= grid.length || column >= grid.length || grid[row][column] == '0') return
        grid[row][column] = '0'
        let count = 1
        count += grid(row-1, column)
        count += grid(row+1, column)
        count += grid(row, column-1)
        count += grid(row, column+1)
        return count
    }
}
~~~
### 4.单词搜索 && 矩阵中的路径
~~~
function wordSearch(board, word) {
    
    function dfs(row, column, index) {
        if (row < 0 || column < 0 || row >= board.length || column >= board[0].length || board[row][column] !== word[index]) return 
        if (index == board.length - 1) return true

        let temp = board[row][column]
        board[row][column] = '-'
        let res = dfs(row-1, column, index+1) ||
                    dfs(row+1, column, index+1) ||
                    dfs(row, column-1, index+1) ||
                    dfs(row, column+1, index+1) ||
        board[row][column] = temp
        return res
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if dfs(i,j,0) return true
        }
    }
    return false
}
~~~
### 5.机器人的活动范围
~~~
function robots(m, n, k) {
    const set = new Set()
    let count = 0
    dfs(0, 0)
    return count
    function dfs (row, column) {
        if (row < 0 || column < 0 || row >= m || column >= n || set.has(`${m}${n}`) || sum(row) + sum(column) > k) return
        set.add(`{m}{n}`)
        count++
        dfs(row-1, column)
        dfs(row+1, column)
        dfs(row, column-1)
        dfs(row, column+1)
    }

    function sum(num) {
       return  num.toString().split('').reduce((total, cur) => Number(total) + Number(cur))
    }
}
~~~
### 6.数字翻译成字符串
~~~
function translator(nums) {
    cons s = nums.toString()

    function dfs(index) {
        if (index >= s.length - 1) {
            return 1
        }
        const number = Number(s[index]+s[index+1])
        if (number > 10 && number < 26) {
            return dfs(index+1) + dfs(index+2)
        } else {
            return dfs(index+1)
        }
    }
    return dfs(0)
}
~~~
### 7.打家劫舍
~~~
function robber(root) {
    const rootStatus = dfs(root)
    return Math.max(rootStatus[0], rootStatus[1])
    
    function dfs(node) {
        if (node == null) return [0, 0]
        let l = dfs(node.left)
        let r = dfs(node.right)
        let rob = node.val + l[1] + r[1]
        let notRob = Math.max(l[0], l[1]) + Math.max(r[0], r[1])
        return [rob, notRob]
    }
}
~~~
### 8.n皇后
~~~
function nQueens(n) {
    const res = []
    for (let i = 0 ; i < n; i++) {
        res[i] = new Array(n).fill('.')
    }

    function dfs(r) {
        if (r === n) {
            res.map((l) => {
                return l.join('')
            })
            return
        }
        for (let c = 0; c < n; c++) {
            if (isValid(r, c)) {
                res[r][c] = 'Q'
                dfs(i + 1)
                res[r][c] = '.'
            } 
        }
    }

    function isValid(row, column) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                if (res[row][column] == 'Q' && (j == column || i + j == row + colum || i - j == row - column)) {
                    return false
                }
            }
        }
        return true
    }

    return res
}
~~~
### 水域大小
~~~
function areaOfWater(matrix) {
    let m = matrix.length
    let n = matrix[0].length
    let min = 0
    let area = 0
    const result
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[m][n] === 0) {
                area = 0
                dfs(i, j)
                result.push(area)
            }
        }
    }

    return result

    function dfs(l, r) {
        if (l < 0 || r < 0 || l >=m || r >=n) return
        if (matrix[l][r]) {
            matrix[l][r] = 1
            area++
            dfs(l+1, r)
            dfs(l-1, r)
            dfs(l+1, r+1)
            dfs(l+1, r-1)
            dfs(l-1, r-1)
            dfs(l-1, r+1)
            dfs(l, r+1)
            dfs(l, r-1)
        }
    }
}
~~~
### 21.分割等和子集
~~~
leetcode 416
function canPartition(nums) {
    const sum = nums.reduce((a, b)=> a+=b);
    if (sum%2) return false
    const target = sum/2
    const memo = new Map()

    function dfs(curSum, i) {
        if (i >= nums.length || curSum > target) return false
        if (curSum = target) return true
        const key = curSum+'&'+i
        if (memo.has(key)) {
            return memo.get(key)
        }
        const res = dfs(curSum+nums[i], i+1) || dfs(curSum, i+1)
        memo.set(key, res)
        return res
    }
}
~~~
### 22.jump game
~~~
leetcode 1340
var maxJumps = function(arr, d) {
    let len = arr.length
    const memo = new Array(len).fill(-1)

    function recur(index) {
        if (memo[index] !== -1) {
            return memo[index]
        }
        let res = 1
        //往右边眺
        for (let j = index+1; j < len && j <= index+d && arr[index] > arr[j]; j++){
            res = Math.max(res, recur(j)+1)
        }

        //往左边边眺
        for (let j = index-1; j >= 0 && j >= index-d && arr[index] > arr[j]; j--){
            res = Math.max(res, recur(j)+1)
        }
        memo[index] = res
        return res
    }

    let res = 1
    arr.forEach((item, idx) => {
        res = Math.max(res, recur(idx))
    })
    return res
}
~~~
### 23 重新安排行程
~~~
leetcode 332
function reschedualItinerary (tickets) {
    const targets = {}
    for (let i = 0; i < tickets.length; i++) {
        let s = tickets[i][0]
        let t = tickets[i][1]
        if (!targets[s]) {
            targets[s] = [t]
        } else {
            let j = targets[s].length -1
            while (targets[s][j] < t) j--
            if (j == targets[s].length-1) {
                targets[s].push(t)
            } else if(j < 0) {
                targets[s].unshift(t)
            } else {
                targets[s].splice(j+1, 0, t)
            }
        }
    }

    const res = []
    let dfs = function(node) {
        let ts = targets[node]
        while (ts && ts.length > 0) {
            dfs(ts.pop())
        }
        res.push(node)
    }
    dfs('JFK')
    return res.reverse()
}
~~~
### 24.去除无效括号
~~~
leetcode 301
function removeBracket(str) {
    if (s.length < 1) return ['']
    let minLen = str.length
    let res = []
    recursive(0,0,0,[],0)
    return res

    function recursive(index, l_c, r_c, cur, ignored_n) {
        if (index == str.length) {
            if (l_c == r_cn && ignored_n <= minLen) {
                if (ignored_n < minLen) {
                    res = []
                    minLen = ignored_n
                }
                const validExp = cur.slice().join(''))
                if (!res.includes(validExp) res.push(validExp)
            }
        } else {
            if (str[index] == '(' && str[index] == ')') {
                cur.push(str[index])
                recursive(index+1, l_c, r_c, cur, ignored_n)
                cur.pop()
            }
            recursive(index+1, l_c, r_c, cur, ignored_n+1)
            
            cur.push(str[index])
            if (str[index] == '('） {
                recursive(index+1, l_c+1, r_c, cur, ignored_n)
            } else if (l_c > r_c) {
                recursive(index+1, l_c+1, r_c, cur, ignored_n)
            }
            cur.pop()
        }
    }
}
~~~
### 我能赢吗
~~~
leetcode 464
function canIwin(maxChoosableInteger, desiredTotal) {
    let sum = (1+maxChoosableInteger)*maxChoosableInteger/2
    if (sum < desiredTotal) return false
    if (desiredTotal <=0 ) return true
    let memo = {}
    let initialNums = new Array(maxChoosableInteger).fill(0)
    initialNums = initialNums.map((item, index) => {
        return index+1
    })

    return recur(initialNums, desiredTotal)

    function recur(nums, target) {
        let str = nums.join('')
        if (memo[str]) {
            returm memo[str]
        }
        if (nums[nums.length-1] >= target) {
            memo[str] = true
            return true
        }

        for (let i = 0; i < nums.length; i++) {
            let nextNums = nums.slice(0,i).cancat(nums.slice(i+1))
            if (!recur(nextNums, taget-nums[i])) {
                memo[str] = true
                return true
            }
        }

        memo[str] = false
        return false
    }
}
~~~

### 加权嵌套序列和 II  
~~~
leetcode 364
function deepSumInverse (nestedList) {
    let weighted = 0
    let unWeighted = 0
    let list = nestedList
    while (list.length > 0) {
        let nextLevelList = []
        for (let i = 0; i < list.length; i++) {
            let c = list[i]
            if (c.isInteger()) {
                unWeighted += c.getInteger()
            } else {
                nextLevelList = nextLevelList.concat(c.getList())
            }
        }
        weighted += unWeighted
        list = nextLevelList
    }
    return weighted
}
~~~
### 花括号展开
~~~
leetcode 1087
function expand(S) {
    const res = []
    const n = S.length
    recur(0, [])
    return res

    functiom recur(i, cur) {
        if (i == n) {
            res.push(cur.slice().join(''))
        }
        let c = S[i]
        if (c != '{' && c != '}') {
            cur.push(c)
            recur(i+1, cur)
            cur.pop()
        } else if (c == '{') {
            let j = i
            while (S[j] != '}') {
                j++
            }
            const temp = S.substring(i+1, j)
            const list = temp.split(',').sort()
            for (let t = 0; t < list.length; t++) {
                cur.push(list[t])
                recur(j+1, cur)
                cur.pop()
            }
        }
    }
}
~~~
### 组合总和
~~~
leetcode 377
function combinationSum(nums, target) {
    const m = new Map()
    return backtrack(target)

    function backtrack(target) {
        if (target < 0) return 0
        if (target === 0) return 1
        if (m.has(target)) return m.get(target)
        let res  = 0
        for (let i = 0; i < nums.length; i++) {
            res += backtrack(taregt-nums[i])
        }
        m.set(target, res)
        return res
    }
}
~~~
### 青蛙跳河
~~~
leetcode 403
function fogJump(stones) {
    const set = new Set()
    return backTrack(stones, 0 , 0, set)
    function backTrack(stones, index, k, set) {
        const cur = index*1000 + k
        if (set.has(cur)){
            return false
        } else {
            set.add(cur)
        }
        for (let i = index+1; i < stones.length; i++) {
            const gap = stones[i] - stones[index]
            if (gap >= k - 1 && gap <= k+1) {
                if (backTrack(stones, i, gap, set)) {
                    return true
                }
            } else if (gap > k+1) {
                break
            }
            
        }

        return index == stones.length - 1
    }
}
~~~