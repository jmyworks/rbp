/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import Reflux from 'Reflux';

var ThreadsActions = Reflux.createActions([
    'createThread',
    'getThread',
    'getThreads',
    'updateThread',
    'deleteThread'
]);

export default ThreadsActions;
