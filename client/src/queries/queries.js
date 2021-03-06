import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
 {
  authors{
  id
  name
  }
 }
`;
const getAuthorQuery = gql`
 query ($id:Int){
  author(id:$id){
  id
  name
   books{
   id
   name
   }
  }
 }

`;
const getBookQuery = gql`
 {
  books{
  name
  id
  }
 }
`;
const addBookMutation=gql`
 mutation($name:String!,$genre:String!,$authorId:String!){
  addBook(name:$name,genre:$genre,authorId:$authorId){
   name
   id
   }
  }
`;
const addAuthorMutation=gql`
 mutation($name:String!,$text:String!){
  addAuthor(name:$name,text:$text){
   name
   id
   }
  }
`;
const DELETE_MUTATION = gql`
 mutation deleteAuthor($id:ID!){
  deleteAuthor(id:$id){
   id
   }
  }
`;

export {getAuthorsQuery,getAuthorQuery,getBookQuery,addBookMutation,addAuthorMutation,DELETE_MUTATION};