/* Appending a svg tag where id is 'chart-area' */
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 400);


/* Adding objects */
var circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "blue");


var rect = svg.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 300)
  .attr("height", 150)
  .attr("fill", "red");


var line = svg.append("line")
  .attr("x1", 100)
  .attr("y1", 160)
  .attr("x2", 450)
  .attr("y2", 320)
  .attr("stroke","gray");



