let Graph = require('./Graph');
let GraphWrapper = require('./GraphWrapper');

let graphWrapper = new GraphWrapper(new Graph('input.txt'));
console.log(graphWrapper.computeDistance('A-B-C'));
console.log(graphWrapper.computeDistance('A-D'));
console.log(graphWrapper.computeDistance('A-D-C'));
console.log(graphWrapper.computeDistance('A-E-B-C-D'));
console.log(graphWrapper.computeDistance('A-E-D'));

// 6. The number of trips starting at C and ending at C with a maximum of 3 stops
let allPaths = graphWrapper.getAllPaths(2, 2);
let result = allPaths.filter(item => item.length <= 3 + 1);
console.log('Output #6: ', result.length);

// 7. The number of trips starting at A and ending at C with exactly 4 stops
allPaths = graphWrapper.getAllPaths(0, 2);
console.log(allPaths);
result = allPaths.filter(item => item.length == 4 + 1);
console.log(result);
console.log('Output #7: ', result.length);
allPaths = graphWrapper.getAllPaths(2, 2);
console.log(allPaths);

function pathsWithMaxStops(start, end, stopNumber) {
	let allPaths = graphWrapper.getAllPaths(0, 2);
	let circles = graphWrapper.getAllPaths(end, end);
	if (circles) {
		for (let i = 0; i < allPaths.length - 1; i++) {
			for (let j = 0; j < circles.length - 1; j++) {
				allPaths[i].length+circles[j].length-2<=stopNumber
			}
		
		}
	}

}

function pathsWithMaxDistance(maxDistance) {

}

// /**
//  * 8.The length of the shortest route (in terms of distance to travel) from A to C.
//  */
// result = graphWrapper.getShortestPath(0, 2);
// console.log('Output #8: ', result);

// /**
//  * 9. The length of the shortest route (in terms of distance to travel) from B to B.
//  */
// result = graphWrapper.getShortestPath(1, 1);
// console.log('Output #9: ', result);

// /**
//  *10. The number of different routes from C to C with a distance of less than 30. 
//  */
// allPaths = graphWrapper.getAllPaths(2, 2);
// result = [];
// if (allPaths && allPaths.length) {
// 	allPaths.forEach((item)=>{
// 		if (graphWrapper.computeDistance(item.join('-')) < 30) {
// 			result.push(item);
// 		}
// 	})
// }
// console.log('Output #10: ', result.length);