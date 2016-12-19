var ShortestPathCalculator = function(nodes, edges) {

	this.nodes = nodes;
	this.edges = edges;
	this.distances = {};
}

ShortestPathCalculator.prototype.findRoute = function(source, target) {
	this.makeDistanceArrayFromNodes();

	this.populateDistances();

	this.result = this.dijkstra(source, target);

	return this.result;
}

ShortestPathCalculator.prototype.makeDistanceArrayFromNodes = function() {
	for(var i=0; i<this.nodes.length; i++) {

		this.distances[this.nodes[i].id] = {};

		for(var j=0; j<this.nodes.length; j++){
			this.distances[this.nodes[i].id][this.nodes[j].id] = 'x';
		}
	}
}

ShortestPathCalculator.prototype.populateDistances = function() {
 
	for(var i=0; i<this.edges.length; i++) {

		var s = this.edges[i].source;
		var t = this.edges[i].target;
		var d = parseInt(this.edges[i].distance);

		this.distances[s][t] = d;
		this.distances[t][s] = d;
	}
}

/*
 *
 * Calculate shortest path between two nodes in a graph
 * 
 * @param {String} start     id of node to start from
 * @param {String} end       id of node to end at
 *
 */

ShortestPathCalculator.prototype.dijkstra = function(start, end) {
    var nodeCount = this.nodes.length,
        infinity = 99999,  // larger than largest distance in distances array
        shortestPath = {},
        nodeChecked = {},
        pred = {};

    // initialise data placeholders

    for(var i=0; i<nodeCount; i++) {
        shortestPath[this.nodes[i].id] = infinity;
        pred[this.nodes[i].id]=null;
        nodeChecked[this.nodes[i].id]=false;
    }

    shortestPath[start]=0;

    for(var i=0; i<nodeCount; i++) {

        var minDist = infinity;
        var closestNode = null;
        
        for (var j=0; j<nodeCount; j++) {

            if(!nodeChecked[this.nodes[j].id]) {
                if(shortestPath[this.nodes[j].id] <= minDist) {
                    minDist = shortestPath[this.nodes[j].id];
                    closestNode = this.nodes[j].id;
                }
            }
        }

        nodeChecked[closestNode] = true;

        for(var k=0; k<nodeCount; k++) {
            if(!nodeChecked[this.nodes[k].id]){
                var nextDistance = distanceBetween(closestNode, this.nodes[k].id, this.distances);

                if ((parseInt(shortestPath[closestNode]) + parseInt(nextDistance)) < parseInt(shortestPath[this.nodes[k].id])){
                    soFar = parseInt(shortestPath[closestNode]);
                    extra = parseInt(nextDistance);
                    
                    shortestPath[this.nodes[k].id] = soFar + extra;
                    
                    pred[this.nodes[k].id] = closestNode;
                }
            }
        }
                
    }
  
    if(shortestPath[end] < infinity) {

        var newPath = [];
        var step = {target: end};

        var v = end;

        //console.log('v');
        //console.log(v);
        
        while (v) {

            v = pred[v];

            //console.log('v');
            //console.log(v);

            if (v!==null) {
                step.source = v;
                newPath.unshift(step);
                step = {target: v};
            }

        }

        totalDistance = shortestPath[end];
        
        return {mesg:'OK', path: newPath, source: start, target: end, distance:totalDistance};
    } 
    else {
        return {mesg:'No path found', path: null, source: start, target: end, distance: 0 };
    }
    
    function distanceBetween(fromNode, toNode, distances) {

        var dist = distances[fromNode][toNode];

        if(dist==='x') dist = infinity;
        
        return dist;
    }

}


















// test data works fine
var graph = require('./test.json');

var sp = new ShortestPathCalculator(graph.nodes, graph.edges);

var route = sp.findRoute("B", "D");

console.log(route);


// real HPO data, out of memory error
/*
var graph = require('./graph.json');

var sp = new ShortestPathCalculator(graph.nodes, graph.edges);

var route = sp.findRoute("HP_0000118", "HP_0012506");

console.log(route);
*/
