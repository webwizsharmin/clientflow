import { loadClients } from "../storage.js";
import {
  addClient,
  deleteClient,
  editClient,
  getClientById,
} from "../modules/clients.js";

export function renderClientsPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <!-- Page Header -->
    <h1 class="text-2xl font-bold text-slate-800 mb-2"> Clients</h1>
    <p class="text-slate-500 mb-6">Manage your client records, view details, and track engagement.</p>
    `;
}
