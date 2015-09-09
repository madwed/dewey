var React = require("react");
var ThumbList = require("./thumb.jsx");
var search = require("../search");

search({});
var Shelf = React.createClass({
	render: () => {
		return (
			<div className="content">
				<ThumbList pages={[]}></ThumbList>
			</div>
		);
	}
});

module.exports = Shelf;
// });


