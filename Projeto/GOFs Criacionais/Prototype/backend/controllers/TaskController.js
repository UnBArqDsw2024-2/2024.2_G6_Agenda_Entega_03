import { v4 } from 'uuid';
import Task from '../models/Task.js';

const tasks = [];

export const createTask = (req, res) => {
  const { title, startTime, recurrenceRule } = req.body;

  const newTask = new Task({
    id: v4(),
    title,
    startTime: new Date(startTime),
  });

  tasks.push(newTask);
  let clonedTasks = [];
  clonedTasks.push(newTask);

  let occurrencesNumber = Number(recurrenceRule?.occurrences);
  console.log(occurrencesNumber);

  if (occurrencesNumber > 0) {
    for (let i = 1; i < occurrencesNumber; i++) {
      let clonedTask = newTask.clone(v4());

      clonedTask.startTime = new Date(clonedTask.startTime);

      //new Date(clonedTask.startTime)
      //if (recurrenceRule.frequency !== 'none') {

      if (recurrenceRule.frequency === 'daily') {
        clonedTask.startTime.setDate(clonedTask.startTime.getDate() + i);
      } else if (recurrenceRule.frequency === 'weekly') {
        clonedTask.startTime.setDate(clonedTask.startTime.getDate() + i * 7);
      } else if (recurrenceRule.frequency === 'monthly') {
        clonedTask.startTime.setMonth(clonedTask.startTime.getMonth() + i);
      } else if (recurrenceRule.frequency === 'yearly') {
        clonedTask.startTime.setFullYear(
          clonedTask.startTime.getFullYear() + i
        );
      }

      //}

      tasks.push(clonedTask);
      clonedTasks.push(clonedTask);
    }
  }

  console.log(tasks);

  res.status(200).json(clonedTasks);
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
