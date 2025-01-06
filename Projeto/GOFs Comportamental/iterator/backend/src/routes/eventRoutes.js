const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

router.get('/day', EventController.getEventsByDay);
router.get('/week', EventController.getEventsByWeek);
router.get('/month', EventController.getEventsByMonth);

module.exports = router;
