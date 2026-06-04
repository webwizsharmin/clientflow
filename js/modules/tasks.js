import { saveTasks, loadTasks } from "../storage.js";

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
