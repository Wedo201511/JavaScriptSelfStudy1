//[5,4,6,8,3,,9,2,2,4,6]
let arr = [2, 4, 1, 9, 6, 3, 5]
function swap(a, b) {
	let temp = a;
	a = b;
	b = temp;
}
function QuickSort(arr, left, right) {
	if (left == right) return;
	var bbLeft = left;
	var base = arr[left];
	console.log(arr, left, right, base);
	while (left < right) {
		while (arr[right] > base && left < right) {
			right--;
		}
		console.log(right);
		swap(arr[left], arr[right]);
		left++;
		while (arr[left] < base && left < right) {
			left++;
		}
		swap(arr[left], arr[right]);
		right++;
	}
	console.log(left);
	QuickSort(arr, bbLeft, left - 1);
	QuickSort(arr, left + 1, arr.length - 1);
}
QuickSort(arr, 0, arr.length - 1);
console.log(arr);

function fn() {
	let a = 1;
	return function () {
		return a;
	};
}

//let myFn=fn();
console.log(fn()());

const someAsyncThing = function () {
	return new Promise(function (resolve, reject) {
		// 下面一行会报错，因为x没有声明
		resolve(x + 2);
	});
};

someAsyncThing().then(function () {
	console.log('everything is great');
}).catch(function (err) {
	throw err;
});;

setTimeout(() => { console.log(123) }, 2000);

var state = {
	id: 'action.id',
	text: 'action.text',
	completed: false
};
console.log({
	...state, id: 1
});




function applyMiddleware(...middlewares) {
	return (createStore) => (reducer, preloadedState, enhancer) => {
		console.log(reducer, preloadedState, enhancer)
	}
}
let fn = applyMiddleware();
console.log(fn()(1, 2, 3));
console.log(fn());


applyMiddleware(fn1(fn2(reducer, preloadedState, enhancer)))

const compose = f => g => x => f(g(x));

const f = compose(x => x * 4)(x => x + 3);
f(2) // 20


let tt='壹贰叁肆伍陆柒捌玖拾...';
console.log(tt.length);
console.log(tt.substr(0,9.5)+'...');
console.log(tt);


// addHalfStep = () => (30 - 31) / 2;
// console.log(addHalfStep());


