import { seedTasks } from "./data/seed.js";

export function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

export function loadClients() {
  const data = localStorage.getItem("clients");
  return data ? JSON.parse(data) : [];
}

// INVOICES PART

// save invoices
export function saveInvoices(invoices) {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

// load invoices
export function loadInvoices() {
  const invData = localStorage.getItem("invoices");
  return invData ? JSON.parse(invData) : [];
}

// TASKS PART

// save tasks
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load tasks
export function loadTasks() {
  const taskData = localStorage.getItem("tasks");

  if (taskData) {
    const parsed = JSON.parse(taskData);
    if (parsed.length === 0) {
      localStorage.setItem("tasks", JSON.stringify(seedTasks));
      return seedTasks;
    }
    return parsed;
  } else {
    localStorage.setItem("tasks", JSON.stringify(seedTasks));
    return seedTasks;
  }
}

// LEADS

// Save leads
export function saveLeads(leads) {
  localStorage.setItem("leads", JSON.stringify(leads));
}

// load leads
export function loadLeads() {
  let leadData = localStorage.getItem("leads");
  return leadData ? JSON.parse(leadData) : [];
}
