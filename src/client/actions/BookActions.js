/**
 * Created by michael on 16/7/11.
 */

import {createAction} from 'redux-actions';
import RESTHelper from '../../common/RESTHelper';
import BookAPI from '../../common/api/BookAPI';
import config from '../config';

const APIDeclares = RESTHelper.parseAPIs(BookAPI);

const DiscussActions = {
    createBook: createAction('CREATE_BOOK', RESTHelper.getPromise(config.restClient, APIDeclares.addBook)),
    updateBook: createAction('UPDATE_BOOK', RESTHelper.getPromise(config.restClient, APIDeclares.updateBook)),
    getBooks: createAction('GET_BOOKS', RESTHelper.getPromise(config.restClient, APIDeclares.getBooks))
};

export default DiscussActions;
