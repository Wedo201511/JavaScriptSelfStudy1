String.prototype.queryURlParameter = function queryURlParameter(url){
    var obj = {};
    var reg = /([^?=&]+)=([^?=&]+)/g;
    this.replace(reg, function () {
        var arg = arguments;
        obj[arg[1]] = arg[2]
    });
    return obj;
}
var str = 'https://www.baidu.com/s?wd=node&rsv_spt=1&issp=1';
console.log(str.queryURlParameter());
