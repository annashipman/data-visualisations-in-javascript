function init() {

	var r = Raphael("holder", 600, 800);

	var sortedData = sort_data(),
		colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"];	
    
    var x = 50,
       	line = 1,
       	radius = 25,
       	labelOffset = radius + 10,
       	pieSpacing = radius + 55,
       	y = pieSpacing*line;

    sortedData.forEach(function(month) {

    	var data = [month.features, 
    		month.bugs, 
    		month.infrastructure, 
    		month.maintenance];
    	
      	var pie = r.piechart(x, y, radius, data, {colors:colours})
            
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
}