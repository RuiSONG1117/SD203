var http = require("http");

http.createServer(function (request, response) {
    "use strict";
    if (request.url === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end("Welcome to the homepage!");
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("404 error! File not found.");
    }
}).listen(8000);

console.log("Server running on port 8080.");