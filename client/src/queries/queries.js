import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
{
authors{
id
text
}
}
`;

export {getAuthorsQuery};