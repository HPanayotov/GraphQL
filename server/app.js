const express = require('express');
const graphqlHTTP= require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const cors = require('cors');

app.use(cors());
app.use('/graphql',graphqlHTTP({
     schema,
     graphiql:true
}),);

app.listen(4000, ()=> {
    console.log('now listening for request on port 4000');
});