/*
*需求：点击哪个Li，就让其有SELECT样式类（对应的DIV也有这个样式类），其余的Li（DIV）都移除SELECT样式类

*不管点击哪个Li，我首先让所有的Li（DIV）都移除SELECT,再让当前点击的有SELECT样式类
*/

var tabBox=document.getElementById("tabBox");
var oList=tabBox.getElementsByTagName("li");
var oDivList=tabBox.getElementsByTagName('div');

//=>创建一个函数，实现页卡切换的功能
function change(index) {
    //clear all
    for (let i = 0; i < oList.length; i++) {
         oList[i].className='';
         oDivList[i].className='';        
    }
    oList[index].className='select';
    oDivList[index].className='select'; 
}
/*//使用闭包
for (var i = 0; i < oList.length; i++) {
    -function(i){
        oList[i].onclick=function(){
            change(i);            
        };
    }(i);
}

//闭包的另一种写法
for (var i = 0; i < oList.length; i++) {    
    oList[i].onclick=(function(i){
        return function(){
            change(i);            
        };
    })(i);          
}
*/
//ES6:用let就可以解决
for (let i = 0; i < oList.length; i++) {    
    oList[i].onclick= function(){
            change(i);            
        };              
}