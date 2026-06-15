import { loadClients, saveClients } from "../storage.js";
import {
  addClient,
  deleteClient,
  editClient,
  getClientById,
} from "../modules/clients.js";
import {
  openClientModal,
  openViewClientModal,
} from "../components/clientModal.js";

export function renderClientsPage() {
  const content = document.getElementById("content");
  const clients = loadClients();

  // --- Inject layout ---
  content.innerHTML = `
    <!-- Page Header -->
    <h1 class="text-2xl font-bold text-slate-800 mb-2">Clients</h1>
    <p class="text-slate-500 mb-6">Manage your client records, view details, and track engagement.</p>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Avg. Client Value -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Total Clients </p>
            <h3 class="text-3xl font-bold text-slate-800">153</h3>
            <p class="text-sm text-green-600 mt-1">
            <i class='bx bx-trending-up text-green-600'></i>
            + 7.6% vs last month</p>
          </div>
          <div class="bg-green-100 p-3 rounded-full">
            <i class="bx bx-group text-2xl text-green-600"></i>
          </div>
        </div>
      </div>

      <!-- Retention Rate -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Retention Rate</p>
            <h3 class="text-3xl font-bold text-slate-800">56.8%</h3>
            <p class="text-sm text-blue-600 mt-1">
            <i class="bx bx-refresh text-blue-600"></i>+4.9% vs last month</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <i class="bx bx-refresh text-2xl text-blue-600"></i>
          </div>
        </div>
      </div>

      <!-- New This Month -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">New This Month</p>
            <h3 class="text-3xl font-bold text-slate-800">34</h3>
            <p class="text-sm text-purple-600 mt-1">
            <i class="bx bx-user-plus  text-purple-600"></i> 13 new clients added</p>
          </div>
          <div class="bg-purple-100 p-3 rounded-full">
            <i class="bx bx-user-plus text-2xl text-purple-600"></i>
          </div>
        </div>
      </div>

      <!-- Avg. Engagement -->
      <div class="card p-4 rounded-lg shadow bg-white flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg font-medium text-slate-600">Avg. Engagement</p>
            <h3 class="text-xl font-bold text-slate-800">6.2/10</h3>
            <p class="text-xs text-orange-600 mt-1">
            <i class="bx bx-trending-down text-orange-600"></i> -0.4% vs last month</p>
          </div>
          <div class="bg-orange-100 p-3 rounded-full">
            <i class="bx bx-trending-down text-2xl text-orange-600"></i>
          </div>
        </div>
      </div>
    </div>

 <!-- Clients Table -->
<div class="p-6 bg-white rounded-lg shadow">
  <!-- Filters -->
  <div class="flex flex-wrap gap-4 mb-4">
    <!-- Search -->
    <input 
      type="text" 
      id="searchInput" 
      placeholder="Search clients..." 
      class="w-40 border rounded px-3 py-2 text-sm"
    />
    <select id="statusFilter" class="border rounded px-3 py-2 text-sm">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
      <option value="Pending">Pending</option>
    </select>
    <select id="engagementFilter" class="border rounded px-3 py-2 text-sm">
      <option value="">All Engagement</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>

  <!-- Responsive Table -->
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-700">
          <th class="px-2 py-1 sm:px-4 sm:py-2">ID</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Client</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Email</th>
          <th class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">Address</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Status</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Engagement</th>
          <th class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">Number</th>
          <th class="px-2 py-1 sm:px-4 sm:py-2">Actions</th>
        </tr>
      </thead>
      <tbody id="clientTableBody"></tbody>
    </table>
  </div>
</div>

  `;

  // --- Render table rows ---
  const tbody = document.getElementById("clientTableBody");
  tbody.innerHTML = "";
  clients.forEach((client) => {
    tbody.innerHTML += `
      <tr class="border-b hover:bg-gray-100 text-xs sm:text-sm">
        <td class="px-2 py-1 sm:px-4 sm:py-2">${client.id}</td>
        <td class="px-2 py-1 sm:px-4 sm:py-2">${client.name}</td>
        <td class="px-2 py-1 sm:px-4 sm:py-2">${client.email}</td>
        <td class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">${client.address}</td>
        <td class="px-2 py-1 sm:px-4 sm:py-2">
        <span class="px-2 py-1 rounded-md text-xs font-semibold ${client.status === "active" ? "bg-green-100 text-green-700" : client.status === "inactive" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}"> ${client.status}
        </span></td>
        <td class="px-2 py-1 sm:px-4 sm:py-2">
        <span class="px-2 py-1 rounded-md text-xs font-semibold ${client.engagement === "high" ? "bg-green-100 text-green-700" : client.status === "medium" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}">
        ${client.engagement} </span></td>
        <td class="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">${client.phone}</td>
        <td class="px-2 py-1 sm:px-4 sm:py-2 flex gap-2">
          <button data-id="${client.id}" class=" btn-edit text-blue-600 hover:underline">Edit</button>
          <button data-id="${client.id}" class=" btn-delete text-red-600 hover:underline">Delete</button>
          <button data-id="${client.id}" class=" btn-view text-gray-600 hover:underline">View</button>
        </td>
      </tr>
    `;
  });

  // --- Wire up actions ---

  // tbody.querySelectorAll("button.text-blue-600").forEach((btn) => {
  //   btn.addEventListener("click", (e) => {
  //     const id = e.target.dataset.id;
  //     const client = getClientById(id);
  //     openClientModal(client);
  //     // renderClientsPage(); // re-render after edit
  //   });
  // });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    const id = Number(e.target.dataset.id);
    const client = getClientById(id);
    openClientModal(client);
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = Number(e.target.dataset.id);
    deleteClient(id);
    renderClientsPage();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-view")) {
    const id = Number(e.target.dataset.id);
    const client = getClientById(id);
    if (client) {
      openViewClientModal(client);
    }
  }
});
