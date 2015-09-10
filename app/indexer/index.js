var grabPage = require("../grabPage");
var db = require("../db");
var fs = require("fs");
var path = require("path");
var paths = require("../../paths");
var promisify = require("es6-promisify");


// var saveDb = () => {
//     var data = db.export();
//     var buffer = new Buffer(data);
//     writeFile(paths.card, "");
//     fs.writeFileSync(paths.db, buffer);
// };
var addToDB = () => {
    var readFile = promisify(fs.readFile);
    var writeFile = promisify(fs.writeFile);
    readFile(paths.card).then((data) => {
        var entries = JSON.parse("[" + data.toString().slice(0, -1) + "]");
        entries = entries.map((entry) => {
            return grabPage(entry.source).then((html) => {
                entry.html = html;
                return entry;
            }).catch((err) => {
                entry.html = err;
                return entry;
            });
        });
        return Promise.all(entries);
    }).then((entries) => {
        return Promise.all(entries.map((entry) => {
            return new Promise((resolve, reject) => {
                db.insert({
                    title: entry.title || "undefined",
                    read: entry.read || false,
                    quality: entry.quality || false,
                    author: entry.author || undefined,
                    source: entry.source || undefined,
                    added: new Date()
                }, (err, newDoc) => {
                    if (err) reject(err);
                    resolve(newDoc);
                });
            }).then((doc) => {
                doc.html = entry.html;
                return doc;
            }).catch((err) => {
                console.log("ERROR WHILE PUTTING BOOKS ON THE SHELF", err);
            });
            //Put the page on the shelf (store it in the catalogue)  
        }));
    }).then((entries) => {
        return Promise.all(entries.map((entry) => {
            console.log(entry);
            var shelf = path.join(paths.catalogue, entry._id + ".html");
            return writeFile(shelf, entry.html)
                .then(() => {
                    console.log("Saved " + entry._id);
                }).catch(() => {
                    console.log("Error saving " + entry._id);
                });
        }));
    }).then(() => {
        console.log("Successfully shelved!");
    }).catch((err) => {
        console.log(err);
    });

};

module.exports = addToDB;



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