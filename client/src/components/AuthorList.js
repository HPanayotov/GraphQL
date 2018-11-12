import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from "../queries/queries";

class AuthorList extends React.Component {
    displayAuthors(){
        let data = this.props.data;
        if(data.loading){
            return(<div>Loading authors</div>);
        } else{
            return data.authors.map(author=>{
                return(
                    <li key={author.id}>{author.text}</li>
                )
            })
        }
    }
    render() {
        console.log('props',this.props);
        return (
            <div>
                <h2>Author list</h2>
                <ul id="author-list">
                    {this.displayAuthors()}
                </ul>
            </div>

        );
    }
}

export default graphql(getAuthorsQuery)(AuthorList);
