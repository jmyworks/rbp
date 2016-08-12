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
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        './src/client/client.js'],
    output: {
        path: path.join(__dirname, "build", "public"),
        filename: "app.js",
        publicPath: "/"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: "eslint"
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/
            },
            {
                test: /\.css$/,
                exclude: [/\.useable\.css$/, /flexboxgrid/],
                loader: "style!css!autoprefixer"
            },
            {
                test: /\.useable\.css$/,
                loader: "style/useable!css!autoprefixer"
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
                loaders: ['react-hot', 'babel?cacheDirectory=true'],
                include: [path.join(__dirname, 'src', 'client'), path.join(__dirname, 'src', 'common')]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: "cheap-module-source-map",
    node: {
        fs: "empty"
    }
};
