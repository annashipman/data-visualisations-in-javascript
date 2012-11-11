function init() {

    var r = Raphael("holder", 2000, 800),
        colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"],
        sortedData = sort_data(),
        flag;
   
    var x = 50,
        line = 1,
        radius = 25,
        labelOffset = radius + 10,
        pieSpacing = radius + 55,
        y = pieSpacing*line;

    var lineX = [],
      lineYFeatures = [],
      lineYBugs = [],
      lineYInfrastructure = [],
      lineYMaintenance = [];

    sortedData.forEach(function(month) {

      var data = [month.features, month.bugs, month.infrastructure, month.maintenance];
      
        var pie = r.piechart(x, y, radius, data, {colors:colours});  
            
        lineX.push(sortedData.indexOf(month));
        lineYFeatures.push(month.features);
        lineYBugs.push(month.bugs);
        lineYInfrastructure.push(month.infrastructure);
        lineYMaintenance.push(month.maintenance); 

        r.text(x, y + labelOffset, month.monthString);
        x += pieSpacing;

        var monthNumber = sortedData.indexOf(month) + 1;
        if (monthNumber % 6 == 0) {
            x = 50;
            line++;
        y = pieSpacing * line;
      }

    });
    
    x += pieSpacing;
    line++;
    y = pieSpacing * line;
  
  var legendOptions = { 
    legend: ["Features", "Bugs", "Infrastructure", "Maintenance"], 
    legendpos: "east",  
    colors: colours}
  
  pie = r.piechart(x, y, radius, [1, 1, 1, 1], legendOptions);

  var lineData = [lineYFeatures, lineYBugs, lineYInfrastructure, lineYMaintenance];
  
  r.linechart(700, 60, 300, 220, lineX, lineData, { 
    axis: "0 0 1 1", 
    axisxstep: 11, 
    smooth: true, 
    colors: colours 
   })

}