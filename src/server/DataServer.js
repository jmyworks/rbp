/**
 * Created by michael on 16/8/7.
 */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import BookSchema from './schema/BookSchema';

var server = express();

server.use('/graphql', graphqlHTTP({
    schema: BookSchema,
    graphiql: true,
    formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack
    })
}));

server.listen(8000, function() {
    console.log('data server is running at http://localhost:8000');
});
