//导入我们三个常用的NODE内置模块
var http = require("http"),
    fs = require("fs"),
    url = require("url");
//1.HTTP
var server = http.createServer(function(request,response){
    //->当客户端向服务端的当前服务（端口号是90的这个服务）发送一个请求
    //->并且当服务已经成功接收到这个请求后，执行这个回调函数
    console.log("哈哈哈被耍了~")
    console.log(arguments.length);
    //=>request（请求）:存放的是所有客户端的请求信息，包含客户端通过问号传参的方式传递给服务器的数据内容
    //=>response（响应）:提供了向客户端返回的内容和数据的方法
    //http://localhost:90/index.html?name=zhufeng&id=9#bbs
    console.log(request.url);
    var urlObject=url.parse(request.url),
    pathname=urlObject.pathname,
    query=urlObject.query;
   // console.log(query);
    //console.log("href: "+urlObject.href);
    if(pathname==="/1.html"){
        //=?根据请求中的URL地址（具体的是根据地址中的pathname）获取到对应资源文件中的源代码
        //->fs.readFileSync([path+name],[encode]):同步读取指定文件中的内容（同步读取：文件中的内容读取不完，不执行下面的操作）
        var content=fs.readFileSync("./1.html","utf-8");

        response.write(content);//向客户端返回内容
        response.end();//告诉服务器响应结束了
    }
});
server.listen(90, function () {
    //->当服务创建成功，并且端口号也监听成功之后，执行这个回调函数
    console.log("server is success,listening on 90 port.");
});