import {
  addInvoice,
  editInvoice,
  getInvoiceById,
  deleteInvoice,
} from "../modules/invoices.js";
import { getClientById } from "../modules/clients.js";
import { renderInvoicesPage } from "../pages/invoicesPage.js";
import { loadClients, loadInvoices } from "../storage.js";
import { validateInvoice } from "../data/validations.js";

const modal = document.getElementById("invoiceModal");
const form = document.getElementById("invoiceForm");
const closeBtn = document.getElementById("closeInvoiceModal");
const cancelBtn = document.getElementById("cancelInvoiceModal");

// Open modal
export function openInvModal(invoice = null) {
  modal.classList.remove("hidden");

  const title = document.getElementById("invoiceModalTitle");
  const saveBtn = document.getElementById("saveInvoiceModal");
  const clientSelect = document.getElementById("invoiceClient");

  //   clear old options
  clientSelect.innerHTML = '<option value="">Select Client</option>';

  // Populate clients dynamically
  const clients = loadClients();
  clients.forEach((client) => {
    const opt = document.createElement("option");
    opt.value = client.id;
    opt.textContent = client.name;
    clientSelect.appendChild(opt);
  });

  if (invoice) {
    title.textContent = "Edit Invoice";
    saveBtn.textContent = "Update Invoice";
    form.dataset.editId = invoice.id;

    form.invoiceId.value = invoice.id || "";
    form.invoiceClient.value = invoice.clientId || "";
    form.invoiceStatus.value = invoice.status || "";
    form.invoiceDate.value = invoice.issueDate || "";
    form.invoiceItems.value = invoice.items?.join(",   ") || "";
    form.invoiceAmount.value = invoice.amount || "";

    // autofill client phone when editing
    if (invoice.clientId) {
      const client = getClientById(invoice.clientId);
      if (client) {
        form.dataset.clientPhone = client.phone || "";
      }
    } else {
      title.textContent = "Add Invoice";
      saveBtn.textContent = "Save Invoice";
      delete form.dataset.editId;
      form.reset();
    }
  }

  // Handle form submit
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const invoiceData = {
        id: form.dataset.editId ? Number(form.dataset.editId) : Date.now(),
        clientId: form.invoiceClient.value,
        status: form.invoiceStatus.value,
        issueDate: form.invoiceDate.value,
        items: form.invoiceItems.value
          ? form.invoiceItems.value.split(",").map((i) => i.trim())
          : [],
        amount: Number(form.invoiceAmount.value),
      };
      // attach client info for display
      const client = getClientById(invoiceData.clientId);
      if (client) {
        invoiceData.clientName = client.name;
        invoiceData.clientPhone = client.phone;
      }

      //   Sanitize user input
      const errors = validateInvoice(invoiceData);
      if (errors.length) {
        alert(errors.join("\n"));
        return;
      }

      if (form.dataset.editId) {
        editInvoice(invoiceData.id, invoiceData);
      } else {
        addInvoice(invoiceData);
      }

      closeInvModal();
      form.reset();
      renderInvoicesPage();
    });
  }

  //   close actions

  if (closeBtn) {
    closeBtn.addEventListener("click", closeInvModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeInvModal);
  }

  // auto fill client number when selecting client
  //   const clientSelect = document.getElementById("invoiceClient");
  if (clientSelect) {
    clientSelect.addEventListener("change", () => {
      const clientId = clientSelect.value;
      const client = getClientById(clientId);
      if (client) {
        form.dataset.clientPhone = client.phone || "";
      }
    });
  }
}

// Close modal
export function closeInvModal() {
  modal.classList.add("hidden");
}
