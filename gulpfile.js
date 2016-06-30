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
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var _ = require('lodash');

var $ = gulpLoadPlugins();
var nodemon = null;

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
    'src/server/**/*.js',
];

process.env.release = false;

// default
gulp.task('default', ['proxy']);

// release
gulp.task('release', ['build']);

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
gulp.task('bundle', function(cb) {
    var config = require('./webpack.config.js');
    var verbose = false;

    webpack(config, function(err, stats) {
        if(err) {
            throw new $.util.PluginError("bundle", err);
        }

        $.util.log("[bundle]", stats.toString({
            colors: $.util.colors.supportsColor,
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
gulp.task('build', ['clean'], function(cb) {
    runSequence(['unhandled_resources'], 'common_scripts', 'server_scripts', 'bundle', cb);
});

// watch
gulp.task('watch', ['build'], function() {
    gulp.watch(client_scripts, function() {
        runSequence('build', 'reload');
    });

    gulp.watch(unhandled_resources, function() {
        runSequence('unhandled_resources', 'reload');
    });

    gulp.watch(_.union(server_scripts, common_scripts), function() {
        runSequence('build', 'reload');
    })
});

// reload
gulp.task('reload', function() {
    if (nodemon) {
        nodemon.restart();
    }
});

// serve
gulp.task('serve', ['watch'], function() {
    nodemon = $.nodemon({
        script: 'build/server/server.js',
        env: {'NODE_ENV': process.env.release ? 'production' : 'development'},
        watch: ['src/invalidfile']
    })
        .on('restart', function() {
            setTimeout(function() {
                browserSync.reload();
            }, 2000);
        });
});

// proxy
gulp.task('proxy', ['serve'], function() {
    browserSync.init({
        proxy: "localhost:5000",
        online: true,
        reloadOnRestart: true,
        notify: true,
        scrollProportionally: false,
        //injectChanges: false,
        minify: false,
        open: false
    });
});
