import { loadTasks } from "../storage.js";
import { getTask, editTask } from "../modules/tasks.js";
import { openTaskModal, openViewTaskModal } from "../components/taskModal.js";

export function renderKanban() {
  const content = document.getElementById("content");

  // Inject Kanban layout
  content.innerHTML = `
    <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Tasks</h1>
    <p class="text-slate-500 dark:text-slate-400 mb-6">Manage your tasks with a Kanban board.</p>

    <div class="mt-4">
      <button id="newTaskBtn" class="btn-primary">+ New Task</button>
    </div>

    <div id="kanbanBoard" class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div class="kanban-column bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
        <h3 class="text-lg font-bold mb-3">To Do</h3>
        <div class="kanban-list min-h-75" data-status="todo"></div>
      </div>
      <div class="kanban-column bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
        <h3 class="text-lg font-bold mb-3">In Progress</h3>
        <div class="kanban-list min-h-75" data-status="in-progress"></div>
      </div>
      <div class="kanban-column bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
        <h3 class="text-lg font-bold mb-3">Done</h3>
        <div class="kanban-list min-h-75" data-status="done"></div>
      </div>
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
    card.className =
      "kanban-card group p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-move mb-2 flex flex-col gap-2";
    // card.textContent = task.title;
    card.draggable = true;
    card.dataset.id = task.id;

    // Priority badge color
    let priorityClass = "";
    if (task.priority === "low") priorityClass = "bg-green-100 text-green-700";
    if (task.priority === "medium")
      priorityClass = "bg-yellow-100 text-yellow-700";
    if (task.priority === "high") priorityClass = "bg-red-100 text-red-700";

    // Card content
    card.innerHTML = `
  <div>
    <h4 class="font-semibold text-slate-800 group-hover:text-blue-600">${task.title}</h4>
    <p class="text-sm text-slate-500">${task.description || ""}</p>
    <span class="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${priorityClass}">
      ${task.priority}
    </span>
  </div>
  <div class="flex flex-col gap-2">
    <button class="edit-btn px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition" data-id="${task.id}">
      <i class='bx bx-edit'></i>
    </button>
  </div>
`;
    // Click to view details
    card.addEventListener("click", () => openViewTaskModal(task.id));

    const column = document.querySelector(
      `.kanban-list[data-status="${task.status}"]`,
    );
    if (column) column.appendChild(card);
  });

  // Attach edit button listeners
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering view modal
      const id = Number(e.target.dataset.id);
      const task = getTask(id);
      openTaskModal(task); // open modal pre-filled
    });
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
