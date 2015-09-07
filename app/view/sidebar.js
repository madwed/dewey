var React = require("react");
React.render(
    <div className="sidebar">
        <button>Sync</button>
        <input type="text" placeholder="search"/>
        <button>Unread</button>
    </div>,
    document.getElementById("content")
);