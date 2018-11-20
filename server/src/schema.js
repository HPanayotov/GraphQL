import {gql} from "apollo-server-express/dist/index";

export const schema = gql`

  type Author {
    id:Int!
    name:String
    text:String
    books:[Book]
  } 
  
  type Book{
    id:Int!
    name:String
    genre:String
    authors:Author
  }
  
  type Query {
    books:[Book]
    authors(id:Int):[Author]
    author(id:Int):Author
  }
  
  type Updated{
    affected:Int
  }
  
  type Mutation{
    addBook(name:String!,genre:String!,authorId:String!):Book
    addAuthor(name:String!,text:String!):Author
    updateBook(id:ID!,name:String!,genre:String!):Updated
    deleteBook(id:ID!):Updated
    deleteAuthor(id:ID!):Updated
    
  }
`;

export default schema;