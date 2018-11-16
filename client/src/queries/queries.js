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
export {getAuthorsQuery,getAuthorQuery,getBookQuery,addBookMutation};