/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import {createAction} from 'redux-actions';
import RESTHelper from '../../common/RESTHelper';
import DiscussAPI from '../../common/api/DiscussAPI';
import config from '../config';

const APIDeclares = RESTHelper.parseAPIs(DiscussAPI);

const DiscussActions = {
    createThread: createAction('CREATE_THREAD', RESTHelper.getPromise(config.restClient, APIDeclares.addThread)),
    getThread: createAction('GET_THREAD', RESTHelper.getPromise(config.restClient, APIDeclares.getThread)),
    getThreads: createAction('GET_THREADS', RESTHelper.getPromise(config.restClient, APIDeclares.getThreads)),
    updateThread: createAction('UPDATE_THREAD', RESTHelper.getPromise(config.restClient, APIDeclares.updateThread)),
    deleteThread: createAction('DELETE_THREAD', RESTHelper.getPromise(config.restClient, APIDeclares.deleteThread))
};

export default DiscussActions;
