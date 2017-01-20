# Phenotype Treemap

## Intruction

We have two folders, `hp/` and `mp/`. Take a look at `hp/` for example.

The `hp.owl` is downloaded from Ontobee. Then we used the jar from `/owl2vowl` to convert the corresponding owl file into a JSON file. For example:

````
java -jar owl2vowl/owl2vowl.jar -file hp/hp.owl
````

Then we parse the `hp.json` into a graph json file called `hp_graph.json` with the following command:

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

Then we created a treemap hierarchy based on the `tree` structure of `hp_graph.json` using the following command:

````
node hp_treemap.js
````

And this generated us a structure similar to the `flare.json`, but it's called `hp_treemap.json` in this case.

`hp_treemap.html` renders the `hp_treemap.json` into a treemap view.

This process applies to the `mp/` folder as well.

## Put things together

In the root directory of this project, you can see an HTML file called `treemap.html`, and this file renders the HP treemap and MP treemap together to show some interesting relationships.