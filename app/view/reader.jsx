var React = require("react");
var paths = require("../../paths");


var Reader = React.createClass({
    render: () => {
        return (
            <iframe className="content reader" src={paths.catalogue + "/Uxg8skcYSVl5fyF7.html"}></iframe>
        );
    }
});

module.exports = Reader;
