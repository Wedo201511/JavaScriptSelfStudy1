class Vertex {
    constructor(name) {
        this.name = name; // 节点名称
        this.nextVertexList = []; // 节点已访问过的顶点
    }
}

module.exports = Vertex;