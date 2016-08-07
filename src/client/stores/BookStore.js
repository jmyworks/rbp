/**
 * Created by michael on 16/8/7.
 */

import {observable, action, runInAction} from 'mobx';
import RESTHelper from '../../common/RESTHelper';
import BookAPI from '../../common/api/BookAPI';
import config from '../config';

const APIDeclares = RESTHelper.parseAPIs(BookAPI);

class BookStore {
    @observable id = null;
    @observable name = '';
    @observable author = '';
    @observable resources = [];

    constructor() {

    }

    @action createBook = async () => {
        const data = await RESTHelper.getPromise(config.restClient, APIDeclares.addBook);

        runInAction(() => {

        });
    }
}
