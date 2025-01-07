const EventIterator = require('../iterators/EventIterator');

class EventCollection {
  constructor() {
    this.events = [];
  }

  addEvent(event) {
    this.events.push(event);
  }

  createIterator() {
    return new EventIterator(this.events);
  }
}

module.exports = EventCollection;
