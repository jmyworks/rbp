/**
 * Created by michael on 16/8/11.
 */

import {observable, action} from 'mobx';
import RESTHelper from '../../common/RESTHelper';
import BookAPI from '../../common/api/BookAPI';
import config from '../config';

const APIDeclares = RESTHelper.parseAPIs(BookAPI);

class BookAttribute {
    id;
    @observable name;
    @observable author;
    type;
    @observable resources;

    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.author = params.author;
        this.type = params.type;
        this.resources = params.resources ? params.resources : [];
    }
}

class BookStore {
    @observable books = new Map();

    constructor() {
    }

    @action loadBooks() {
        RESTHelper.getPromise(config.restClient, APIDeclares.getBooks)()
            .then((data) => data.forEach((book) => this.books.set(book.id, new BookAttribute(book))));
    }

    @action updateBook(params) {
        RESTHelper.getPromise(config.restClient, APIDeclares.updateBook)(params)
            .then((data) => this.books.set(data.id, new BookAttribute(data)));
    }

    @action getBook(id) {
        if (!this.books.has(id)) {
            RESTHelper.getPromise(config.restClient, APIDeclares.getBook)({id})
                .then((data) => this.books.set(id, new BookAttribute(data)));
        }
    }

    @action createBook(params) {
        RESTHelper.getPromise(config.restClient, APIDeclares.addBook)(params)
            .then((data) => this.books.set(data.id, new BookAttribute(data)));
    }
}

export default BookStore;
