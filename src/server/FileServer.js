/**
 * Created by michael on 16/7/14.
 */

var formidable = require('formidable'),
    express = require('express'),
    cors = require('cors'),
    util = require('util'),
    fs = require('fs'),
    path = require('path');

var server = express();

server.options('/upload', cors());

server.post('/upload', cors(), function (req, res) {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + '/../public/upload/');
    form.multiples = false;

    form.parse(req, function (err, fields, files) {
        res.setHeader('Content-Type', 'application/json');

        // rename file, add ext for pdf/mp3/mp4
        var supportedFormat = {
            'application/pdf': 'pdf',
            'audio/mp3': 'mp3',
            'audio/mp4': 'mp4',
            'audio/mpeg': 'mp3'
        };

        var file = files.file;
        var uri = file.path;

        if (supportedFormat[file.type]) {
            uri = uri + '.' + supportedFormat[file.type];
            fs.rename(file.path, uri);

            res.send(JSON.stringify({path: path.relative(form.uploadDir, uri)}));
        } else {
            fs.unlink(file.path);

            res.status(415).send(JSON.stringify({error: 'file not supported'}));
        }

        res.end();
    });
});

server.listen(9000, function() {
    console.log('file server is running at http://localhost:9000');
});
