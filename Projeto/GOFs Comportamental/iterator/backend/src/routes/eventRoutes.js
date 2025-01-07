const express = require('express');
const router = express.Router();

const {
    getEvents,
    getEventsByDay,
    getEventsByWeek,
    getEventsByMonth,
} = require('../controllers/EventController'); // Certifique-se de que este caminho está correto

router.get('/', getEvents);
router.get('/day', getEventsByDay);
router.get('/week', getEventsByWeek);
router.get('/month', getEventsByMonth);

module.exports = router;