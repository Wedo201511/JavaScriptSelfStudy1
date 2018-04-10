var utils = {
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
            par=par.offsetParent;
        }
        // var result={};
        // result["top"]=disTop;
        // result["left"]=disLeft;
        return {top:disTop,left:disLeft};
       
    },
    //win:获取或者设置关于浏览器的盒子模型信息
    win: function (attr, value) {
        //->不传value的话默认是获取样式值
        if(typeof value ==="undefined"){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
};