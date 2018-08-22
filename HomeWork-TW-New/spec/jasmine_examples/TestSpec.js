describe("Player", function () {
  var AF = require('../../AAFF');
  var Graph = require('../../Graph')
  var graph;


  beforeEach(function () {
    graph = new Graph();

  });
  // The distance of the route A-B-C.
  // The distance of the route A-D.
  // The distance of the route A-D-C.
  // The distance of the route A-E-B-C-D.
  // The distance of the route A-E-D.
  // The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
  // The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
  // The length of the shortest route (in terms of distance to travel) from A to C.
  // The length of the shortest route (in terms of distance to travel) from B to B.
  it("1. The distance of the route A-B-C", function () {});
  it("2. The distance of the route A-D", function () {});
  it("3. The distance of the route A-D-C", function () {});
  it("4. The distance of the route A-E-B-C-D", function () {});
  it("5. The distance of the route A-E-D", function () {});
  it("6. The number of trips starting at C and ending at C with a maximum of 3 stops", function () {});
  it("7. The number of trips starting at A and ending at C with exactly 4 stops", function () {
    let operation = new AF(graph, 0, 2);
    operation.getResult();
    console.log(operation.pathCounts);
    expect(operation.pathCounts).toEqual(4);
  });
  it("8. The length of the shortest route (in terms of distance to travel) from A to C.", function () {});
  it("9. The length of the shortest route (in terms of distance to travel) from B to B.", function () {});
  it("10. The number of different routes from C to C with a distance of less than 30.", function () {});
});