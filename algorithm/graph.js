class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element)
    }

    dequeue() {
        return this.items.shift()
    }

    peek() {
        return this.items[0]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    toString() {
        var resultString = '';
        for (let i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }
        return resultString
    }
}

const qqq = new Queue()
console.log(qqq.isEmpty())

class Graph {
    constructor() {
        this.vertexs = []
        this.edges = new Map()
    }

    addVertex(v) {
        this.vertexs.push(v)
        this.edges.set(v, [])
    }

    addEdge(v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    toString() {
        let result = '';
        for (let i = 0; i < this.vertexs.length; i++) {
            result += this.vertexs[i] + '->';
            let vEdges = this.edges.get(this.vertexs[i])
            for (let j = 0; j < vEdges.length; j++) {
                result += vEdges[j] + ' '
            }
            result += '\n'
        }
        return result
    }

    initializeColor() {
        var colors = []
        for (let i = 0; i < this.vertexs.length; i++) {
            colors[this.vertexs[i]]='white'
        }
        return colors
    }

    bfs(initV, callback) {
        let colors = this.initializeColor()
        let queue = new Queue()
        queue.enqueue(initV)

        while(!queue.isEmpty()) {
            let v = queue.dequeue()
            let vList = this.edges.get(v)

            colors[v] = 'gray'

            for (let i = 0; i < vList.length; i++) {
                let e = vList[i]
                console.log(e)
                if (colors[e] == 'white') {
                    colors[e] = 'gray'
                    queue.enqueue(e)
                }
            }

            callback(v)
            colors[v] = 'black'
        }
    }

    dfs(initV, callback) {
        var colors = this.initializeColor()
        this.dfsNode(initV, colors, callback)
    }

    dfsNode(v, colors, callback) {
        colors[v] = 'gray'
        callback(v)
        let vList = this.edges.get(v)
        for (let i = 0; i < vList.length; i++) {
            let e = vList[i]
            if (colors[e] == 'white') {
                this.dfsNode(e, colors, callback)
            }
        }
        colors[v] = 'black'
    }
}

let graph = new Graph()
let myVertexs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertexs.length; i++) {
    graph.addVertex(myVertexs[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'B')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString())

let result = ''
graph.bfs(graph.vertexs[0], function(v) {
    result += v + ''
})
console.log(result)


function initializeColor() {
    let myVertexs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    var colors = []
    for (let i = 0; i < myVertexs.length; i++) {
        colors[myVertexs[i]]='white'
    }
    return colors
}