import { addClient } from "../modules/clients.js";

import { validateClient } from "../data/validations.js";

const modal = document.getElementById("clientModal");
const form = document.getElementById("clientForm");
const closeBtn = document.getElementById("closeClientModal");
const cancelBtn = document.getElementById("cancelClientModal");

// open modal
export function openClientModal() {
  modal.classList.remove("hidden");
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
      name: form.clientName.value.trim(),
      email: form.clientEmail.value.trim(),
      phone: form.clientPhone.value.trim(),
      company: form.clientCompany.value.trim(),
      address: form.clientAddress.value.trim(),
      notes: form.clientNotes.value.trim(),
    };

    const errors = validateClient(clientData);
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    addClient(clientData);
    closeClientModal();
    form.reset();
  });
}

// Close actions
if (closeBtn) {
  closeBtn.addEventListener("click", closeClientModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", closeClientModal);
}
