var SQL = require("sql.js");
var dbpath = "../decima.sqlite";
var fs = require("fs");
var path = require("path");

var getAll = (statement) => {
    var result;
    var results = [];
    while(statement.step()){
        result = statement.getAsObject();
        results.push(result);
    }
    return results;
};

var filter = (query) => {
    var db = new SQL.Database(fs.readFileSync(path.join(__dirname, dbpath)));
    var search = [];
    if(query.unread) search.push("read=0");
    if(query.read) search.push("read=1");
    if(query.quality) search.push("quality=1");
    if(query.author) search.push(`author LIKE "%${query.author}%"`);
    if(query.title) search.push(`title LIKE "%${query.title}%"`);
    if(query.search) search.push(`author LIKE "%${query.search}%" OR title LIKE "%${query.search}%"`);
    search = `SELECT * FROM LIBRARY WHERE ${search.join(' AND ')};`;
    return getAll(db.prepare(search));
};

module.exports = filter;
