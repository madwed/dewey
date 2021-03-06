var React = require("react");

var ThumbTitle = React.createClass({
	render: function () {
		return (
			<div className="thumbBox thumbTitle">
                <p className="thumb title">Title</p>
                <p className="thumb">Author</p>
                <p className="thumb read">Read</p>
                <p className="thumb quality">Quality</p>
                <p className="thumb source">From</p>
                <p className="thumb">Added</p>
            </div>
		);
	}
});

module.exports = ThumbTitle;