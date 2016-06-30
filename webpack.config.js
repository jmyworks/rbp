/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var webpack = require("webpack");
var path = require("path");
var minimist = require("minimist");

var debug_mode = !((minimist(process.argv)._)[2] === 'release');
var css_loader = debug_mode ? 'css' : 'css?minimize';

module.exports = {
    entry: "./src/client/app.js",
    output: {
        path: path.join(__dirname, "build", "public"),
        filename: "app.js",
        publicPath: "/"
    },
    module: {
        preLoaders: [
            {
                test: /\.js/,
                exclude: /node_module/,
                loader: "eslint"
            }
        ],
        loaders: [
            {
                test: /\.css/,
                exclude: /\.useable\.css$/,
                loader: "style!" + css_loader + "!autoprefixer"
            },
            {
                test: /\.useable\.css$/,
                loader: "style/useable!" + css_loader + "!autoprefixer"
            },
            {
                test: /\.gif/,
                loader: 'url?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg/,
                loader: 'url?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png/,
                loader: 'url?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [new webpack.optimize.OccurenceOrderPlugin()]
        .concat(debug_mode? [] : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                exclude: /node_module/
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size
                    "NODE_ENV": JSON.stringify("production")
                }
            })
        ]),
    devtool: debug_mode ? "source-map" : "cheap-module-source-map",
    node: {
        fs: "empty"
    }
};
