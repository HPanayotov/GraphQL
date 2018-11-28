import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery, DELETE_MUTATION} from "../queries/queries";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class DeleteAuthor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value: '',
            page: 0,
            rowsPerPage: 5,
            isLoading:false
        }
       this.handleChangePage=this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
    }
    handleChangePage(event,page){
        this.setState({page});
    };

    handleChangeRowsPerPage(event){
        this.setState({rowsPerPage: event.target.value})
    };


     onDelete(event){
         event.preventDefault();
           this.props.deleteSql(this.props.getAuthorsQuery.authors.id)
    }

    render() {
            const { classes } = this.props;
            let {value, page, rowsPerPage} = this.state;
            let data = this.props.getAuthorsQuery.authors;
            console.log("state",this.props)
            if(!data){return(<div>Not found</div>)}
            const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
            const emptyRowStyle = {height: 51 * emptyRows};
            let authorsCon = <div></div>
        if(data.loading){
            return(<div>Loading authors</div>);
        } else{
            authorsCon=(
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Author name</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((author)=>(
                                <TableRow key={author.id}>
                                    <TableCell>{author.name}</TableCell>
                                    <TableCell><Button onClick={this.onDelete.bind(this)} variant="contained"  className={classes.button}>Delete</Button></TableCell>
                                </TableRow>
                                )
                            )}
                        {emptyRows > 0 && (
                            <TableRow style={emptyRowStyle}>
                                <TableCell colSpan={12}/>
                            </TableRow>
                        )}
                        </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </TableRow>
                    </TableFooter>
                        </Table>
            )
        }
        return authorsCon;
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(DELETE_MUTATION, {
        props: ({mutate}) =>({
            deleteSql:(id) => ({
                variables: {id}
            })
        })
    })
)(withStyles(styles)(DeleteAuthor));
