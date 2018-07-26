//简单工厂模式是:由一个方法来决定到底要创建哪个类的实例,
//这些实例经常都拥有相同的接口
//这种模式主要用在什么情况下？:所实例化的类型(创建哪个类的实例)在编译期不能确定， 而是在执行期决定的


//XMLHttpRequest xhr=
// 实际上在js里面，所谓的构造函数也是一个简单工厂。只是批了一件new的衣服. 我们扒掉这件衣服看看里面。
// 通过这段代码, 在firefox, chrome等浏览器里，可以完美模拟new.

function A(name) {
	this.name = name;
}
console.log(A.prototype);
console.log(typeof A.prototype);

function ObjectFactory() {
	var obj = {},
		Constructor = Array.prototype.shift.call(arguments);
	obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype
		: Constructor.prototype;

	var ret = Constructor.apply(obj, arguments);
	return typeof ret === 'object' ? ret : obj;
}

var a = ObjectFactory(A, 'svenzeng');
console.log(a.name);  //svenzeng


function B(name) {
	return [{ Alias: name }]
}

var b = ObjectFactory(B, 'svenzeng');
console.log(b);  //svenzeng