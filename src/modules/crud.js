// importing local storage functions

import { saveTasks, getTasks } from './storage.js';

// create new task

export const addTask = (description) => {
  const tasks = getTasks();

  const newTask = {
    description,

    completed: false,

    index: tasks.length,

  };

  tasks.push(newTask);
  saveTasks(tasks);
  //   console.log(tasks);

  return newTask;
};

// read all task

export const getAllTasks = () => getTasks();

// update task description

export const updateTask = (index, newDescription) => {
  const tasks = getTasks();

  tasks[index].description = newDescription;

  saveTasks(tasks);

  return tasks;

//   console.log(tasks);
};

// delete tasks

export const deleteTask = (index) => {
  const tasks = getTasks();

  tasks.splice(index, 1);

  tasks.forEach((task, i) => {
    task.index = i;
  });
  saveTasks();

  return tasks;
};
