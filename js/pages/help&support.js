export function renderHelpsPage() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="p-6">
  <h1 class="text-2xl font-bold text-slate-800 mb-4">Help & Support</h1>
  <p class="text-slate-500 mb-6">Find answers or reach out for help.</p>

  <div class="bg-white dark:bg-slate-800 p-4 rounded shadow">
    <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">FAQ</h2>
    <ul class="list-disc pl-6 text-slate-600 dark:text-slate-300">
      <li>How do I add a client? → Use the Clients page and click “+ New Client”.</li>
      <li>How do I switch theme? → Use the toggle in the topbar or Settings.</li>
      <li>Need more help? → Contact support@example.com</li>
    </ul>
  </div>
</div>
    `;
}
