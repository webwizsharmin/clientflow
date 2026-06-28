export function renderRevenueChart(ctx, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Revenue",
          data: data.values,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          tension: 0.3,
        },
      ],
    },
    options: { responsive: true },
  });
}

export function renderLeadChart(ctx, data) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "leads",
          data: data.values,
          backgroundColor: "#22c55e",
        },
      ],
    },
  });
}

export function renderUnpaidInvChart(ctx, data) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Unpaid Invoices",
          data: data.values,
          borderColor: "#ef4444",
          backgroundColor: "#f97316",
          // tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

export function renderMonthlyRevenueChart(ctx, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Monthly Revenue",
          data: data.values,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
