/*
*单例模式的定义是：一个类只有一个唯一的实例*
*场景：有这样一个常见的需求，点击某个按钮的时候需要在页面弹出一个遮罩层。
*比如web.qq.com点击登录的时候。
*遮罩层是全局唯一的
*/
//1.闭包实现单例模式*********************************************************
var createMask = (function () {
	var mask;
	return function () {
		if (mask) return mask;
		else {
			mask = document.body.appendChild(document.createElement('div'));
			return mask;
		}

	}
})();
/*这个单例还是有缺点. 它只能用于创建遮罩层. 
*假如我又需要写一个函数, 用来创建一个唯一的xhr对象呢? 能不能找到一个通用的singleton包装器.
*/
//2.一个通用的singleton包装器*********************************************
var singleton = function (fn) {
	var result;
	return function (...args) {
		// if (result) return result;
		// else {
		// 	result = fn(...args);
		// 	return result;
		// }
		return result || (result = fn.apply(this, args))
	};
};

var createMask = singleton(function (...args) {
	let mask = { para: args };
	return mask;
});

var need1 = createMask(1, 2, 3);
var need2 = createMask(2, 4, 6);//由于只有一个实例，所以2,4,6不会再初始化了
console.log(need1);
console.log(need2);
console.log(need1 === need2)


