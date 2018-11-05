const graphql = require('graphql');
const _=require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//dummy data
const books =[
    {name:'Name of the wind',genre:'Fantasy',id:'1',authorId:'1'},
    {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
    {name:'The long Eart',genre:'Sci-Fi',id:'3',authorId:'3'},
    {name:'The hero of ages',genre:'Sci-Fi',id:'4',authorId:'4'},
    {name:'The colour of magic',genre:'Sci-Fi',id:'5',authorId:'3'},
    {name:'The Light Fantastic',genre:'Fantasy',id:'6',authorId:'6'},
    {name:'The Ocean',genre:'Fantasy',id:'7',authorId:'6'},
    {name:'The Ring',genre:'Sci-Fi',id:'8',authorId:'5'},
];

const authors = [
    {name:'Patrick Benet',age:45,id:'1'},
    {name:'James Hadley',age:64,id:'2'},
    {name:'Montgomery Piece',age:37,id:'4'},
    {name:'Terry Pratchett',age:67,id:'3'},
    {name:'Ronny Fields',age:47,id:'5'},
    {name:'Erica John',age:63,id:'6'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
        type: AuthorType,
        resolve(parent, args) {
            return _.find(authors,{id:parent.authorId})
        }
    }
})
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return _.filter(books,{authorId:parent.id})
        }
    }
})
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                console.log(typeof(args.id));
                return  _.find(books,{id:args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors,{id:args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args,) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;

            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});
