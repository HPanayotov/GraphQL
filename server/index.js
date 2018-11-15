import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './src/resolvers';
import schema from "./src/schema";

const app = express();

// allow cross-origin requests
app.use(cors());

// basic schema
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 });
console.log('Server ready on http://localhost:8000/graphql');