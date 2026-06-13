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

  const title = document.getElementById("clientModalTitle");
  const saveBtn = document.getElementById("saveClientModal");

  if (client) {
    title.textContent = "Edit Client";
    saveBtn.textContent = "Update Client";
    form.clientName.value = client.name;
    form.clientEmail.value = client.email;
    form.clientPhone.value = client.number || "";
    form.clientAddress.value = client.address || "";
    form.clientStatus.value = client.status || "active";
    form.clientEngagement.value = client.engagement || "medium";

    form.dataset.editId = client.id;
  } else {
    title.textContent = "Add Client";
    saveBtn.textContent = "Save Client";
    form.reset();
    delete form.dataset.editId;
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
      id: Date.now(),
      name: form.clientName.value.trim(),
      number: form.clientPhone.value.trim(),
      email: form.clientEmail.value.trim(),
      phone: form.clientPhone.value.trim(),
      company: form.clientCompany.value.trim(),
      address: form.clientAddress.value.trim(),
      notes: form.clientNotes.value.trim(),
      status: "active",
      engagement: "high",
    };

    const errors = validateClient(clientData);
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    if (form.dataset.editId) {
      editClient(form.dataset.editId, clientData);
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
