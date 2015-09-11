var React = require("react/addons");
var Thumb = require("./thumb.jsx");
var ThumbTitle = require("./thumbTitle.jsx");

var ThumbList = React.createClass({
    render: function () {
        var {pages, ...other} = this.props;
        var list = React.addons.createFragment({
            title: <ThumbTitle></ThumbTitle>,
            thumbs: pages.map((page, i) => {
                return (
                    <Thumb key={page._id} color={i % 2} page={page} {...other}></Thumb>
                );
            })
        });
        return (
            <div className="content">
                {list}
            </div>
        );
    }
});

module.exports = ThumbList



