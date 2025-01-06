const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
console.log('Event Routes:', eventRoutes);

const app = express();

app.use(bodyParser.json());

app.use('/api/events', eventRoutes);


module.exports = app;

