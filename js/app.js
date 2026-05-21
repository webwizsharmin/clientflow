import { saveClients, loadClients } from "./storage.js";
import { seedClients } from "./data/seed.js";
import {
  addClient,
  editClient,
  deleteClient,
  getClientById,
} from "./modules/clients.js";
import { addInvoice, getInvoiceById } from "./modules/invoices.js";

let clients = loadClients();

if (clients.length === 0) {
  clients = seedClients;
  saveClients(clients);
}
console.log("clients initialized:", clients);

/** let inv = addInvoice({ id: "inv_002", clientId: "client_001", amount: 500 });

console.log(inv); */

/* let getInv = getInvoiceById("inv_002");
console.log(getInv); */
