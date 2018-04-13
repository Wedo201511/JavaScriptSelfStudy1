//实现一个选项卡的封装
//构造函数方式封装插件：好处：
~function () {    
    //定义一个类
    function TabChange(container, defaultIndex) {
        return this.init(container, defaultIndex);
    }

    TabChange.prototype = {
        constructor: TabChange,
        //->按照索引来设置默认选中的页卡
        defaultIndexEvent: function () {
            //->设置默认样式
            utils.addClass(this.oList[this.defaultIndex], "select");
            utils.addClass(this.divList[this.defaultIndex], "select");
        },

        //->事件委托实现绑定切换
        liveClick: function () {
            var _this = this;
            this.tabFirst.onclick = function (e) {//e是事件对象
                e = e || window.event;
                e.target = e.target || e.srcElement;//事件源
                if (e.target.tagName.toLowerCase() === "li") {//点击的是li标签
                    detailFn.call(_this, e.target);
                   //_this.detailFn( e.target);
                }
            }
        },

        detailFn: function (curEle) {
            //this->是当前点击的li
            var index = utils.index(curEle);
            utils.addClass(curEle, "select");
            for (var i = 0; i < this.oList.length; i++) {
                i === index ? utils.addClass(this.divList[i], "select")
                    : (utils.removeClass(this.oList[i], "select"),
                        utils.removeClass(this.divList[i], "select"));
            }
        },
        
        //->初始化，也是当前插件的唯一入口
        init: function (container, defaultIndex) {
            //TabChange类的两个私有属性
            this.container = container || null;
            this.defaultIndex = defaultIndex || 0;
            this.tabFirst = utils.firstChild(this.container);//ul
            this.oList = utils.children(this.tabFirst);
            this.divList = utils.children(this.container, "div");

            this.defaultIndexEvent();
            this.liveClick();
            return this;
        }
    }
    window.zhufengTab = TabChange;
}();