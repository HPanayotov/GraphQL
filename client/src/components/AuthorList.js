import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from "../queries/queries";
import AuthorDetails from './AuthorDetails';

class AuthorList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected:null
        }
    }
    displayAuthors(){
        let data = this.props.data;
        if(data.loading){
            return(<div>Loading authors</div>);
        } else{
            return data.author.map(author=>{
                return(
                    <li key={author.id} onClick={(e)=>{this.setState({selected:author.id})}}>{author.name}</li>
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
                    <AuthorDetails authorId={this.state.selected}/>
            </div>

        );
    }
}

export default graphql(getAuthorsQuery)(AuthorList);
