var React = require("react");

var Logo = React.createClass({
	render: function () {
		return (
			<p className="logo">
				<span className="logo-reg">DE</span>
				<span className="logo-medium">WE</span>
				<span className="logo-reg">Y</span>
			</p>
		);
	}
});

module.exports = Logo;
