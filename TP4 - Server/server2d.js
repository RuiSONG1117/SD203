var express = require("express");
var app = express();
var router = new express.Router();
var bodyParser = require("body-parser");
var nameTable = [];

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/test"));


router.use(function (req, res, next) {
    "use strict";
    console.log("/" + req.method);
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
        var obj = {};
        obj.name = req.query.name;
        obj.language = req.params.language;
        nameTable.push(obj);
    }
    res.render("table.ejs", {
        name: req.query.name,
        language: req.params.language,
        table: nameTable
    });
});

app.use("/", router);

app.listen(8000, function () {
    "use strict";
    console.log("Server running on port 8000.");
});