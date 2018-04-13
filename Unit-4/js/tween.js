~function () {
    var zhufengEffect = {
        //匀速公式
        Linear: function (t, b, c, d) {
            return c * (t / d) + b;        //(time / duration) * change + begin
        }
    };

    //->move:实现多方向运动
    /**
    *curEle->运动的元素
    *target->每一个方向的目标位置{left:xxx,right:xxx,...}
    *duration->动画的总时间
    */
    function move(curEle, target, duration, callBack) {
        //->在每一次执行方法之前，首先把当前元素正则运行的动画结束掉
        window.clearInterval(curEle.zhufengTimer);

        var begin = {}, change = {};
        for (var key in target) {
            //->key:方向，例如:top/left...
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.zhufengTimer = window.setInterval(function () {
            time += 10;
            if (time >= duration) {//到达目标，结束动画
                utils.css(curEle, target);
                window.clearInterval(curEle.zhufengTimer);

                //->在动画结束的时候，执行回调函数，（如果用户把回掉函数传递进来了，就把用户传递进来的那个函数执行）
                //typeof callBack === "function" ? callBack() : null;              
                /*callBack && callBack()    逻辑与，如果左边为真返回右边值，如果左边为假，返回左边；callBack不传时，是undefined，是假，右边不执行。*/
                callBack && callBack.call(curEle);//不仅执行，还让回调函数中的this变为当前要操作的元素
                return;
            }
            //->没到达目标，分别获取每一个方向的当前位置，然后赋值
            for (var key in target) {
                //->key:方向，例如:top/left...
                if (target.hasOwnProperty(key)) {
                    var curPosition = zhufengEffect.Linear(time, begin[key], change[key], duration);
                    utils.css(oBox, key, curPosition);
                }
            }

        }, 10);
    }

    window.zhufengAnimate = move;
    return null;
}();

// 闭包的两大作用：
// 1、保护私有变量不受外界干扰
// 2、利用私有作用域执行不销毁的原理，存储一些值