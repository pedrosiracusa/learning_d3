

/* Appending a svg tag where id is 'chart-area' */
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 400);


/* Adding objects */



/* Adding circles using a data join */
var data = [25, 20, 10 ,12, 15];
var circles = svg.selectAll("circle")
  .data(data);

circles.enter()
 .append("circle")
	.attr("cx", (d,i)=>{ return i*50 +25 })
	.attr("cy", 25)
	.attr("r", (d)=>{return d})
	.attr("fill", "blue");




var rect = svg.append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 300)
  .attr("height", 150)
  .attr("fill", "red");


var line = svg.append("line")
  .attr("x1", 100)
  .attr("y1", 160)
  .attr("x2", 450)
  .attr("y2", 320)
  .attr("stroke","gray");



