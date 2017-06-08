function createVisualizerHtmlFactory() {
    var numberOfVisualizers = 0;
    return function() {
        numberOfVisualizers++;
        divId = 'visualizer' + numberOfVisualizers.toString();
        return "<div id="+divId+"></div>";
    }
}

var getVisualizerHtml = createVisualizerHtmlFactory();

module.exports = {
    website: {
        assets: "./assets",
        js : [
            "js/jquery-1.11.1.min.js",
            "js/jquery.jsPlumb-1.6.4-min.js",
            "bootstrap/js/bootstrap.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js",
            "js/visualizer.js",
            "js/visualizer-page.js"
        ],
        css : [
            "bootstrap/css/bootstrap.min.css",
            "bootstrap/css/bootstrap.css",
            "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
            "css/visualizer.css"
        ]
    },

    // Map of hooks
    hooks: {},

    // Map of new blocks
    blocks: {
        visualizer: {
            process: function (block) {
                var html = getVisualizerHtml();
                return html;
            }
        }
    },

    // Map of new filters
    filters: {}
};
