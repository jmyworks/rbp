/**
 * Created by michael on 16/8/11.
 */

import {observable, action, asMap} from 'mobx';
import APICall from '../utils/APICall';

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
    @observable books = asMap(new Map());

    constructor() {
    }

    @action loadBooks() {
        return APICall('getBooks')
            .then((data) => data.forEach((book) => this.books.set(book.id, new BookAttribute(book))));
    }

    @action updateBook(params) {
        return APICall('updateBook', params)
            .then((data) => {
                this.books.set(data.id, new BookAttribute(data));

                return this.books.get(data.id);
            });
    }

    @action getBook(id) {
        if (!this.books.has(id)) {
            return APICall('getBook', {id})
                .then((data) => {
                    this.books.set(id, new BookAttribute(data));

                    return this.books.get(id);
                });
        } else {
            return Promise.resolve(this.books.get(id));
        }
    }

    @action createBook(params) {
        return APICall('addBook', params)
            .then((data) => {
                this.books.set(data.id, new BookAttribute(data));

                return this.books.get(data.id);
            });
    }
}

export default BookStore;
