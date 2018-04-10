var ary=[1,2,2,2,3,2,1,2,3,2,2,2,2,4,5,2,2]
var obj={};
//每一次存储之前验证一项当前对象中该属性是否存在，如果存在我们则不再存储并且把当前这个重复项删除掉即可
for (var i = 0; i < ary.length; i++) {
    var cur= ary[i];
    if(typeof obj[cur]!=='undefined'){
        //=>对象中已经存在该属性：证明当前项是数组中的重复项
        ary.splice(i,1);    
        i--;
        continue;
    }
   obj[cur]=cur;//=>obj[1]=1 {1:1}存储
}


//splice删除的性能优化
for (var i = 0; i < ary.length; i++) {
    var cur= ary[i];
    if(typeof obj[cur]!=='undefined'){
        //=>对象中已经存在该属性：证明当前项是数组中的重复项
        
       // ary.splice(i,1);    //使用splice会导致后面的索引向前进一位，如果后面有很多项，消耗的性能很大
        //w我们把最后一项拿过来，替换当前要删除的这一项，然后再把最后一项删除
        //i--;
        ary[i]=ary[ary.length-1];
        ary.length--;
        i--;
        continue;
    }
   obj[cur]=cur;//=>obj[1]=1 {1:1}存储
}
console.log(ary);