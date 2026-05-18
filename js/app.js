import { saveClients, loadClients } from "./storage.js";
import { seedClients } from "./data/seed.js";
import { addClient, editClient } from "./modules/clients.js";

let clients = loadClients();

if (clients.length === 0) {
  clients = seedClients;
  saveClients(clients);
}

console.log("clients initialized:", clients);
