let express = require('express');
let app = express();


app.get('/say', function (req, res) {
	let {wd,cb} = req.query;
	console.log(wd, cb);
	//用 客户端传过来的callback Name 包裹想要返回的数据
	res.end(`${cb}('I dont know U.')`);
})
app.listen(3000);