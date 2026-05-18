import { saveClients, loadClients } from "./storage.js";
import { seedClients } from "./data/seed.js";
import { addClient } from "./modules/clients.js";

let clients = loadClients();

if (clients.length === 0) {
  clients = seedClients;
  saveClients(clients);
}

let newCustomer = addClient({
  name: "Charlie",
  email: "charlie@mail.com",
  number: "333434343344334",
  status: "active",
});
console.log(newCustomer);
console.log("clients initialized:", clients);
