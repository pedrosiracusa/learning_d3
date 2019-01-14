/* 
Adding SVG graphics
===================

User can draw shapes using svg:
* Rectangles
* Circles
* Lines
* Text
* Paths

D3 Functions
============

### D3 Select
Uses a CSS selector to return page elements, similar to Jquery.
Returns an object to manipulate.
The function `d3.select()` returns only one element, whilst `d3.selectAll()` returns multiple elements.

### D3 Append
Adds a child element to a parent.
The method is called on the object representing the parent object, and takes the type of the child as the only argument.

### D3 Attr
Sets the value of an attribute of an element.
Takes two arguments: The attribute, and the value to be set.

*/

var svg = d3.select("#chart-area-1")
  .append("svg")
    .attr("width",400)
    .attr("height", 400);


var circle = svg.append("circle")
  .attr("cx", 200)
  .attr("cy", 200)
  .attr("r", 40)
  .attr("fill","red");

var rect1 = svg.append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 100)
  .attr("height",50)
  .attr("fill","blue");

var rect2 = svg.append("rect")
  .attr("x", 250)
  .attr("y", 100)
  .attr("width", 70)
  .attr("height",25)
  .attr("fill","green");

var line = svg.append("line")
  .attr("x1", 100)
  .attr("y1", 160)
  .attr("x2", 200)
  .attr("y2", 200)
  .attr("stroke-width", 2)
  .attr("stroke", "black");
