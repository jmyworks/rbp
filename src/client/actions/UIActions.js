/**
 * Created by michael on 16/7/9.
 */

import {createAction} from 'redux-actions';

const UIActions = {
    inputChanged: createAction('INPUT_CHANGED', (hash, value) => {return {hash, value}; }),
    switchError: createAction('SWITCH_ERROR', (open) => {return open; })
};

export default UIActions;
