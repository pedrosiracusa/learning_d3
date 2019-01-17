/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/


/* D3 Margin Convention */
var margin = {top:10, right:10, bottom:50, left:50};
var width = 600 - margin.right - margin.left;
var height = 400 - margin.top - margin.bottom;

var year = 1800;


/* Set the canvas */
var g = d3.select("#chart-area").append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.right + margin.left)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")");


/* Set scales */
// X Scale
var x = d3.scaleLog()
  .base(10)
  .domain([300, 150000])
  .range([0,width]);

// Y Scale
var y = d3.scaleLinear()
  .domain([0,90])
  .range([height,0]);

var area = d3.scaleLinear()
  .domain([2000, 1400000000])
  .range([25*Math.PI,1500*Math.PI]);

var fill = d3.scaleOrdinal(d3.schemeCategory10);


/* Set Axes */
// X Axis
var xAxisCall = d3.axisBottom(x)
  .tickValues([400, 4000, 40000])
  .tickFormat(d=>"$"+(d<1000?d:d/1000+"k"));
g.append("g")
  .attr("class", "x axis")
  .attr("transform","translate(0,"+height+")")
  .call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
  .tickFormat(d=> +d)
g.append("g")
  .attr("class", "y axis")
  .call(yAxisCall);

// Legend
var continents = ["europe","asia","americas","africa"]
var legend = g.append("g")
  .attr("transform",`translate(${width-15},${height-125})`)
  .attr("text-anchor","end");

continents.forEach((continent,i)=>{
  var legendRow = legend.append("g")
    .attr("transform", `translate(0,${i*20})`);

  legendRow.append("rect")
    .attr("width",10)
    .attr("height",10)
    .attr("fill", fill(continent));

  legendRow.append("text")
    .attr("x",-10)
    .attr("y",10)
    .attr("text-anchor","end")
    .style("text-transform","capitalize")
    .text(continent);
})


/* Labels */

// X label
var xLabel = g.append("text")
  .attr("transform", `translate(${width/2},${height+margin.bottom*.8})`)
  .attr("font-size", "20px")
  .attr("text-anchor","middle")
  .text("GDP Per Capita ($)");

// Y label
var yLabel = g.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height/2)
  .attr("y", -30)
  .attr("text-anchor","middle")
  .attr("font-size","20px")
  .text("Life Expectancy (Years)")

// Year label
var yearLabel = g.append("text")
  .attr("transform", `translate(${width},${height-10})`)
  .attr("font-size",40)
  .attr("text-anchor","end")
  .attr("opacity", "0.6")
  .text(year);



/* Data Join */
d3.json("data/data.json").then(function(data){
  const dataFiltered = data.map( d => d.countries.filter(country => country.income && country.life_exp) );

  // Run for the first time
  update(dataFiltered[0]);

  // And then in an interval
  var ctr = 1;
  d3.interval(()=>{
    update(dataFiltered[ctr]); 
    ctr = (ctr+1)%(2015-1800);
    year = ctr + 1800;
  }, 100);
});

function update(data){

  var t = d3.transition().duration(100);
  var circles = g.selectAll("circle").data(data, d=>d.country);

  // EXIT  old elements
  circles.exit().remove();

  // ENTER new elements
  circles.enter()
    .append("circle")
    .attr("r", d=> Math.sqrt( area(d.population) / Math.PI ))
    // UPDATE
    .merge(circles)
    .transition(t)
      .attr("cx", d=> x(d.income))
      .attr("cy", d=> y(d.life_exp))
      .attr("fill", d=> fill(d.continent))


  // Updating the year label
  yearLabel.text(year);

      

}

