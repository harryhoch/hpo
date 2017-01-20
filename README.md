# Phenotype Treemap

The `hp.owl` and `mp.owl` are downloaded from Ontobee. Then we use the jar from `/owl2vowl` to convert the corresponding owl file into a JSON file. For example:

````
java -jar owl2vowl/owl2vowl.jar -file hp.owl
````

Then we parse the `hp.json` and create a graph json file `hp_graph.json`.

````
node hp_graph.js
````

And the graph json follows this structure:

````
{
    "nodes": [
        {
            "id": "A"
        },
        {
            "id": "B"
        }
    ],
    "edges": [
        {
            "source": "A",
            "target": "B"
        }
    ],
    "tree": [
        {
            "id": "A",
            "name": "Name of A",
            "superClasses": [],
            "subClasses": ["B"]
        }
    ]
}
````

Then we need to create a treemap hierarchy based on the `tree` structure:

````
node hp_treemap.js
````

And this will get us a structure similar to the `flare.json`.

`hp_treemap.html` renders the `hp_treemap.json` into a treemap view.