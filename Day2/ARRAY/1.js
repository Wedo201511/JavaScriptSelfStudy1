var ary=[12,23,34];

Array.prototype.aa=100;

for (var i = 0; i < ary.length; i++) {
console.log(ary[i]);
    
}

for (var key in ary){
    console.log(ary[key]);
}

//=>FOR循环只能遍历到数组私有的一些属性，而FOR IN循环可以把一些自定义的公共属性也能遍历到