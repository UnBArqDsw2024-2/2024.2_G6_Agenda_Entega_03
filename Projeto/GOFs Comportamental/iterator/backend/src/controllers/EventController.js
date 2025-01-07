const EventCollection = require('../collections/EventCollections');
const Event = require('../models/Event');


const eventCollection = new EventCollection();
eventCollection.addEvent(new Event(1, 'Reunião', '2025-01-06', 'trabalho'));
eventCollection.addEvent(new Event(11, 'Reunião', '2025-01-06', 'trabalho'));
eventCollection.addEvent(new Event(12, 'Reunião', '2025-01-06', 'trabalho'));
eventCollection.addEvent(new Event(13, 'Reunião', '2025-01-06', 'trabalho'));
eventCollection.addEvent(new Event(2, 'Treino', '2025-01-07', 'saúde'));
eventCollection.addEvent(new Event(3, 'Cinema', '2025-01-10', 'lazer'));

function filterEventsByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const iterator = eventCollection.createIterator();
    const filteredEvents = [];

    while (iterator.hasNext()) {
        const event = iterator.next();
        const eventDate = new Date(event.date);
        if (eventDate >= start && eventDate <= end) {
            filteredEvents.push(event);
        }
    }

    return filteredEvents;
}

const EventController = {

    getEvents(req, res) {
        const events = eventCollection.events;
        res.json(events);
    },

    getEventsByDay(req, res) {
        const { date } = req.body;
        const events = filterEventsByDateRange(date, date);
        res.json(events);
    },

    getEventsByWeek(req, res) {
        const { startDate, endDate } = req.body;
        const events = filterEventsByDateRange(startDate, endDate);
        res.json(events);
    },

    getEventsByMonth(req, res) {
        const { year, month } = req.body;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const events = filterEventsByDateRange(startDate, endDate);
        res.json(events);
    },
};

module.exports.getEvents = EventController.getEvents;
module.exports.getEventsByDay = EventController.getEventsByDay;
module.exports.getEventsByWeek = EventController.getEventsByWeek;
module.exports.getEventsByMonth = EventController.getEventsByMonth;
