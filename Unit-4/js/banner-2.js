(function () {
    var banner = document.getElementById("banner");
    var bannerInner = utils.getElementsByClassName("bannerInner", banner)[0];
    var bannerTip = utils.children(banner, "ul")[0];
    var divList = bannerInner.getElementsByTagName("div");
    var imgList = bannerInner.getElementsByTagName("img");
    var oLis = bannerTip.getElementsByTagName("li");

    var bannerLeft = utils.children(banner, "a")[0], bannerRight = utils.children(banner, "a")[1];
    //1.实现数据绑定：AJAX请求数据
    var jsonData = null;
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.txt?=" + Math.random(), false);//random清除浏览器缓存，false是同步请求       
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    }();
    //2、按照字符串拼接的方式绑定数据
    ~function () {
        //1)绑定轮播图区域的数据
        var str = "", str2 = "";
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                str += '<div><img src="" trueImg="' + jsonData[i]['img'] + '"/></div>';
                i === 0 ? str2 += '<li class="bg"></li>' : str2 += '<li></li>';
            }
        }
        bannerInner.innerHTML = str;
        bannerTip.innerHTML = str2;

        //
    }();

    //3、图片延迟加载
    function lazyImg() {
        for (let i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image();
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block"
                    //只对第一张图片做处理  z-index: 1;    opacity: 1;
                    if (i === 0) {
                        var curDiv = curImg.parentNode;
                        curDiv.style.zIndex = 1
                        window.zhufengAnimate(curDiv, { opacity: 1 }, 300);
                    }

                    oImg = null;
                };
            }(i);
           
        }        
    }
    window.setTimeout(lazyImg, 500);

    //4、自动轮播
    var interval = 1000;
    var autoTimer = window.setInterval(autoMove, interval);
    var step = 0;//记录当前显示的图片的索引
    function autoMove() {

        if (step === count - 1) {
            utils.css(bannerInner, "left", 0);
            step = 0
        }
        step++;
        zhufengAnimate(bannerInner, { left: -step * 1000 }, 500);
        changeTip();
    }

    //5、焦点对齐
    function changeTip() {
        var tempStep = step >= oLis.length ? 0 : step;
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            i === tempStep ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
        }
    }
    //6、停止和开启自动轮播
    banner.onmouseover = function () {
        window.clearInterval(autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    }
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
        bannerLeft.style.display = bannerRight.style.display = "none";
    }
    //7、点击焦点实现轮播图切换
    ~function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTip();
                zhufengAnimate(bannerInner, { left: -step * 1000 }, 500);
            };
        }
    }();
    //8、实现左右切换
    bannerLeft.onclick = function () {
        console.log(step);
        if (step === 0) {
            step = count - 1;
            utils.css(bannerInner, "left", -1000 * step);

        }
        step--;
        changeTip();
        zhufengAnimate(bannerInner, { left: -step * 1000 }, 500);
    };
    bannerRight.onclick = function () {
        autoMove();
    };
})();