/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import restify from 'restify';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

import RESTHelper from '../common/RESTHelper';
import DiscussAPI from '../common/api/DiscussAPI';
import APIImplementsV1 from './implements/APIImplementsV1';

var server = restify.createServer({
    name: 'React Ready'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// api handlers
// get API declares
var APIDeclares = RESTHelper.parseAPIs(DiscussAPI);
// implements by version
var APIImplements = {
    v1: APIImplementsV1
};

// loop declares
for (var APIName in APIDeclares) {
    var declare = APIDeclares[APIName];
    server[declare.method]('api/' + declare.uri, (function(declare) {
        return function(req, res, next) {
            RESTHelper.serverResponse(req, res, APIImplements, declare);
        }
    })(declare));
}

// statics handler (/**/*.*)
server.get(/\/(.+?\/)*.+\..+/, restify.serveStatic({
    directory: path.join(__dirname, '../public')
}));

// otherwise, return app loader
server.get(/.*/, function(req, res, next) {
    var file = path.join(__dirname, '../client/app_loader.html');

    fs.stat(file, function (err, stats) {
        if (err) {
            next(new ResourceNotFoundError(err, req.path()));
            return;
        }

        var fstream = fs.createReadStream(file);
        var options = {
            maxAge: 3600,
            charset: 'utf8'
        };

        fstream.once('open', function (fd) {
            res.cache({maxAge: options.maxAge});
            res.set('Content-Length', stats.size);
            res.set('Content-Type', mime.lookup(file));
            res.set('Last-Modified', stats.mtime);
            if (options.charset) {
                var type = res.getHeader('Content-Type') +
                    '; charset=' + options.charset;
                res.setHeader('Content-Type', type);
            }

            res.writeHead(200);
            fstream.pipe(res);
            fstream.once('end', function () {
                next(false);
            });
        });

    });
});

// startup
server.listen(5000, function() {
    console.log('The server is running at http://localhost:5000');
});
