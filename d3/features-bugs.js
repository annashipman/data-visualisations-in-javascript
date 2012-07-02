var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;

var projects = ["A", "C", "F", "S"];

var colorScale = d3.scale.category10();

var xScale = d3.scale.ordinal()
      .domain(projects)
      .rangeBands([0, width]),
    yScale = d3.scale.linear()
      .domain([0, 20])
      .range([0, height]);

var svg = d3.select("#chart").append("svg");

var month = 0;

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
