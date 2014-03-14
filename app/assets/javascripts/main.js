$(document).ready(function(){
    var drawDatamap,
        jsonData = {},
        jsonSuccessHandler,
        popupHandler;

    jsonSuccessHandler = function(json_data){
      var entry;
      console.log("success");

      json_data.forEach(function(element){
          entry = {};
          entry['fillKey'] = element.fill_color;
          entry['reincarcerated'] = element.returned_to_jail;
          entry['pop_at_risk'] = element.pop_at_risk;
          entry['percent'] = element.percent;
          jsonData[element.abbrev] = entry;
      });
      drawDatamap(jsonData);
    };

    // using the datamap.usa.min.js
    popupHandler = function(geo, state_data) {
      return ['<div class="hoverinfo"><strong> ',
              geo.properties.name,
              '<br> At Risk Population',
              ': ' + state_data.pop_at_risk,
              '<br> Number Re-Incarcerated: ',
              ': ' + state_data.reincarcerated,
              '<br> Percent: ',
              ': ' + state_data.percent,
              '</strong></div>'].join('');
    };

    drawDatamap = function(all_states_data){
      var map = new Datamap({
          element: document.getElementById('container'),
          fills: {
              HIGH: 'salmon',
              LOW: 'lemonchiffon',
              MEDIUM: 'lightsteelblue',
              UNKNOWN: 'gainsboro',
              defaultFill: 'gainsboro'
          },
          scope: 'usa',
          data: all_states_data,
          geographyConfig: {
              popupTemplate: popupHandler
          }
      });
      map.legend({legendTitle: "Recivitism rate by State"});
    };

    $.get('/states/index.json')
        .success(jsonSuccessHandler.bind(this));
});
