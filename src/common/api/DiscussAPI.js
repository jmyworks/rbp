/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var DiscussAPI = [
    {
        version: 'v1',
        uri: 'Thread',
        list: {  // getThreads
            return: 'Array'
        },
        create: { // addThread
            params: {
                title: 'String',
                content: 'Undefined | String'
            },
            return: 'Integer'
        },
        show: {  // getThread
            return: 'Object'
        },
        update: {  // updateThread
            return: 'Integer'
        },
        delete: {   // deleteThread
            return: 'Boolean'
        }
    }
];

module.exports = DiscussAPI;
