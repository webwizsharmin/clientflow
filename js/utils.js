export function generateId() {
  return Date.now(); // simple unique ID
}

// auto generate issuedate
export function getIssueDate() {
  return new Date().toISOString;
}
