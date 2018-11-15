import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorQuery} from '../queries/queries';

class AuthorDetails extends React.Component {
    displayAuthordetails(){
        const {author}= this.props.data;
        if(author){
            return(
                <div><h2>{author.name}</h2>
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
