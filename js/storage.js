export function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

export function loadClients() {
  const data = localStorage.getItem("clients");
  return data ? JSON.parse(data) : [];
}

// INVOICES PART

// save invoices
export function saveInvoices(invoices) {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

// load invoices
export function loadInvoices() {
  const invData = localStorage.getItem("invoices");
  return invData ? JSON.parse(invData) : [];
}
