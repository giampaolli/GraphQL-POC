'use strict';

var _graphqlYoga = require('graphql-yoga');

// Type definitions (schema)
var typeDefs = '\n    type Query {\n        hello: String!\n    }\n';

// Resolvers
var resolvers = {
    Query: {
        hello: function hello() {
            return 'This is my first query!!';
        }
    }
};

var server = new _graphqlYoga.GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.start(function () {
    console.log('The server is up!!');
});