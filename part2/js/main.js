/*
Axis Labels
===========
*/

/* Using the D3 margin convention */
var margin = { top:60, right:10 , bottom:120, left:60 }
var width = 400 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;


/* Appending the SVG canvas to the chart area*/
var svg = d3.select("#chart-area").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


/* Adding container group */
var g = svg.append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")");

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+"0"+","+ height +")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");
    
/* Defining scales */
// X scale (band)
var x = d3.scaleBand()
  .range([0,width]) 
  .padding(0.2);
// Y scale (linear)
var y = d3.scaleLinear()
  .range([height,0]); // height to be 400, the same as the canvas height


/* Adding Title and Axes labels */

// Title
g.append("text")
  .attr("text-anchor","middle")
  .attr("x",width/2)
  .attr("y",-10)
  .attr("font-size","24px")
  .text("Buildings of the World");

// X label
g.append("text")
  .attr("text-anchor","middle")
  .attr("x",width/2)
  .attr("y",height + margin.bottom)
  .attr("font-size","20px")
  .text("Name");

// Y label
g.append("text")
  .attr("text-anchor","middle")
  .attr("x",-height/2)
  .attr("y",-40)
  .attr("font-size","20px")
  .attr("transform", "rotate(-90)")
  .text("Height");


/* Data join */
d3.json("data/buildings.json").then((data)=>{

  /* Intervals */
  d3.interval(()=>{
    update(data)
  },1000);

  // Run the viz for the first time
  update(data);

}).catch((e)=>{console.log(e)})



/* Update function */
function update(data){


  x.domain(data.map((d)=>{return d.name}));
  y.domain([0,d3.max(data,(data)=>{return data.height})]);

  /* Configuring axes */
  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);
  var yAxisCall = d3.axisLeft(y)
    .ticks(3);
  yAxisGroup.call(yAxisCall);



  /* D3 Update Pattern */
  // JOIN new data with old elements
  var rects = g.selectAll("rect").data(data);

  // EXIT old elements not present in the new data
  rects.exit().remove();

  // UPDATE old elements present in the new data
  rects.attr("x",(d)=>{return x(d.name)})
    .attr("y", (d)=>{return y(d.height)})
    .attr("width", x.bandwidth)
    .attr("height", (d)=>{return height - y(d.height)});

  // ENTER new elements present in new data
  rects.enter()
      .append("rect")
        .attr("x",(d)=>{return x(d.name)})
        .attr("y", (d)=>{return y(d.height)})
        .attr("width", x.bandwidth)
        .attr("height", (d)=>{return height - y(d.height)})
        .attr("fill", "tomato");
}

