
var newsBox=document.getElementById('newsBox');
var newsList=newsBox.getElementsByTagName('li');
//=>获取的结果也是一个对象数据类型的值
//1.以数字作为属性名，每一个属性存储的都是获取到的每一个li，JS中我们把数字属性名叫做“索引”（索引是逐级递增的）
//2.有一个length的属性，存储的是当前集合中li的个数
//=>具备以上两个特点，特别像数组，但是不是数组，所以我们把他称之为类数组
for(var i=0;i<newsList.length;i++){
    if (i%2==1){
        newsList[i].style.backgroundColor='#EEE';
    }
}
console.dir(newsList);