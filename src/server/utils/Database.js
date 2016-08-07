/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import mongo from 'mongoskin';
import Promise from 'bluebird';
import util from 'util';

var db = mongo.db("mongodb://localhost:27017/test", {native_parser:true});

Promise.promisifyAll(mongo.Collection.prototype);

export default db;
