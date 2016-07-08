/**
 * Created by michael on 16/7/9.
 */

import UIActions from '../actions/UIActions';
import _ from 'lodash';

const UIReducers = {
    [UIActions.inputChanged]: (state, action) => {
        var {hash, value} = action.payload;
        var newState = {...state};

        _.set(newState, hash, value);
        return newState;
    }
};

export default UIReducers;
