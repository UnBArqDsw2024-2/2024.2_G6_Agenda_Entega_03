import express from 'express';

import task from './routes/TaskRoute.js';

const app = express();

app.use(express.json());

// Include your routes here
app.use('/task', task);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
