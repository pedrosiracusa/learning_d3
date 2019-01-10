

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



/* Adding a bar chart from buildings data */
d3.json("data/buildings.json").then((data)=>{
  data.forEach((d)=>{d.height = +d.height;});


  /* Configuring the scale */

  var x = d3.scaleBand()
    .domain(["Burj Khalifa", "Shanghai Tower", "Abraj Al-Bait Clock Tower", "Ping An Finance Centre", "Lotte World Tower"]) // All categories
    .range([0,500]) // The canvas width is 500
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3.scaleLinear()
    .domain([0,828])
    .range([0,400]);

  var rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", (d,i)=>{return x(d.name)})
      .attr("y", 50)
      .attr("width", x.bandwidth())
      .attr("height", (d)=>{return y(d.height)})
      .attr("fill","gray");
}).catch((error)=>{console.log(error)})




