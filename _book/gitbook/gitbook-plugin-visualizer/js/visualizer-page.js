var visualizerConfig;

function getNumberOfVisualizers() {
    var i = 0;
    while(true) {
        i++;
        var visualizerId = "#visualizer"+i;
        if ($(visualizerId).length == 0) {
            i--;
            break;
        }
    }
    return i;
}

function initVisualizer(i) {
    var visualizer;
    visualizer = new Visualizer('#visualizer'+i, '', '', {executable: true});
}

// fetch trace of execution from remote server
function getExecutionResult(user_script, input_data, explain) {
    host = visualizerConfig.execution_host;
    var url = host + '/execute';
    console.log(url);
    var res = $.get(url, {
        user_script: user_script,
        input_data : input_data,
        explain    : explain
    });
    console.log(res);
    return res;
}


require(["gitbook"], function (gitbook) {

    // Bind page events to js functions
    gitbook.events.bind("start", function (e, config) {
        visualizerConfig = config.visualizer;
        for (var i = 1; i <= getNumberOfVisualizers(); i++) {
            initVisualizer(i);
        }
    });
    gitbook.events.bind("page.change", function() {
        for (var i = 1; i <= getNumberOfVisualizers(); i++) {
            initVisualizer(i);
        }
    });
});
