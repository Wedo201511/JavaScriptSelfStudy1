var parent = {
	age: 5,
	hobby: [1, 2, 3],
	home: { city: '北京' },
};

function copy(parent) {
	let child;
	if (Object.prototype.toString.call(parent) == '[object Object]') {
		child = {};
		for (let key in parent) {
			child[key] = copy(parent[key])
		}
	} else if (Object.prototype.toString.call(parent) == '[object Array]') {
		child = parent.map(item => copy(item));
	} else {
		return parent;
	}
	return child;
}
var c1 = copy(parent);
parent.hobby = [];
console.log(parent);
console.log(c1)

function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(reject, ms, 'done');
	});
}

timeout(100).then((value) => {
	console.log(value);
}, (err) => {
	console.log(`err:${err}`);
});


var client = new XMLHttpRequest();
client.open('GET', 'www.baidu.com')
client.onreadystatechange = function () {
	if (this.readyState !== 4) {
		return;
	}
	if (this.status === 200) {
		console.log('200');
	} else {
		console.log('error');
	}
};
client.responseType='json';
client.setRequestHeader('Accept','application/json');
client.send();


