/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var configProd = {
    restClient: {
        baseUrl: 'http://ec2-54-199-160-182.ap-northeast-1.compute.amazonaws.com:8000/api/'
    },
    fileServer: 'http://ec2-54-199-160-182.ap-northeast-1.compute.amazonaws.com:9000/upload/'
};

var configDevel = {
    restClient: {
        baseUrl: 'http://localhost:8000/api/'
    },
    fileServer: 'http://localhost:9000/upload/'
};

var config;

if (process.env.NODE_ENV !== 'production') {
    config = configDevel;
} else {
    config = configProd;
}

export default config;
