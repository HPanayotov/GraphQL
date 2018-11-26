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
  
  type Deleted{
    id:ID
  }
  
  type Mutation{
    addBook(name:String!,genre:String!,authorId:String!):Book
    addAuthor(name:String!,text:String!):Author
    deleteBook(id:ID!):Deleted
    deleteAuthor(id:ID!):Deleted
  }
`;

export default schema;