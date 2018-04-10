function queryURlParameter(url) {
    var questionIndex = url.indexOf('?');
    var objResult = {};
    if (questionIndex === -1) {//url中没有问号传参，直接返回空对象
        return null;
    }
    url = url.substr(questionIndex + 1);
    console.log(url);
    var ary = str.split('&'); //["wd=node", "rsv_spt=1", "issp=1"]
    var objResult = {};
    for (var i = 0; i < ary.length; i++) {
        var curAry = ary[i].split('=');        
        objResult[curAry[0]] = curAry[1];
    }
    return objResult;
}
console.log(queryURlParameter('https://www.baidu.com/s?wd=node&rsv_spt=1&issp=1'));
console.log(queryURlParameter('https://www.baidu.com/s?wd=javascript&rsv_spt=1&issp=1'));