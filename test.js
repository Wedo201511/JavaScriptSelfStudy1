/*
 * 洋葱模型：把后一个函数当做参数传递给前面的函数
 * 实现一个功能：把多个函数串起来执行
 */
function fn1(next) {
	console.log(1);
	next();
	console.log(2);
}

function fn2(next) {
	console.log(3);
	if (next) next();
	console.log(4);
}

function fn3(next) {
	console.log(5);
	if (next) next();
	console.log(6);
}
let middlewares = [fn1, fn2, fn3];
// // 1.递归写法
// function dispatch(index) {
// 	if (index === middlewares.length) return;
// 	let m = middlewares[index++];
// 	return () => m(dispatch(index))
// }
// dispatch(0)();

// //2、箭头函数写法
// let finalFn = () => fn1(() => fn2(() => fn3()))
// finalFn();


fn1(fn2(fn3))

// function fn1() {
// 	console.log(1);
// 	(function fn2() {
// 		console.log(3);
// 		(function fn3(next) {
// 			console.log(5);
// 			//next();
// 			console.log(6);
// 		})();
// 		console.log(4);
// 	})();
// 	console.log(2);
// }
// fn1();


// const a = fn1 => fn2 => fn3 => {
// 	//fn1();
// 	//fn2();
// 	fn3();
// };

// const f = a => b => c => {}
// // fn1(() => {
// // 	fn2(() => {
// // 		fn3();
// // 	})
// // });
// a(fn1)(fn2)(fn3)();