/**
 * Created by michael on 16/7/4.
 */

import DiscussActions from '../actions/DiscussActions';

const discussReducers = {
    [DiscussActions.getThreads]: {
        next(state, action) {
            return {list: action.payload};
        },
        throw(state, action) {
            return {error: action.payload};
        }
    },
    [DiscussActions.createThread]: {
        next(state, action) {
            return {id: action.payload};
        },
        throw(state, action) {
            return {error: action.payload};
        }
    },
    [DiscussActions.getThread]: {
        next(state, action) {
            return {thread: action.payload};
        },
        throw(state, action) {
            return {error: action.payload};
        }
    },
    [DiscussActions.deleteThread]: {
        next(state, action) {
            // remove thread from list
            return {list: state.list.filter(t => t.id !== parseInt(action.payload))};
        },
        throw(state, action) {
            return {error: action.payload};
        }
    },
    [DiscussActions.updateThread]: {
        next(state) {
            return state;
        },
        throw(state, action) {
            return {error: action.payload};
        }
    }
};

export default discussReducers;
