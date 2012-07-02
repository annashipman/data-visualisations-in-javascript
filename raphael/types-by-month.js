function init() {

	var r = Raphael("holder", 600, 800);

	var data = [10,10,25,50],
		colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"];	
    
    r.piechart(125, 125, 100, data, {colors:colours});

}