var express = require("express");
var app = express();
var nameTable = [];

app.use(express.static(__dirname + "/test"));

app.get("/", function (req, res) {
    "use strict";
    res.send("Welcome to the homepage!");
});

app.get("/hello", function (req, res) {
    "use strict";
    nameTable.push(" " + req.query.name);
    var response = "Bonjours ";
    response += nameTable;
    res.end(response);
});

app.listen(8000, function () {
    "use strict";
    console.log("Server running on port 8000.");
});