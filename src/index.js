import './styles.css';

import { addTask, updateTask } from './modules/crud.js';

import { togglestatus, clearCompleted } from './modules/status.js';

import { getTasks } from './modules/storage.js';

// function to create the list

const createTodoList = () => {
  const todoList = document.getElementById('todo-list');

  todoList.innerHTML = '';

  // retrieve list tasks from local storage and sort them by thier index

  const tasks = getTasks().sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    li.className = 'todo-item';

    li.dataset.index = index;

    li.innerHTML = `<div class="todo-content">

     <input type="checkbox" ${task.Completed ? 'checked' : ''} class="todo-checkbox" data-index = "${index}">

     <span class="todo-text" ${task.Completed ? 'completed' : ''}" contendeditable = "true" data-index = "${index}">${task.description}</span>

     <button class="delete-button" data-index ="${index}">🗑️</button>
    </div>`;

    todoList.appendChild(li);
  });
};

// add event listerner

document.addEventListener('DOMContentLoaded', () => {
  createTodoList();

  const todoInput = document.querySelector('.todo-input');

  const addBtn = document.querySelector('.add-btn');

  const handleAddTask = () => {
    const description = todoInput.value;

    if (description) {
      addTask(description);
      createTodoList();

      todoInput.value = '';
    }
  };

  addBtn.addEventListener('click', handleAddTask());

  todoInput.addEventListener('keypress', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleAddTask();
    }
  });

  // add event delegation

  const todoList = document.getElementById('todo-list');

  todoList.addEventListener('change', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
      const index = parseInt(e.target.dataset.index, 2);

      togglestatus(index);
      createTodoList();
    }
  });

  todoList.addEventListener('click', (e) => {
    // const index = parseInt(e.target.dataset.index, 2);

    // delete button click

    if (e.target.classList.contains('todo-text')) {
      const index = parseInt(e.target.dataset.index, 2);

      const newDescription = e.target.innerText;

      updateTask(index, newDescription);

      createTodoList();
    }
  });

  // clear all completed task

  const clearBtn = document.querySelector('.clear-btn');

  clearBtn.addEventListener('click', () => {
    clearCompleted();
    createTodoList();
  });
});
