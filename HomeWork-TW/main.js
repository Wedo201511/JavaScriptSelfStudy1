// The distance of the route A-B-C.
// The distance of the route A-D.
// The distance of the route A-D-C.
// The distance of the route A-E-B-C-D.
// The distance of the route A-E-D.
// The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
// The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
// The length of the shortest route (in terms of distance to travel) from A to C.
// The length of the shortest route (in terms of distance to travel) from B to B.
// https://blog.csdn.net/ha000/article/details/52368566
let Graph = require('./Graph');
let AF = require('./AAFF');
//第几张图，有两张(0,1)，起点序号(0-6)，终点序号(0-6)
let operation = new AF(new Graph(), 0, 2);
//operation.isConnectable(0,2);
operation.getResult();


