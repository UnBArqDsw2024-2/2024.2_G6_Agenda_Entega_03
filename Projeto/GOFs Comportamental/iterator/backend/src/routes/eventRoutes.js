import { Router } from 'express';
import {
  getEventsByDay,
  getEventsByMonth,
  getEventsByWeek,
} from '../controllers/EventController.js';

const router = Router();

router.get('/day', getEventsByDay);
router.get('/week', getEventsByWeek);
router.get('/month', getEventsByMonth);

export default router;
