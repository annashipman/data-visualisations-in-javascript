var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart").append("svg");

var month = 0;

var features = svg.append("g")
    .selectAll("rect")
    .data(months[month]) 
    .enter()
    .append("rect")
    .style("fill", "green" )
    .attr("width", 60)        
    .attr("x", function(d) { return projectPosition(d) } )
    
    .attr("y", function(d) { return height - (d.numberOfFeatures * 20) } )
    .attr("height", function(d) { return d.numberOfFeatures * 20 });

function projectPosition(d) {
    var projectX; 
    if (d.project == "A") { projectX = 100; }
    else if (d.project == "C") { projectX = 200; }
    else if (d.project == "F") { projectX = 300; }
    else if (d.project == "S") { projectX = 400; }
    return projectX;
}
