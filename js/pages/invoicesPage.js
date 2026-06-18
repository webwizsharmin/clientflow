import {
  addInvoice,
  editInvoice,
  getInvoiceById,
  deleteInvoice,
} from "../modules/invoices.js";
import { loadInvoices, saveInvoices } from "../storage.js";
import { getClientById } from "../modules/clients.js";
import { openInvModal, openViewInvModal } from "../components/invoiceModal.js";

export function renderInvoicesPage() {
  const content = document.getElementById("content");
  const invoices = loadInvoices();
  // const client = getClientById(clientId);

  // --- Inject layout ---
  content.innerHTML = `
    <!-- Page Header -->
    <h1 class="text-2xl font-bold text-slate-800 mb-2">Invoices</h1>
    <p class="text-slate-500 mb-6">Manage your Invoice records, view details, and track payments.</p>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Invoices Value -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Total Invoices </p>
            <h3 class="text-3xl font-bold text-slate-800">120</h3>
            <p class="text-sm text-blue-600 mt-1">
            <i class='bx bx-trending-up text-blue-600'></i>
            + 7.6% vs last month</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <i class="bx bxs-spreadsheet text-xl text-blue-600"></i>
          </div>
        </div>
      </div>

      <!-- Paid Invoices -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Paid Invoices</p>
            <h3 class="text-3xl font-bold text-slate-800">85</h3>
            <p class="text-sm text-green-600 mt-1">
            <i class="bx bx-list-check text-green-600"></i>+4.9% vs last month</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <i class="bx bx-check-square text-2xl text-green-600"></i>
          </div>
        </div>
      </div>

      <!-- Unpaid Invoices -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Unpaid Invoices</p>
            <h3 class="text-3xl font-bold text-slate-800">34</h3>
            <p class="text-sm text-amber-600 mt-1">
            <i class="bx bx-user-plus  text-amber-600"></i> 13 new invoces added</p>
          </div>
          <div class="bg-amber-100 p-3 rounded-full">
            <i class="bx bxs-hourglass text-2xl text-amber-600"></i>
          </div>
        </div>
      </div>
 
      <!-- Overdue Invoices-->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Overdue Invoices</p>
            <h3 class="text-3xl font-bold text-slate-800">10</h3>
            <p class="text-xs text-red-600 mt-1">
            <i class="bx bx-trending-down text-red-600"></i> -0.4% vs last month</p>
          </div>
          <div class="bg-red-100 p-3 rounded-full">
            <i class="bx bx-error text-2xl text-red-600"></i>
          </div>
        </div>
      </div>
    </div>

 <!-- Invoices Table -->
 <div class="p-6 bg-white rounded-lg shadow">
  <!-- Filters -->
  <div class="flex flex-wrap gap-4 mb-4">
    <!-- Search -->
    <input 
      type="text" 
      id="searchInput" 
      placeholder="Search invoices..." 
      class="w-40 border rounded px-3 py-2 text-sm"
    />
    <select id="statusFilter" class="border rounded px-3 py-2 text-sm">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
      <option value="Pending">Pending</option>
    </select>
    
    <button
          id="newInvBtn"
          type="button"
          class="btn-secondary text-sm px-4 py-2 whitespace-nowrap"
        >
          + New Invoice
        </button>
  </div>

  <!-- Responsive Table -->
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-700">
          <th class="px-2 py-1 sm:px-4 sm:py-2">Inv. ID</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Client</th>
          <th class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">Number</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Status</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Items</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Amount</th>
          <th class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">IssueDate</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Actions</th>
        </tr>
      </thead>
      <tbody id="invoiceTableBody"></tbody>
    </table>
  </div>
 </div>

  `;

  // Render table rows
  const tbody = document.getElementById("invoiceTableBody");
  tbody.innerHTML = "";
  invoices.forEach((invoice) => {
    tbody.innerHTML += `
     <tr class="border-b hover:bg-gray-100 text-xs sm:text-sm">
      <td class="px-2 py-1 sm:px-4 sm:py-2">${invoice.id}</td>
      <td class="px-2 py-1 sm:px-4 sm:py-2">${invoice.clientName || "Unknown"}</td>
      <td class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">${invoice.clientPhone || "-"}</td>
      <td class="px-2 py-1 sm:px-4 sm:py-2">
        <span class="px-2 py-1 rounded-md text-xs font-semibold ${
          invoice.status === "paid"
            ? "bg-green-100 text-green-700"
            : invoice.status === "unpaid"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
        }">
          ${invoice.status}
        </span>
      </td>
      <td class="px-2 py-1 sm:px-4 sm:py-2">${invoice.items.length}</td>
      <td class="px-2 py-1 sm:px-4 sm:py-2">$${invoice.amount}</td>
      <td class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">${invoice.issueDate}</td>
      <td class="px-2 py-1 sm:px-4 sm:py-2 flex gap-2">
        <button data-id="${invoice.id}" class="btn-edit-inv text-blue-600 hover:underline">Edit</button>
        <button data-id="${invoice.id}" class="btn-delete-inv text-red-600 hover:underline">Delete</button>
        <button data-id="${invoice.id}" class="btn-view-inv text-gray-600 hover:underline">View</button>
      </td>
    </tr>
    `;
  });

  // wire up
  const newInvBtn = document.getElementById("newInvBtn");

  newInvBtn.addEventListener("click", () => {
    openInvModal();
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete-inv")) {
    const id = Number(e.target.dataset.id);
    deleteInvoice(id);
    renderInvoicesPage();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-view-inv")) {
    const id = Number(e.target.dataset.id);
    const invoice = getInvoiceById(id);
    if (invoice) {
      openViewInvModal(invoice);
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit-inv")) {
    const id = Number(e.target.dataset.id);
    const invoice = getInvoiceById(id);
    openInvModal(invoice);
  }
});
