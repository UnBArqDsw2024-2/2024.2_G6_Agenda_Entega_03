import cors from 'cors';
import express from 'express';

import task from './routes/TaskRoute.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/task', task);

const PORT = 8080;

app.listen(PORT, async () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
