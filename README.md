# hpo

The `hp.owl` is downloaded from Ontobee. Then we use the jar from `/owl2vowl` to convert this owl file into a `hp.json` file:

````
java -jar owl2vowl.jar -file ho.owl
````

Then we parse the `hp.json` and create a graph json file `graph.json`.

````
node graph.js
````

And the graph json follows this structure:

````
{
    "graph": {
        "nodes": [
            {
                "id": "A",
            },
            {
                "id": "B",
            }
        ],
        "edges": [
            {
                "source": "A",
                "target": "B"
            }
        ]
    }
}
````