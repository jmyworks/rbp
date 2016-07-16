/**
 * Created by michael on 16/7/9.
 */

import UIActions from '../actions/UIActions';
import utils from '../utils/utils';

const UIReducers = {
    [UIActions.inputChanged]: (state, action) => {
        var {hash, value} = action.payload;

        return utils.createState(state, hash, value);
    },
    [UIActions.switchError]: (state, action) => {
        if (action.payload) {
            return state;
        }

        return utils.createState(state, 'error.message', undefined);
    }
};

export default UIReducers;
