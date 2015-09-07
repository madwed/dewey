var React = require("react");
var ThumbList = require("./thumb");
var Reader = require("./reader");
var search = require("../search");

var unread = search({read: false});
console.log("hey");

React.render(
    <div className="content">
        <ThumbList pages={unread}></ThumbList>
    </div>,
    document.getElementById("content")
);
