/**
 * Created by michael on 16/7/4.
 */

import {handleActions} from 'redux-actions';
import DiscussActions from '../actions/DiscussActions';

const discussReducers = handleActions({
    [DiscussActions.getThreads]: {
        next(state, action) {
            return {list: action.payload};
        },
        throw(state, action) {
            return {error: action.error};
        }},
    [DiscussActions.createThread]: {
        next(state, action) {
            return {id: action.payload};
        },
        throw(state, action) {
            return {error: action.error};
        }
    }
});

export default discussReducers;
