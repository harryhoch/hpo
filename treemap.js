var hpo = require('./graph.json');

var fs = require('fs');

var hpoTree = hpo.tree;

var visited = {};

function dfs(id, tree) {
    var treemap = {};
    
    for (var n = 0; n < tree.length; n++) {
        if (tree[n].id === id) {
            if (typeof(visited[id]) === 'undefined') {
                // Mark as visited
                visited[id] = true;
                
                // Each treemap[id] is an object
                treemap[id] = {};
                treemap[id].id = tree[n].id;
                treemap[id].name = tree[n].name;
                // Generate random IC score, Math.random() * (max - min) + min
                // .toFixed() returns a string, so need to use oarseFloat
                treemap[id].ic = parseFloat((Math.random() * (20 - 1) + 1).toFixed(2));
                treemap[id].children = [];

                // Build children if there's any, otherwise leave it empty array
                if (tree[n].subClasses.length > 0) {
                    for (var m = 0; m < tree[n].subClasses.length; m++) {
                        if (typeof(visited[tree[n].subClasses[m]]) === 'undefined') {
                            var children = dfs(tree[n].subClasses[m], tree);
                            treemap[id].children.push(children);
                        } 
                    }
                } 

                // Return the final structure
                return treemap[id];
            } 
        }
    }
}

// Start from HP_0000118, use it as root
var finalTreemap = dfs('HP_0000118', hpoTree);


// Write the treemap json into a json file
// JSON.stringify's third parameter defines white-space insertion for pretty-printing
var treemapJson = JSON.stringify(finalTreemap, null, 4);

var outputFilename = 'treemap.json';
fs.writeFile(outputFilename, treemapJson, 'utf8', function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Treemap JSON saved to " + outputFilename);
    }
});