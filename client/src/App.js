import React, { Component } from 'react';
import AppoloClient from 'apollo-boost';
import AuthorList from "./components/AuthorList";
import { ApolloProvider } from 'react-apollo';
import AddBook from "./components/AddBook";

//appolo client setup
const client = new AppoloClient({
    uri:'http://localhost:8000/graphql'
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <h1>React App</h1>
                    <div id="component">
                        <AddBook/>
                    </div>
                    <AuthorList/>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
