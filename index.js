const express = require('express');
const homepage = require('./src/routes/homepage')
const driversRoute = require('./src/routes/drivers')

const app = express();

app.use('/', homepage);
app.use('/api/v1/drivers', driversRoute);

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;