var React = require("react");
var paths = require("../../paths");


var Reader = React.createClass({
    render: () => {
        return (
            <iframe className="content reader" src={paths.catalogue + "/fqUu8d4Fby5la1Wa.html"}></iframe>
        );
    }
});

module.exports = Reader;
