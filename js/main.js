$(document).ready( function() {
    function getSegmentedData(final_result){
        var segmentedData = [];
        var count = 0
        for (var i in final_result){
            if (count == 0){
                segmentedData.push({
                    x: count,
                    y: final_result[i][0]
                })
                count += final_result[i].length 
                segmentedData.push({
                    x: count - 1,
                    y: final_result[i][final_result[i].length - 1]
                })
                continue;
            }
            count += final_result[i].length 
            segmentedData.push({
                x: count - 1,
                y: final_result[i][final_result[i].length - 1]
            })
        }
        return segmentedData
    }
    var seriesData = [];
    var palette = new Rickshaw.Color.Palette();
    var inputArray = [];
    for (var i = 0; i < 75; i++) {
        var val = Math.random()*100
        seriesData.push( {
            x: i,
            y: val
        } );
        inputArray.push(val);
    }
    var final_result = top_down(inputArray);
    var segmentedData = getSegmentedData(final_result);
    var seriesArray = [
            {
                name: 'Line Graph',
                data: seriesData,
                renderer: 'line',
                color: palette.color()
            },{
                name: 'Scatter Plot',
                data: segmentedData,
                color: palette.color(),
                renderer: 'scatterplot'
            },{
                name: 'Trend Line',
                data: segmentedData,
                color: palette.color(),
                renderer: 'line'
            }
        ]
    var graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        renderer: 'multi',
        height: 300,
        dotSize: 2,
        series: seriesArray
    } );
    var xAxis = new Rickshaw.Graph.Axis.X( {
        graph: graph,
        format: Rickshaw.Fixtures.Number.formatKMBT
    } );
    var yAxis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        format: Rickshaw.Fixtures.Number.formatKMBT
    } );
    graph.render();
    $("#segment_button").click( function(e) {
        e.preventDefault();
        //Parse the JSON input by the user and make it a array so that it can be plotted
        var inputArray = $.parseJSON($("#array_input").val());
        var inputSeries = [];
        var inputY = [];
        for(var i in inputArray){
            inputSeries.push({
                x: inputArray[i][0],
                y: inputArray[i][1]
            })
            inputY.push(inputArray[i][1])
        }
        var new_final_result = top_down(inputY);
        console.log(top_down(inputY))
        var newSegmentedData = getSegmentedData(new_final_result);
        seriesArray[0].data = inputSeries;
        seriesArray[1].data = newSegmentedData;
        seriesArray[2].data = newSegmentedData;
        graph.update();
    } );
} );