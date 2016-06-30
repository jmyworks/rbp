/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import routerHelper from '../../utils/routerHelper.js';

module.exports = routerHelper({
    match: 'Discuss',
    path: 'Discuss',
    index: 'ThreadList',
    children: ['Thread', 'CreateThread', 'EditThread']
});
