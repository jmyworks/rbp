/**
 * Created by michael on 16/7/6.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';

var server = express();
var serverRoot = 'build';

var responseFile = function(req, res, filepath, type) {
    fs.readFile(filepath, function(err, data) {
        if (err) {
            // handled, but can not read
            res.status(404).end();
        } else {
            if (typeof type !== 'undefined') {
                res.type(type);
            } else {
                res.type('plain/text');
            }

            res.send(data);
        }
    });
};

// webpack hmr switch
if (1) {
    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.dev.config.js');
    var compiler = webpack(webpackConfig);

    server.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, silent: true, publicPath: webpackConfig.output.publicPath
    }));

    server.use(require("webpack-hot-middleware")(compiler, {
        path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
}

// static handler
server.use('/static/', express.static(path.join(serverRoot, 'static')));

// app.js handler
server.get('/*.?app.js', function(req, res) {
    responseFile(req, res, path.join(serverRoot, req.originalUrl), 'js');
});

// app.js.map handler
server.get('/*.?app.js.map', function(req, res) {
    responseFile(req, res, path.join(serverRoot, req.originalUrl), 'json');
});

// other root resources handler
server.get(/\/favicon\.ico|\/robots\.txt/, function(req, res) {
    responseFile(req, res, path.join(serverRoot, req.originalUrl), path.extname(req.originalUrl));
});

// otherwise, return app loader
server.get('*', function(req, res) {
    responseFile(req, res, path.join(serverRoot, 'client', 'app_loader.html'), 'html');
});

server.listen(3000, function() {
    console.log('resource server is running at http://localhost:3000');
});
