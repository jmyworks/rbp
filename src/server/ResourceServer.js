/**
 * Created by michael on 16/7/6.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import process from 'process';

var server = express();
var serverRoot = 'build';

var responseFile = function(req, res, filepath, type) {
    fs.readFile(path.resolve(filepath), function(err, data) {
        if (err) {
            // handled, but can not read
            res.status(404).end(err.toString());
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
if (process.env.NODE_ENV !== 'production') {
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
server.use('/public/', express.static(path.join(serverRoot, 'public')));

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
