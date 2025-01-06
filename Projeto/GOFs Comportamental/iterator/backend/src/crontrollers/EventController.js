import EventCollection from '../collections/EventCollection';
import Event from '../models/Event';

const eventCollection = new EventCollection();
eventCollection.addEvent(new Event(1, 'Reunião', '2025-01-06', 'trabalho'));
eventCollection.addEvent(new Event(2, 'Treino', '2025-01-07', 'saúde'));
eventCollection.addEvent(new Event(3, 'Cinema', '2025-01-10', 'lazer'));

function filterEventsByDateRange(startDate, endDate) {
  const iterator = eventCollection.createIterator();
  const filteredEvents = [];

  while (iterator.hasNext()) {
    const event = iterator.next();
    if (event.date >= new Date(startDate) && event.date <= new Date(endDate)) {
      filteredEvents.push(event);
    }
  }

  return filteredEvents;
}

const EventController = {
  getEventsByDay(req, res) {
    const { date } = req.query;
    const events = filterEventsByDateRange(date, date);
    res.json(events);
  },

  getEventsByWeek(req, res) {
    const { startDate, endDate } = req.query;
    const events = filterEventsByDateRange(startDate, endDate);
    res.json(events);
  },

  getEventsByMonth(req, res) {
    const { year, month } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const events = filterEventsByDateRange(startDate, endDate);
    res.json(events);
  },
};

export default EventController;
