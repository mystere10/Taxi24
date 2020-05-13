const express = require('express');
const bodyParser = require('body-parser');
const homepage = require('./src/routes/homepage');
const driversRoute = require('./src/routes/drivers');
const tripRoute = require('./src/routes/trip')
const ridersRoute = require('./src/routes/riders');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/riders', ridersRoute);
app.use('/api/v1/trip', tripRoute);
app.use('/api/v1/drivers', driversRoute);
app.use('/', homepage);

app.use((req, res, next) => {
    res.status(404).json({
        status: '404',
        message: 'Endpoint not found'
    });
});

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
