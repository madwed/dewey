var React = require("react");

require("babel/register");

require("node-jsx").install({
	extension: ".jsx",
	harmony: true
});

var Main = require("./main.jsx");

React.render(
	<Main></Main>,
	document.getElementById("content")
);