var path = require("path");

module.exports = {
	root: __dirname,
	app: path.join(__dirname, "/app"),
	view: path.join(__dirname, "/app/view"),
	db: path.join(__dirname, "/app/decima.db"),
	catalogue: path.join(__dirname, "catalogue"),
	card: path.join(__dirname, "card.json")
};
