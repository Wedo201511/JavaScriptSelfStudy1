//jQuery与原生JS的区别：
//1、DOM映射的区别：通过jQeury选择器或者筛选的方法获取到的jQuery集合是不存在DOM的映射机制的。之前获取到的集合，之后在页面中HTML
//结构改变了，集合中的内容不会跟着自动发生变化（JS 获取的元素集合有DOM映射机制）
//2、jQuery循环的时候闭包的自动创建
~function (jQuery) {

    function zhufengBanner(selector, ajaxURL, interval) {//形成闭包
        var $banner = $("#" + selector);
        var $bannerInner = $banner.children(".bannerInner");
        var $bannerLeft = $banner.children(".bannerLeft");
        var $bannerRight = $banner.children(".bannerRight");
        var $bannerTip = $banner.children(".bannerTip");
        var $divList = null;
        var $imgList = null;
        var $oLis = null;


        var jsonData = null;
        $.ajax({
            type: "GET",
            url: ajaxURL + Math.random(),
            dataType: "json",
            async: false,//请求是同步的
            context: document.body,
            success: function (data) {
                jsonData = data;
            }
        });
        console.log(jsonData);

        //2、按照字符串拼接的方式绑定数据
        bindData();
        function bindData() {

            var str = "", str2 = "";
            $.each(jsonData, function (index, item) {
                str += '<div><img src="" trueImg="' + jsonData[index]['img'] + '"/></div>';
                index === 0 ? str2 += '<li class="bg"></li>' : str2 += '<li></li>';
            });

            $bannerInner.html(str);
            $bannerTip.html(str2);

            //绑定完成后，获取我们需要的集合
            $divList = $bannerInner.children("div");
            $imgList = $bannerInner.find("img");
            $oLis = $bannerTip.children("li");

            console.log($divList, $imgList, $oLis);
        };


        //3、图片延迟加载
        window.setTimeout(lazyImg, 500);
        function lazyImg() {
            $imgList.each(function (index, item) {
                var _this = this;
                var oImg = new Image();
                oImg.src = $(item).attr("trueImg");//$(item)等价于$(this)
                oImg.onload = function () {
                    $(item).prop("src", this.src);
                    $(_this).css("display", "block");
                    oImg = null;
                };
            });
            $divList.eq(0).css("zIndex", 1).animate({ opacity: 1 }, 300);
        }
        //4、实现自动轮播
        interval = interval || 3000;
        var step = 0;
        var autoTimer = null;
        autoTimer = window.setInterval(autoMove, interval);
        function autoMove() {
            if (step === jsonData.length - 1) {
                step = -1;
            }
            step++;
            changeBanner();
        }
        //封装一个轮播图切换的效果
        function changeBanner() {
            var $curDiv = $divList.eq(step);
            $curDiv.css("zIndex", 1).siblings().css("zIndex", 0);
            $curDiv.animate({ opacity: 1 }, 300, function () {//jQuery集合的内置遍历系统
                $(this).siblings().css("opacity", 0);
            })
            $oLis.eq(step).addClass("bg").siblings().removeClass("bg");
        }
        //5、控制左右按钮的显示隐藏和自动轮播的开始和暂停
        $banner.on("mouseover", function () {
            window.clearInterval(autoTimer);
            $bannerLeft.css("display", "block");
            $bannerRight.css("display", "block");
        }).on("mouseout", function () {
            autoTimer = window.setInterval(autoMove, interval);
            $bannerLeft.css("display", "none");
            $bannerRight.css("display", "none");
        });
        //6、实现焦点切换
        $oLis.on("click", function () {
            step = $(this).index();
            changeBanner();
        });
        $bannerLeft.on("click", function () {
            if (step === 0) {
                step = jsonData.length;
            }
            step--;
            changeBanner();
        });
        $bannerRight.on("click", function () {
            autoMove();
        });
    };

    jQuery.fn.extend({
        banner: zhufengBanner
    });
}(jQuery);

