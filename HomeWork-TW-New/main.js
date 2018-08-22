let Graph = require('./src/Graph');
let g = new Graph('input.txt');

/**
 * 1. The distance of the route A-B-C.
 * 2. The distance of the route A-D.
 * 3. The distance of the route A-D-C.
 * 4. The distance of the route A-E-B-C-D.
 * 5. The distance of the route A-E-D.
 * 6. The number of trips starting at C and ending at C with a maximum of 3 stops
 * 7. The number of trips starting at A and ending at C with exactly 4 stops
 * 8.The length of the shortest route (in terms of distance to travel) from A to C.
 * 9. The length of the shortest route (in terms of distance to travel) from B to B.
 *10. The number of different routes from C to C with a distance of less than 30. 
 */
console.log('Output #1: ', g.computeDistance('A-B-C'));
console.log('Output #2: ', g.computeDistance('A-D'));
console.log('Output #3: ', g.computeDistance('A-D-C'));
console.log('Output #4: ', g.computeDistance('A-E-B-C-D'));
console.log('Output #5: ', g.computeDistance('A-E-D'));
console.log('Output #6: ', g.getAllPathsWithMaxStops('C', 'C', 3));
console.log('Output #7: ', g.getAllPathsWithStops('A', 'C', 4));
console.log('Output #8: ', g.getShortestPath('A', 'C'));
console.log('Output #9: ', g.getShortestPath('B', 'B'));
console.log('Output #10:', g.getAllPathsWithMaxDistance('C', 'C', 30));