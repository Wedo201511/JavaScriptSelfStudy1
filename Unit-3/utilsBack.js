//->使用惰性思想（JS高阶编程技巧之一）来封装我的常用方法库：第一次在给utils赋值的时候，我们就已经把兼容处理好了，把最后的结果存放在flag变量中，以后在
//每一个方法中，只要IE678不兼容的，我们不需要重新检测，只需要使用flag的值即可。
var utils = (function () {
    var flag = "getComputedStyle" in window;//->flag这个变量不销毁，存储的是判断当前的浏览器是否兼容getComputedStyle，兼容的话是标准浏览器，如果flag=false说明当前浏览器是IE6~8
    //->兼容所有browser：实现将类数组转化为数组
    function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);//标准浏览器
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;

    }
    //->把JSON格式的字符串转换 为JSON格式的对象
    function jsonParse(str) {
        var val = null;
        try {
            val = JSON.parse(str);//IE6~7的window没有JSON对象
        } catch (e) {
            val = eval("(" + str + ")");
        }
        return val;
    }
    function queryURLParameter(urlStr) {
        // var str="http://kbs.sports.qq.com/kbsweb/game.htm?mid=100000&cid=1467086&app=1.0";
        var reg = /([^?=&]+)=([^?=&]+)/g;
        var obj = {};
        urlStr.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }


    //获取当前元素距离body的左偏移和上偏移(不管它的父级参照物是谁)
    function offset(curEle) {
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

    }
    //win:获取或者设置关于浏览器的盒子模型信息
    function win(attr, value) {
        //->不传value的话默认是获取样式值
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    //格式化时间字符串

    //获取当前元素所有经过浏览器计算的样式
    function getCss(curEle, attr) {
        var val = null;
        if (/MSIE (6|7|8)/.test(window.navigator.userAgent)) {
            val = curEle.currentStyle[attr];
        } else {
            val = window.getComputedStyle(curEle, null)[attr];
        }
        return val;
    }
    //获取curEle下所有的元素子节点（兼容所有浏览器），如果传递了tagName，可以在获取的结合中进行二次筛选
    function children(curEle, tagName) {
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
    }

    //->prev:获取上一个哥哥元素节点
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;//IE6~8没有previousElementSibling，但是有previousSibling
        }
        //不兼容时，首先获取当前元素的上一个哥哥节点，判断是否为元素节点，不是的话基于当前的继续找上一个哥哥节点。。。一直到找到哥哥元素节点为止，如果没有哥哥元素节点，返回null即可。
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }
    //->获取下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;//IE6~8没有previousElementSibling，但是有previousSibling
        }
        //不兼容时，
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }
    //->prevAll获取所有的哥哥元素节点
    function preAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);//放在数组开头位置
            pre = this.prev(pre);
        }
        return ary;
    }
    //->nextAll获取所有的弟弟节点
    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }
    //->sibling:获取相邻的两个元素节点
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary;
    }
    //->sibling:获取所有的兄弟元素节点
    function siblings(curEle) {
        return this.preAll(curEle).concat(this.nextAll(curEle));
    }
    //->index获取当前元素的索引
    function index(curEle) {
        //有几个哥哥，索引就是几
        return this.preAll(curEle).length;
    }
    //->获取第一个元素子节点，获取最后一个元素子节点，这两个方法JQeury中也没有
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    //append:向指定的容器末尾追加元素
    function append(newEle, container) {
        container.appendChild(newEle);
    }
    //prepend:向指定的容器开头追加元素
    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
        }
        container.appendChild(newEle);
    }
    //insertBefore：向容器中指定元素的前面追加元素
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }
    //insertAfter：向容器中，把新元素（newEle）追加到指定元素(oldEle)的后面
    //相当于追加到oldEle弟弟元素的前面
    function insertAfter(newEle, oldEle) {
        var nex = this.nextSibling(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }
    //-》hasClass:验证当前元素是否包含某一个样式类名
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    //addClass:给元素增加样式类名
    function addClass(curEle, className) {
        //1、把className字符串按照一到多个空格拆分成数组，为了防止参数包含多个样式类名
        var ary = className.split(/ +/g);
        //console.log(ary);
        for (var i = 0; i < ary.length; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName
            }
        }
    }

    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }
    //->getElementsByClassName:通过元素的样式类名获取一组元素集合
    //->className:要获取的样式类名（可能是一个也可能是多个）
    //->context:获取元素的上下文->不传递的话，default value is document
    function getElementsByClassName(strName, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strName));
        }

        //->IE6~8
        var ary = [];
        var strClassAry = strName.replace(/(^ +| +$)/g, "").split(/ +/g);//以多个空格拆分成数组
        var nodeList = context.getElementsByTagName("*");//获取所有标签       
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            var isOK = true;//->假设curNode包含所有样式
            for (var k = 0; k < strClassAry.length; k++) {
                var curName = strClassAry[k];
                var reg = new RegExp("(^| +)" + curName + "( +|$)")
                if (!reg.test(curNode.className)) {
                    isOK = false;
                    break;
                }
            }
            if (isOK) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }
    //给当前元素的某一个样式属性设置值（增加在行内样式上）
    function setCss(curEle, attr, value) {
        //->在js中设置float样式值的话，也需要处理兼容
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
            return;
        }

        //->如果打算设置的是元素的透明度，我们需要设置两套样式来兼容所有的浏览器
        if (attr === "opacity") {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }

        //->对于某些样式属性，如果传递进来的值没有加单位，我们需要把单位默认的补充上，这样的话更人性化
        //->自动补充单位
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {//在判断传递进来的value是否是一个有效数字，是有效数字证明没有带单位，需要补上
                value += "px";
            }
        }
        curEle["style"][attr] = value;
    }

    //->setGroupCss:给当前元素批量的设置样式属性值
    function setGroupCss(curEle, options) {
        //if(Object.prototype.toString.call(options)!=="[object Object]"){
        options = options || 0;
        if (options.toString() !== "[object Object]") {
            return;
        }
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.setCss(curEle, key, options[key]);
            }

        }
    }
    //->css:此方法实现获取，单独设置，批量设置元素的样式值
    function css(curEle) {
        var argTwo=arguments[1];
        if(typeof argTwo ==="string"){//第二个参数是字符串，很有可能是在获取样式（还需要判断是否存在第三个参数，
            //如果有第三个参数，不是获取了，而是在单独设置样式属性值
            var argThree=arguments[2];
            if(!argThree){
                return this.getCss.apply(this,arguments);
            }
            //->第三个参数存在则为单独设置
            this.setCss.apply(this,arguments);           //this.setCss(curEle,argTwo,argThree);
           return;
        }

        argTwo=argTwo||0;
        if(argTwo.toString()==="[object Object]"){
            //->批量设置
            this.setGroupCss(arguments);
        }
    }
    //->把外界需要使用的方法暴露给utils
    //把方法都写在了不销毁的私有作用域当中，哪些方法外面需要使用的话，通过return暴露给utils这个命名空间
    return {
        listToArray: listToArray,
        queryURLParameter: queryURLParameter,
        offset: offset,
        win: win,
        children: children,
        prev: prev,
        next: next,
        preAll: preAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClassName: getElementsByClassName,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css:css
    }
})();


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