import {find,filter} from "lodash";
import {Author,Book} from "./connectors";

export const resolvers = {
    Query: {
        author(_, {id}){
            return Author.find({ where:{id:id}});
        },
        books:()=> Book.findAll()
    },
    Author:{
        books(author){
           return Book.find({where:{authorId:author.id}})
           },
    },
    Book: {
        author(book) {
            return Author.find({where:{id: book.authorId}})
        }
    }
};

export default resolvers;