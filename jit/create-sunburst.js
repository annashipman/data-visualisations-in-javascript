function init(){
	
 	var sb = new $jit.Sunburst({
        injectInto: 'infovis',
        levelDistance: 90,
        Node: { overridable: true } 
    });

    sb.loadJSON(json);
    sb.refresh(); 

}
