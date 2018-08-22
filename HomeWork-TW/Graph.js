let Vertex = require('./Vertex');

class Graph {
    constructor() {
        this.MAX_VERTS = 5;
        this.adjMatrix = new Array(); // 邻接矩阵
        this.vertexList = new Array(); // 顶点数组
        this.nVerts = 0;
        // this.vertexList.push(new Vertex('A'));
        // this.vertexList.push(new Vertex('B'));
        // this.vertexList.push(new Vertex('C'));
        // this.vertexList.push(new Vertex('D'));
        // this.vertexList.push(new Vertex('E'));
        // this.adjMatrix = [
        //     [0, 5, 0, 5, 7],
        //     [0, 0, 4, 0, 0],
        //     [0, 0, 0, 8, 2],
        //     [0, 0, 8, 0, 6],
        //     [0, 3, 0, 0, 0]
        // ];

        for (let i = 0; i < this.MAX_VERTS; i++) {
            this.adjMatrix[i] = new Array(this.MAX_VERTS).fill(0);
        }

        this.addVertex('A');
        this.addVertex('B');
        this.addVertex('C');
        this.addVertex('D');
        this.addVertex('E');
        this.addEdge(0, 1, 5);
        this.addEdge(0, 3, 5);
        this.addEdge(0, 4, 7);
        this.addEdge(1, 2, 4);
        this.addEdge(2, 3, 8);
        this.addEdge(3, 2, 8);
        this.addEdge(3, 4, 6);
        this.addEdge(2, 4, 2);
        this.addEdge(4, 1, 3);
        console.log(this.adjMatrix);
    }

    getVertexList() {
        return this.vertexList;
    }

    getAdjMat() {
        return this.adjMatrix;
    }

    getN() {
        return this.MAX_VERTS;
    }

    Graph22(index) {
        switch (index) {
            case 0:
                break;
            case 1:
                delEdge(4, 2);
                break;
            default:
                break;
        }
    }

    delEdge(start, end) {
        adjMat[start][end] = 0;
    }

    addEdge(start, end, weight) {// 有向图，添加边
        this.adjMatrix[start][end] = weight;

    }

    addVertex(lab) {
        this.vertexList[this.nVerts++] = new Vertex(lab);// 添加点
    }

    displayVertex(i) {
        return this.vertexList[i].label;
    }

    displayVertexVisited(i) {
        return this.vertexList[i].wasVisited;
    }

    printGraph() {
        for (let i = 0; i < this.MAX_VERTS; i++) {
            console.log("第" + this.displayVertex(i) + "个节点:" + " ");

            for (let j = 0; j < this.MAX_VERTS; j++) {
                console.log(this.displayVertex(i) + "-" + this.displayVertex(j)
                    + "：" + this.adjMatrix[i][j] + " ");
            }
            //System.out.println();
        }
    }
}
module.exports = Graph;