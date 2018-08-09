let http = require('http');
let fs = require('fs');
let path = require('path');
let queryString=require('querystring');

let server = http.createServer();
// server.on('request', function (req, res) {
// 	if (req.url != '/favicon.ico') {
// 		let out = fs.createWriteStream(path.join(__dirname, 'request.log'));
// 		out.write('method=' + req.method + '\r\n');
// 		out.write('url=' + req.url + '\r\n');
// 		out.write('headers=' + JSON.stringify(req.headers) + '\r\n');
// 		out.write('httpVersion=' + req.httpVersion + '\r\n');
// 	} else if (req.url == '/favicon.ico') {
// 		console.log(req.url)
// 	}

// 	res.end('response request.');
// })
server.on('request', function (req, res) {
	let body = [];
	req.on('data', function (data) {
		body.push(data);
		console.log(data);
	});
	req.on('end', function () {
		let result = Buffer.concat(body);
		console.log(result.toString());
		console.log('end');
    res.statusCode = 204;
    // res.setHeader('Content-Type','text/html');
    // res.sendDate = false;
    res.end();
	});

	//res.end('response request.');
})
server.on('connection', function (socket) {
	console.log(socket.localAddress);
	console.log('客户端连接已经建立');
});
server.on('listening', () => {
	console.log('start listen on port...');
})
server.on('close', function () {
	console.log('server closed!')
})
server.on('error', function (err) {
	if (err.code == 'EADDRINUSE') {
		console.log('1.http.js 端口号已经被占用!');
	}
});
server.setTimeout(50000, function () {
	console.log('连接已经超时1');
});
server.on('timeout', function () {
	console.log('连接已经超时2');
});
server.listen(3000, '127.0.0.1', () => {
	console.log('start listening on 3000 port...')
	//server.close();
});
