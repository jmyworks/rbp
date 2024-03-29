/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {typeCheck} from 'type-check';
import _ from 'lodash';
import paramTypes from './paramTypes';
import request from 'superagent';

var RESTHelper = {
    clientRequest: function (config, APIDeclare, params, callback) {
        // check id
        if (_.endsWith(APIDeclare.uri, ':id')) {
            APIDeclare.uri = _.trimEnd(APIDeclare.uri, ':id');
        }

        // check params
        let errorParam = APIDeclare.checkParams(params);
        if (errorParam !== true) {
            return Promise.rejected(new Error('Invalid parameter:' + errorParam));
        }

        var method = (APIDeclare.method === 'del' ? 'DELETE' : APIDeclare.method).toLowerCase();
        var uri = config.baseUrl + APIDeclare.uri;
        var query = method === 'get' ? params : {};

        return request[method](uri)
            .type('application/json')
            .query(query)
            .send(params)
            .accept('json')
            .then((res) => res.body)
            .catch((err) => method + ' ' + uri + ' failed: ' + err.message);
    },
    serverResponse: function (req, res, APIImplements, APIDeclare) {
        if (!APIImplements.hasOwnProperty(APIDeclare.version)) {
            res.send(new Error('version not matched!'));

            return;
        }

        if (!APIImplements[APIDeclare.version].hasOwnProperty(APIDeclare.name)) {
            res.send(new Error('Unknown API:' + APIDeclare.name));
            return;
        }

        // check params
        let errorParam = APIDeclare.checkParams(req.params);
        if (errorParam !== true) {
            res.send(new Error('Invalid parameter:' + errorParam));
            return;
        }

        var implement = APIImplements[APIDeclare.version][APIDeclare.name];
        if (typeof implement !== 'function') {
            res.send(new Error('internal error: implement is not a function!'));
            return;
        }

        // check return value
        implement(req.params, (value) => {
            if (!APIDeclare.checkReturn(value)) {
                res.send(new Error('Invalid Result!'));
                return;
            }

            res.send(value);
        });
    },
    parseAPIs: function (APISet) {
        var APIArray = [];

        if (APISet instanceof Array) {
            APISet.forEach(function (API) {
                if (RESTHelper.isAPI(API)) {
                    APIArray.push(API);
                }
            });
        } else if (APISet instanceof Object) {
            if (RESTHelper.isAPI(APISet)) {
                APIArray.push(APISet);
            } else {
                // TODO throw error when under development
                //throw new Error('generateAPIs:No valid API declares found!');
                return {};
            }
        }

        var parsedAPIs = {};

        APIArray.forEach(function (API) {
            _.merge(parsedAPIs, RESTHelper.parseAPI(API));
        });

        return parsedAPIs;
    },
    isAPI: function (API) {
        return typeCheck('API', API, paramTypes);
    },
    parseAPI: function (API) {
        var uri = API.uri;
        var methods = ['list', 'create', 'show', 'update', 'delete'];

        var parseFunction = function (declare, meta) {
            var parsedAPI = {};

            parsedAPI[meta.name] = {
                name: meta.name,
                uri: meta.uri,
                method: meta.method,
                version: meta.version,
                checkParams: function (params) {
                    // check id
                    if (_.endsWith(meta.uri, ':id')) {
                        var integer = /^\d+$/;
                        if (!params.id || !integer.test(params.id)) {
                            return 'id';
                        }
                    }

                    if (!declare.hasOwnProperty('params')) {
                        return true;
                    }

                    var verifyParams = {...params};
                    delete verifyParams.id;

                    if (meta.method === 'put') { // when update, user params first
                        for (var param in verifyParams) {
                            if (!declare.params.hasOwnProperty(param)
                                || !typeCheck(declare.params[param], verifyParams[param], paramTypes)) {
                                return param;
                            }
                        }
                    } else if (meta.method === 'post') { //when create, declare params first
                        for (var param in declare.params) {
                            if (!typeCheck(declare.params[param], verifyParams[param], paramTypes)) {
                                return param;
                            }
                        }
                    }

                    return true;
                },
                checkReturn: function (value) {
                    if (!declare.hasOwnProperty('return')) {
                        return true;
                    }

                    return typeCheck(declare.return + ' | Error', value, paramTypes);
                }
            };

            return parsedAPI;
        };

        var parsedAPIs = {};

        methods.forEach(function (method) {
            if (API.hasOwnProperty(method)) {
                var meta = RESTHelper.getAPIMeta(API.version, uri, method);

                if (meta !== false) {
                    _.merge(parsedAPIs, parseFunction(API[method], meta));
                }
            }
        });

        return parsedAPIs;
    },
    getAPIMeta: function (version, baseURI, method) {
        var meta = {
            uri: null,
            name: null,
            method: null,
            version: version
        };

        switch (method) {
            case 'list':
                meta.uri = version + '/' + baseURI + 's';
                meta.name = 'get' + baseURI + 's';
                meta.method = 'get';
                break;
            case 'create':
                meta.uri = version + '/' + baseURI;
                meta.name = 'add' + baseURI;
                meta.method = 'post';
                break;
            case 'show':
                meta.uri = version + '/' + baseURI + '/:id';
                meta.name = 'get' + baseURI;
                meta.method = 'get';
                break;
            case 'update':
                meta.uri = version + '/' + baseURI + '/:id';
                meta.name = 'update' + baseURI;
                meta.method = 'put';
                break;
            case 'delete':
                meta.uri = version + '/' + baseURI + '/:id';
                meta.name = 'delete' + baseURI;
                meta.method = 'del';
                break;
            default:
                return false;
        }

        return meta;
    }
};

module.exports = {
    parseAPIs: RESTHelper.parseAPIs,
    serverResponse: RESTHelper.serverResponse,
    clientRequest: RESTHelper.clientRequest
};
