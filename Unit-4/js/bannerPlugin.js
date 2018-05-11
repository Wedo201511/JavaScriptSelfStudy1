//单例模式封装
//构造函数模式封装（封装插件肯定都用构造函数模式）
~function () {
    function AutoBanner(curEleId, interval, ajaxURL) {
        //定义实例的私有属性
        //this.xxx=xxx;
        //->把之前存储获取元素的变量都作为当前实例的私有属性
        this.banner = document.getElementById(curEleId);
        this.bannerInner = utils.getElementsByClassName("bannerInner", this.banner)[0];
        this.bannerTip = utils.children(this.banner, "ul")[0];
        this.divList = this.bannerInner.getElementsByTagName("div");
        this.imgList = this.bannerInner.getElementsByTagName("img");
        this.oLis = this.bannerTip.getElementsByTagName("li");
        this.bannerLeft = utils.children(this.banner, "a")[0], this.bannerRight = utils.children(this.banner, "a")[1];
        //->之前的全局变量也应该变为自己的私有属性
        this.jsonData = null;
        this.interval = interval || 1000;
        this.autoTimer = null;
        this.step = 0;
        this.ajaxURL = ajaxURL;
        return this.init();
    }
    //把方法都放到原型上
    AutoBanner.prototype = {
        constructor: AutoBanner,
        //AJAX请求数据
        getData: function () {
            var _this = this;
            var xhr = new XMLHttpRequest;
            xhr.open("get", _this.ajaxURL + "?_=" + Math.random(), false);//random清除浏览器缓存，false是同步请求       
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    _this.jsonData = utils.jsonParse(xhr.responseText);
                }
            };
            xhr.send(null);
        },
        bindData: function () {
            //1)绑定轮播图区域的数据
            var str = "", str2 = "";
            if (this.jsonData) {
                for (var i = 0; i < this.jsonData.length; i++) {
                    str += '<div><img src="" trueImg="' + this.jsonData[i]['img'] + '"/></div>';
                    i === 0 ? str2 += '<li class="bg"></li>' : str2 += '<li></li>';
                }
            }
            this.bannerInner.innerHTML = str;
            this.bannerTip.innerHTML = str2;
        },
        //->图片延迟加载
        lazyImg: function () {
            var _this = this;
            for (let i = 0, len = this.imgList.length; i < len; i++) {
                ~function (i) {//自执行函数里的this都指向window，所以需要一个_this指向当前实例
                    var curImg = _this.imgList[i];
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
        },
        //
        autoMove: function () {
            this.step >= this.imgList.length - 1 ? this.step = 0 : this.step++;
            this.setBanner();
        },
        //实现切换效果和焦点对齐
        setBanner: function () {
            //1) 让step索引对应的那个div的z-index=1，其余的DIV的zIndex=0
            for (var i = 0, len = this.imgList.length; i < len; i++) {
                var curDiv = this.divList[i];
                if (i === this.step) {
                    utils.css(curDiv, "zIndex", 1);
                    //2) 让当前的透明度从零逐渐变为一。动画结束时，需要让其它DIV的透明度变为零
                    zhufengAnimate(curDiv, { opacity: 1 }, 500, function () {
                        var curDivSib = utils.siblings(this);
                        for (var k = 0, len = curDivSib.length; k < len; k++) {
                            utils.css(curDivSib[k], "opacity", 0);
                        }
                    });
                    continue;
                }
                utils.css(curDiv, "zIndex", 0);
            }
            //var tempStep = step >= oLis.length ? 0 : step;
            for (var i = 0, len = this.oLis.length; i < len; i++) {
                var curLi = this.oLis[i];
                i === this.step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
            }
        },
        //->控制自动轮播
        mouseEvent: function () {
            //6、停止和开启自动轮播
            var _this = this;
            this.banner.onmouseover = function () {
                window.clearInterval(_this.autoTimer);
                _this.bannerLeft.style.display = _this.bannerRight.style.display = "block";
            }
            this.banner.onmouseout = function () {
                _this.autoTimer = window.setInterval(function () {
                    _this.autoMove.call(_this);//_this.autoMove();
                }, _this.interval);
                _this.bannerLeft.style.display = _this.bannerRight.style.display = "none";
            }
        },
        //-》实现焦点切换
        tipEvent: function () {
            var _this = this;
            for (var i = 0, len = this.oLis.length; i < len; i++) {
                var curLi = this.oLis[i];
                curLi.index = i;
                curLi.onclick = function () {
                    _this.step = this.index;
                    _this.setBanner();
                };
            }
        },
        //->实现左右切换
        leftRight: function () {
            var _this = this;
            this.bannerLeft.onclick = function () {
                console.log(_this.step);
                _this.step === 0 ? _this.step = _this.oLis.length - 1 : _this.step--;
                _this.setBanner();

            };
            this.bannerRight.onclick = function () {
                _this.autoMove();
            };
        },
        //->命令模式：init相当于指挥室，指挥各个军队协同作战
        init: function () {
            //
            var _this = this;
            this.getData();
            this.bindData();
            window.setTimeout(function () {
                _this.lazyImg();
            }, 500);
            this.autoTimer = window.setInterval(function () {
                _this.autoMove();
            }, this.interval);
            this.mouseEvent();
            this.tipEvent();
            this.leftRight();
            return this;
        }
    }
    window.AutoBanner = AutoBanner;

}();

