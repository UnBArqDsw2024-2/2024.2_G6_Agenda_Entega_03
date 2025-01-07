class Event {
  constructor(id, title, date, category) {
    this.id = id;
    this.title = title;
    this.date = new Date(date); 
    this.category = category; 
  }
}

module.exports = Event;
