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