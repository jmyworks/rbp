/**
 * Created by michael on 16/7/12.
 */

import mongoose from 'mongoose';
import mongodb from '../utils/db.js';
import autoIncrement from 'mongoose-auto-increment';

var Schema = mongoose.Schema;

var Book = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    resources: [{
        name: {
            type: String,
            required: true
        },
        uri: {
            type: String,
            required: true
        }
    }]
});

Book.plugin(autoIncrement.plugin, {model: 'Book', field: 'id', startAt: 1, incrementBy: 1});
var BookModel = mongodb.model('Book', Book);

export default BookModel;
