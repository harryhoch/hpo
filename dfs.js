var hpo = require('./tree.json');

var fs = require('fs');

var tree = hpo.tree;

var treemap = {};

var visited = {};

function dfs(id, tree) {
    for (var n = 0; n < tree.length; n++) {
        if (tree[n].id === id) {
            visited[id] = true;

            if (tree[n].subClasses.length > 0) {
                var obj = {};
                obj.id = tree[n].id;
                obj.label = tree[n].label;
                obj.children = [];
                treemap[id] = obj;

                for (var m = 0; m < tree[n].subClasses.length; m++) {
                    if (typeof(visited[tree[n].subClasses[m]]) === 'undefined') {
                        var children  = dfs(tree[n].subClasses[m], tree);
                        treemap[id].children.push(children);
                    }
                }

                return treemap[id].children;
            } 

            
        }
    }
}

dfs('HP_0000118', tree);


// Write the treemap json into a json file
// JSON.stringify's third parameter defines white-space insertion for pretty-printing
var treemapJson = JSON.stringify(treemap, null, 4);

var outputFilename = 'treemap.json';
fs.writeFile(outputFilename, treemapJson, 'utf8' ,function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Treemap JSON saved to " + outputFilename);
    }
});