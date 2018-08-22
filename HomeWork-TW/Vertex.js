class Vertex {
    constructor(name) {
        this.wasVisited = false; // 是否遍历过
        this.label = name; // 节点名称
        this.allVisitedList = [];// 节点已访问过的顶点
    }

    setAllVisitedList(allVisitedList) {
        this.allVisitedList = allVisitedList;
    }

    getAllVisitedList() {
        return this.allVisitedList;
    }

    WasVisited() {
        return this.wasVisited;
    }

    setWasVisited(wasVisited) {
        this.wasVisited = wasVisited;
    }

    getLabel() {
        return this.label;
    }

    setLabel(label) {
        this.label = label;
    }

    setVisited(j) {
        this.allVisitedList[j]= 1;
    }
}
module.exports = Vertex;