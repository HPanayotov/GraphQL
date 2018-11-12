import {find,filter} from "lodash";
import {Author} from "./connectors";

export const resolvers = {
    Query: {
        authors: ()=> Author.findAll()
    },
    Author:{
        name:author=>filter(authors,{name:author.name})
    }
};

export default resolvers;