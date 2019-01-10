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


Scales
------
We use scales when we want attibutes (e.g. height) of objects to be computed using a scale, rather than being hardcoded.
For instance, we might want the height of a triangle to be converted from true height (in meters) to size in pixels.
That way we can make sure that the graphics do not span the canvas.
We set scales in D3 using the `domain` and `range` methods. The last two must receive two arguments, which are the minimum and maximum values for each.
Then we can use the scale as a function, and convert from the domain to the range. We can also use the `invert` method to go from the range and get the domain value.

```javascript
var y = d3.scaleFunction()
          .domain([dom_0, dom_f])
          .range([range_0, range_f]);

console.log( y(val_domain) ) // gets the range value using domain value val_domain (domain->range)
console.log( y.invert(val_range) ) // gets the domain value using range value val_range (range->domain)
```

> "Scales are functions that map from an input **domain** to an output **range**" (Mike Bostock).

### Linear Scale
In D3 we can use the function `scaleLinear` for creating a linear scale. 

### Logarithmic Scale
In d3 we use the function `scaleLog` for creating a logarithmic scale.

### Time Scale
In d3 we use the function `scaleTime` to get dates within some range. Takes a JS date object (instead of integers) as the domain.

### Ordinal Scale
In d3 we use the function `scaleOrdinal` for creating an ordinal scale. Useful when we want to use discrete data instead of continuous. For instance, associate categories to a color scheme. The sintax is a little bit different: We need to supply to the `domain` and `range` methods a list of categories and a list of values for them to be mapped (e.g., colors). D3 allows us to use built-in color schemes, e.g. `d3.schemeCategory10`.

### Band Scale
The function `scaleBand` is almost exclusively used for spacing different categories in a bar chart, in order to avoid that bars span the x-axis. We define inner and outer paddings using the methods `paddingInner` and `paddingOuter` after the `range` method. We can get the computed bandwidth using the method `bandwidth` of the scale object, without passing arguments.
