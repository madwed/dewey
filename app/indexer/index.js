var grabPage = require("../grabPage");
var Datastore = require("nedb");
var fs = require("fs");
var path = require("path");
var paths = require("../../paths");
var promisify = require("es6-promisify");



// Load the db
// var db = new SQL.Database(fs.readFileSync(path.join(__dirname, paths.db)));

// db.transaction((tx) => {
//     tx.executeSql("CREATE TABLE IF NOT EXISTS LIBRARY (id PRIMARY KEY CHAR(12), title TEXT NOT NULL DEFAULT 'untitled', read BOOLEAN NOT NULL, quality BOOLEAN, author TEXT, source TEXT NOT NULL, added DATETIME DEFAULT CURRENT_TIME;");
// });


// var saveDb = () => {
//     var data = db.export();
//     var buffer = new Buffer(data);
//     writeFile(paths.card, "");
//     fs.writeFileSync(paths.db, buffer);
// };
var addToDB = function (){
    var db = new Datastore({filename: paths.db, autoload: true});
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
        console.log("reading")
        return Promise.all(entries);
    }).then((entries) => {
        return Promise.all(entries.map((entry) => {
            console.log(entry.title);
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