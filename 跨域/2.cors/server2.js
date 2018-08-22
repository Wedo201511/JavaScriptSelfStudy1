let express = require('express');
let app = express();

app.use(function (req, res, next) {

});
app.get('/getData', function (req, res) {
	res.end('This is server2 4000 port.');
});
app.use(express.static(__dirname));
//console.log(__dirname)
app.listen(4000);