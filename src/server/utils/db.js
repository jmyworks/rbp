/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

var mongodb = mongoose.createConnection('mongodb://db:27017/book');
autoIncrement.initialize(mongodb);

export default mongodb;
