import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorQuery} from '../queries/queries';

class AuthorDetails extends React.Component {
    displayAuthordetails(){
        const {author} = this.props.data;
        if(author){
            return(
                <div id="author-details">
                    <h2>{author.name}</h2>
                    <p>All books by this author</p>
                    <ul>
                        {
                            author.books.map(item=>{
                                return<li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        else {
            return(
                <div>No author selected</div>
            )
        }
    }
    render() {
console.log('props',this.props)
        return (
            <div id="author-details">
                {this.displayAuthordetails()}
            </div>

        );
    }
}

export default graphql(getAuthorQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.authorId
            }
        }
    }
})(AuthorDetails);
