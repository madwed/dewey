var grabPage = require("../grabPage");
var SQL = require("sql.js");
var fs = require("fs");
var path = require("path");
var promisify = require("es6-promisify");

var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

// Load the db
var dbpath = "../decima.sqlite";
var db = new SQL.Database(fs.readFileSync(path.join(__dirname, dbpath)));

var cataloguePath = "../../catalogue";
var cardPath = "../../card.json";

var saveDb = () => {
    var data = db.export();
    var buffer = new Buffer(data);
    writeFile(path.join(__dirname, cardPath), "");
    fs.writeFileSync(path.join(__dirname, dbpath), buffer);
};

var getUniqueId = () => {
    var id = Math.random().toString(32).slice(2) + Math.random().toString(32).slice(2);
    var statement = db.prepare("SELECT * FROM LIBRARY WHERE id=$id");
    statement.bind({$id: id});
    statement.step();
    return statement.get().length === 0 ? id : getUniqueId();
};

readFile(path.join(__dirname, "../../card.json")).then((data) => {
    var entries = JSON.parse("[" + data.toString() + "]");
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
        var statement;
        var id = getUniqueId();
        statement = db.prepare("INSERT INTO LIBRARY (id, title, read, quality, author, source) VALUES ($id, $title, $read, $quality, $author, $source)");
        statement.bind({
            $id: id,
            $title: entry.title || "undefined",
            $read: entry.read ? 1 : 0,
            $quality: entry.quality ? 1 : 0,
            $author: entry.author || null,
            $source: entry.source
        });
        statement.step();
        //Put the page on the shelf (store it in the catalogue)
        var shelf = path.join(__dirname, cataloguePath, id + ".html");
        return writeFile(shelf , entry.html)
            .then(() => {
                console.log("Saved " + id);
            }).catch(() => {
                console.log("Error saving " + id);
            });
    }));
}).then(() => {
    saveDb();
}).catch((err) => {
    console.log(err);
});





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