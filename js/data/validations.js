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
