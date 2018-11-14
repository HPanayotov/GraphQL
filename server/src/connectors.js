const Sequelize = require('sequelize');
import { _ } from 'lodash';
import faker from 'faker';
// initialize our database
const db = new Sequelize('test-application', null, null, {
    dialect: 'sqlite',
    storage: './test-application.sqlite',
    logging: true, // mark this true if you want to see logs
});
// define authors
const AuthorModel = db.define('author', {
    name: { type:Sequelize.STRING },
    text:{type:Sequelize.STRING}
});
const Bookmodel = db.define('book',{
    name:{type:Sequelize.STRING},
    genre:{type:Sequelize.STRING},
    authorId:{type:Sequelize.STRING}
});


const Author = db.models.author;
const Book = db.models.book;
export {Author,Book};
