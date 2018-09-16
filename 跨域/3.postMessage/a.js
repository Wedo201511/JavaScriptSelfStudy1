let express = require('express');
let app = express();

app.use(express.static(__dirname));
//console.log(__dirname)
app.listen(3000,function(){
    console.log(`3000 port start listenning...`)
});