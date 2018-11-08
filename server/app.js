const express = require('express');
const graphqlHTTP= require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const cors = require('cors');
const insert1 = [{name:'Patrick Benet',age:45,id:'1'},
                 {name:'James Hadley',age:64,id:'2'},
                 {name:'Montgomery Piece',age:37,id:'4'},
                 {name:'Terry Pratchett',age:67,id:'3'},
                 {name:'Ronny Fields',age:47,id:'5'},
                 {name:'Erica John',age:63,id:'6'},
                 ];
const insert2 = [{name:'Name of the wind',genre:'Fantasy',id:'1',authorId:'1'},
                 {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
                 {name:'The long Eart',genre:'Sci-Fi',id:'3',authorId:'3'},
                 {name:'The hero of ages',genre:'Sci-Fi',id:'4',authorId:'4'},
                 {name:'The colour of magic',genre:'Sci-Fi',id:'5',authorId:'3'},
                 {name:'The Light Fantastic',genre:'Fantasy',id:'6',authorId:'6'},
                 {name:'The Ocean',genre:'Fantasy',id:'7',authorId:'6'},
                 {name:'The Ring',genre:'Sci-Fi',id:'8',authorId:'5'},];
let knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: './data.db'
    }
});
knex.schema.createTable('Authors', function(table) {
    table.increments('id');
    table.string('name');
    table.integer('age')
})
    .createTable('Books',function (table) {
        table.increments('id');
        table.string('name');
        table.string('genre');
        table.integer('authorId')
    })
    .then(function(){
        return knex.insert(insert1).into('Authors')
    })
    .then(function() {
        return knex.insert(insert2).into('Books');
    })
    .then(function() {
        return knex('Books')
            .select('Books.name as book');
    })
    .map(function(row) {
        console.log(row);
    })
    .catch(function(e) {
        console.error(e);
    });
app.use(cors());
app.use('/graphql',graphqlHTTP({
     schema,
     graphiql:true
}),);

app.listen(4000, ()=> {
    console.log('now listening for request on port 4000');
});