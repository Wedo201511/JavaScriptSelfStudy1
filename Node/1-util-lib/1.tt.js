let util = require('util');
let fs = require('fs');
let path = require('path');

//util.promisify把带回调的函数转换为promise的形式

fs.readFile(path.resolve(__dirname, 'test.js'), 'utf8', function (err, bytesRead) {
	if (err) throw err;
	console.log(bytesRead);
})

function makeIterator(arr) {
	var nextIndex = 0;
	return {
		next: function () {
			return nextIndex < arr.length ? {
				value: arr[nextIndex++],
				done: false
			} : {
				value: undefined,
				done: true
			}
		}
	};
}
var it=makeIterator([1,2,3]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());