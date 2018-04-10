/*
*需求：点击哪个Li，就让其有SELECT样式类（对应的DIV也有这个样式类），其余的Li（DIV）都移除SELECT样式类

*不管点击哪个Li，我首先让所有的Li（DIV）都移除SELECT,再让当前点击的有SELECT样式类
*/

var tabBox=document.getElementById("tabBox");
var oList=tabBox.getElementsByTagName("li");
var oDivList=tabBox.getElementsByTagName('div');

//=>创建一个函数，实现页卡切换的功能
function change(index) {//index：存储的是当前点击的li的索引
    //clear all
    for (var i = 0; i < oList.length; i++) {
         oList[i].className= oDivList[i].className=null;        
    }
    //让当前点击的有选中的样式
    oList[index].className= oDivList[index].className='select'; 
}


//ES6:自定义属性思想
for (var i = 0; i < oList.length; i++) {    
    oList[i].myIndex=i;
    oList[i].onclick= function(){
            change(this.myIndex);            
        };              
}
/*自定义属性思想
*当我们在某一个阶段需要用到一些信息，但是此时不好获取这些信息，
我们可以在之前好获取的时候，把这些后续需要用到的信息存储在元素对象的某一个自定义属性上，
以后想用的时候直接在自定义属性上获取这些信息
*
*/