var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oTHs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

var data = null;
//->1.获取txt中的数据 JSON格式 Ajax(async javascript and xml)

//1)首先创建一个Ajax对象
var xhr = new XMLHttpRequest;
//2)打开我们需要请求数据的那个文件地址
xhr.open("get", "json/data.txt", true);
//3)监听请求的状态
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
        bind();
    }

};
//4)发送请求
xhr.send(null);

//->2.实现数据绑定
function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];

        var oTr = document.createElement("tr");
        for (var pro in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[pro];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
    changeBg();
}


//->3.实现隔行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "bg" : null;
    }
}

//->4.表格排序：实现按照年龄这一列排序
function sort(n) {//n是当前点击的这一列的索引
    var _this = this;
    //->把存储所有行的类数组转换为数组
    var ary = utils.listToArray(oRows);

    //->点击当前列，需要让其他列的flag的值回归到初始值-1，这样在返回头点击其他列的时候，才是按照升序排列
    for(var k=0; k<oTHs.length;k++){
        if (oTHs[k] !==this) {
            oTHs[k].flag=-1;
        }
    }
    //->给数组进行排序
    this.flag *= -1;
    ary.sort(function (a, b) {
        //this->windwo
        var curInn = a.cells[n].innerHTML;
        var nextInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(a.cells[n].innerHTML);
        var nextInnNum = parseFloat(b.cells[n].innerHTML);
        if (isNaN(curInnNum) || isNaN(nextInnNum)) {
            return _this.flag * (curInn.localeCompare(nextInn));
        }
        else {
            return _this.flag * (parseFloat(a.cells[n].innerHTML) - parseFloat(b.cells[n].innerHTML));
        }

    });
    //->按照最新顺序，把每一行重新的添加到tBody中
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;

}
//->点击排序:所有class="cursor"的列都要实现排序
for (var i = 0; i < oTHs.length; i++) {
    var curTh = oTHs[i];
    if (curTh.className === "cursor") {
        curTh.flag = -1;//用来实现升降序的
        curTh.index = i;//用来记录索引的
        curTh.onclick = function () {
            //this->oTHs[1]
            sort.call(this, this.index);//sort中的this->window，call改变this指向oTHs[1]
            changeBg();

        };
    }


}