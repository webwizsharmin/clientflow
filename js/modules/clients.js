import { saveClients, loadClients } from "../storage.js";

import { generateId } from "../utils.js";

export function addClient(newClient) {
  // Destructure with safe defaoults
  const {
    name = "John",
    email = "john@mail.com",
    number = "0122222324232",
    status = "active",
  } = newClient;

  //  Build new client object
  const uniqueId = generateId();
  const newClientObj = {
    id: uniqueId,
    name,
    email,
    number,
    status,
  };

  //   Load existing clients from localStorage
  let clients = loadClients();

  // Add new client
  clients.push(newClientObj);

  // Save updated list back to localStorage
  saveClients(clients);

  // Return the new client object for confirmation/testing
  return newClientObj;
}

// Edit clinet
export function editClient(id, updatedData) {
  //  Load existing clents from localStorage
  let clients = loadClients();

  //  Find the client by ID
  const index = clients.findIndex((client) => client.id === id);
  if (index === -1) {
    throw new Error(`Client with id ${id} not found`);
  }

  // Merge old client data with new updates
  const updatedClient = {
    ...clients[index],
    ...updatedData,
  };

  //   Replace the old client with the updated one
  clients[index] = updatedClient;

  // Save updated list back to localStorage
  saveClients(clients);

  // Return the updated client object for confirmation/ tsting
  return updatedClient;
}
