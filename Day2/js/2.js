function sum(num1,num2){
    if(typeof num1 ==='undefined'){
        num1=0;
    }
    if(num2 === undefined){
        num2=0;
    }
    var total=num1+num2;
    total*=20;
    console.log(total.toFixed(3));
}
sum(12,23);