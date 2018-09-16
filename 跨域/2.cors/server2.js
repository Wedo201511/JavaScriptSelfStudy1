let express = require('express');
let app = express();

let whiteList = ['http://localhost:3000'];
app.use(function (req, res, next) {
	console.log('---middleware', req.headers);
	let origin = req.headers.origin;
	if (whiteList.includes(origin)) {
		//设置哪个源可以访问我
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Allow-Headers','name');
		res.setHeader('Access-Control-Allow-Methods','PUT')
		res.setHeader('Access-Control-Allow-Credentials',true)//允许携带cookie
		res.setHeader('Access-Control-Max-Age',6);//预检的存活时间
		res.setHeader('Access-Control-Expose-Headers','name');//允许前端获取哪个头
	}
	next();//让中间件继续往下走，不往下走不用调用next
})
app.get('/', function (req, res) {
	console.log(req.url); // 请求的路径
	res.end('hello');
});
app.get('/getData', function (req, res) {
	console.log('---getData', req.headers);
	res.end('This is server2 4000 port.');
});
app.put('/getData', function (req, res) {
	console.log('---put', req.headers);
	res.end('put-This is server2 4000 port.');
});
app.post('/getData', function (req, res) {
	console.log('---post', req.headers);
	res.end('post:This is server2 4000 port.');
});
app.use(express.static(__dirname));
//console.log(__dirname)
//app.listen(4000);
app.listen(4000, function () {
	console.log(`server start 4000`);
}); // 监听端口号