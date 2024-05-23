// Create web server
// 1. Load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var comments = [];
// 2. Create server
http.createServer(function(req, res) {
    // 3. Parse the request containing file name
    var pathname = url.parse(req.url).pathname;
    // 4. Read the requested file content from file system
    if (pathname == '/') {
        pathname = '/index.html';
    }
    if (pathname == '/index.html') {
        fs.readFile(pathname.substr(1), function(err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                res.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                res.writeHead(200, {'Content-Type': 'text/html'});
                // Write the content of the file to response body
                res.write(data.toString());
            }
            // Send the response body
            res.end();
        });
    } else if (pathname == '/comment') {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var post = qs.parse(body);
                comments.push(post.comment);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('Comment received: ' + post.comment);
                res.end();
            });
        }
    } else if (pathname == '/getcomments') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(JSON.stringify(comments));
        res.end();
    } else {
        fs.readFile(pathname.substr(1), function(err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                res.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                res.writeHead(200, {'Content-Type': 'text/html'});
                // Write the content of the file to
