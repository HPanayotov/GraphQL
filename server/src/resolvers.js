import {find,filter} from "lodash";
import {Author,Book} from "./connectors";

export const resolvers = {
    Query: {
        authors:()=> Author.findAll({}),
        books:()=> Book.findAll({}),
        author:(_,{id})=>Author.find({where:{id:id}})

    },
    Author:{
        books(author) {
            return Book.findAll({where:{authorId:author.id}})
        },

           },

    Book: {
        authors:(book)=> Author.find({where:{id:book.authorId}})
    }
};

export default resolvers;