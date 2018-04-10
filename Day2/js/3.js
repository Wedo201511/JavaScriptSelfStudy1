'use strict'
//=>任意数求和
function sum(){
    var total=null;
    for (let i = 0; i < arguments.length; i++) {
        var cur = Number(arguments[i]);
        //数字+NAN=NAN
        if(!isNaN(cur)){
            total+=cur;
        }
    }
    console.log(total);
}
console.log(total);
sum(10 , 20 );
sum();
sum(10 , 20 ,'30');
sum(10 , 20 ,'30','珠峰');