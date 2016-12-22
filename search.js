var hpo = require('./hp.json');

var fs = require('fs');

// The IRI base to be removed in order to get the HP id
var iri = 'http://purl.obolibrary.org/obo/'

var graph = {};

var nodes = {};

var tree = [];

var edges = [];

function getHP(classId) {
    for (k = 0; k < hpo.classAttribute.length; k++) {
        if (hpo.classAttribute[k].id === classId) {
            return hpo.classAttribute[k].iri.replace(iri, '');
        }
    }
}

// Get all the edges
for (var j = 0; j < hpo.classAttribute.length; j++) {
    var node = {id: getHP(hpo.classAttribute[j].id), label: hpo.classAttribute[j].label.undefined, superClasses: [], subClasses: []};

    // Check super classes
    if (typeof(hpo.classAttribute[j].superClasses) !== 'undefined') {
        hpo.classAttribute[j].superClasses.forEach(function(classId) {
            // Add HPO id to the superClasses array
            node.superClasses.push(getHP(classId));

            var edge = {source: getHP(classId), target: hpo.classAttribute[j].iri.replace(iri, '')};
            // Only add this new edge if not presents
            if (edges.indexOf(edge) === -1) {
                edges.push(edge);
            }
        });
    }

    // Check sub classes
    if (typeof(hpo.classAttribute[j].subClasses) !== 'undefined') {
        hpo.classAttribute[j].subClasses.forEach(function(classId) {
            // Add HPO id to the subClasses array
            node.subClasses.push(getHP(classId));

            var edge = {source: hpo.classAttribute[j].iri.replace(iri, ''), target: getHP(classId)};
            // Only add this new edge if not presents
            if (edges.indexOf(edge) === -1) {
                edges.push(edge);
            }
        });
    }

    tree.push(node);
}

// Compute the nodes array from the edges
// Using object will prevent duplicates
var nodesObj = {};
edges.forEach(function (edge) {
    nodesObj[edge.source] = edge.source;
    nodesObj[edge.target] = edge.target;
});

// Convert object(named array) to index array
nodes = Object.keys(nodesObj).map(function (key) {
    return {id: nodesObj[key]};
});


console.log("Total " + nodes.length + " nodes");
console.log("Total " + edges.length + " edges");

// Compose the graph structure
graph = {nodes: nodes, edges: edges, tree: tree};

// Write the grap json into a json file
// JSON.stringify's third parameter defines white-space insertion for pretty-printing
var graphJson = JSON.stringify(graph, null, 4);

var outputFilename = 'tree.json';
fs.writeFile(outputFilename, graphJson, 'utf8' ,function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Tree JSON saved to " + outputFilename);
    }
});

