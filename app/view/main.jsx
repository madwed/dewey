var React = require("react");

var Sidebar = require(__dirname + "/sidebar.jsx");
var Reader = require(__dirname + "/reader.jsx");
var ThumbList = require(__dirname + "/thumbList.jsx");

var search = require("../search");


var Main = React.createClass({
	getInitialState: function () {
		return {pages: []};
	},
	componentDidMount: function () {
		search({unread: true}).then((docs) => {
			this.setState({pages: docs})
		}).catch((err) => {
			console.log("error getting docs", err);
		});
	},
	refineOptions: function (query) {
		search(query).then((docs) => {
			this.setState({pages: docs})
		});
	},
	read: function (id) {
		var id = id;
	},
	render: function () {
		return (
			<div>
				<Sidebar refine={this.refineOptions}></Sidebar>
				<Reader></Reader>
				<ThumbList pages={this.state.pages} open={this.read}></ThumbList>
			</div>
		);
	}
});

module.exports = Main;

	