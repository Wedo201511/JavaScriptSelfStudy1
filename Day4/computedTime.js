
console.log(mynum);

console.log("mynum2: "+mynum2);
var mynum=12;
var timeBox = document.getElementById('timeBox');

function computed() {
    var nowTime = new Date();
    var targetTime = new Date('2018/02/23 16:00:00');
    var spanTime = targetTime - nowTime;//=>得到的是毫秒差
    if (spanTime <= 0) {
        timeBox.innerHTML = "Start Testing";
        window.clearInterval(timer);
        return;
    }
    else {
        //=>还没到达考试时间，需要在总毫秒差中计算出还有多少小时分钟秒
        var hour = Math.floor(spanTime / (1000 * 60 * 60));
        spanTime -= hour * 60 * 60 * 1000;//=>减去小时占用的毫秒数
        var minute = Math.floor(spanTime / (1000 * 60));
        spanTime -= minute * 60 * 1000;

        var second = Math.floor(spanTime / 1000);
        spanTime -= second * 1000;

        //=>不足十位补零
        hour < 10 ? hour = '0' + hour : null;
        minute < 10 ? minute = '0' + minute : null;
        second < 10 ? second = '0' + second : null;

        timeBox.innerHTML = hour + ":" + minute + ":" + second;
    }
}
computed();

var timer=setInterval(computed,1000);