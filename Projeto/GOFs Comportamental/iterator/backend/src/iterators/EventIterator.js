const Iterator = require('./Iterator');

class EventIterator extends Iterator {
    constructor(events) {
        super();
        this.events = events;
        this.position = 0;
    }

    next() {
        if (this.hasNext()) {
            return this.events[this.position++];
        }
        return null;
    }

    hasNext() {
        return this.position < this.events.length;
    }

    reset() {
        this.position = 0;
    }
}

module.exports = EventIterator;
