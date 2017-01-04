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
    ]
}
````

Then we need to create a treemap structure

````
node treemap.js
````

And this will get us a structure similar to the `flare.json`.

`d3treemap.html` renders the `treemap.json` into a treemap view.