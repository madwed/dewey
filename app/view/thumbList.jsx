var React = require("react");
var Thumb = require("./thumb.jsx");



var ThumbList = React.createClass({
    render: function () {
        return (
            <div className="content">
                {this.props.pages.map((page) => {
                    return (
                        <div>
                        <Thumb page={page}></Thumb>
                        <div></div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = ThumbList



