var React = require("react");

var Sidebar = React.createClass({
	render: function () {
		return (
			<div className="sidebar">
				<button>Sync</button>
				<input type="text" placeholder="search"/>
				<button>Unread</button>
			</div>
		);
	}
});

module.exports = Sidebar;
