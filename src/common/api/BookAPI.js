/**
 * Created by michael on 16/7/11.
 */

var BookAPI = [
    {
        version: 'v1',
        uri: 'Book',
        list: {  // getBooks
            return: 'Array'
        },
        create: { // addBook
            params: {
                name: 'String',
                author: 'String'
            },
            return: 'Integer'
        },
        show: {  // getBook
            return: 'Object'
        },
        update: {  // updateBook
            return: 'Integer'
        },
        delete: {   // deleteBook
            return: 'Integer'
        }
    }
];

module.exports = BookAPI;
