import { Chart } from "chart.js";

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
