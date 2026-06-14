import { addClient, editClient } from "../modules/clients.js";

import { validateClient } from "../data/validations.js";
import { renderClientsPage } from "../pages/clientsPage.js";

const modal = document.getElementById("clientModal");
const form = document.getElementById("clientForm");
const closeBtn = document.getElementById("closeClientModal");
const cancelBtn = document.getElementById("cancelClientModal");

// open modal
export function openClientModal(client = null) {
  modal.classList.remove("hidden");

  const form = document.getElementById("clientForm");
  const title = document.getElementById("clientModalTitle");
  const saveBtn = document.getElementById("saveClientModal");

  if (client) {
    title.textContent = "Edit Client";
    saveBtn.textContent = "Update Client";
    form.dataset.editId = client.id;

    form.clientName.value = client.name || "";
    form.clientEmail.value = client.email || "";
    form.clientPhone.value = client.phone || "";
    form.clientAddress.value = client.address || "";
    form.clientStatus.value = client.status || "active";
    form.clientEngagement.value = client.engagement || "medium";

    form.dataset.editId = client.id;
  } else {
    title.textContent = "Add Client";
    saveBtn.textContent = "Save Client";
    delete form.dataset.editId;
    form.reset();
  }
}

// close modal
export function closeClientModal() {
  modal.classList.add("hidden");
}

// Handle form submit
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const clientData = {
      id: form.dataset.editId ? Number(form.dataset.editId) : Date.now(),
      name: form.clientName.value.trim(),
      number: form.clientPhone.value.trim(),
      email: form.clientEmail.value.trim(),
      phone: form.clientPhone.value.trim(),

      address: form.clientAddress.value.trim(),

      status: form.clientStatus.value,
      engagement: form.clientEngagement.value,
    };

    const errors = validateClient(clientData);
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    if (form.dataset.editId) {
      editClient(Number(form.dataset.editId), clientData);
    } else {
      addClient(clientData);
    }
    closeClientModal();
    form.reset();
    renderClientsPage();
  });
}

// Close actions
if (closeBtn) {
  closeBtn.addEventListener("click", closeClientModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", closeClientModal);
}

// View Client Modal
export function openViewClientModal(client) {
  const modal = document.getElementById("viewClientModal");
  const content = document.getElementById("viewClientContent");

  content.innerHTML = `
  <p><strong>Id:</strong> ${client.id}</p>
  <p><strong>Name:</strong> ${client.name}</p>
  <p><strong>Email:</strong> ${client.email}</p>
  <p><strong>Phone:</strong> ${client.phone}</p>
  <p><strong>Address:</strong> ${client.address || "-"}</p>
  <p><strong>Status:</strong> ${client.status}</p>
  <p><strong>Engagement:</strong> ${client.engagement}</p>

  `;

  modal.classList.remove("hidden");
}

export function closeViewClientModal() {
  document.getElementById("viewClientModal").classList.add("hidden");
}

document
  .getElementById("closeViewClientModal")
  .addEventListener("click", closeViewClientModal);
