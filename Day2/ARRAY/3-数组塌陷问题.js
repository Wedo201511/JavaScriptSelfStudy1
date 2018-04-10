var ary=[1,2,2,2,3,2,1,2,3,2,2,2,2,4,5,2,2]

//ary.length-1  最后一项的后面没有内容了，我们不需要再比较了
for (var i = 0; i < ary.length-1; i++) {
    var cur= ary[i];
    //i+1: 把当前项和后面项比较
    for (var j = i+1; j < ary.length; j++) {
        if(cur===ary[j]){
            ary.splice(j,1);
            //=>数组塌陷问题：我们使用splice删除数组中的某一项后，删除这一项后面的每一项索引都要向前进一位（在原有索引上减一），
            //此时如果我们J++，循环操作的值累加了，我们通过最新j获取的元素不是紧挨删除这一项的元素，而是跳过了一项获取的元素
            j--;//塌陷解决：先--再++，相当于没加没减，此时j还是原有索引，再获取
        }
        
    }   
}
console.log(ary);

for (var i = 0; i < ary.length-1; i++) {
    var cur= ary[i];
    //i+1: 把当前项和后面项比较
    for (var j = i+1; j < ary.length; ) {
        //if(cur===ary[j]){
        //    ary.splice(j,1); 
        //}else {
        //    j++;
        //}
        cur===ary[j]?ary.splice(j,1):j++;
    }   
}