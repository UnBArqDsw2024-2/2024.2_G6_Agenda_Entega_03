import { Router } from 'express';
import {
  cloneTask,
  createTask,
  getTasks,
} from '../controllers/TaskController.js';

const router = Router();

router.post('/create', createTask);

router.post('/clone/:id', cloneTask);

router.get('/', getTasks);

export default router;
