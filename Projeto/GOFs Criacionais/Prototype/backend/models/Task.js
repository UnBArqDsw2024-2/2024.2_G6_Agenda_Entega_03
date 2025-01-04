class Task {
  constructor({ id, title, description, startTime }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
  }

  clone(id) {
    return new Task({
      id: id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
    });
  }
}

export default Task;
