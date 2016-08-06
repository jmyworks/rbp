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
                author: 'String',
                type: 'String'
            },
            return: 'Object'
        },
        show: {  // getBook
            return: 'Object'
        },
        update: {  // updateBook
            params: {
                resources: 'Array'
            },
            return: 'Integer'
        },
        delete: {   // deleteBook
            return: 'Integer'
        }
    }
];

module.exports = BookAPI;
