import React, { Component } from 'react';
import {ApolloClient} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import AuthorList from "./components/AuthorList";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import DeleteAuthor from './components/DeleteAuthor'
//apollo client setup
const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
            uri:'http://localhost:8000/graphql',
            credentials: 'same-origin'
        })
    ]),
    cache: new InMemoryCache()
});



class App extends React.Component {

    render() {

        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <AuthorList/>
                    <AddAuthor/>
                    <AddBook/>
                    <DeleteAuthor/>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
