var Datastore = require("nedb");
var path = require("path");
var dbpath = path.join(__dirname, "../decima.db");

var filter = (query) => {
    var db = new Datastore({filename: dbpath, autoload: true});
    //Read / Unread and quality should work as is from the query
    if(query.author) query.author = {$regex: new RegExp(query.author)};
    if(query.title) query.title = {$regex: new RegExp(query.title)};
    if(query.search){
        query.$or = [{
            author: {$regex: new RegExp(query.author)},
            title: {$regex: new RegExp(query.title)}
        }]
        delete query.search;
    }
    return db.find(query).exec();
};

module.exports = filter;
