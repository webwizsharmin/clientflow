import { loadTasks } from "../storage.js";
import { getTask, editTask, deleteTask, addTask } from "../modules/tasks.js";

export function renderKanban() {
  const tasks = loadTasks();

  // clear old tasks
  document
    .querySelectorAll(".kanban-list")
    .forEach((list) => (list.innerHTML = ""));

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className =
      "kanban-card p-2 bg-white shadow mb-2 cursor-move rounded ";
    card.textContent = task.title;
    card.draggable = true;
    card.dataset.id = task.id;

    // click to view details
    card.addEventListener("click", () => openViewTaskModal(task.id));

    const column = document.querySelector(
      `.kanban-list[data-status="${task.status}"]`,
    );
    if (column) column.appendChild(card);
  });
}

// Drag & drop
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("kanban-card")) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
  }
});

document.querySelectorAll(".kanban-list").forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());
  list.addEventListener("drop", (e) => {
    const taskId = e.dataTransfer.getData("text/plain");
    const newStatus = list.dataset.status;

    const task = getTask(Number(taskId));
    editTask(task.id, { status: newStatus });

    renderKanban();
  });
});
