const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8082;

app.use(require('./app/routes'));

app.listen(port, () => {
    console.log(`App listeting on http://localhost:${port}`)
});