//实现一个选项卡的封装：我们可以分析出，只要多个选项卡的主体结构一样，那么每一个实现的思想都是一模一样的，唯一不一样的
//就是最外层的盒子不一样
~function () {
    /*
    *tabChange:封装一个选项卡的插件，只要大结构保持统一，以后实现选项卡的功能，只需要调用该方法即可
    *container：当前要实现选项卡的这个容器
    *defaultIndex:默认选择的索引（页面初始化时）
    */
    function tabChange(container, defaultIndex) {
        var tabFirst = utils.firstChild(container);//ul
        var oList = utils.children(tabFirst);
        var divList = utils.children(container, "div");

        //->设置默认样式
        defaultIndex = defaultIndex || 0;
        utils.addClass(oList[defaultIndex], "select");
        utils.addClass(divList[defaultIndex], "select");

        //使用事件委托来优化我们的点击操作
        tabFirst.onclick = function (e) {//e是事件对象
            e = e || window.event;
            e.target = e.target || e.srcElement;//事件源
            if (e.target.tagName.toLowerCase() === "li") {//点击的是li标签
                detailFn.call(e.target, oList, divList);
            }
        }
    }

    function detailFn(oList, divList) {
        //this->是当前点击的li
        var index = utils.index(this);
        utils.addClass(this, "select");
        for (var i = 0; i < oList.length; i++) {
            i === index ? utils.addClass(divList[i], "select")
                : (utils.removeClass(oList[i], "select"),
                    utils.removeClass(divList[i], "select"));
        }
    }

    window.zhufengTab = tabChange;

}();