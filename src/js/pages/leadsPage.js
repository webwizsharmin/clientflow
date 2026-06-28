export function renderleadsPage() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="p-6">
  <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Leads</h1>
  <p class="text-slate-500 dark:text-slate-400 mb-6">Track potential clients and opportunities.</p>

  <div class="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-fadeIn">
    <table class="table-auto min-w-full text-left text-sm border-collapse">
      <thead>
        <tr class="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <th class="px-4 py-2 text-slate-700 dark:text-slate-200 font-semibold">Name</th>
          <th class="px-4 py-2 text-slate-700 dark:text-slate-200 font-semibold">Contact</th>
          <th class="px-4 py-2 text-slate-700 dark:text-slate-200 font-semibold">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          <td class="px-4 py-2 text-slate-800 dark:text-slate-100">John Doe</td>
          <td class="px-4 py-2 text-slate-600 dark:text-slate-300">john@example.com</td>
          <td class="px-4 py-2"><span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 font-medium">Contacted</span></td>
        </tr>
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          <td class="px-4 py-2 text-slate-800 dark:text-slate-100">Jane Smith</td>
          <td class="px-4 py-2 text-slate-600 dark:text-slate-300">jane@example.com</td>
          <td class="px-4 py-2"><span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium">Converted</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    `;
}
