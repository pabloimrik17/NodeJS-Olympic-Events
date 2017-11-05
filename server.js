// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8082;
const expressLayouts = require('express-ejs-layouts');

// CONFIG
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.use(expressLayouts);

// ROUTES
app.use(require('./app/routes'));

// SERVER RUN
app.listen(port, () => {
    console.log(`App listeting on http://localhost:${port}`)
});