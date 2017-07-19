var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var qs = require("querystring");

var s = http.createServer(function (req, res) {
    "use strict";
    var myPath = url.parse(req.url).pathname;
    console.log(myPath);

    if (myPath === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("Welcome to the homepage!");
    } else if (myPath === "/hello") {
        if (req.method === "GET") {
            var urlParts = url.parse(req.url, true);
            var urlParams = urlParts.query;

            req.on("data", function (data) {body += data;});

            req.on("end", function () {
                res.writeHead(200, {"Content-type": "text/html"});
                res.end("Bonjour, " + urlParams.name);
            });
        }
    } else {// get the extensions of the files inside this dir (.html, .js, .css)
        var extname = path.extname(myPath);
        console.log(extname);
        var contentType = "";
        switch (extname) {
        case ".txt":
            contentType = "text/html";
            break;

        case ".html":
            contentType = "text/html";
            break;

        case ".js":
            contentType = "text/javascript";
            break;

        case ".css":
            contentType = "text/css";
            break;

        case ".png":
            contentType = "image/png";
            break;
        }

        fs.readFile(__dirname + myPath, function (err, data) {
            if (err) {
                if (err.code === "ENOENT") {
                    res.writeHead(404, {"Content-Type": "text/html"});
                    fs.readFile("./404.png", function (err2, data2) {
                        res.writeHead(200, {"Content-Type": "image/png"});
                        res.end(data2, "utf8");
                        return;
                    });
                } else {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.end(data, "utf8");
                    return;
                }
            } else {
                res.writeHead(200, {"Content-Type": contentType});
                res.end(data, "utf8");
                return;
            }
        });
    }
});

s.listen(8000);
console.log("Server running on port 8000.");