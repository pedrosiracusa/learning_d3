/*

Groups
------
Groups are containers for structuring and grouping SVG graphical elements together. 
They are represented with the tag `g`, and allow us to apply **transformations** (e.g. translation) to multiple elements which are laid inside it.
Groups form the base for implementing the **D3 Margin convention**.


Axes
----
Axes are also implemented as groups, and can be added in D3 using **axis generators**.
Possible axes that can be added are `d3.axisRight`, `d3.axisLeft`, `d3.axisTop` and `d3.axisBottom`. 
Attributes of the axis ticks can also be customized, such as size (`.tickSize`, `.tickSizeInner`,  `.tickSizeOuter`); the number of ticks (`.ticks(n)`); the text formatting ( `.tickFormat(funct)`).
Explicit values, contained in an array, can also be forced, using `.tickValues([...])`.

*/

/* Using the D3 margin convention */
var margin = { top:10, right:10 , bottom:120, left:30 }
var width = 400 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;


/* Appending the SVG canvas to the chart area*/
var svg5 = d3.select("#chart-area-5").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


/* Adding container group */
var g5 = svg5.append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")");


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
  g5.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+"0"+","+ height +")")
    .call(xAxisCall)
    .selectAll("text")
      .attr("text-anchor","end")
      .attr("transform", "rotate(-40)");

  var yAxisCall = d3.axisLeft(y);
  g5.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);



  /* Drawing bars */
  var rects = g5.selectAll("rect").data(data)
    .enter()
      .append("rect")
        .attr("x",(d)=>{return x(d.name)})
        .attr("y", (d)=>{return y(d.height)})
        .attr("width", x.bandwidth)
        .attr("height", (d)=>{return height - y(d.height)})
        .attr("fill", "tomato");

}).catch((e)=>{console.log(e)})



