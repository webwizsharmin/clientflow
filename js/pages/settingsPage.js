export function renderSettingsPage() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="p-6">
  <h1 class="text-2xl font-bold text-slate-800 mb-4">Settings</h1>
  <p class="text-slate-500 mb-6">Manage your preferences here.</p>

  <!-- Theme Toggle -->
  <div class="bg-white dark:bg-slate-800 p-4 rounded shadow">
    <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Theme</h2>
    <button id="themeToggle" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Toggle Light/Dark
    </button>
  </div>

  <!-- Placeholder -->
  <div class="mt-6 bg-white dark:bg-slate-800 p-4 rounded shadow">
    <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Other Settings</h2>
    <p class="text-slate-500 dark:text-slate-400">More options coming soon...</p>
  </div>
</div>
    `;
}
