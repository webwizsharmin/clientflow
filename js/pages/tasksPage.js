import { loadTasks } from "../storage.js";
import { getTask, editTask, deleteTask, addTask } from "../modules/tasks.js";
import { openTaskModal, openViewTaskModal } from "../components/taskModal.js";

export function renderKanban() {
  const content = document.getElementById("content");

  // Inject Kanban layout
  content.innerHTML = `
    <h1 class="text-2xl font-bold text-slate-800 mb-2">Tasks</h1>
    <p class="text-slate-500 mb-6">Manage your tasks with a Kanban board.</p>

    <div id="kanbanBoard" class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div class="kanban-column bg-gray-100 p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-3">To Do</h3>
        <div class="kanban-list min-h-[200px]" data-status="todo"></div>
      </div>
      <div class="kanban-column bg-gray-100 p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-3">In Progress</h3>
        <div class="kanban-list min-h-[200px]" data-status="in-progress"></div>
      </div>
      <div class="kanban-column bg-gray-100 p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-3">Done</h3>
        <div class="kanban-list min-h-[200px]" data-status="done"></div>
      </div>
    </div>

    <div class="mt-4">
      <button id="newTaskBtn" class="btn-primary">+ New Task</button>
    </div>

    `;

  // Load tasks
  const tasks = loadTasks();

  // clear old tasks
  document
    .querySelectorAll(".kanban-list")
    .forEach((list) => (list.innerHTML = ""));

  // Render tasks into columns
  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "kanban-card p-2 bg-white shadow mb-2 cursor-move rounded";
    card.textContent = task.title;
    card.draggable = true;
    card.dataset.id = task.id;

    // Click to view details
    card.addEventListener("click", () => openViewTaskModal(task.id));

    const column = document.querySelector(
      `.kanban-list[data-status="${task.status}"]`,
    );
    if (column) column.appendChild(card);
  });

  // Wire up Add Task button
  const newTaskBtn = document.getElementById("newTaskBtn");
  if (newTaskBtn) {
    newTaskBtn.addEventListener("click", () => openTaskModal());
  }

  //  Drag & drop listeners
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

  document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("kanban-card")) {
      e.dataTransfer.setData("text/plain", e.target.dataset.id);
    }
  });
}
