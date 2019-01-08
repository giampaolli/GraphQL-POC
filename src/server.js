const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}));

app.listen(4000, () =>{
    console.log('Listening on port 4000')
});
