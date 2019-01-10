/* Setting margins, width and height of the plot */

var margin = { left:100, right:10, top:10, bottom:150 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;


/* Appending a svg tag where id is 'chart-area' */
var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);


/* Adding a group */
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


/* Adding labels */
// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings");
// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)");


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
    .range([height,0]);


  /* Configuring axes */

  var xAxisCall = d3.axisBottom(x);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text") // This rotates x labels
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)");

  var yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat((d)=>{return d + "m"});

  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);


  /* Drawing rectangles (the bars)*/

  var rects = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", (d)=>{return x(d.name)})
      .attr("y", (d)=>{return y(d.height)})
      .attr("width", x.bandwidth())
      .attr("height", (d)=>{return height - y(d.height)})
      .attr("fill","gray");


}).catch((error)=>{console.log(error)})


  

