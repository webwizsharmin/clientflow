export function initTopbar() {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themIcon");
  const root = document.documentElement;

  if (!toggleBtn || !icon) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark");
    icon.classList.replace("bx-sun", "bx-moon");
  }

  // Toggle event
  toggleBtn.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    icon.classList.replace(
      isDark ? "bx-sun" : "bx-moon",
      isDark ? "bx-moon" : "bx-sun",
    );
  });
}
