var React = require("react");

var Sidebar = React.createClass({
	render: function () {
		var findAll = () => {
			this.props.refine({});
		};
		var findUnread = () => {
			this.props.refine({read: false});
		};
		return (
			<div className="sidebar">
				<p>Dewey</p>
				<button onClick={findAll}>Sync</button>
				<input type="text" placeholder="search"/>
				<button onClick={findUnread}>Unread</button>
			</div>
		);
	}
});

module.exports = Sidebar;
