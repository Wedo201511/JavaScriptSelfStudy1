Array.prototype.myUnique=function myUnique(){
    var obj=[];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if(typeof obj[item] !=='undefined'){
            this[i]=this[this.length-1];
            this.length--;
            i--;
            continue;
        }        
        obj[item]=item;        
    }
    obj=null;//obj只是个临时存储，完成后为了优化内存设置为null
    return this;
};

var ary=[1,2,2,2,3,2,1,2,3,2,2,2,2,4,5,2,2,7]
console.log(ary.myUnique());
var ary2=[1,2,22,2,32,2,21,2,32,2,21,2,2,43,53,2,2,7]
console.log(ary2.myUnique().sort(function(a,b){return a-b;}));