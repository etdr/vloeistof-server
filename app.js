require('dotenv').config();

const express = require('express');

const app = express();

//controllers
const userC = require('./controllers/userC');
const userinfoC = require('./controllers/userinfoC');
const drinksC = require('./controllers/drinksC');
const ingredientsC = require('./controllers/ingredientsC');
const postsC = require('./controllers/postsC');

let seq = require('./db');
seq.sync();

app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/api/user', userC);

app.use(require('./middleware/validate'));

app.use('/api/userinfo', userinfoC)
app.use('/api/drinks', drinksC);
app.use('/api/ing', ingredientsC);
app.use('/api/posts', postsC);

app.listen(process.env.PORT,
  () => console.log('listening on specified port'));