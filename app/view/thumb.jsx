var React = require("react");

var Thumb = React.createClass({
    render: function () {
        return (
            <div className="thumb">
                <h3>{this.props.page.title}</h3>
                <p>Read: {this.props.page.read ? "Read" : "Unread"}</p>
                <p>Quality: {this.props.page.quality ? "Great" : "Eh"}</p>
                <a href={this.props.page.source}>From</a>
            </div>
        );
    }
});

module.exports = Thumb;
