const express = require('express');
// const {} = require('utils-playground');
const routes = require('./routes/routes');
const app = express();

app.use(express.json());


app.use(routes);


app.listen(3000)