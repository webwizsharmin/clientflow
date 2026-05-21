import { saveInvoices, loadInvoices } from "../storage.js";
import { getClientById } from "./clients.js";
import { getIssueDate } from "../utils.js";

// add invoice
export function addInvoice(newInvoice) {
  // load existing invoices
  let invoices = loadInvoices();

  // destructuring newInvoices
  const {
    id,
    clientId,
    amount,
    dueDate = null,
    items = [],
    currency = "USD",
    status = "pending",
  } = newInvoice;

  // Find client by id
  const client = getClientById(clientId);

  // Create newInvoice object
  const newInvoiceObj = {
    id,
    clientId,
    clientName: client?.name || null,
    clientPhone: client?.phone || null,
    amount,
    currency,
    issueDate: getIssueDate(),
    dueDate,
    status,
    items,
  };

  // add newInvoiceObj in existing invoices
  invoices.push(newInvoiceObj);

  // save invoices
  saveInvoices(invoices);

  return newInvoiceObj;
}

// get invoice by id
export function getInvoiceById(invoiceId) {
  // load invoices
  let invoices = loadInvoices();

  // find index by id

  const index = invoices.findIndex((invoice) => invoice.id === invoiceId);

  if (index === -1) {
    throw new Error(`invoice with id ${id} is not found!`);
  }

  return invoices[index];
}

// Edit invoice
export function editInvoice(id, updatedData) {
  // load invoice
  let invoices = loadInvoices();

  // find inovice by id

  const index = invoices.findIndex((invoice) => invoice.id === id);

  if (index === -1) {
    throw new Error(`invoice with id ${id} is not found!`);
  }

  const invoice = invoices[index];

  // Find client by clientId
  const client = getClientById(invoice.clientId);

  //   Merge new data eith old invoce
  const updatedInv = {
    ...invoice,
    ...(client && { clientName: client.name, clientPhone: client.phone }),
    ...updatedData,
  };

  //   Replace the old invoice with updated one
  invoices[index] = updatedInv;

  //   save updated invoice
  saveInvoices(invoices);

  return updatedInv;
}

// Delete invoice
export function deleteInvoice(invoiceId) {
  // load all invoices
  let invoices = loadInvoices();

  // find the index by invoiceId
  const index = invoices.findIndex((inv) => inv.id === invoiceId);

  if (index === -1) {
    throw new Error(`Invoice with id ${invoiceId} not found`);
  }

  // Remove the invoice and capture the deleted object
  let deletedInvoice = invoices.splice(index, 1);

  // save the updated invoices
  saveInvoices(invoices);

  return deletedInvoice;
}
