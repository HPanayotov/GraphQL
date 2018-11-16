import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,getBookQuery,addBookMutation} from "../queries/queries";


class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            genre:"",
            authorId:""
        };
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeAuthor=this.handleChangeAuthor.bind(this);
        this.handleChangeGenre=this.handleChangeGenre.bind(this)
    }
    displayAuthors(){
        let data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<div>Loading authors</div>);
        } else{
            return data.authors.map(author=>{
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    handleChangeName (e){
        this.setState({name:e.target.value})
    }

    handleChangeGenre(event){
        this.setState({genre:event.target.value})
    }

    handleChangeAuthor(event){
        this.setState({authorId:event.target.value})
    }

    submitForm(event){
        event.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBookQuery}]
        });
        alert('book added  successful')
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={this.handleChangeName}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={this.handleChangeGenre}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={this.handleChangeAuthor}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button type="submit" >Add</button>
            </form>
        );
    }
}
export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
