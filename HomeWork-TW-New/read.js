let fs = require('fs');
let path = require('path');
let TrackRoute = require('./TrackRoute');

let inputStr = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
let routes = [];
let arr = inputStr.split(',');
for (let i = 0; i < arr.length; i++) {
    let route = arr[i].trim();
    // todo:去重，错误处理。。。
    routes.push(new TrackRoute(route[0], route[1], route[2]));
}
//console.log(routes)
//inputStr.split(',').forEach(item => console.log(item.trim()));
// z注意错误处理
// Graph

computeDistance('A-B-C')
computeDistance('A-D')
computeDistance('A-D-C')
computeDistance('A-E-B-C-D')
computeDistance('A-E-D')
function computeDistance(route) {
    let arr = route.split('-');
    let distance = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        let results = routes.filter((item) => {
            return item.startNode == arr[i] && item.endNode == arr[i + 1];
        });
        //console.log(arr[i],arr[i+1])
        if (results[0]) {
            distance += Number(results[0].weight);
        }
        else {
            //return 'NO SUCH ROUTE';
            console.log('NO SUCH ROUTE');
            return;
        }
    }
    //return distance;
    console.log(distance);
}


