import { saveClients, loadClients } from "../storage.js";

import { generateId } from "../utils.js";

export function addClient(newClient) {
  // Destructure with safe defaults
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

// Edit client
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

  // Return the updated client object for confirmation/ testing
  return updatedClient;
}

// delete Client
export function deleteClient(id) {
  // Load existing clients from localStorage
  let clients = loadClients();

  // Find the client by ID
  const index = clients.findIndex((client) => client.id === id);
  if (index === -1) {
    throw new Error(`Client with id ${id} not found`);
  }

  // Remove the client and capture the deleted object
  const [deletedClient] = clients.splice(index, 1);

  // Save updated list back to LocalStorage
  saveClients(clients);

  // Return the deleted client for confirmation/testing
  return deletedClient;
}

// Find Client by ID
export function getClientById(id) {
  // Load existing client
  let clients = loadClients();

  // find client by Id
  const index = clients.findIndex((client) => client.id === id);

  return clients[index];
}
