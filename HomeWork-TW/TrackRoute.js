/**
 *  A given route will never appear more than once, and for a given route
 *  the starting and ending town will not be the same town.
*/
class TrackRoute {
    constructor(start, end, weight) {
        this.startNode = start;
        this.endNode = end;
        this.weight = weight;
    }
    add(params) {
        
    }
}
module.exports = TrackRoute;