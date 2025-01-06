const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes').default;

const app = express();

app.use(bodyParser.json());

app.use('/api/events', eventRoutes);

export default app;
