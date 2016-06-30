/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import mongoose from 'mongoose';
import mongodb from '../utils/db.js';
import autoIncrement from 'mongoose-auto-increment';

var Schema = mongoose.Schema;

var Thread = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    author: {
        type: String
    },
    posts: [{
        content: {
            type: String,
            required: true
        }
    }]
});

Thread.plugin(autoIncrement.plugin, {model: 'Thread', field: 'id', startAt: 1, incrementBy: 1});
var ThreadModel = mongodb.model('Thread', Thread);

module.exports = ThreadModel;
