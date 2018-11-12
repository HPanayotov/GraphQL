import {gql} from "apollo-server-express/dist/index";

export const schema = gql`

  type Author {
    id:Int!
    name:String
    text:String
  } 
  type Query {
    authors: [Author]
  }
`;

export default schema;