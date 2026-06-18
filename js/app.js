import { saveClients, loadClients, loadInvoices } from "./storage.js";
import { seedClients } from "./data/seed.js";
import {
  addClient,
  editClient,
  deleteClient,
  getClientById,
} from "./modules/clients.js";
import {
  addInvoice,
  deleteInvoice,
  editInvoice,
  getInvoiceById,
} from "./modules/invoices.js";

import {
  renderRevenueChart,
  renderLeadChart,
  renderUnpaidInvChart,
  renderMonthlyRevenueChart,
} from "./modules/charts.js";

import { initClientModal } from "./ui/modal.js";

import { openClientModal, closeClientModal } from "./components/clientModal.js";
import { openInvModal, closeInvModal } from "./components/invoiceModal.js";

import { renderClientsPage } from "./pages/clientsPage.js";
import { renderDashboardPage } from "./pages/dashboardPage.js";
import { renderInvoicesPage } from "./pages/invoicesPage.js";

let clients = loadClients();

if (clients.length === 0) {
  clients = seedClients;
  saveClients(clients);
}
console.log("clients initialized:", clients);

/*let inv = addInvoice({ id: "inv_003", clientId: 2, amount: 1500 });

console.log(inv); */

/* let getInv = getInvoiceById("inv_002");
console.log(getInv); */

/* let editedInv = editInvoice("inv_002", {
  clientId: 1,
  amount: 1500,
});

console.log(editedInv); */

/* let deletedInv = deleteInvoice("inv_002");
console.log("deleted Invoice:", deletedInv); */

/* let invoices = loadInvoices();
console.log("total invoices:", invoices); */

// document.addEventListener("DOMContentLoaded", () => {
//   const revenueCtx = document.getElementById("revenueChart");
//   renderRevenueChart(revenueCtx, {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     values: [5000, 7000, 6500, 5500, 7400, 6000],
//   });

//   const leadCtx = document.getElementById("leadChart");
//   renderLeadChart(leadCtx, {
//     labels: ["week 1", "week 2", "week 3"],
//     values: [10, 15, 20],
//   });

//   const UnpaidInvCtx = document.getElementById("unpaidInvChart");
//   renderUnpaidInvChart(UnpaidInvCtx, {
//     labels: ["week 1", "week 2", "week 3"],
//     values: [1200, 800, 1500],
//   });

//   const monthlyRevenueCtx = document.getElementById("monthlyRevChart");

//   renderMonthlyRevenueChart(monthlyRevenueCtx, {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

//     values: [12000, 15000, 18000, 20000, 22000, 25000],
//   });
// });

initClientModal();

document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href").replace("#", "");

    switch (target) {
      case "clients":
        renderClientsPage();
        break;
      case "home":
        renderDashboardPage();
        break;
      case "invoices":
        renderInvoicesPage();
        break;
      default:
        document.getElementById("content").innerHTML = `
        <h1 class="text-2xl font-bold text-slate-800 mb-2"> Page not found!</h1>
        `;
    }
  });
});

// Render Dashboard by default on page load
renderDashboardPage();
