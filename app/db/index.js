var Datastore = require("nedb");
var paths = require("../../paths");

var db = new Datastore({filename: paths.db, autoload: true});

module.exports = db;
