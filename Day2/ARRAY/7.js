function bubble(ary){
    //=>外层循环控制的是比较的轮数
    for (var i = 0; i < ary.length-1; i++) {      
        //=>里层循环控制每一轮比较的次数
        for (var j = 0; j < ary.length-1-i; j++) {
           //ary[j];//本次拿出来的这一项
            //ary[j+1]
            if(ary[j]>ary[j+1]){
                //当前项比后一项大，交换位置
                var temp=ary[j];
                ary[j]=ary[j+1];
                ary[j+1]=temp;
            }            
        }
    }
    return ary;
}
var ary=[12,13,23,14,16,11];

console.log(bubble(ary));