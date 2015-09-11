var React = require("react");
var Thumb = require("./thumb.jsx");
var ThumbTitle = require("./thumbTitle.jsx");

var ThumbList = React.createClass({
    render: function () {
        var {pages, ...other} = this.props;
        return (
            <div className="content">
                <ThumbTitle></ThumbTitle>
                {pages.map((page, i) => {
                    return (
                        <Thumb key={page._id} color={i % 2} page={page} {...other}></Thumb>
                    );
                })}
            </div>
        );
    }
});

module.exports = ThumbList



