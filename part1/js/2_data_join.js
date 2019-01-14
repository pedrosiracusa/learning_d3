/*
Data Joins
==========
D3 reads an array of data and associates it with SVG elements.
It relies on a method called `enter()`, which is called after a svg is selected and attached to some data (using the `data()` method).
To set attributes of svgs based on data, we can use the method `attr()`, passing a function as the second argument: The function expects two arguments `(d,i)`, where `d` is an element in the data array and `i` its index. The second argument (`i`) does not have to be passed necessarily.

We can load data from external files, using functions `d3.csv`, `d3.tsv`, or `d3.json`.
The functions above take the name of the data file as argument and return a promise (after v 5.x), which is resolved using the function `then()`. Before v 5.x, the file reading functions expected a callback to be passed as the second argument.
 */

var svg2 = d3.select("#chart-area-2").append("svg")
  .attr("width", 400)
  .attr("height", 400);



// Use data file
d3.json("data/ages.json").then((data)=>{
  data.forEach((d)=>{d.age = +d.age}); // turn the age field into numeric (default is string)
  //console.log(data);

  /* Create the circles */
  var circles = svg2.selectAll("circle").data(data);
  circles.enter()
    .append("circle")
      .attr("cx", (d,i)=>{return i* 50 + 100})
      .attr("cy", 100)
      .attr("r", (d)=>{return d.age**2/8})
      .attr("fill", "blue");

  /* Create the rectangles */
  var rects = svg2.selectAll("rect").data(data);
  rects.enter()
    .append("rect")
      .attr("x", (d,i)=>{return i*50+100 - (d.age**2/8)})
      .attr("y", 150)
      .attr("height", (d)=>{return d.age**2})
      .attr("width", (d)=>{return 2*(d.age**2/8)})
      .attr("fill", "gray");

}).catch((e)=>{console.log(e)});
