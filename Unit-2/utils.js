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
    }
};