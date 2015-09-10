// require("../indexer")();
var db = require("../db");

var filter = (query) => {
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
        db.find(query).exec((err, docs) => {
            if (err) reject(err);
            console.log(docs);
            resolve(docs);
        });
    });
};

module.exports = filter;
