/*
Axis Labels
===========
*/

/* Using the D3 margin convention */
var margin = { top:60, right:10 , bottom:120, left:60 }
var width = 400 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;


/* Appending the SVG canvas to the chart area*/
var svg6 = d3.select("#chart-area-6").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


/* Adding container group */
var g6 = svg6.append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")");



/* Adding Title and Axes labels */

// Title
g6.append("text")
  .attr("text-anchor","middle")
  .attr("x",width/2)
  .attr("y",-10)
  .attr("font-size","24px")
  .text("Buildings of the World");

// X label
g6.append("text")
  .attr("text-anchor","middle")
  .attr("x",width/2)
  .attr("y",height + margin.bottom)
  .attr("font-size","20px")
  .text("Name");

// Y label
g6.append("text")
  .attr("text-anchor","middle")
  .attr("x",-height/2)
  .attr("y",-40)
  .attr("font-size","20px")
  .attr("transform", "rotate(-90)")
  .text("Height");


/* Data join */
d3.json("data/buildings.json").then((data)=>{

  /* Defining scales */

  // X scale (band)
  var x = d3.scaleBand()
    .domain(data.map((d)=>{return d.name}))
    .range([0,width]) 
    .padding(0.2);

  // Y scale (linear)
  var y = d3.scaleLinear()
    .domain([0,d3.max(data,(data)=>{return data.height})])
    .range([height,0]); // height to be 400, the same as the canvas height


  /* Configuring axes */
  var xAxisCall = d3.axisBottom(x);
  g6.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+"0"+","+ height +")")
    .call(xAxisCall)
    .selectAll("text")
      .attr("text-anchor","end")
      .attr("transform", "rotate(-40)");

  var yAxisCall = d3.axisLeft(y)
    .ticks(3);
  g6.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);



  /* Drawing bars */
  var rects = g6.selectAll("rect").data(data)
    .enter()
      .append("rect")
        .attr("x",(d)=>{return x(d.name)})
        .attr("y", (d)=>{return y(d.height)})
        .attr("width", x.bandwidth)
        .attr("height", (d)=>{return height - y(d.height)})
        .attr("fill", "tomato");

}).catch((e)=>{console.log(e)})
