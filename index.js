const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
require('dotenv').config()

// mongoose
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const databaseConnection = mongoose.connection
databaseConnection.on('error', (err) => console.log('Failed to connect database', err));
databaseConnection.once('open', () => console.log('Connected to database'));

const app = express();

// logging
app.use(morgan('common'));

// view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', require('./routes'))

// listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));