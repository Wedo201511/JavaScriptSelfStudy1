let Vertex = require('./Vertex');
let NextVertex = require('./NextVertex');
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
            // Set will auto delete duplicate data
            vertexSet.add(route[0]);
            vertexSet.add(route[1]);
        }
        // init vertexList
        vertexSet.forEach(item => {
            this.vertexList.push(new Vertex(item));
        })

        for (let i = 0; i < arr.length; i++) {
            let route = arr[i].trim(); // AE5
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
        this.DFSWithMaxStops(start, end, maxStops);
        return this.allPaths.filter(item => item[item.length - 1] === end).length;
    }

    getAllPathsWithStops(start, end, stops) {
        this.allPaths = []; // empty array DFS
        this.stack = [];
        this.DFSWithStops(start, end, stops);
        return this.allPaths.filter(item => item[item.length - 1] === end).length;
    }

    DFSWithMaxStops(start, end, maxStops) {
        let startNode = this.vertexList.find((item) => item.name === start);
        this.stack.push(startNode.name);
        if (this.stack.length > 1 && this.stack.peek() === this.stack[0] && this.stack.length <= maxStops) {
            this.allPaths.push(this.stack.join('-'));
        }
        if (this.stack.length > maxStops) {
            this.allPaths.push(this.stack.join('-'));
            this.stack.pop();
            return;
        }
        if (startNode.nextVertexList && startNode.nextVertexList.length) {
            for (let i = 0; i < startNode.nextVertexList.length; i++) {
                let nextV = startNode.nextVertexList[i];
                this.DFSWithMaxStops(nextV.vertex.name, end, maxStops)
            }
            this.stack.pop();
        } else {
            this.stack.pop();
        }
    }

    DFSWithStops(start, end, maxStops) {
        let startNode = this.vertexList.find((item) => item.name === start);
        this.stack.push(startNode.name);
        if (this.stack.length > maxStops) {
            this.allPaths.push(this.stack.join('-'));
            this.stack.pop();
            return;
        }
        if (startNode.nextVertexList && startNode.nextVertexList.length) {
            for (let i = 0; i < startNode.nextVertexList.length; i++) {
                let nextV = startNode.nextVertexList[i];
                this.DFSWithStops(nextV.vertex.name, end, maxStops)
            }
            this.stack.pop();
        } else {
            this.stack.pop();
        }
    }

    getAllPathsWithMaxDistance(start, end, maxDistance) {
        this.getAllPathsWithMaxStops(start, end, maxDistance);
        let count = 0;
        for (let i = 0; i < this.allPaths.length; i++) {
            if (this.computeDistance(this.allPaths[i]) < maxDistance) {
                count++;
            }
        }
        return count;
    }

    getShortestPath(start, end) {
        this.allPaths = []; // empty array DFS
        this.stack = [];
        let isCircle = start === end;
        this.DFS(start, end, isCircle);
        // console.log(this.allPaths);
        let minDistance = this.computeDistance(this.allPaths[0]);
        for (let i = 1; i < this.allPaths.length; i++) {
            let curDistance = this.computeDistance(this.allPaths[i]);
            minDistance = Math.min(minDistance, curDistance);
        }
        return minDistance;
    }

    DFS(start, end, isCircle) {
        let startNode = this.vertexList.find((item) => item.name === start);
        this.stack.push(startNode.name);

        if (this.stack.length > 1 && startNode.name === end) {
            this.allPaths.push(this.stack.join('-'));
            this.stack.pop();
            return;
        }
        if (startNode.nextVertexList && startNode.nextVertexList.length) {
            for (let i = 0; i < startNode.nextVertexList.length; i++) {
                let nextV = startNode.nextVertexList[i];
                if (!isCircle && !this.stack.includes(nextV.vertex.name)) {
                    this.DFS(nextV.vertex.name, end, isCircle)
                }
                if (isCircle && !this.stack.slice(1).includes(nextV.vertex.name)) {
                    this.DFS(nextV.vertex.name, end, isCircle)
                }
            }
            this.stack.pop();
        } else {
            this.stack.pop();
        }
    }
}

module.exports = Graph;