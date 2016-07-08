/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import ThreadModel from '../models/ThreadModel';

module.exports = {
    getThreads: function(params, cb) {
        ThreadModel.find({}, (error, docs) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(docs);
            }
        });
    },
    getThread: function(params, cb) {
        ThreadModel.findOne({id: params.id}, (error, doc) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(doc);
            }
        });
    },
    addThread: function(params, cb) {
        var thread = new ThreadModel(params);

        thread.save(function(error, doc) {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(doc.id.toString());
            }
        });
    },
    deleteThread: function(params, cb) {
        ThreadModel.findOneAndRemove({id: params.id}, (error) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(params.id);
            }
        });
    },
    updateThread: function(params, cb) {
        ThreadModel.findOneAndUpdate({id: params.id}, params, (error) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(params.id.toString());
            }
        });
    }
};
