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

export {getAuthorsQuery,getAuthorQuery};