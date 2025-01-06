class Event {
  constructor(id, title, date, category) {
    this.id = id;
    this.title = title;
    this.date = new Date(date); // Converte para objeto Date
    this.category = category; // Exemplo: 'trabalho', 'lazer'
  }
}

module.exports = Event;
