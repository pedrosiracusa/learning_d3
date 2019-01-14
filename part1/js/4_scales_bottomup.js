/*
Scales
======
*/

var svg4 = d3.select("#chart-area-4").append("svg")
  .attr("height", 400)
  .attr("width", 400)


d3.json("data/buildings.json").then((data)=>{

  // Define scales
  //
  // X scale (band)
  var x = d3.scaleBand()
    .domain(data.map((d)=>{return d.name}))
    .range([0,400]) // width to be 400, the same as the canvas width
    .padding(0.2);

  // Y scale (linear)
  var y = d3.scaleLinear()
    .domain([0,d3.max(data,(data)=>{return data.height})])
    .range([400,0]); // height to be 400, the same as the canvas height



  // Draw bars
  var rects = svg4.selectAll("rect").data(data)
    .enter()
      .append("rect")
        .attr("x",(d)=>{return x(d.name)})
        .attr("y", (d)=>{return y(d.height)})
        .attr("width", x.bandwidth)
        .attr("height", (d)=>{return 400 - y(d.height)})
        .attr("fill", "tomato");

}).catch((e)=>{console.log(e)});
