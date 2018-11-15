import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
{
author{
id
name
}
}
`;
const getAuthorQuery = gql`
query($id:Int){
author(id:$id){
id
name
books{
name
id
}
}
}

`;

export {getAuthorsQuery,getAuthorQuery};