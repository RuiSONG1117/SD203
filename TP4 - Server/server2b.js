var express = require("express");
var app = express();
var router = new express.Router();
var xssFilters = require("xss-filters");
var nameTable = [];

app.use(express.static(__dirname + "/test"));

router.use(function (req, res, next) {
    "use strict";
    console.log("/" + req.method);
    next();
});

router.use("/hello", function (req, res, next) {
    "use strict";
    console.log(req.query.name);
    next();
});

router.use("/hello/:language", function (req, res, next) {
    "use strict";
    console.log(req.params.language);
    if ((req.params.language !== "cn") && (req.params.language !== "en") && (req.params.language !== "fr") && (req.params.language !== "sp")) {
        res.send("You must choose the language from English, French, Chinese or Spain!");
    } else {
        next();
    }
});

router.get("/", function (req, res) {
    "use strict";
    res.send("Welcome to the homepage!");
});

router.get("/hello/:language", function (req, res) {
    "use strict";
    if (typeof req.query.name !== "undefined") {
        nameTable.push(" " + req.query.name);
    }
    var response = "";
    switch (req.params.language) {
    case "cn":
        response += "你好";
        break;

    case "en":
        response += "Hello";
        break;

    case "fr":
        response += "Bonjour";
        break;

    case "sp":
        response += "Hola";
        break;
    }
    response += nameTable;
    res.send(xssFilters.inHTMLData(response));
});

router.get("/hello", function (req, res) {
    "use strict";
    if (typeof req.query.name !== "undefined") {
        nameTable.push(" " + req.query.name);
    }
    res.send("Bonjour" + xssFilters.inHTMLData(nameTable));
});

app.use("/", router);

app.listen(8000, function () {
    "use strict";
    console.log("Server running on port 8000.");
});