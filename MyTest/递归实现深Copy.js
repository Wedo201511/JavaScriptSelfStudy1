var parent1 = {
	name: 'zfpx',
	home: ['1', 2, { name: 1 }],
	address: { name: '回龙观' }
}
function deepClone(originObj, copyObj) {
	let result = copyObj || {};
	for (let key in originObj) {
		if (typeof originObj[key] === 'object') {
			result[key] = Object.prototype.toString.call(originObj[key]) === '[object Array]' ? [] : {}
			deepClone(originObj[key], result[key])
		} else {
			result[key] = originObj[key]
		}
	}
	return result;
}

var copy = deepClone(parent1);
copy.address.name = 'new Address';
console.log(copy.address.name, parent1.address.name);

//typeof null => "object"
//使用类型判断与递归
function clone(target) {
	if(typeof target!=="object") return target();
	if(target ==null) return null;
	if (target instanceof Array)
		return target.slice(0);
	if (target instanceof Object) {

	}
}
var result=clone(3);