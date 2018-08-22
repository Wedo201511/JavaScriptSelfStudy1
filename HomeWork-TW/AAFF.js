let Vertex = require('./Vertex');
let Graph = require('./Graph');
require('./util');
//new Graph().printGraph()

class AF {
    constructor(graph, start, end) {
        this.graph = graph;
        this.start = start;
        this.end = end;
        this.isAF = true;
        this.n = this.graph.getN(),
            this.theStack = [];
        this.counterexample = '';//string
    }

    getResult() {
        this.graph.printGraph();
        this.theStack = new Array();

        if (!this.isConnectable(this.start, this.end)) {
            this.isAF = false;
            this.counterexample = "节点之间没有通路";
        } else {
            console.log('is connected...')
            for (let j = 0; j < this.n; j++) {
                let tempList = new Array(this.n).fill(0);
                this.graph.getVertexList()[j].setAllVisitedList(tempList);
            }

            this.isAF = this.af(this.start, this.end);
        }
    }

    af(start, end) {
        this.graph.getVertexList()[start].setWasVisited(true); // mark start node as visited
        this.theStack.push(start); // push start node in stack

        while (this.theStack.length) {
            let v = this.getAdjUnvisitedVertex(this.theStack.peek());
            if (v == -1) // if no such vertex,
            {
                let tempList = new Array(this.n).fill(0);
                this.graph.getVertexList()[this.theStack.peek()]
                    .setAllVisitedList(tempList);// 把栈顶节点访问过的节点链表清空
                this.theStack.pop();
            } else // if it exists,
            {
                this.theStack.push(v); // push it
            }

            if (this.theStack.length && end == this.theStack.peek()) {
                this.graph.getVertexList()[end].setWasVisited(false); // mark it
                this.printTheStack(this.theStack);
                this.theStack.pop();
            }
        }
        return this.isAF;
    }

    // 判断连个节点是否能连通
    isConnectable(start, end) {
        let queue = [];
        let visited = [];
        queue.push(start);
        while (queue.length) {
            for (let j = 0; j < this.graph.getN(); j++) {
                if (this.graph.getAdjMat()[start][j] > 0 && !visited.includes(j)) {
                    queue.push(j);
                }
            }
            if (queue.includes(end)) {
                return true;
            } else {
                visited.push(queue[0]);
                queue.shift();// 删除队列首元素
                if (queue) {
                    start = queue[0];
                }
            }
        }
        return false;
    }

    counterexample() {
        for (let integer in this.theStack) {
            counterexample += this.graph.displayVertex(integer);
            if (integer != this.theStack.peek()) {
                counterexample += "-->";
            }
        }
        return counterexample;
    }

    // 与节点v相邻，并且这个节点没有被访问到，并且这个节点不在栈中
    getAdjUnvisitedVertex(v) {
        let arrayList = this.graph.getVertexList()[v]
            .getAllVisitedList();
        for (let j = 0; j < this.n; j++) {
            if (this.graph.getAdjMat()[v][j] > 0 && arrayList[j] == 0
                && !this.theStack.includes(j)) {
                this.graph.getVertexList()[v].setVisited(j);
                return j;
            }
        }
        return -1;
    } // end getAdjUnvisitedVertex()

    printTheStack(stack) {
        let str = '';
        for (let integer in stack) {
            str += this.graph.displayVertex(integer);
            if (integer != stack.peek()) {
                str += "-->";
            }
        }
        console.log(str);
    }
}


module.exports = AF;

// let arr=[2,4,5,6];
// arr.shift();
// console.log(arr)