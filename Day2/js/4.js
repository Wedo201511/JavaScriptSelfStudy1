'use strict'
//=>任意数求和
function sum(){
    var total=null;
    for (let i = 0; i < arguments.length; i++) {
        var cur = Number(arguments[i]);  
        !isNaN(cur)? total+=cur : null;
    }
    return total;
}
var total=sum(10,20,30);//=>外面是全局下的total，和函数中的total没有必然的联系
console.log(total.toFixed(2));


 