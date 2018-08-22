let http = require('http');



let server = http.createServer();
server.on('request', function (req, res) {
	res.end('response request.');
})
server.on('listening',()=>{
	console.log('start listen on port...');
})
server.on('close',function(){
	console.log('server closed!')
})
server.on('error',function(err){
    if(err.code == 'EADDRINUSE'){
         console.log('2.http.js 端口号已经被占用!');
    }
});
server.listen(3000,'127.0.0.1',()=>{
	console.log('start listening on 3000 port...')
	server.close();
});
