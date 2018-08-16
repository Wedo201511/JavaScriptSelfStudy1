## http 模块 核心模块
- express koa  基于http模块封装
- 用法 头的用法  状态码


## http常见功能
- 状态码
206： (206范围请求:，可以实现一个 断点续传 的功能 curl -v --header "Range:bytes=0-3" www.baidu.com
301/302/303/307重定向，临时重定向，永久重定向
(304缓存:强制缓存，对比缓存)
4XX：客户端错误
5XX：服务端错误

- 服务端 实现多语言功能
- 服务端压缩 gzip
- 虚拟主机 在同一个服务器上开多个项目使用同一个端口 (正向代理 反向代理) www.zf1.cn www.zf2.cn根据主机名的不同让它跳转到不同的服务上
- 图片防盗链（都是基于头header）

> 实现一个命令行工具 http-server 在当前目录下 打开一个静态服务

## 进程集群

## express koa

## 实现封装fetch（天生自带的） 和axios（基于ajax的）有什么区别

## 拖拽上传（兼容性） xhr.upload.on('progress') fileReader

### http单工 VS websocket双工
http是单工或者叫半双工，只能client发送request，server返回response，server不能主动向clinet发送消息。

有一个常见的功能：基金软件，炒股软件实时获取当前最新价格：
setTimeout(function(){},1000)1秒钟更新一次，缺点：不停的发送ajax请求，有可能一秒钟数据变更了10次，这时候就可能亏了
websocket （是双工的）好处：1.服务端数据一变，直接推送给客户端，2.性能更好，头会更小一些（现在有些网站可以把所有ajax通信，全都改成websocket，为了实时传输）

### 管线化：
TCP连接建立后，同一时刻，可以并发多个http请求。chorme默认可以并发6个请求，IE可以并发两个，所以优化的时候一般要减少http请求。


## RESTFul api
- get /user 获取用户
- post /user 增加用户

跨域的时候会先发options请求，看能不能成功，能成功之后再发真正的请求。


课程目录：
node react webpack db=>项目


