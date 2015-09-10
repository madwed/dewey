var React = require("react");
var Thumb = require("./thumb.jsx");

var ThumbList = React.createClass({
    render: function () {
        var {pages, ...other} = this.props;
        return (
            <div className="content">
                {pages.map((page) => {
                    return (
                        <Thumb key={page._id} page={page} {...other}></Thumb>
                    );
                })}
            </div>
        );
    }
});

module.exports = ThumbList



