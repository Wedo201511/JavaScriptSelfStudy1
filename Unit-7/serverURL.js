var url=require("url");
var str="https://localhost:90/index.html?name=zhufeng&id=9#bbs";
console.log(url.parse(str));
console.log(url.parse(str,true));