/**
 * Created by michael on 16/7/12.
 */

import _ from 'lodash';
import randomstring from 'randomstring';

var callbacks = {};

var applyCallback = function (hash, successed) {
    var result = {};
    if (callbacks[hash]) {
        result = (callbacks[hash])(successed);
        callbacks[hash] = undefined;
    }

    return result;
};

var utils = {
    filterState: (state, path, defaultValue) => {
        return _.get(state, path, defaultValue);
    },
    createState: (state, path, value) => {
        var newState = {...state};
        var newValue = value;

        var hashState = {};
        var error = '';
        if (value && value.hasOwnProperty('requestHash') && value.hasOwnProperty('requestSuccessed')) {
            var appendState = applyCallback(value.requestHash, value.requestSuccessed);
            if (appendState) {
                if (path === 'error.message') {
                    error = value.message;
                } else {
                    newValue = value.data;
                }

                hashState = {...state};
                _.forEach(appendState, (v, k) => {
                    _.set(hashState, k, v);
                });
            }
        }

        _.set(newState, path, newValue);

        return _.merge({}, newState, hashState, {error: {message: error}});
    },
    getRequestHash: function(callback) {
        if (typeof callback !== 'function') {
            return undefined;
        }

        var hash;

        do {
            hash = randomstring.generate();
        } while (callbacks.hasOwnProperty(hash));

        callbacks[hash] = callback;

        return hash;
    }
};

export default utils;
