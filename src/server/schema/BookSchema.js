/**
 * Created by michael on 16/8/7.
 */

import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

import BookService from '../implements/BookService';

const resourceType = new GraphQLObjectType({
    name: 'Resource',
    description: 'a resource in the book',
    fields: () => ({
        uri: {
            type: GraphQLString,
            description: 'the uri of the resource'
        }
    })
});

const bookType = new GraphQLObjectType({
    name: 'Book',
    description: 'a book',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the id of the book'
        },
        name: {
            type: GraphQLString,
            description: 'the name of the book'
        },
        author: {
            type: GraphQLString,
            description: 'the author of the book'
        },
        resources: {
            type: new GraphQLList(resourceType),
            description: 'the resources of the book'
        }
    })
});

const shelfType = new GraphQLObjectType({
    name: 'Shelf',
    description: 'the shelf',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the id of the shelf'
        },
        books: {
            type: new GraphQLList(bookType),
            description: 'the books of the shelf',
            resolve: (shelf) => {

            }
        }
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        book: {
            type: bookType,
            args: {
                id: {
                    description: 'the id of the book',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, {id}) => {
                return BookService.findOneAsync({id: parseInt(id)});
            }
        }
    })
});

const BookSchema = new GraphQLSchema({
    query: queryType,
    types: [bookType]
});

export default BookSchema;
