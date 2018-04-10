/*
*需求：点击哪个Li，就让其有SELECT样式类（对应的DIV也有这个样式类），其余的Li（DIV）都移除SELECT样式类

*不管点击哪个Li，我首先让所有的Li（DIV）都移除SELECT,再让当前点击的有SELECT样式类
*/

var tabBox=document.getElementById("tabBox");
var oList=tabBox.getElementsByTagName("li");
var oDivList=tabBox.getElementsByTagName('div');

//=>创建一个函数，实现页卡切换的功能
function change(index) {
    for (var i = 0; i < oList.length; i++) {
         oList[i].className='';
         oDivList[i].className='';        
    }
    oList[index].className='select';
    oDivList[index].className='select'; 
}

for (var i = 0; i < oList.length; i++) {
     oList[i].onclick=function(){
         change(i);
         console.log(i);//=>给元素点击事件绑定方法，点击才知晓，此处绑定属于创建函数，所有空间中存储的都是字符串：i不是变量，是字符
         
     };

}
//循环结束后i=3；
//-->假设用户开始点击第二个Li，开始知晓第二个绑定的方法（方法执行，形成一个新的作用域，把之前存储的字符串变为代码执行 console.log(i))