/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

// Set margins
var margin = { top:50, right:20, bottom:100, left:80 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;



// Add the SVG canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom);


// Add the outer group
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// Data join
d3.json( "data/revenues.json").then((data)=>{

  data.forEach((i)=>{i.revenue = +i.revenue;});

  // Defining scales
  var x = d3.scaleBand()
    .domain(data.map((d)=>{return d.month}))
    .range([0,width])
    .padding(0.2);

  var y = d3.scaleLinear()
    .domain([0,d3.max(data,(d)=>{return d.revenue})])
    .range([height,0]);


  // Axes
  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall);

  var yAxisCall = d3.axisLeft(y)
    .tickFormat((d)=>{return "$"+d;})
  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);


  // Labels
  // X Label
  g.append("text")  
    .attr("class", "x axis-label")
    .attr("x", width/2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .text("Month");
  // Y Label
  g.append("text")
    .attr("class", "y axis-label")
    .attr("x",-(height/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

  // Draw rectangles
  var rects = g.selectAll("rect")
    .data(data)

  rects.enter()
    .append("rect")
      .attr("x", (d)=>{return x(d.month)})
      .attr("y", (d)=>{return y(d.revenue)})
      .attr("width", x.bandwidth)
      .attr("height", (d)=>{return height - y(d.revenue)})
      .attr("fill", "gray");

})


 




