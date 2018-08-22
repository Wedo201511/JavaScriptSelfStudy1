let {
    Vertex,
    NextVertex
} = require('./Vertex');
let fs = require('fs');
let path = require('path');
require('./util');

class Graph {
    constructor(filename) {
        this.vertexList = new Array(); // 顶点数组
        this.vertexCount = 0;
        this.initGraph(filename);
    }

    /**
     * @param {'input.txt'} filename 
     */
    initGraph(filename) {
        let inputStr = fs.readFileSync(path.join(__dirname, filename), 'utf8');
        let arr = inputStr.split(',');
        let vertexSet = new Set();
        for (let i = 0; i < arr.length; i++) {
            let route = arr[i].trim(); // AE5
            // todo:去重，错误处理。。。
            vertexSet.add(route[0]);
            vertexSet.add(route[1]);
        }
        // init vertexList
        vertexSet.forEach(item => {
            this.vertexList.push(new Vertex(item));
        })

        for (let i = 0; i < arr.length; i++) {
            let route = arr[i].trim(); // AE5
            // todo:去重，错误处理。。。
            let v1 = this.vertexList.find((item) => item.name == route[0]);
            let v2 = this.vertexList.find((item) => item.name == route[1]);
            v1.nextVertexList.push(new NextVertex(v2, route[2]));
        }
        console.log(this.vertexList);
    }
    getVertexList() {
        return this.vertexList;
    }
    /**
     * @returns number
     * @param 'A-E-B-C-D' route 
     */
    computeDistance(route) {
        let arr = route.split('-');
        let distance = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            let v = this.vertexList.find((item) => item.name === arr[i]);
            let nextV = v.nextVertexList.find(item => item.vertex.name === arr[i + 1]);
            if (nextV) {
                distance += Number(nextV.distance);
            } else {
                return 'NO SUCH ROUTE';
            }
        }
        return distance;
    }

    getAllPathsWithMaxStops(start, end, maxStops) {
        this.allPaths = []; // empty array DFS
        this.stack = [];
        this.DFS(start, end, maxStops);
        // let startNode = this.vertexList.find((item) => item.name === start);
        // stack.push(startNode.name);
        // if (startNode.nextVertexList && startNode.nextVertexList.length) {
        //     for (let i = 0; i < startNode.nextVertexList.length; i++) {
        //         let nextV = startNode.nextVertexList[i];
        //         stack.push(nextV.name);
        //     }
        // }

        return this.allPaths;
    }

    DFS(start, end, maxStops) {
        if (this.stack.peek() === start && this.stack.length <= maxStops) {
            console.log(this.stack.join('-'));
            this.allPaths.push(this.stack.join('-'));
        }
        if (this.stack.length > maxStops) {
            console.log(this.stack.join('-'));
            this.allPaths.push(this.stack.join('-'));
            return;
        }
        let startNode = this.vertexList.find((item) => item.name === start);
        this.stack.push(startNode.name);
        if (startNode.nextVertexList && startNode.nextVertexList.length) {
            for (let i = 0; i < startNode.nextVertexList.length; i++) {
                let nextV = startNode.nextVertexList[i];
                return this.DFS(nextV.vertex.name, end, maxStops)
            }
        }
        return this.allPaths;
    }
    getAllPathsWithStops(start, end, stops) {

    }

    getAllPathsWithMaxDistance(start, end, maxDistance) {

    }

    getShortestPath(start, end) {
        let all = this.getAllPaths(start, end);
        let mixDistance = undefined;
        if (all.length) {
            mixDistance = this.computeDistance(all[0].join('-'));
            for (let i = 1; i < all.length; i++) {
                let currentDistance = this.computeDistance(all[i].join('-'));
                currentDistance < mixDistance ? mixDistance = currentDistance : undefined;
            }
        }
        return mixDistance;
    }
}

let graphWrapper = new Graph('input.txt');
console.log(graphWrapper.getAllPathsWithMaxStops('C', 'C', 3));

module.exports = Graph;