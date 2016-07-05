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
var webpack = require('webpack-stream');
var _ = require('lodash');

var $ = gulpLoadPlugins();
var nodemon = null;

var dev_mode = true;
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
    return gulp.src('src/app.js')
        .pipe(webpack(webpack_debug))
        .pipe(gulp.dest('build/public'));
});

gulp.task('bundle:release', function(cb) {
    return gulp.src('src/app.js')
        .pipe(webpack(webpack_release))
        .pipe(gulp.dest('build/public'));
});

// build
// common_scripts and server_scripts MUST NOT run async
gulp.task('build:dev', ['clean'], function(cb) {
    runSequence(['unhandled_resources'], 'common_scripts', 'server_scripts', 'proxy', 'bundle:dev', cb);
});

gulp.task('build:release', ['clean'], function(cb) {
    runSequence(['unhandled_resources'], 'common_scripts', 'server_scripts', 'bundle:release', cb);
});

// watch
gulp.task('watch', function() {
    gulp.watch(_.union(client_scripts, common_scripts), function() {
        runSequence('bundle:dev', 'reload');
    });

    gulp.watch(unhandled_resources, function() {
        runSequence('unhandled_resources', 'reload');
    });

    gulp.watch(server_scripts, function() {
        runSequence('server_scripts', 'reload');
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
    }).on('restart', function() {
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
