class Vertex {
    constructor(name) {
        this.name = name; // 节点名称
        this.nextVertexList = []; // 节点已访问过的顶点
    }
}

class NextVertex {
    constructor(vertex, distance) {
        this.distance = distance;
        this.vertex = vertex;
    }
}

module.exports = {
    Vertex,
    NextVertex
};