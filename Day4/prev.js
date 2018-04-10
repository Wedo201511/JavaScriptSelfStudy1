//=>获取当前元素的上一个哥哥元素节点，兼容所有浏览器
//=>curEle
/*
*首先获取当前元素的上一个哥哥节点，判断当前获取的节点是否为元素节点（nodeType===1）,
如果不是，基于当前获取的节点，找他的上一个哥哥节点。。。（找几次不知道）一直到找到的节点是元素节点为止，
如果在查找过程中，发现没有上一个哥哥节点了（找到头了），则不再继续查找
*/
//JQuery prev源码
function prev(curEle){
    var p=curEle.previousSibling;
    while(p!=null && p.nodeType!==1){//p p!==null
        p=p.previousSibling;
    }
    return p;
}

//扩展：
next获取下一个弟弟元素节点
prevAll：获取所有的哥哥元素节点
nextAll：获取所有的弟弟元素节点
sibings：获取所有的兄弟元素节点
index：获取当前元素在兄弟中的排名索引
//...