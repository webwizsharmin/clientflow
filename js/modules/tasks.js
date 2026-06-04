import { saveTasks, loadTasks, saveInvoices } from "../storage.js";

// Add task
export function addTask(newTask) {
  // load existing tasks
  let tasks = loadTasks();

  // destructuring new tasks
  const {
    id,
    title,
    description,
    status,
    priority,
    dueDate,
    createdAt,
    createdBy,
    reminderTime,
  } = newTask;

  //   check id and title
  if (!newTask?.id || !newTask.title) {
    throw new Error("Task must have an id and title");
  }

  // create new taskObj
  const newTaskObj = {
    id,
    title,
    description: description || "",
    status: status || "pending",
    priority: priority || "medium",
    dueDate: dueDate || null,
    createdAt: createdAt || new Date().toISOString(),
    createdBy,
    reminderTime: reminderTime || null,
  };

  //   Push newTaskObj into Tasks Array
  const updatedTasks = [...tasks, newTaskObj];

  // Save new task
  saveTasks(updatedTasks);

  return newTaskObj;
}

// Edit Task
export function editTask(id, updatedData) {
  // load existing tasks
  let tasks = loadTasks();

  // Destructuring the updatedData
  const { title, description, status, priority, dueDate, reminderTime } =
    updatedData;

  // find task by id
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error(`task with id ${id} is not found!`);
  }

  const task = tasks[index];

  // Merge new Data with old task
  const updatedTask = {
    ...task,
    title: title ?? task.title,
    description: description ?? task.description,
    status: status ?? task.status,
    priority: priority ?? task.priority,
    dueDate: dueDate ?? task.dueDate,
    reminderTime: reminderTime ?? task.reminderTime,
    updatedAt: new Date().toISOString(),
  };

  // Replace the old task with updated one
  const updatedTasks = tasks.map((t, i) => (i === index ? updatedTask : t));

  // save updated task
  saveTasks(updatedTasks);

  return updatedTask;
}

// DELETE TASK

export function deleteTask(id) {
  // load existing tasks
  let tasks = loadTasks();

  // find task by id
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error(`task with id ${id} is not found!`);
  }

  const task = tasks[index];

  // remove the task from existing task array
  const [deletedTask] = tasks.splice(index, 1);

  // save the tasks
  saveTasks(tasks);

  return deletedTask;
}
