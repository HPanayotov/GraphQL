import {find,filter} from "lodash";
import {Author,Book} from "./connectors";

export const resolvers = {
    Query: {
        author:()=> Author.findAll({}),
        books:()=> Book.findAll({}),

    },
    Author:{
        books(author) {
            return Book.findAll({where:{authorId:author.id}})
        }
           },

    Book: {
        author:(book)=> Author.find({where:{id:book.authorId}})
    }
};

export default resolvers;