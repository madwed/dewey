var React = require("react");
var paths = require("../../paths");
var path = require("path");

var Sidebar = require(__dirname + "/sidebar.jsx");
var Reader = require(__dirname + "/reader.jsx");
var ThumbList = require(__dirname + "/thumbList.jsx");

var search = require("../search");


var Main = React.createClass({
	getInitialState: function () {
		return {pages: [], doc: ""};
	},
	componentDidMount: function () {
		search({read: false}).then((docs) => {
			this.setState({pages: docs});
		}).catch((err) => {
			console.log("error getting docs", err);
		});
	},
	refineOptions: function (query) {
		search(query).then((docs) => {
			this.setState({pages: docs, doc: ""});
		});
	},
	read: function (id) {
		id = path.join(paths.catalogue, id + ".html")
		this.setState({doc: id})
	},
	render: function () {
		return (
			<div>
				{this.state.doc ? 
					<Reader doc={this.state.doc}></Reader> 
					: <ThumbList pages={this.state.pages} open={this.read}></ThumbList>}
				<Sidebar refine={this.refineOptions}></Sidebar>
			</div>
		);
	}
});

module.exports = Main;

	