const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
   res.send('Hello, i am the app!');
});

app.listen(port, () => {
    console.log(`App listeting on http://localhost:${port}`)
});