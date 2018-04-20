(function () {
    var banner = document.getElementById("banner");
    var bannerInner = utils.getElementsByClassName("inner", banner)[0];
    var bannerTip = utils.children(banner, "ul")[0];
    var imgList = bannerInner.getElementsByTagName("img");
    //1.实现数据绑定：AJAX请求数据
    var jsonData = null, count = null;
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
    //2\、按照字符串拼接的方式绑定数据
    ~function () {
        //1)绑定轮播图区域的数据
        var str = "";
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                str += '<div><img src="" trueImg="' + jsonData[i]['img'] + '"/></div>';
            }
            str += '<div><img src="" trueImg="' + jsonData[0]['img'] + '"/></div>';//把第一张图片复制一份 放到所有图片的末尾（为了实现无缝滚动）
        }
        bannerInner.innerHTML = str;
        count = count + 1;
        utils.css(bannerInner, "width", count * 1000);

        //2)绑定焦点区域的数据     //li的个数也需要动态绑定
        var str = "";
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                i === 0 ? str += '<li class="bg"></li>' : str += '<li></li>';
            }
        }
        bannerTip.innerHTML = str;
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
                    //  fadeIn(curImg);
                    window.zhufengAnimate(curImg, { opacity: 1 }, 300);
                    oImg = null;
                };
            }(i);
            var curImg = imgList[i];
            var oImg = new Image();
            oImg.src = curImg.getAttribute("trueImg");
            oImg.onload = function () {
                curImg.src = this.src;
                curImg.style.display = "block"
                //  fadeIn(curImg);
                // window.zhufengAnimate(curImg, { opacity: 1 }, 500);
                oImg = null;
            };
        }

        curImg.isLoad = true;
    }
    window.setTimeout(lazyImg, 500);

    //4、自动轮播
    var autoTimer = window.setInterval(autoMove, 2000);
    var step = 0;//记录步长*当前是哪一张图片，零是第一张图片
    function autoMove() {
        //第一张 step=0 运动到  0~-1000
        //第二张 step=1 运动到-1000~-2000
        //第三张 step=2 运动到-2000~-3000
        //第四张 step=3 运动到-3000~0
        if (step == count - 1) {
            utils.css(bannerInner, "left", 0);
            step = 0
        } else {
            step++; 
            zhufengAnimate(bannerInner, { left: -step * 1000 }, 500);
        };


    }
})();