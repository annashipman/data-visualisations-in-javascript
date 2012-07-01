function init(){

   var sb = new $jit.Sunburst({
        injectInto: 'infovis',
        levelDistance: 90,
        Node: { overridable: true },
        Label: { type: "Native" },
        Events: {
          enable: true,
          onClick: function(node) {
            if(!node) return;
            var caption = node.name + "\n", data = node.data;
            if("type" in data) {
              caption += "Type: " + data.type+"\n";
            }
            if("startDate" in data) {
              caption += "Work started on: " + data.startDate + "\n";
            }
            if("endDate" in data) {
              caption += "In production on: " + data.endDate+"\n";
            }
            if("description" in data) {
              caption += data.description;
            }

            $jit.id('inner-details').innerHTML = caption;

            sb.tips.hide();
           
            sb.rotate(node, 'animate' , {
              duration: 1000,
              transition: $jit.Trans.Quart.easeInOut
            });
          }
        },
        Tips: {
          enable: true,
          onShow: function(tip, node) {
            var html = "<div class=\"tip-title\">" + node.name + "</div>"; 
            var data = node.data;
            if("timeTaken" in data) {
              html += "<b>Time Taken:</b> " + data.timeTaken + " days";
            }
            tip.innerHTML = html;
          }
        },
        NodeStyles: {
          enable: true,
          type: 'Native',
          stylesClick: {
            'color': "#36305D"
          },
          stylesHover: {
            'color': "#3E56A1"
          }
        } 
    });

    sb.loadJSON(json);
    sb.refresh(); 
    
}
