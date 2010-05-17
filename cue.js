#!/usr/local/bin/node
require.paths.push(__dirname);
require.paths.push(__dirname + '/lib');

var sys = require('sys'),
   http = require('http'),
   url = require('url'),
   queue = require('queue');

Q = new queue.queue();

var svr = http.createServer(function (req, res) {
    sys.puts('PROCESSING URL: ' + req.url);
    if (req.url == '/status') {
        res.writeHead(200, {'Content-Type': 'text/json'});
        sys.puts('STATUS SENDING: ' + Q.to_s());
        res.end(Q.to_s());
    } else {
        switch (req.method) {
        case "GET": 
            res.writeHead(200, {'Content-Type': 'text/json'});
            var payload = JSON.stringify(Q.pop());
            sys.puts('GET SENDING: ' + payload);
            res.end(payload);
            break;
        case "POST":
            req.setEncoding(encoding='utf8');
            res.writeHead(200, {'Content-Type': 'text/json'});
            req.addListener('data', function (chunk) {
                try {
                    data = JSON.parse(chunk);
                } catch (e) {
                    sys.puts('caught: ' + e);
                    res.end(JSON.stringify("POST FAILED"));
                    return;
                }
                var ret = Q.push(data);
                sys.puts('pushed ' + ret);
            });
            res.end(JSON.stringify("POST OK"));
            break;
        default:
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.end(JSON.stringify("OOPS"));
            break;
        }
    }
});
svr.listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');
