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
                name: 'String',
                author: 'String',
                resources: 'Array',
                ext: 'Object'
            },
            return: 'Object'
        },
        delete: {   // deleteBook
            return: 'ID'
        }
    }
];

module.exports = BookAPI;
