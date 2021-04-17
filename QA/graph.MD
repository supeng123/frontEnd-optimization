1. 可能的二分法
~~~
function canBipartition(N, dislikes) {
    const graph = []
    for (let i = 0; i <= N; i++) {
        graph[i] = []
    }
    for (let i = 0 ; i < dislikes; i++) {
        const d =  dislikes[i]
        graph[d[0]].push(d[1])
        graph[d[1]].push(d[0])
    }
    const colored = {}

    for (let i = 0; i <= N; i++) {
        if (colored === undefined && !dfs(i, 0)) {
            return false
        }
    }
    return true

    function dfs(node, color) {
        if (colored[node] !== undefined) {
            return color === colored[node]
        }
        colored[node] = color
        const neighbors = graph[node]
        for (let i = 0; i < neighbors.length; i++) {
            if (!dfs(neighbors[i], color^1)) {
                return false
            }
        }
        return true
    }
}
~~~
### T 秒后青蛙的位置  
~~~
leetcode 1377
function frogPosition(n, edges, t, target) {
    if (edges.length == 0 ) {
        if (n==target){
            return 1
        }
        return 0
    }
    const tree = {}
    edges.forEach(e => {
        let e1 = e[0]
        let e2 = e[1]
        if (!tree[e1]) {
            tree[e1] = []
        }
        tree[e1].push(e2)
        if (!tree[e2]) {
            tree[e2] = []
        }
        tree[e2].push(e1)
    })
    // console.log(tree)

    return dfs(1, t, {})
    

    function dfs(node, cur, visited) {
        if (node != 1 && tree[node].length == 1 || cur == 0) {
            if (node == target) {
                return 1
            }
            return 0
        }
        let res  = 0
        visited[node] = true
        let neis = tree[node]
        // console.log(neis)
        for (let i = 0; i < neis.length; i++) {
            let nei = neis[i]
            if (visited[nei]) {
                continue
            }
            res += dfs(nei, cur-1, visited)
        }

        if (node != 1) {
            res /= neis.length-1
        } else {
            res /= neis.length
        }
        return res
    }
}
~~~
### 通知所有员工所需的时间  
~~~
leetcode 1377

var numOfMinutes = function(n, headID, manager, informTime) {
    let leaf = [];
    for (let i = 0; i < informTime.length; i++) {
        if(informTime[i] === 0) {
            leaf.push(i);
        }
    }
    let max = 0;
    for (let i = 0; i < leaf.length; i++) {
        let nodetime = 0;
        let parent = manager[leaf[i]];
        while(parent != -1) {
            nodetime += informTime[parent];
            parent = manager[parent];
        }
        max = Math.max(nodetime, max)
    }
    return max;

};
~~~