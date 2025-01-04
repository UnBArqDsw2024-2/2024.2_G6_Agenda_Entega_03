class Ta {
    constructor({ title, description, startTime, endTime, isRecurring = false }) {
      this.title = title;
      this.description = description;
      this.startTime = startTime;
      this.endTime = endTime;
      this.isRecurring = isRecurring;
    }
  
    // Método para clonar uma tarefa
    clone() {
      return new Tarefa({
        title: `${this.title} (Copia)`,
        description: this.description,
        startTime: this.startTime,
        endTime: this.endTime,
        isRecurring: this.isRecurring,
      });
    }
  }
  
  module.exports = Task;