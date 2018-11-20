import React, { Component } from 'react';
import AppoloClient from 'apollo-boost';
import AuthorList from "./components/AuthorList";
import { ApolloProvider } from 'react-apollo';
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
//appolo client setup
const client = new AppoloClient({
    uri:'http://localhost:8000/graphql'
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <AuthorList/>
                    <AddAuthor/>
                    <AddBook/>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
