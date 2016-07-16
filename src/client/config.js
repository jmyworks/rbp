/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var config = {
    restClient: {
        interceptors: [
            {module: 'timeout', config: {timeout: 1000}}
        ],
        config: {
            baseUrl: 'http://localhost:8000/api/'
        }
    },
    fileServer: 'http://localhost:9000/upload/'
};

export default config;
