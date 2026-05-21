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
