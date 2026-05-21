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
