/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import BookModel from '../models/BookModel';

module.exports = {
    getBook: function (params, cb) {
        BookModel.findOne({id: params.id}, (error, doc) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(doc);
            }
        });
    },
    getBooks: function(params, cb) {
        BookModel.find({}, (error, docs) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(docs);
            }
        }).limit(50);
    },
    addBook: function (params, cb) {
        var book = new BookModel(params);

        book.save(function(error, doc) {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(doc);
            }
        });
    },
    updateBook: function(params, cb) {
        BookModel.findOneAndUpdate({id: params.id}, params, {new: true}, (error, doc) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(doc);
            }
        });
    },
    deleteBook: function(params, cb) {
        BookModel.findOneAndRemove({id: params.id}, (error) => {
            if (error) {
                cb(new Error('Database Error:' + error));
            } else {
                cb(params.id);
            }
        });
    }
};
