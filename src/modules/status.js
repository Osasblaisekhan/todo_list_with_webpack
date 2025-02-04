// import from lolcal storage

import { saveTasks, getTasks } from './storage.js';

// toggle task completed status

export const togglestatus = (index) => {
  const tasks = getTasks();

  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  return tasks;
};

// clear all completed task

export const clearCompleted = () => {
  const tasks = getTasks();

  const remainingTasks = tasks.filter((task) => !task.completed);

  remainingTasks.forEach((task, index) => {
    task.index = index;
  });

  saveTasks(remainingTasks);

  return remainingTasks;
};
