var React = require("react");

var Reader = React.createClass({
    render: function () {
        return (
            <iframe className="content reader" src={this.props.doc}></iframe>
        );
    }
});

module.exports = Reader;
