var React = require("react");

var Thumb = React.createClass({
    render: function () {
        return (
            <div className="thumb">
                <h3>{this.props.page.title}</h3>
                <p>Read: {this.props.page.read}</p>
                <p>Quality: {this.props.page.quality}</p>
                <a href={this.props.page.source}>From</a>
            </div>
        );
    }
});

var ThumbList = React.createClass({
    render: function () {
        var thumbs = this.props.pages.map((page) => {
            return (
                <Thumb page={page}></Thumb>
            );
        });
        return (
            <div className="content">
                {thumbs}
            </div>
        );
    }
});

module.exports = ThumbList;
