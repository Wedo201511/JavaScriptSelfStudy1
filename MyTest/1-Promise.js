function MyPromise(executor) {
	let self = this;//缓存一下this

	self.status = 'pending';// 状态管理 状态的变化只能由pending变为resolved或者rejected。一件事情不能既成功又失败。所以resolved和rejected不能相互转化。
	self.value = undefined;// 成功后的值 传给resolve
	self.reason = undefined;//失败原因 传给reject

	self.onResolvedCallbacks = [];// 存放then中成功的回调
	self.onRejectedCallbacks = []; // 存放then中失败的回调 
	let resolve = function (value) {
		if (self.status == 'pending') {
			self.status = 'resolved';
			self.value = value;
			self.onResolvedCallbacks.forEach(fn => fn(value));
		}
	};
	let reject = function (reason) {
		if (self.status == 'pending') {
			self.status == 'rejected';
			self.reason = reason;
			self.onRejectedCallbacks.forEach(fn => fn(self.reason));
		}
	};
	executor(resolve, reject);
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	this.onResolvedCallbacks.push(onFulfilled);
	this.onRejectedCallbacks.push(onRejected);
	return new MyPromise();
}