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
function sort() {
    //->把存储所有行的类数组转换为数组
    var ary = utils.listToArray(oRows);
    //->给数组进行排序
    ary.sort(function (a, b) {
        return oTHs[1].flag * (parseFloat(a.cells[1].innerHTML) - parseFloat(b.cells[1].innerHTML));
    });
    //->按照最新顺序，把每一行重新的添加到tBody中
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;

}
//->5点击第二列，实现排序
oTHs[1].flag = 1;
oTHs[1].onclick = function () {
    sort();
    changeBg();
    oTHs[1].flag *= -1;
};