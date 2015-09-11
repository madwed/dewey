var React = require("react");
var Logo = require("./logo.jsx");

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
				<Logo/>
				<button onClick={findAll}>Sync</button>
				<input type="text" placeholder="search"/>
				<button onClick={findUnread}>Unread</button>
			</div>
		);
	}
});

module.exports = Sidebar;
