//values for working with the chart
var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;

//our domain
var projects = ["A", "C", "F", "S"];

//set some scales
var colorScale = d3.scale.category10();

var xScale = d3.scale.ordinal()
      .domain(projects)
      .rangeBands([0, width]),
    yScale = d3.scale.linear()
      .domain([0, 20])
      .range([0, height]);

//append svg to the chart id. 
var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      //this needs to be done so the axes can be outside the chart. We are returning a 
      //new element to append things to
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

var month = 0;

//for each feature, add a rectangle and style it
var features = svg.selectAll(".feature")
    .data(months[month])
    .enter()
      .append("rect")
        .attr("x", function(d) { return xScale(d.project) + 40 } ) 
        .attr("width", xScale.rangeBand() - 80) //hard-coding is for gap
        .style("fill", colorScale(1) )
        .attr("class", "feature")
    
        .attr("y", function(d) { return height - yScale(d.numberOfFeatures); } )
        .attr("height", function(d) { return yScale(d.numberOfFeatures); });

var fixedBugs = svg.selectAll(".fixed-bug")
    .data(months[month])
    .enter()
      .append("rect")
        .attr("x", function(d) { return xScale(d.project) + 40 } ) 
        .attr("width", xScale.rangeBand() - 80) 
        .style("fill", colorScale(2) )
        .attr("class", "fixed-bug")
    
        .attr("y", function(d) { return height - ( yScale(d.numberOfFeatures) + yScale(d.fixedBugs) ) } )
        .attr("height", function(d) { return yScale(d.fixedBugs); }); 

//the radius of the circle is related to the number of outstanding bugs
var unfixedBugs = svg.selectAll(".unfixed-bug")
    .data(months[month])
    .enter() 
      .append("circle")
        .style("fill", "red")
        .attr("class", "unfixed-bug")
        .attr("cx", function(d) { return xScale(d.project) + 70;  } ) 
        
        .attr("cy", function(d) { return height - ( yScale(d.numberOfFeatures) + yScale(d.fixedBugs) + 40 ); } )
        .attr("r", function(d) { return d.unfixedBugs * 10; } );

//redraw the y and the height (for rectangles) and the cy and radius (for circles)
function redraw() {
  svg.selectAll(".feature")
    .data(months[month])
    .transition()
      .duration(1000)
    .attr("y", function(d) { return height - yScale(d.numberOfFeatures); } )
    .attr("height", function(d) { return yScale(d.numberOfFeatures); });

  svg.selectAll(".fixed-bug")
    .data(months[month])
    .transition()
      .duration(1000)
    .attr("y", function(d) { return height - (yScale(d.numberOfFeatures) + yScale(d.fixedBugs) ); } ) 
    .attr("height", function(d) { return yScale(d.fixedBugs); });

  svg.selectAll(".unfixed-bug")
    .data(months[month])
    .transition()
      .duration(1000)
    .attr("cy", function(d) { return height - ( yScale(d.numberOfFeatures) + yScale(d.fixedBugs) + 40 ); } )
    .attr("r", function(d) { return d.unfixedBugs * 10; });
}

//call the redraw function every 1500 seconds
setInterval(function() {
  if (month < months.length - 1) {
    month++;
    redraw();
  }
}, 1500);  

// # Draw Axis
var axis = svg.append('g')
            .attr('class', 'axis');

// add the lables along the bottom
axis.selectAll('text')
    .data(projects).enter()
    .append('text')
      .text(function(d){ return d; })
      .attr('dx', function(d){ return xScale(d) + (xScale.rangeBand() / 2); })
      .attr('dy', height + 18)
      .attr('width', xScale.rangeBand())
      .attr('text-anchor', 'middle');

// add the lines up the side and along the bottom
axis.append('line')
  .attr('x1', 0)
  .attr('x2', width)
  .attr('y1', height)
  .attr('y2', height);
axis.append('line')
  .attr('x1', 0)
  .attr('x2', 0)
  .attr('y1', 0)
  .attr('y2', height);

axis.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height + 15)
  .text("projects");

axis.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", - 18)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("number of completed features");
