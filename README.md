# Learning D3 (Data Driven Documents)


Working with SVGs
----------------
User can draw shapes

- Rectangles
- Circles
- Lines
- Text
- Paths

D3 functions
------------

### D3 Select
Uses a CSS selector to return page elements, similar to Jquery. Returns an object to manipulate.
The function `d3.select()` returns only one element, whilst `d3.selectAll()` return multiple elements.

### D3 Append
Adds something to an element.
Takes one argument: The type of the element we want to add to the screen.

### D3 Attr
Sets the value of an attribute of an element.
Takes two arguments: The attribute, and the value to be set.


D3 Data Join
------------
D3 reads an array of data and associates it with SVG elements.
It relies on a method called `enter()`, which is called after a svg is selected and attached to some data (using the `data()` method).
To set attributes of svgs based on data, we can use the method `attr()`, passing a function as the second argument: The function expects two arguments `(d,i)`, where `d` is an element in the data array and `i` its index. The second argument (`i`) does not have to be passed necessarily.

We can load data from external files, using functions `d3.csv`, `d3.tsv`, or `d3.json`.
The functions above take the name of the data file as argument and return a promise (after v 5.x), which is resolved using the function `then()`. Before v 5.x, the file reading functions expected a callback to be passed as the second argument.
