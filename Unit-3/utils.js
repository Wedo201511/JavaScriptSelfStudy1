//->使用惰性思想（JS高阶编程技巧之一）来封装我的常用方法库：第一次在给utils赋值的时候，我们就已经把兼容处理好了，把最后的结果存放在flag变量中，以后在
//每一个方法中，只要IE678不兼容的，我们不需要重新检测，只需要使用flag的值即可。
var utils = (function () {
    var flag = "getComputedStyle" in window;//->flag这个变量不销毁，存储的是判断当前的浏览器是否兼容getComputedStyle，兼容的话是标准浏览器，如果flag=false说明当前浏览器是IE6~8

    return {
        //->兼容所有browser：实现将类数组转化为数组
        listToArray: function (likeAry) {
            var ary = [];
            try {
                ary = Array.prototype.slice.call(likeAry);//标准浏览器
            } catch (e) {
                for (var i = 0; i < likeAry.length; i++) {
                    ary[ary.length] = likeAry[i];
                }
            }
            return ary;

        },
        //->把JSON格式的字符串转换 为JSON格式的对象
        jsonParse: function (str) {
            var val = null;
            try {
                val = JSON.parse(str);//IE6~7的window没有JSON对象
            } catch (e) {
                val = eval("(" + str + ")");
            }
            return val;
        },
        queryURLParameter: function (urlStr) {
            // var str="http://kbs.sports.qq.com/kbsweb/game.htm?mid=100000&cid=1467086&app=1.0";
            var reg = /([^?=&]+)=([^?=&]+)/g;
            var obj = {};
            urlStr.replace(reg, function () {
                obj[arguments[1]] = arguments[2];
            });
            return obj;
        },


        //获取当前元素距离body的左偏移和上偏移(不管它的父级参照物是谁)
        offset: function (curEle) {

            var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
            while (par) {
                if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                    disLeft += par.clientLeft;
                    disTop += par.clientTop;
                }
                disLeft += par.offsetLeft;
                disTop += par.offsetTop;
                par = par.offsetParent;
            }
            // var result={};
            // result["top"]=disTop;
            // result["left"]=disLeft;
            return { top: disTop, left: disLeft };

        },
        //win:获取或者设置关于浏览器的盒子模型信息
        win: function (attr, value) {
            //->不传value的话默认是获取样式值
            if (typeof value === "undefined") {
                return document.documentElement[attr] || document.body[attr];
            }
            document.documentElement[attr] = value;
            document.body[attr] = value;
        },
        //格式化时间字符串

        //获取当前元素所有经过浏览器计算的样式
        getCss: function (curEle, attr) {
            var val = null;
            if (/MSIE (6|7|8)/.test(window.navigator.userAgent)) {
                val = curEle.currentStyle[attr];
            } else {
                val = window.getComputedStyle(curEle, null)[attr];
            }
            return val;
        },
        //获取curEle下所有的元素子节点（兼容所有浏览器），如果传递了tagName，可以在获取的结合中进行二次筛选
        children: function (curEle, tagName) {
            var ary = [];
            //MSIE (6|7|8)下不能使用内置的children属性，我们自己写代码实现
            if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
                var nodeList = curEle.childNodes;
                for (var i = 0, len = nodeList.lenght; i < len; i++) {
                    var curNode = nodeList[i];
                    curNode.nodeType === 1 ? ary[ary.lenght] = curNode : null;

                }
                nodeList = null;
            } else {
                //->标准浏览器中，我们直接使用children即可，但是这样获取的是一个元素集合（类数组），为了和IE6~8保持一致，我们借用数组原型上的slice
                ary = this.listToArray(curEle.children);//curNode.children是个类数组，需要转换成数组
            }
            //->二次筛选
            if (typeof tagName === "string") {
                for (var k = 0; k < ary.length; k++) {
                    var curEleNode = ary[k];
                    if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                        //不是我想要的标签
                        ary.splice(k, 1);//从k开始，删除一个
                        k--;
                    }
                }
            }
            return ary;
        },
        // //老方法
        // children: function (curEle, tagName) {
        //     var ary = [];        //MSIE (6|7|8)和chrome都走这一套

        //     var nodeList = curEle.childNodes;
        //     for (var i = 0, len = nodeList.lenght; i < len; i++) {
        //         var curNode = nodeList[i];
        //         if (curNode.nodeType === 1) {
        //             if (typeof tagName === "string") {
        //                 if (curEleNode.nodeName.toLowerCase() === tagName.toLowerCase()) {
        //                     ary[ary.lenght] = curNode;
        //                 }
        //             } else {
        //                 ary[ary.lenght] = curNode;
        //             }
        //         }

        //     } 
        //     return ary;
        // },

    }
})(); 