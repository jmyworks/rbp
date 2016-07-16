/**
 * Created by michael on 16/7/12.
 */

import _ from 'lodash';

var utils = {
    filterState: (state, path, defaultValue) => {
        return _.get(state, path, defaultValue);
    },
    createState: (state, path, value) => {
        var newState = {...state};

        _.set(newState, path, value);

        return newState;
    }
};

export default utils;
