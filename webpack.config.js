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

module.exports = {
    entry: ['./src/client/client.js'],
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
                test: /\.css$/,
                loader: 'style!css?modules&minimize',
                include: /flexboxgrid/
            },
            {
                test: /\.css$/,
                exclude: [/\.useable\.css$/, /flexboxgrid/],
                loader: "style!css?minimize!autoprefixer"
            },
            {
                test: /\.useable\.css$/,
                loader: "style/useable!css?minimize!autoprefixer"
            },
            {
                test: /\.gif$/,
                loader: 'url?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg$/,
                loader: 'url?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png$/,
                loader: 'url?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.jsx?$/,
                include: [path.join(__dirname, 'src', 'client'), path.join(__dirname, 'src', 'common')],
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
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
        })],
    devtool: "source-map",
    node: {
        fs: "empty"
    }
};
