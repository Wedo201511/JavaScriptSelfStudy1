/*
*需求：点击哪个Li，就让其有SELECT样式类（对应的DIV也有这个样式类），其余的Li（DIV）都移除SELECT样式类

*不管点击哪个Li，我首先让所有的Li（DIV）都移除SELECT,再让当前点击的有SELECT样式类
*/

var tabBox=document.getElementById("tabBox");
var oList=tabBox.getElementsByTagName("li");
var oDivList=tabBox.getElementsByTagName('div');

/*//->优化1.合并
//优化1.合并*/
for (var i = 0; i < oList.length; i++) {    
    oList[i].myIndex=i;
    ~function(para){

        oList[i].onclick= function(){
            for (var j = 0; j < oList.length; j++) {
                oList[j].className= oDivList[j].className=null;        
            }
            this.className= 'select'; 
            oDivList[para].className='select'; 
        }; 

    }(i);
    /*
    oList[i].onclick= function(){
            for (var j = 0; j < oList.length; j++) {
                oList[j].className= oDivList[j].className=null;        
            }
            this.className= 'select'; 
            oDivList[this.myIndex].className='select'; 
        };    */          
}


/*
//优化2：性能，只清除上一个tab,不用清除所有的tab
var preIndex=0;//存储的是上一个被选中的Li索引(默认页面选中的是第一个，所以我们设置初始值是0)

for (var i = 0; i < oList.length; i++) {    
    oList[i].currentIndex=i;
    oList[i].onclick= function(){
        if (this.currentIndex===preIndex) {
            return;
        }
        //->先清除上一个选中的Li的select样式   
        oList[preIndex].className=oDivList[preIndex].className=null;
        //->先让当前点击的这个Li有select样式
        this.className=oDivList[this.currentIndex].className='select';
        //->更新 preIndex的值
        preIndex=this.currentIndex;
        };              
}*/