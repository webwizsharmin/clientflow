import {
  renderRevenueChart,
  renderLeadChart,
  renderUnpaidInvChart,
  renderMonthlyRevenueChart,
} from "../modules/charts.js";

export function renderDashboardPage() {
  const content = document.getElementById("content");

  // Inject dashboard layout
  content.innerHTML = `
    <h1 class="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
    <p class="text-slate-500 mb-6">Welcome back, John Doe. Here's your business overview.</p>
    
    <!-- Metrics Grid -->
    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
      <!-- Total Revenue -->
      <div class="card">
        <div class="card-header">
          <div>
            <p class="card-title">Total Revenue</p>
            <h3 class="card-value">$54,985</h3>
          </div>
          <button class="text-slate-400 hover:text-slate-600">
            <i class="bx bx-dollar text-xl"></i>
          </button>
        </div>
        <div class="h-40 w-full">
          <canvas id="revenueChart" class="h-full w-full"></canvas>
        </div>
      </div>

      <!-- Active Leads -->
      <div class="card">
        <div class="card-header">
          <div>
            <p class="card-title">Active Leads</p>
            <h3 class="card-value">1,985</h3>
          </div>
          <button class="text-slate-400 hover:text-slate-600">
            <i class="bx bxs-user-detail text-xl"></i>
          </button>
        </div>
        <div class="h-40 w-full">
          <canvas id="leadChart" class="h-full w-full"></canvas>
        </div>
      </div>

      <!-- Unpaid Invoices -->
      <div class="card">
        <div class="card-header">
          <div>
            <p class="card-title">Unpaid Invoices</p>
            <h3 class="card-value">$5,485</h3>
          </div>
          <button class="text-slate-400 hover:text-slate-600">
            <i class="bx bx-spreadsheet text-xl"></i>
          </button>
        </div>
        <div class="h-40 w-full">
          <canvas id="unpaidInvChart" class="h-full w-full"></canvas>
        </div>
      </div>
    </div>

    <!-- Monthly Revenue & Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 w-full">
      <div class="card">
        <div class="card-header">
          <div>
            <p class="card-title">Monthly Revenue</p>
            <h3 class="card-value">$5,850</h3>
          </div>
          <button class="text-slate-400 hover:text-slate-600">
            <i class="bx bx-line-chart text-xl"></i>
          </button>
        </div>
        <div class="h-64">
          <canvas id="monthlyRevChart" class="h-full w-full"></canvas>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-bold text-slate-700 mb-4">Recent Activity</h3>
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-semibold text-slate-600">New Client Added</h4>
            <p class="text-slate-500 text-sm">
              Acme Corp was added to your client list by John Doe on May 22, 2026.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-slate-600">Invoice Sent</h4>
            <p class="text-slate-500 text-sm">
              Invoice #INV‑2045 for $3,200 was sent to Bright Solutions on May 21, 2026.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-slate-600">Lead Status Updated</h4>
            <p class="text-slate-500 text-sm">
              Lead “Sarah Johnson” moved from
              <span class="font-semibold text-green-600">Prospect</span> to
              <span class="font-semibold text-blue-600">Active</span>.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-slate-600">Task Completed</h4>
            <p class="text-slate-500 text-sm">
              Follow‑up call with GlobalTech was marked complete by Jane Smith on May 20, 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
    `;

  // Dynamically render charts after DOM is ready
  renderRevenueChart(document.getElementById("revenueChart"), {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [5000, 7000, 6500, 5500, 7400, 6200],
  });

  renderLeadChart(document.getElementById("leadChart"), {
    labels: ["Week 1", "Week 2", "Week 3"],
    values: [10, 15, 20],
  });

  renderUnpaidInvChart(document.getElementById("unpaidInvChart"), {
    labels: ["Week 1", "Week 2", "Week 3"],
    values: [1200, 800, 1500],
  });

  renderMonthlyRevenueChart(document.getElementById("monthlyRevChart"), {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [12000, 15000, 18000, 20000, 22000, 25000],
  });
}
