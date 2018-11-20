import {find,filter} from "lodash";
import {Author,Book} from "./connectors";

export const resolvers = {
    Query: {
        authors: () => Author.findAll({}),
        books: () => Book.findAll({}),
        author: (_, {id}) => Author.find({where: {id: id}})

    },
    Mutation: {
        addBook(_, {name, genre, authorId}) {
            return Book.create({name, genre, authorId})
        },
        addAuthor(_, {name, text}) {
            return Author.create({name, text})
        },
        updateBook(_, {id, name, genre}) {
            return Book.update({name, genre}, {where: {id}}).then(res => res[0]);
        },

        deleteBook(_, {id}) {
            return Book.destroy({
                where: {
                    id
                }
            });
        },
        deleteAuthor(_, {id}) {
            return Author.destroy({
                where: {
                    id
                }
            });
        }
    },
    Updated: {
        affected: affected => affected
    },

    Author: {
        books(author) {
            return Book.findAll({where: {authorId: author.id}})
        },
    },

    Book: {
        authors(book) {
            return Author.find({where: {id: book.authorId}})
        },
    }
};

export default resolvers;