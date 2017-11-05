// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8082;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const validator = require('express-validator');

// CONFIG
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

mongoose.connect(process.env.DB_CONECTION, {useMongoClient: true});

// ROUTES
app.use(require('./app/routes'));

// SERVER RUN
app.listen(port, () => {
    console.log(`App listeting on http://localhost:${port}`)
});