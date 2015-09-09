var React = require("react");

require("babel/register");

require("node-jsx").install({
	extension: ".jsx",
	harmony: true
});

var Sidebar = require(__dirname + "/app/view/sidebar.jsx");
var Reader = require(__dirname + "/app/view/reader.jsx");
var Shelf = require(__dirname + "/app/view/content.jsx");

React.render(
	<div>
		<Sidebar></Sidebar>
		<Reader></Reader>
		<Shelf></Shelf>
	</div>,
	document.getElementById("content")
);