$(document).ready(function(){

    var drawDatamap,
        remoteData = {},
        remoteSuccessHandler,
        popupHandler;

    remoteSuccessHandler = function(data){
        var entry;
        console.log("success");

        data.forEach(function(el){
            entry = {};
            entry['fillKey'] = el.fill_color;
            entry['reincarcerated'] = el.returned_to_jail;
            entry['pop_at_risk'] = el.pop_at_risk;
            entry['percent'] = el.percent;
            remoteData[el.state_abbr] = entry;
        });

        drawDatamap(remoteData);
    };

    popupHandler = function(geo, data) {
        // Markup for the popup
        return ['<div class="hoverinfo"><strong> ',
                geo.properties.name,
                '<br> At Risk Population',
                ': ' + data.pop_at_risk,
                '<br> Number Re-Incarcerated: ',
                ': ' + data.reincarcerated,
                '<br> Percent: ',
                ': ' + data.percent,
                '</strong></div>'].join('');
    };

    drawDatamap = function(data){

        var map = new Datamap({
            element: document.getElementById('container'),
            fills: {
                HIGH: 'red',
                LOW: 'green',
                MEDIUM: 'yellow',
                UNKNOWN: 'gray',
                defaultFill: 'gray'
            },
            scope: 'usa',
            data: data,
            geographyConfig: {
                popupTemplate: popupHandler
            }
        });


        map.legend({legendTitle: "Recivitism rate by State"});
    };


    $.get('/big_data/states/index.json')
        .success(remoteSuccessHandler.bind(this));

});
