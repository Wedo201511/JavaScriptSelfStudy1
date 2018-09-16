var less=require("less");
var fs=require("fs");
less.render(fs.readFileSync("./1.less","utf-8"),{compress:true}
,function(error,output){
fs.writeFileSync("./1.css",output.css,"utf-8");
})