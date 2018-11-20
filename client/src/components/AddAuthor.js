import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,addAuthorMutation} from "../queries/queries";


class AddAuthor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            text:"",

        };
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeText=this.handleChangeText.bind(this)
    }


    handleChangeName (e){
        this.setState({name:e.target.value})
    }

    handleChangeText(event){
        this.setState({text:event.target.value})
    }



    submitForm(event){
        event.preventDefault();
        this.props.addAuthorMutation({
            variables:{
                name:this.state.name,
                text:this.state.text,
            },
            refetchQueries:[{query:getAuthorsQuery}]
        });
        alert('book added  successful')
    }
    render() {
        return (
            <form id="add-author" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Author name:</label>
                    <input type="text" onChange={this.handleChangeName}/>
                </div>
                <div className="field">
                    <label>Text:</label>
                    <input type="text" onChange={this.handleChangeText}/>
                </div>

                <button type="submit" >Add</button>
            </form>
        );
    }
}
export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addAuthorMutation,{name:"addAuthorMutation"})
)(AddAuthor);
