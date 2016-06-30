/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import Reflux from 'Reflux';
import ThreadsActions from '../actions/ThreadsActions';
import _ from 'lodash';
import RESTHelper from '../../common/RESTHelper';
import DiscussAPI from '../../common/api/DiscussAPI';
import config from '../config';

var APIDeclares = RESTHelper.parseAPIs(DiscussAPI);

var ThreadsStore = Reflux.createStore({
    listenables: [ThreadsActions],
    onDeleteThread: function(id, cb) {
        var API = APIDeclares.deleteThread;
        RESTHelper.clientRequest(config.restClient, API, {id: id}, (error, data) => {
            cb(error, data);
        });
    },
    onGetThreads: function(cb) {
        var API = APIDeclares.getThreads;
        RESTHelper.clientRequest(config.restClient, API, {}, (error, data) => {
            cb(error, data);
        });
    },
    onGetThread: function(id, cb) {
        var API = APIDeclares.getThread;
        RESTHelper.clientRequest(config.restClient, API, {id: id}, (error, data) => {
            cb(error, data);
        });
    },
    onCreateThread: function(params, cb) {
        var API = APIDeclares.addThread;
        RESTHelper.clientRequest(config.restClient, API, params, (error, data) => {
            cb(error, data);
        });
    },
    onUpdateThread: function(id, params, cb) {
        var API = APIDeclares.updateThread;
        RESTHelper.clientRequest(config.restClient, API, _.merge(params, {id: id}), (error, data) => {
            cb(error, data);
        });
    }
});

export default ThreadsStore;
