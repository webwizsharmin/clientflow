import { saveLeads, loadLeads } from "../storage.js";

// Add Lead
export function addLead(newLead) {
  // load existing leads
  let leads = loadLeads();

  // destructuring new lead
  const {
    id,
    name,
    email,
    phone,
    source,
    status,
    priority,
    notes,
    createdAt,
    createdBy,
    nextActionDate,
    valueEstimate,
  } = newLead;

  // check id and name
  if (!newLead?.id || !newLead.name) {
    throw new Error("Lead must have an id and name");
  }

  // create new lead object
  const newLeadObj = {
    id,
    name,
    email: email || "",
    phone: phone || "",
    source: source || "Unknown",
    status: status || "New",
    priority: priority || "Medium",
    notes: notes || "",
    createdAt: createdAt || new Date().toISOString(),
    createdBy: createdBy || "Admin",
    nextActionDate: nextActionDate || null,
    valueEstimate: valueEstimate || null,
  };

  // push new lead immutably
  const updatedLeads = [...leads, newLeadObj];

  // save leads
  saveLeads(updatedLeads);

  return newLeadObj;
}

// Edit Lead
export function editLead(id, updatedData) {
  let leads = loadLeads();

  // find lead by id
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    throw new Error(`Lead with id ${id} is not found!`);
  }

  const lead = leads[index];

  // merge new data with old lead
  const updatedLead = {
    ...lead,
    name: updatedData.name ?? lead.name,
    email: updatedData.email ?? lead.email,
    phone: updatedData.phone ?? lead.phone,
    source: updatedData.source ?? lead.source,
    status: updatedData.status ?? lead.status,
    priority: updatedData.priority ?? lead.priority,
    notes: updatedData.notes ?? lead.notes,
    nextActionDate: updatedData.nextActionDate ?? lead.nextActionDate,
    valueEstimate: updatedData.valueEstimate ?? lead.valueEstimate,
    updatedAt: new Date().toISOString(),
  };

  // replace old lead with updated one
  const updatedLeads = leads.map((l, i) => (i === index ? updatedLead : l));

  saveLeads(updatedLeads);

  return updatedLead;
}

// Delete Lead
export function deleteLead(id) {
  let leads = loadLeads();

  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    throw new Error(`Lead with id ${id} is not found!`);
  }

  const [deletedLead] = leads.splice(index, 1);

  saveLeads(leads);

  return deletedLead;
}

// Get a single lead by id
export function getLead(id) {
  let leads = loadLeads();

  const lead = leads.find((l) => l.id === id);
  if (!lead) {
    throw new Error(`Lead with id ${id} is not found!`);
  }
  return lead;
}

// Get all leads
export function getAllLeads() {
  return loadLeads();
}
