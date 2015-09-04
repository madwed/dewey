var grabPage = require("../grabPage");
var SQL = require("sql.js");
var fs = require("fs");
var path = require("path");

var dbpath = "../decima.sqlite";

var db = new SQL.Database(fs.readFileSync(path.join(__dirname, dbpath)));

fs.readFile()


var data = db.export();
var buffer = new Buffer(data);
fs.writeFileSync(path.join(__dirname, dbpath), buffer);

/*
LIBRARY
{
    title: string,
    read: bool,
    quality: bool,
    author: string,
    source: string
}
*/