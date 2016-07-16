/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var nodemon = require('gulp-nodemon');
var spawn = require('child_process').spawn;

var $ = gulpLoadPlugins();

var apiServer = null;
var resourceServer = null;
var fileServer = null;

var webpack_debug = require('./webpack.dev.config.js');
var webpack_release = require('./webpack.config.js');

var unhandled_resources = [
    'src/client/app_loader.html',
    'src/public/**/*.*'
];

var common_scripts = [
    'src/common/**/*.js'
];

var client_scripts = [
    'src/client/**/*.js'
];

var server_scripts = [
    'src/server/**/*.js'
];

// default
gulp.task('default', ['build:dev']);

// release
gulp.task('release', ['build:release']);

// clean
gulp.task('clean', function() {
    del.sync(['build/**/*.*', '!build/.git'], {dot: true});
});

// unhandled resources
gulp.task('unhandled_resources', function() {
    return gulp.src(unhandled_resources, {base: 'src'})
        .pipe(gulp.dest('build'));
});

// common scripts
gulp.task('common_scripts', function() {
    return gulp.src(common_scripts, {base: 'src'})
        .pipe($.babel())
        .pipe(gulp.dest('build'));
});

// server scripts
gulp.task('server_scripts', function() {
    return gulp.src(server_scripts, {base: 'src'})
        .pipe($.babel())
        .pipe(gulp.dest('build'));
});

// bundle
gulp.task('bundle:dev', function(cb) {
    // webpack server will do it
    return cb();
});

gulp.task('bundle:release', function(cb) {
    var verbose = true;

    webpack(webpack_release, function(err, stats) {
        if(err) {
            throw new $.util.PluginError("bundle:release", err);
        }

        $.util.log("[bundle:release]", stats.toString({
            colors: true,
            hash: verbose,
            version: verbose,
            timings: verbose,
            chunks: verbose,
            chunkModules: verbose,
            cached: verbose,
            cachedAssets: verbose
        }));

        return cb();
    });
});

// build
// common_scripts and server_scripts MUST NOT run async
gulp.task('build:dev', ['clean'], function(cb) {
    runSequence(['unhandled_resources'], 'common_scripts', 'server_scripts', 'bundle:dev', 'serve', cb);
});

gulp.task('build:release', ['clean'], function(cb) {
    runSequence(['unhandled_resources'], 'common_scripts', 'server_scripts', 'bundle:release', cb);
});

// watch
gulp.task('watch', function() {
    gulp.watch(unhandled_resources, function() {
        runSequence('unhandled_resources', 'reload');
    });
});

// reload
gulp.task('reload', function() {
    // TODO
});

gulp.task('serve', ['resource:serve', 'api:serve', 'file:serve']);

//file:serve
gulp.task('file:serve', function (cb) {
    fileServer = spawn('node', ['./build/server/FileServer.js']);

    fileServer.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    fileServer.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    fileServer.on('close', (code) => {
        console.log(`File Server exited with code ${code}`);
    });

    cb();
});

// api:serve
gulp.task('api:serve', function(cb) {
    // apiServer = new nodemon({
    //     script: 'build/server/APIServer.js',
    //     env: {'NODE_ENV': "development"},
    //     watch: ['src/invalidfile']
    // });

    apiServer = spawn('node', ['./build/server/APIServer.js']);

    apiServer.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    apiServer.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    apiServer.on('close', (code) => {
        console.log(`API Server exited with code ${code}`);
    });

    cb();
});

// resource:serve
gulp.task('resource:serve', ['watch'], function(cb) {
    resourceServer = spawn('node', ['./build/server/ResourceServer.js']);

    resourceServer.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    resourceServer.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    resourceServer.on('close', (code) => {
        console.log(`Resource Server exited with code ${code}`);
    });

    cb();
});

