export function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

export function loadClients() {
  const data = localStorage.getItem("clients");
  return data ? JSON.parse(data) : [];
}
