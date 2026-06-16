export function validateClient(data) {
  const errors = [];

  if (!data.name || data.name.length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email is required.");
  }

  if (data.phone && !/^\+?\d{7,15}$/.test(data.phone)) {
    errors.push("Phone number must be valid.");
  }

  // if (!data.company) {
  //   errors.push("Company name is required.");
  // }

  return errors;
}

// Invoice validation
export function validateInvoice(data) {
  const errors = [];

  if (!data.id) {
    errors.push("Invoice ID is required.");
  }

  if (!data.clientId) {
    errors.push("Client selection is required.");
  }

  if (!data.status || !["paid", "unpaid", "pending"].includes(data.status)) {
    errors.push("Valid status is required (paid, unpaid, pending).");
  }

  if (!data.issueDate) {
    errors.push("Issue date is required.");
  }

  if (!data.items || data.items.length === 0) {
    errors.push("At least one item is required.");
  }

  if (isNaN(data.amount) || data.amount <= 0) {
    errors.push("Amount must be a positive number.");
  }

  return errors;
}
