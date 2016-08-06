/**
 * Created by michael on 16/7/4.
 */

import DiscussActions from '../actions/DiscussActions';
import utils from '../../common/utils';

const discussReducers = {
    [DiscussActions.getThreads]: {
        next(state, action) {
            return utils.createState(state, 'discuss.threads', action.payload);
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    },
    [DiscussActions.createThread]: {
        next(state, action) {
            return utils.createState(state, 'discuss.createdThread.id', action.payload);
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    },
    [DiscussActions.getThread]: {
        next(state, action) {
            return utils.createState(state, 'discuss.thread', action.payload);
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    },
    [DiscussActions.deleteThread]: {
        next(state, action) {
            // remove thread from list
            return utils.createState(state, 'discuss.threads', state.discuss.threads.filter(t => t.id !== parseInt(action.payload)));
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    },
    [DiscussActions.updateThread]: {
        next(state) {
            return state;
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    }
};

export default discussReducers;
