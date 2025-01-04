class Task {
  constructor({ title, description, startTime, endTime, isRecurring = false }) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isRecurring = isRecurring;
  }

  clone(id) {
    return new Task({
      id: id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      isRecurring: this.isRecurring,
    });
  }
}

export default Task;
