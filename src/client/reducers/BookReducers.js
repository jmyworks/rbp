/**
 * Created by michael on 16/7/11.
 */

import BookActions from '../actions/BookActions';
import utils from '../utils/utils';

const BookReducers = {
    [BookActions.createBook]: {
        next(state, action) {
            return utils.createState(state, 'book.createdBook.id', action.payload);
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    },
    [BookActions.getBooks]: {
        next(state, action) {
            return utils.createState(state, 'book.shelf.books', action.payload);
        },
        throw(state, action) {
            return utils.createState(state, 'error.message', action.payload);
        }
    }
};

export default BookReducers;
