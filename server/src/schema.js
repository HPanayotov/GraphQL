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
  author:Author
  }
  type Query {
    books:[Book]
    author(id:Int):[Author]
  }
`;

export default schema;