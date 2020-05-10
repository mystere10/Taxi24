const express = require('express');
const homepage = require('./src/routes/homepage')

const app = express();

app.use('/', homepage);

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;