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