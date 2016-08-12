/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import restify from 'restify';
import RESTHelper from '../common/RESTHelper';
import BookAPI from '../common/api/BookAPI';
import APIImplementsV1 from './implements/APIImplementsV1';

var server = restify.createServer({
    name: 'API Server'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// api handlers
// get API declares
var APIDeclares = RESTHelper.parseAPIs(BookAPI);
// implements by version
var APIImplements = {
    v1: APIImplementsV1
};

// loop declares
for (var APIName in APIDeclares) {
    var declare = APIDeclares[APIName];
    server[declare.method]('api/' + declare.uri, (function(declare) {
        return function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            RESTHelper.serverResponse(req, res, APIImplements, declare);
        }
    })(declare));
}

// startup
server.listen(8000, function() {
    console.log('API server is running at http://localhost:8000');
});
