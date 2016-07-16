/**
 * Created by michael on 16/7/14.
 */

var formidable = require('formidable'),
    express = require('express'),
    cors = require('cors'),
    util = require('util');

var server = express();

server.options('/upload', cors());

server.post('/upload', cors(), function (req, res) {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.setHeader('Content-Type', 'application/json');
        res.write(util.inspect({fields: fields, files: files}));
        res.end();
    });
});

server.listen(9000, function() {
    console.log('file server is running at http://localhost:9000');
});
