const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
