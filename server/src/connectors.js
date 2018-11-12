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
const AUTHORS = 20;

faker.seed(123);
db.sync({ force: true }).then(() => _.times(AUTHORS, () => AuthorModel.create({
    name:faker.name.lastName(1),
    text: faker.name.lastName(1),
})));

const Author = db.models.author;
export {Author};
