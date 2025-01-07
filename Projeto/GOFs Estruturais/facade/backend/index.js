const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notifications');

const app = express();
app.use(bodyParser.json());

app.use('/api/notifications', notificationRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
