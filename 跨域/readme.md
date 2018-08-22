
1.JSONP
2.CORS
3.postMessage

### 1.JSONP:
总结：jQuery ajax方式以jsonp类型发起跨域请求，其原理跟script脚本请求一样，因此使用jsonp时也只能使用GET方式发起跨域请求。跨域请求需要服务端配合，设置callback，才能完成跨域请求。

ref:https://www.cnblogs.com/chiangchou/p/jsonp.html


### 2.CORS 服务器端验证
安全性比较高，是现代开发中常用的跨域方式。

### 3.postMessage
两个页面之间的通讯就靠postMessage
