# Interactions



Formatting in D3
----------------
We use the `d3.format()` function for formatting numbers, and takes as an argument a **specifier**, which represents some formatting rule (e.g. `".0%"` is rounded percentage, `"+20"` is space-filled and signed, `".^20"` is dot-filled and centered, etc).
This function returns another function, which takes as argument the number to be formatted.

The template of the specifier is `[[fill]align][sign][symbol][0][width][,][.precision][type]`. We most often use sign, symbol, comma, precision and type. Notice also that all fields are optional, though the order of elements should be respected relative to each other.

#### Time Formatting
If the goal is to go from a **date object** to a human-readable **string** representing the date, we use `timeFormat()`, passing directives as to specify how each piece of information is coded.

#### Time Parsing
If the goal is to go from a **string** containing some date to a **date object**, we should use `parseTime()`


Tooltips
--------
Tooltips allow users to inspect data in a SVG by hovering the cursor on it.
For that functionality, we use a plug-in called `d3-tip`.
Working with tooltips involves 3 steps:

1. Initializing the tooltip

`tip = d3.tip().attr('class','d3-tip').html(function(d){return d;});`

2. Calling the tip in the context of the visualization

`vis.call(tip)`

3. Adding event listeners
```
vis.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('width', function(){return x.rangeBand()})
  .attr('height', function(d){return h-y(d)})
  .attr('y', function(d){return y(d)})
  .attr('x', function(d,i){return x(i)})
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)
```

We use the `on()` method for specifying **event listeners**.

Interactive Elements
--------------------
We can add interactive elements to our chart, to control the dynamics of the visualization. 
Some possible interactive elements are:

### Play/Pause button
Starts and stops the interval loop using a mouse click event listener.

### Reset button
Sets the interval loop back to t=0, also using a mouse click event listener.

### Filters
Adds a filter to the update function, and updates the visualization at the current time.

### Sliders
Jquery provides a [slide widget](http://api.jqueryui.com/slider/), which helps on the creation of this element.

Line Graphs
-----------
Line graphs can be drawn using **path generators** (e.g. `d3.line()`).
For instance, let's see a **line generator**
```javascript
// Line path generator
var line = d3.line()
  .x(function(d){ return x(d.year); })
  .y(function(d){ return y(d.value); })

// add line to chart
g.append("path")
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke","grey")
  .attr("stroke-width", "3px")
  .attr("d", line(data));
```
First, we define a line generator which is given an array of data. For each element in the data array, we're telling the line generator how to interpret the data point X and Y coordinates, feeding the values into scales to get pixels.
Then we call a line generator with an array of data. Each data point in this array is an object with both `year` and `value` fields, which the `line` function will interpret as a set of coordinates.
