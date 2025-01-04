import { v4 } from 'uuid';
import Task from '../models/Task.js';

const tasks = [];

export const createTask = (req, res) => {
  const { title, description, startTime, endTime, isRecurring } = req.body;

  const newTask = new Task({
    id: v4(),
    title,
    description,
    startTime,
    endTime,
    isRecurring,
  });
  tasks.push(newTask);

  res.status(200).json(newTask);
};

export const cloneTask = (req, res) => {
  const { id } = req.params;

  const originalTask = tasks.find((task) => task.id === id);
  if (!originalTask) {
    throw new Error('Tarefa nao encontrada');
  }

  const clonedTask = originalTask.clone(v4());
  tasks.push(clonedTask);

  res.status(200).json(clonedTask);
};

export const getTasks = (req, res) => {
  res.status(200).json(tasks);
};
