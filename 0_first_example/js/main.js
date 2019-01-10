
/* Setting margins, width and height of the plot */

var margin = { left:100, right:10, top:10, bottom:100 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;


/* Appending a svg tag where id is 'chart-area' */
var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);


/* Adding a group */
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")


/* Adding objects */

/* data can be read from an external file */
/* Adding a bar chart from buildings data */
d3.json("data/buildings.json").then((data)=>{
  data.forEach((d)=>{d.height = +d.height;});


  /* Configuring the scale */

  var x = d3.scaleBand()
    .domain(data.map((d)=>{return d.name;})) // Mapping all categories from the dataset automatically
    .range([0,width]) // The canvas width is 500
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3.scaleLinear()
    .domain([0,d3.max(data,(d)=>{return d.height})])
    .range([0,height]);

  var rects = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", (d,i)=>{return x(d.name)})
      .attr("y", 50)
      .attr("width", x.bandwidth())
      .attr("height", (d)=>{return y(d.height)})
      .attr("fill","gray");
}).catch((error)=>{console.log(error)})




