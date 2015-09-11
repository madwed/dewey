var React = require("react");
var classnames = require("classnames");

var Thumb = React.createClass({
    render: function () {
        var open = () => {
            this.props.open(this.props.page._id);
        }
        var classes = classnames({
            thumbBox: true,
            even: this.props.color === 0,
            odd: this.props.color
        });
        return (
            <div className={classes} onClick={open}>
                <p className="thumb title">{this.props.page.title}</p>
                <p className="thumb read">{this.props.page.read ? "Read" : "Unread"}</p>
                <p className="thumb quality">{this.props.page.quality ? "Great" : "Eh"}</p>
                <a className="thumb source" href={this.props.page.source}>From</a>
            </div>
        );
    }
});

module.exports = Thumb;
