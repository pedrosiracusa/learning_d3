/*
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

### Useful functions
What if we want to automatically set domains?
D3 provides three useful functions that help with that. They take an array of data and a callback functions as arguments. The callback function must return the piece of data we are interested to be compared by the function over all items in the array:

* `min`: Returns the minimum value in the array;
* `max`: Returns the maximum value in the array;
* `extent`: Returns an array with the minimum (index 0) and the maximum (index 1) values in the array.

With these functions we no longer need to have scales hard-coded, nor we need to know the minimum and maximum values before making the visualization.
*/

var svg3 = d3.select("#chart-area-3").append("svg")
  .attr("width", 400)
  .attr("height", 400)


d3.json("data/buildings.json").then((data)=>{

  // Define scales
  //
  // X scale (band)
  var x = d3.scaleBand()
    .domain(data.map((d)=>{return d.name}))
    .range([0,400]) // width to be 400, the same as the canvas width
    .padding(0.2);

  // Y scale (linear)
  var y = d3.scaleLinear()
    .domain([0,d3.max(data,(data)=>{return data.height})])
    .range([0,400]); // height to be 400, the same as the canvas height



  // Draw bars
  var rects = svg3.selectAll("rect").data(data)
    .enter()
      .append("rect")
        .attr("x",(d)=>{return x(d.name)})
        .attr("y",0)
        .attr("height", (d)=>{return y(d.height)})
        .attr("width", x.bandwidth)
        .attr("fill", "tomato");

}).catch((e)=>{console.log(e)});
