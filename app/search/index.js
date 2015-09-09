var Datastore = require("nedb");
require("../indexer")();
var paths = require("../../paths");


var filter = (query) => {
    var db = new Datastore({filename: paths.db, autoload: true});
    db.remove({}, {multi: true});
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
    return new Promise((resolve, reject) => {
        db.find({}).exec((err, docs) => {
            console.log(docs, err);
            if (err) reject(err);
            resolve(docs);
        });
    });
};

module.exports = filter;
