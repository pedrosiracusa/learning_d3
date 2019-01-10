

/* Appending a svg tag where id is 'chart-area' */
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 400);


/* Adding objects */



/* Adding circles using a data join */

/* data can be read from an external file */
d3.csv("data/ages.csv").then( (data)=>{
  data.forEach((d)=>{d.age = +d.age;}) /* This converts data stored as string to numerical */

  var circles = svg.selectAll("circle")
    .data(data);

  circles.enter()
   .append("circle")
    .attr("cx", (d,i)=>{ return i*50 +25 })
    .attr("cy", 25)
    .attr("r", (d)=>{return d.age})
    .attr("fill", "blue");
}).catch((error)=>{console.log(error)})



