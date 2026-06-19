import { addTask, editTask, deleteTask, getTask } from "../modules/tasks.js";
import { renderKanban } from "../pages/tasksPage.js";

const modal = document.getElementById("taskModal");
const form = document.getElementById("taskForm");
const closeBtn = document.getElementById("closeTaskModal");
const cancelBtn = document.getElementById("cancelTaskModal");

export function openTaskModal(task = null) {
  modal.classList.remove("hidden");

  const title = document.getElementById("taskModalTitle");
  const SaveBtn = document.getElementById("saveTaskModal");

  if (task) {
    title.textContent = "Edit Task";
    SaveBtn.textContent = "update Task";
    form.dataset.editId = task.id;

    form.taskTitle.value = task.title || "";
    form.taskDescription.value = task.description || "";
    form.taskStatus.value = task.status || "todo";
    form.taskPriority.value = task.priority || "medium";
    form.taskDueDate.value = task.dueDate || "";
  } else {
    title.textContent = "Add Task";
    SaveBtn.textContent = "Save Task";
    delete form.dataset.editId;
    form.reset();
  }
}

export function closeTaskModal() {
  modal.classList.add("hidden");
}

// Handle submit
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskData = {
      id: form.dataset.editId ? Number(form.dataset.editId) : Date.now(),
      title: form.taskTitle.value.trim(),
      description: form.taskDescription.value.trim(),
      status: form.taskStatus.value,
      priority: form.taskPriority.value,
      dueDate: form.taskDueDate.value,
      createdAt: new Date().toISOString(),
    };

    if (!taskData.title) {
      alert("Task must have a title");
      return;
    }

    if (form.dataset.editId) {
      editTask(taskData.id, taskData);
    } else {
      addTask(taskData);
    }

    closeTaskModal();
    form.reset();
    renderKanban();
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeTaskModal);
if (cancelBtn) cancelBtn.addEventListener("click", closeTaskModal);

// view task modal
export function openViewTaskModal(taskId) {
  const task = getTask(taskId);
  const modal = document.getElementById("viewTaskModal");
  const content = document.getElementById("viewTaskContent");

  content.innerHTML = `
    <p><strong> Title: </strong> ${task.title} </p>
    <p><strong>Description:</strong> ${task.description || "-"}</p>
    <p><strong>Status:</strong> ${task.status}</p>
    <p><strong>Priority:</strong> ${task.priority}</p>
    <p><strong> Due Date: </strong> ${task.dueDate || "-"}</p>
    `;

  modal.classList.remove("hidden");

  const deleteBtn = document.getElementById("deleteTaskBtn");
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      deleteTask(task.id);
      modal.classList.add("hidden");
      renderKanban();
    };
  }
}

export function closeViewTaskModal() {
  const modal = document.getElementById("viewTaskModal");
  if (modal) modal.classList.add("hidden");
}

const closeViewBtn = document.getElementById("closeViewTaskModal");
if (closeViewBtn) {
  closeViewBtn.addEventListener("click", closeViewTaskModal);
}

const closeViewTaskBtn = document.getElementById("closeViewTaskModalFooter");
if (closeViewTaskBtn) {
  closeViewTaskBtn.addEventListener("click", closeViewTaskModal);
}
