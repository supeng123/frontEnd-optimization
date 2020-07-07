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
### 4.单词搜索
~~~
function wordSearch(board, word) {
    board[-1] = []
    board.push([])
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == word[0] && dfs(i,j, 0)) return true
        }
    }
    return false

    function dfs(row, column, index) {
        if (index+1 == word.length) return true
        let temp = board[row][column]
        board[row][column] = false
        if (board[row+1][column] == word[index+1] && dfs(row+1,column, index + 1)) return true
        if (board[row-1][column] == word[index+1] && dfs(row-1,column, index + 1)) return true
        if (board[row][column+1] == word[index+1] && dfs(row,column+1, index + 1)) return true
        if (board[row][column-1] == word[index+1] && dfs(row,column-1, index + 1)) return true
        board[row][column] = temp
        return
    }
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