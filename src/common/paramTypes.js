/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var paramTypes = {
    customTypes: {
        ID: {
            typeOf: 'Number',
            validate: function(value) {
                return Math.ceil(value) == Math.floor(value);
            }
        },
        API: {
            typeOf: 'Object',
            validate: function(API) {
                if (!API.hasOwnProperty('uri') || !API.hasOwnProperty('version')) {
                    return false;
                }

                var methods = ['list', 'create', 'show', 'update', 'delete'];
                var success = true;

                methods.forEach(function(method) {
                    if (API.hasOwnProperty(method) && typeof API[method] !== 'object') {
                        success = false;

                        return false;
                    }
                });

                return success;
            }
        }
    }
};

module.exports = paramTypes;
