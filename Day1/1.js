
var newsBox=document.getElementById('newsBox');
var newsList=newsBox.getElementsByTagName('li');
//=>获取的结果也是一个对象数据类型的值
//1.以数字作为属性名，每一个属性存储的都是获取到的每一个li，JS中我们把数字属性名叫做“索引”（索引是逐级递增的）
//2.有一个length的属性，存储的是当前集合中li的个数
//=>具备以上两个特点，特别像数组，但是不是数组，所以我们把他称之为类数组
/**
 * 
 
for(var i=0;i<newsList.length;i++){
    i%2===1?   newsList[i].style.backgroundColor='#EEE':null;
}
console.dir(newsList);
*/
/*设置元素的样式（但是只能操作元素的行为样式，写在内嵌或者外链中的CSS样式无法通过这个属性操作）

//=><ul style='...'></ul>
//=>window.getComputedStyle([元素],[伪类]) ||[元素].currentStyle:获取当前元素所有经过浏览器计算的样式（不管写在哪里，也不管写不写）


//=>除了以上一些常用的内置属性，我们很多时候会给元素对象设置一些自定义的属性
newsBox.myAttribute=xxx;
newsBox['myAttribute']=xxx;*/

for(var i=0;i<newsList.length;i++){
     newsList[i].className='c'+(i%3+1);
     newsList[i].originalClassName='c'+(i%3+1);//自定义属性思想
     newsList[i].onmousemove=function(){
            this.className='hover';
     };
     newsList[i].onmouseout=function(){
        this.className=this.originalClassName;
 }
}

for(var i=0;i<newsList.length;i++){
    var n=i%3,
        bg=newsList[i].style.backgroundColor;
    switch (n){
        case 0:
            bg='#555';
            break;
        case 1:
            bg='#EEE';
            break;
        case 2:
            bg='#ddd';
            break;
    }
}