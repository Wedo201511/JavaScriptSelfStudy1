const Graph = require('../src/Graph');

let graph = new Graph('../resource/input.txt');
test('1. The distance of the route A-B-C is 9', () => {
	let distance = graph.computeDistance('A-B-C');
	expect(distance).toBe(9);
});

test('2. TThe distance of the route A-D is 5', () => {
	let distance = graph.computeDistance('A-D');
	expect(distance).toBe(5);
});

test('3. The distance of the route A-D-C is 13', () => {
	let distance = graph.computeDistance('A-D-C');
	expect(distance).toBe(13);
});

test('4. The distance of the route A-E-B-C-D is 22', () => {
	let distance = graph.computeDistance('A-E-B-C-D');
	expect(distance).toBe(22);
});

test('5. The distance of the route A-E-D is 9', () => {
	let distance = graph.computeDistance('A-E-D');
	expect(distance).toBe('NO SUCH ROUTE');
});

test('6. The number of trips starting at C and ending at C with a maximum of 3 stops is 2', () => {
	let result = graph.getAllPathsWithMaxStops('C', 'C', 3);
	expect(result).toBe(2);
});

test('7. The number of trips starting at A and ending at C with exactly 4 stops is 3', () => {
	let result = graph.getAllPathsWithStops('A', 'C', 4);
	expect(result).toBe(3);
});

test('8.The length of the shortest route (in terms of distance to travel) from A to C is 9', () => {
	let result = graph.getShortestPath('A', 'C');
	expect(result).toBe(9);
});

test('9. The length of the shortest route (in terms of distance to travel) from B to B is 9', () => {
	let result = graph.getShortestPath('B', 'B');
	expect(result).toBe(9);
});

test('10. The number of different routes from C to C with a distance of less than 30 is 7', () => {
	let result = graph.getAllPathsWithMaxDistance('C', 'C', 30);
	expect(result).toBe(7);
});