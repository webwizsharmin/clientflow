export function initTopbar() {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const root = document.documentElement;

  if (!toggleBtn || !icon) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark");
    icon.classList.remove("bx-sun");
    icon.classList.add("bx-moon");
  }

  // Toggle event
  toggleBtn.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (isDark) {
      icon.classList.remove("bx-sun");
      icon.classList.add("bx-moon");
    } else {
      icon.classList.remove("bx-moon");
      icon.classList.add("bx-sun");
    }
  });
}
